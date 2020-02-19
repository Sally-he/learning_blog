### vuex 关于action
mutation是用于同步更新state，而action则是提交mutation，并可进行异步操作，从而间接更新state

- 构造函数 `constructor`
  <pre>
    constructor (options = {}) {
        this._actions = Object.create(null)

        // bind commit and dispatch to self
        const store = this
        const { dispatch } = this
        this.dispatch = function boundDispatch (type, payload) {
            return dispatch.call(store, type, payload)
        }

        installModule(this, state, [], options)
    }

  </pre>
- action的注册
   installModule 实现来action的注册，然后就是dispatch的实现。
   <pre>
        function installModule (store, rootState, path, module, hot) {
            const {
                actions
            } = module

            if (actions) {
                Object.keys(actions).forEach(key => {
                registerAction(store, key, actions[key], path)
                })
            }
        }
   </pre>
   代码中循环options的action，将其作为参数传入registerAction 方法中，查看 registerAction 方法代码为：
   <pre>
        function registerAction (store, type, handler, path = []) {
            const entry = store._actions[type] || (store._actions[type] = [])
            const { dispatch, commit } = store
            entry.push(function wrappedActionHandler (payload, cb) {
                let res = handler({
                dispatch,
                commit,
                getters: store.getters,
                state: getNestedState(store.state, path),
                rootState: store.state
                }, payload, cb)
                if (!isPromise(res)) {
                res = Promise.resolve(res)
                }

                return res
            })
        }
   </pre>
   其中`isPromise`方法： 主要是判断是否有then 函数
   <pre>
        export function isPromise (val) {
            return val && typeof val.then === 'function'
        }
   </pre>

   与mutation类似，注册是将action保存到来store._actions数组里面，为来使用mudules的情况喜爱commit时能触发相同名称的action。<br/>
   但是action比mutations多了一步，就是将函数做了一些处理，并将值返回。就是`isPromise`判断，主要为了能够一个action执行饭能够使用then继续处理下一个异步操作
- `dispatch`的实现
  <pre>
    dispatch (type, payload) {
        const entry = this._actions[type]

        return entry.length > 1
            ? Promise.all(entry.map(handler => handler(payload)))
            : entry[0](payload)
        }
  </pre>
  如果只有action的话，直接执行返回的promise对象即可。但是当同名的action不止一个的时候，则会使用`Promise.all`处理，当所有的 action 执行完毕后这个 dispatch 才算执行完毕，才会执行 then 函数。
- 总结
  action实际是mutation的升级版。在注册action时，action执行完毕后会将返回值作为一个Promise对象返回，以便可以让异步按顺序执行。<br/>
  在调用dispatch时候，一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。