### vuex 关于 mutation

vuex 规定更改state的唯一方法是提交mutation，主要是为了devtools 追踪状态变化。
- 构造函数 `constructor`
  简化跟`mutation`相关的代码
  <pre>
    constructor (options = {}) {
        this._mutations = Object.create(null)

        // bind commit and dispatch to self
        const store = this
        const { commit } = this
        this.commit = function boundCommit (type, payload, options) {
            return commit.call(store, type, payload, options)
        }

        // init root module.
        installModule(this, state, [], options)
    }

  </pre>
- `mutation` 的注册
  `mutation` 的实现主要分为两步，一是初始化install，二是实现commit函数。
  关于 `installModule`
  <pre>
    function installModule (store, rootState, path, module, hot) {
        const {
            mutations
        } = module

        if (mutations) {
            Object.keys(mutations).forEach(key => {
            registerMutation(store, key, mutations[key], path)
            })
        }
    }
  </pre>
   实际上是循环options里面的mutation， 将其作为参数传入registerMutation方法中，进入registerMutation方法中，可以看到
   <pre>
    function registerMutation (store, type, handler, local) {
        const entry = store._mutations[type] || (store._mutations[type] = [])
        entry.push(function wrappedMutationHandler (payload) {
            handler.call(store, local.state, payload)
        })
    }
   </pre>
   根据代码可以看到，mutations保存在了一个数组里面，而不是一个函数，那是由于使用了module的情况下，模块中不可避免的使用了多个相同的mutations，当使用commit时，多个相同的mutations 会依次触发
- `commit`的实现
  commit实际上就是重新赋值一遍，也就是this 默认指向类的实例。
  <pre>
    // bind commit and dispatch to self
    const store = this
    const { commit } = this
    this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
    }
  </pre>
  关于commit的实现，将保存的`store._mutations` 数组取出循环执行。需注意的是这个 `_withCommit` 方法。
  <pre>
    commit (type, payload, options) {
        const mutation = { type, payload }
        const entry = this._mutations[type]

        this._withCommit(() => {
            entry.forEach(function commitIterator (handler) {
            handler(payload)
            })
        })
    }
  </pre>
  <pre>
    _withCommit (fn) {
        const committing = this._committing
        this._committing = true
        fn()
        this._committing = committing
    }
  </pre>
   关于 `_withCommit`: 里面有一个 this._committing 变量，搜索了一下，大致了解了它的作用。首先我们知道 vuex 有一个严格模式。默认不开启，所以 this._committing 变量没什么作用。如果手动开启，state 初始化时在 resetStoreVM 方法里有相应的处理。
   <pre>
        // enable strict mode for new vm
        if (store.strict) {
        enableStrictMode(store)
        }
   </pre>
   <pre>
        function enableStrictMode (store) {
            store._vm.$watch('state', () => {
                assert(store._committing, `Do not mutate vuex store state outside mutation handlers.`)
            }, { deep: true, sync: true })
        }
   </pre>
   这里的 store._committing 默认是 false，所以我们直接赋值 state 会 watch 到并抛出错误。只有在刚刚的 _withCommit 方法里将其设置为 true 再赋值，才不会抛出错误。
- 总结
    mutation在注册的时候，用一个store._mutations 数组将module模块中所有同名的方法都保存恰里，在commit的时候则将其所有同名的方法取出并执行。<br/>
    在开启严格模式的情况下进行commit提交，vuex 使用 `_withCommit` 方法保证状态变更是由mutation函数引起的，而其中使用一个`_committing`变量来判断。实际虽然会抛出错误，但是还是会变更，但是 devtools追踪变化失败。
    `mutation`只是为来同步更新状态