### vuex mapState
当组件想要获取多个state的时候，声明计算属性会变得重复冗余，此时可以利用辅助函数mapState更快更简洁的生成计算属性
- normalizeMap
  <pre>
        /**
         * Normalize the map
         * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
         * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
         * @param {Array|Object} map
         * @return {Object}
        */
        function normalizeMap (map) {
          if (!isValidMap(map)) {
            return []
          }
          return Array.isArray(map)
            ? map.map(key => ({ key, val: key }))
            : Object.keys(map).map(key => ({ key, val: map[key] }))
        }
  </pre>
  这个方法是要是格式化mapState 传进来的states 参数。states 参数会是两种形式，一种是以数组的方式传入，另一种则是以对象的方法传入。
- mapState
  <pre>
    export function mapState (states) {
        const res = {}
        normalizeMap(states).forEach(({ key, val }) => {
            res[key] = function mappedState () {
            return typeof val === 'function'
                ? val.call(this, this.$store.state, this.$store.getters)
                : this.$store.state[val]
            }
        })
        return res
    }
  </pre>
  对刚刚 normalizeMap 格式化后返回的数组进行遍历，拼接一个符合 computed 的对象（需有返回值）。
对 normalizeMap 返回数组的对象里的 val 有两个判断。如果不是函数，直接查找 this.$store.state[val] 返回 state。如果是函数，则需要使用 call 将 val 这个函数的 this 指向 vue 实例，然后将 state 和 getters 传入，最后执行 val 函数。
  
- 总结
  主要的功能就是将传入的数组或对象转成 computed 计算属性能够识别的代码。
