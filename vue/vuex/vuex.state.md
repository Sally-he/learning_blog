### vuex 关于 state
Store 对象中有一个属性是state。 state 包含了全部应用层级状态， 至此它便作为一个“唯一数据源“而存在。每个应用将仅仅包含一个store实例。
应用中的各个组件使用了state，则保持与同步最先的状态。 state 就好比vue 中的 data, 但它是整个应用的data

 首先找到 Store 类，代码太长了简化下

 - 构造函数 `constructor`
    <pre>
        constructor(options = {}){
            const {
                state = {}
            } = options


            // init root module.
            // this also recursively registers all sub-modules
            // and collects all module getters inside this._wrappedGetters
            installModule(this, state, [], options)

            // initialize the store vm, which is responsible for the reactivity
            // (also registers _wrappedGetters as computed properties)
            resetStoreVM(this, state)
        }
    </pre>
    构造函数实际上就做了两件事情: `installModule` 和 `resetStoreVM`; `installModule`  是关于module的注册，关于[module]()可细看链接。

 - `resetStoreVM`： 给store对象添加一个_vm 属性，并将state作为一个vue对象的data，最后将这个 vue 对象赋值给 _vm。所以到这里我们知道了 store 类的构造函数为其添加了一个 _vm 属性。其中 Vue.config.silent 是取消 vue 所有的日志与警告的功能；代码简化为： 
     <pre>
        function resetStoreVM (store, state) {
        // use a Vue instance to store the state tree
        store._vm = new Vue({
            data: { state }
        })
        }
     </pre>
     
 - set 与 get
    <pre>
        get state () {
            return this._vm._data.$$state
        }

        set state (v) {
            if (process.env.NODE_ENV !== 'production') {
            assert(false, `use store.replaceState() to explicit replace store state.`)
            }
        }
    </pre>

    默认`set`是不可以修改`store.state`属性指的，但实际应用但时候，还是可以修改的哈哈哈。
    `get` 返回的是 构造函数`constructor`新注册添加 `_vm.data(实际是state)`。因此在某个组件改变了`state.xxx`,其他组件也会跟着变。 因为state 在这里含义是data的一个属性

 - 总结
    `store.state`是通过 new 一个新的 vue 对象 _vm 来监听的，而这个 _vm 又是绑在 store 上的。所以通过这一系列的关系，最后我们能在各个组件中使用到被监听的 this.$store.state。
    

