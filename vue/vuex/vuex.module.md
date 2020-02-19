### vuex 关于module

store将应用的状态收集集中起来，但如果应用变得非常复杂时，即状态变得非常多的时，store就有可能变得十分臃肿。module主要是用于store模块划分，每个模块都拥有自己state，getter，mutation、action和module

- module的注册
  installModule 里实现了 module 的注册，定位到 installModule 方法。
  <pre>
    function installModule (store, rootState, path, module, hot) {
        const isRoot = !path.length
        const {
            modules
        } = module

        // set state
        if (!isRoot && !hot) {
            const parentState = getNestedState(rootState, path.slice(0, -1))
            const moduleName = path[path.length - 1]
            store._withCommit(() => {
            Vue.set(parentState, moduleName, state || {})
            })
        }
        
        // mutation 的注册
        // action 的注册
        // getter 的注册

        if (modules) {
            Object.keys(modules).forEach(key => {
            installModule(store, rootState, path.concat(key), modules[key], hot)
            })
        }
    }
  </pre>
   installModule 对 module 做了两步初始化操操作。第一步使用Vue.set()对当前module的state设置了监听；第二部则继续遍历子模块，然后递归调用installModule
- set state
  modules 的核心实现就在于对当前的 module 的 state 设置了监听，将此段代码提取出来:
  <pre>
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
    Vue.set(parentState, moduleName, state || {})
    })
  </pre>
   其中关于getNestedState 方法可以获取到父 state。所以先取得父state，再取得当前模块的名称，最后使用Vue.set 将当前的state设置在父state 上。实际上就是在一个vue实例下为data.state 添加属性，并能在vue实例上监听到属性的改动。
- getNestedState
  <pre>
        const parentState = getNestedState(rootState, path.slice(0, -1))
  </pre>
  通过path.slice(0, -1)将当前模块去掉，作为参数和rootState根状态传入getNestedState 方法中，并返回当前模块的父状态parentState。
  <pre>
    function getNestedState (state, path) {
    return path.length
        ? path.reduce((state, key) => state[key], state)
        : state
    }
  </pre>
  如果 length 等于 0，即只有根 state，直接返回。另一种情况，如果有嵌套的模块，那么通过 Array.prototype.reduce() 方法一直往根 state 的属性取 path 对应的 state 并返回。
  至此，state 的模块化已经注册完成，然后递归调用 installModule 完成所有 module 的注册。
  既然是往 rootState 里添加属性，那么获取则可以通过 store.state.xx 来获取到模块，然后再继续获取模块里的 state。
- getNestedState
  在此之前一个忽略了getNestedState方法， 在注册mutation 和action 的时候，会出现
  <pre>
    getNestedState(store.state, path)
  </pre>
  实际上是获取当前module的state，作为参数回传
- 存放数组
  在解读mutation的时候，mutaion保存到了store._mutaions数组里面。主要目的是将所有module里面的mutation都存在在一个数组中，以便commit的时候能触发所有mutation。
  action 也是这个原因。
  但是，如果两个 module 里有相同的 mutation 名称，vuex 2.0.0 里做不到只触发其中一个 mutation。这个在往后的版本中设置命名空间可实现。
- 总结
  在注册module的时候主要分为两个步骤
  第一步：找到当前module的父state，然后将其绑定在当前state的state的监听，保证修改了state会触发相应action/commit
  第二步： 则是递归module，保证设置子module的state，从而实现module的子嵌套。