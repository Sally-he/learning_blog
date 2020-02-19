class Observer {
    constructor(data){
        // 如果不是对象，则返回
        if(!data || typeof data !== 'object'){
            return
        }
        this.data = data
        this.walk()
    }
    //  对传入的数据进行劫持
    walk(){
        for(let key in this.data){
            this.defineReactive(this.data, key, this.data[key])
        }
    }
    // 创建当前数据的一个发布实例，使用Object.defineProperty对当前属性进行数据劫持
    defineReactive(obj, key, val){
        const dep = new Dep()
        new Observer(val)
        Object.defineProperty(obj,key, {
            get(){
                // 若当前有对该属性的依赖项，则将其加入到发布者的订阅者队列里
                if(Dep.target){
                    dep.addSub(Dep.target)
                }
                return val
            },
            set(newVal){
                if(val === newVal){
                    return
                }
                val = newVal
                new Observer(newVal)
                dep.notify()
            }
        })
    }
}

 // 发布者，将依赖该属性的watcher都加入subs数组中，当属性改变当时候，则调用依赖该属性当watcher的更新函数，触发更新
 class Dep {
    constructor(){
        this.subs = []
    }

    // 增加订阅者
    addSub(sub){
        if(this.subs.indexOf(sub)< 0) {
            this.subs.push(sub)
        }
    }
    // 通知订阅者
    notify(){
        this.subs.forEach( (sub)=>{
            sub.update()
        })
    }
}
Dep.target = null

// 观察者
class Watcher{
    constructor(vm, keys, updateCb){
        this.vm = vm
        this.keys = keys
        this.updateCb = updateCb
        this.value = null
        this.get()
    }
    // 根据vm 和keys获取到最新的观察值
    get(){
        Dep.target = this
        const keys = this.keys.split('.')
        let value = this.vm
        keys.forEach(_key =>{
            value = value[_key]
        })
        this.value = value
        Dep.target = null
        return this.value
    }
    update(){
        const oldValue = this.value
        const newValue = this.get()
        if(oldValue !== newValue){
            this.updateCb(oldValue, newValue)
        }
    }
}