#### vuex 关于 getter

getter 实际是关于data 中的computed 属性。 getter实际上是作为 Store 的一个属性

- 构造函数 `constructor`
  代码简化为：
  <pre>
    constructor (options = {}) {
        // and collects all module getters inside this._wrappedGetters
        installModule(this, state, [], options)

        // initialize the store vm, which is responsible for the reactivity
        // (also registers _wrappedGetters as computed properties)
        resetStoreVM(this, state)
    }
  </pre>
- `installModule`
  代码简化为：
  <pre>
    function installModule (store, rootState, path, module, hot) {
        const isRoot = !path.length
        const {
            getters
        } = module

        if (getters) {
            wrapGetters(store, getters, path)
        }
    }
  </pre>
  进入 wrapGetters  方法，会发现这个方法实现是为了拼接store的一个_wrappedGetters对象。拼接的目的是为了可以在需要执行getter里的方法时，还能传想传的参数再执行。
  <pre>
    function wrapGetters (store, moduleGetters) {
        Object.keys(moduleGetters).forEach(getterKey => {
            const rawGetter = moduleGetters[getterKey]
            
            // 将 options 里的 getter 赋值到 _wrappedGetters
            // 因为 computed 的赋值就是 return 一个函数
            store._wrappedGetters[getterKey] = function wrappedGetter (store) {
            return rawGetter(
                store.state, // local state
                store.getters, // getters
                store.state, // root state
                store.getters // root getters
            )
            }
        })
    }

  </pre>

- `resetStoreVM`
  简化跟getter相关的代码为：
    <pre>
        function resetStoreVM (store, state) {
            // bind store public getters
            store.getters = {}
            
            // 获取刚刚拼接的 _wrappedGetters
            const wrappedGetters = store._wrappedGetters
            
            // 开始拼接 computed
            const computed = {}
            Object.keys(wrappedGetters).forEach(key => {
                const fn = wrappedGetters[key]
                // use computed to leverage its lazy-caching mechanism
                computed[key] = () => fn(store)
                Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]
                })
            })

            // use a Vue instance to store the state tree
            store._vm = new Vue({
                data: { state },
                computed
            })
        }
    </pre>

    里面就用到了刚刚拼接的 _wrappedGetters 对象。实际上以下这行代码就是拼接一个 Vue 能是识别的计算属性 computed。
    <pre>
        computed[key] = () => fn(store)
    </pre>

    其中还是使用了`Object.defineProperty`对store.getters 的 get 方法进行重写。因此一旦访问 `this.$store.getters.xxx`,get 方法就会返回 `this.$store._vm.xxx`, 也就是 _vm 的计算属性
- 总结
   store.getters 实际上就是 store._vm 的计算属性 computed。
   通过 state/getter 可以知道，state和getter 分别对象这实例 store._vm 实例的data和computed。
  