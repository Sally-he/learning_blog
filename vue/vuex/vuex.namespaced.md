### vuex 关于namespaced
namespaced 把 getter、mutation 和 action 都做了真正的模块化，使得 store 可以使用特定模块的 mutation 等
- `constructor`构造函数
   <pre>
    constructor (options = {}) {
        this._modules = new ModuleCollection(options)
        this._modulesNamespaceMap = Object.create(null)

        // init root module.
        // this also recursively registers all sub-modules
        // and collects all module getters inside this._wrappedGetters
        installModule(this, state, [], this._modules.root)
    }
   </pre>
    `constructor`对module做了两件事情，一是通过传配置参数options来初始化_modules，二是通过installModule来注册module
- ModuleCollection
  new ModuleCollection 初始化 _modules 到底做了哪些事。定位到 module-collection.js 文件，看到它的构造函数
  <pre>
    constructor (rawRootModule) {
        // register root module (Vuex.Store options)
        this.root = new Module(rawRootModule, false)

        // register all nested modules
        if (rawRootModule.modules) {
            forEachValue(rawRootModule.modules, (rawModule, key) => {
            this.register([key], rawModule, false)
            })
        }
    }
  </pre>
  构造函数做了也是两件事情，一件是注册了一个根 module，另一个是遍历注册子 module。打开 module.js 看下主要使用到的代码：
  <pre>
    export default class Module {
        constructor (rawModule, runtime) {
            this.runtime = runtime
            this._children = Object.create(null)
            this._rawModule = rawModule
        }

        addChild (key, module) {
            this._children[key] = module
        }

        getChild (key) {
            return this._children[key]
        }
    }
  </pre>
  构造函数里添加 _children 即子模块，然后当前模块保存在 _rawModule。然后就是两个会用到的方法 addChild 和 getChild，顾名思义，就是添加子模块和获取子模块会用到。
  再回到 ModuleCollection 构造函数的第二步，定位到 register 方法：
  <pre>
    // 得到对应 path 的 module
    get (path) {
    return path.reduce((module, key) => {
        return module.getChild(key)
    }, this.root)
    }
    
    register (path, rawModule, runtime = true) {
    // path.slice(0, -1) 表示去掉最后一个
    // 取得父 module
    const parent = this.get(path.slice(0, -1))

    // new 一个新的 module
    const newModule = new Module(rawModule, runtime)

    // 添加子 module
    parent.addChild(path[path.length - 1], newModule)

    // register nested modules
    if (rawModule.modules) {
        // 递归注册子 module
        forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
        })
    }
    }
  </pre>
  可以看到该 register 跟之前解读 module 时递归 set state 有点类似。这里递归完后会生成一个 module 实例，若该实例有子 module，那么存放在它的 _children 属性中，以此类推。
- installModule
  store 初始化 _modules 属性后，接下来就是注册 module。定位到 installModule 方法：
  <pre>
    function installModule (store, rootState, path, module, hot) {
    const isRoot = !path.length
    const namespace = store._modules.getNamespace(path)

    // register in namespace map
    if (namespace) {
        store._modulesNamespaceMap[namespace] = module
    }

    // set state
    if (!isRoot && !hot) {
        const parentState = getNestedState(rootState, path.slice(0, -1))
        const moduleName = path[path.length - 1]
        store._withCommit(() => {
        Vue.set(parentState, moduleName, module.state)
        })
    }

    const local = module.context = makeLocalContext(store, namespace)

    module.forEachMutation((mutation, key) => {
        const namespacedType = namespace + key
        registerMutation(store, namespacedType, mutation, path)
    })

    module.forEachAction((action, key) => {
        const namespacedType = namespace + key
        registerAction(store, namespacedType, action, local, path)
    })

    module.forEachGetter((getter, key) => {
        const namespacedType = namespace + key
        registerGetter(store, namespacedType, getter, local, path)
    })

    module.forEachChild((child, key) => {
        installModule(store, rootState, path.concat(key), child, hot)
    })
    }
  </pre>
  其中根据 _modules 生成 namespace，然后分别注册 state、mutation、action 和 getter，最后递归注册子模块。
- getNamespace
  定位到 ModuleCollection 的 getNamespace：
  <pre>
   getNamespace (path) {
    let module = this.root
    return path.reduce((namespace, key) => {
        module = module.getChild(key)
        return namespace + (module.namespaced ? key + '/' : '')
    }, '')
    }
  </pre>
- registerAction
  获取到 namespace 之后，接下来就是注册 action。
  <pre>
    const local = module.context = makeLocalContext(store, namespace)
    module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local, path)
    })
  </pre>
  第二步的 registerAction 之前已经解读过，只不过是将子 module 里的 action 用 namespacedType 作为 key 表示，用来区分 store._actions 的 key。所以这段代码主要解读第一步的 makeLocalContext。
  <pre>
    function makeLocalContext (store, namespace) {
    const noNamespace = namespace === ''

    const local = {
        dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
        const args = unifyObjectStyle(_type, _payload, _options)
        const { payload, options } = args
        let { type } = args

        if (!options || !options.root) {
            type = namespace + type
            if (!store._actions[type]) {
            console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
            return
            }
        }

        return store.dispatch(type, payload)
        }
    }

    return local
    }
  </pre>
  其中 unifyObjectStyle 方法只是为了支持传参有多种格式
- helper
  vuex 的辅助函数有带命名空间的绑定函数
  mapActions 方面，主要在原来的实现上包装了一层 normalizeNamespace。打开 helper.js 文件，找到 normalizeNamespace 方法：
  <code>
    function normalizeNamespace (fn) {
    return (namespace, map) => {
        if (typeof namespace !== 'string') {
        map = namespace
        namespace = ''
        } else if (namespace.charAt(namespace.length - 1) !== '/') {
        namespace += '/'
        }
        return fn(namespace, map)
    }
    }
  </code>
  主要是拼接 path 给 store.__actions 调用。
   但是 state 不像 action 是存放在数组里的，所以需要用到 _modulesNamespaceMap 来取得当前的 module，才能取到里面的 state。
- 总结
  module 添加了 namespace，将整个 module 都提取了出来，递归初始化一个 _modules，方便后面模块的查找与使用。
  namespace 作为路径，并作为数组的 key 去访问到子模块的 action 等。从而可以单独访问到子模块内的 action 等。
