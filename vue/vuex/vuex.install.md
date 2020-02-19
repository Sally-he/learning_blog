### vuex 关于 install

进入vuex源码 `src/index.js` 可以看到，vuex 暴露的方法有
    <pre>
    export default {
    Store,
    install,
    version: '__VERSION__',
    mapState,
    mapMutations,
    mapGetters,
    mapActions,
    createNamespacedHelpers
    }
    <pre>

根据`Store.js` 可以发现， install就做了一件事情, 调用了`applyMixin`方法
    <pre>
    export function install (_Vue) {
        if (Vue && _Vue === Vue) {
            if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[vuex] already installed. Vue.use(Vuex) should be called only once.'
            )
            }
            return
        }
        Vue = _Vue
        applyMixin(Vue)
        }
    </pre>

根据`applyMixin`方法可以找到 `mixin.js`，代码可简化为
    <pre><code>
        export default function (Vue) {
            Vue.mixin({ beforeCreate: vuexInit })
            function vuexInit () {
                const options = this.$options
                // store injection
                if (options.store) {
                this.$store = typeof options.store === 'function'
                    ? options.store()
                    : options.store
                } else if (options.parent && options.parent.$store) {
                this.$store = options.parent.$store
                }
            }
        }
    </code></pre>
主要实现的功能是实现`store`的全局注册混合对象。根据 `vuexInit`可以知道实际上就是把 vue 中的options 放入`$store`中，如果没有找到，则向父级`parent`向上查找。
实际通常应用的时候，我们可以使用`this.$store`得到整个`options`对象