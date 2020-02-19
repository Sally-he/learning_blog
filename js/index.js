// 判断一个属性是否为数组
function isArray(obj){
    Array.prototype.isPrototypeOf(obj); // 根据原型判断
    Array.isArray(obj)
}
function debounce(callback,time){
    let _tid = null;
    let _this = this;
    return function(...args){
        if(_tid){
            clearTimeout(_tid)
        }
        _tid = setTimeout(()=>{
            callback.callback(_this, ...args)
        }, time)
    }
}
function throttle(callback, time, n = 1){
    let start = Date.now();
    let _this = this;
    let newTime = Math.floor(parseInt(time / n)); // n 默认是1，表示单位时间内执行n次

    return function(...args){
        if(Date.now() - start > newTime){
            callback.call(_this, ...args)
        }else {
            start = new Date();
        }
    }
}
// 冒泡排序
function bubbleSort(arr){
    var len = arr.length;
    for(var i = 0; i< len; i ++){
        for(var j = 0; j< len - 1 - i; j++){
            if(arr[j] > arr[j + 1]){
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp
            }
        }
    }
    return arr
}
// 快速排序
function qucikSort(arr){
    if(arr.length <= 1){
        return arr
    }
    var middleIndex = Math.floor(arr.length / 2);
    var middle = arr.splice(middleIndex,1)[0];
    var left = [], right = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] < middle){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return qucikSort(left).concat([middle], qucikSort(right));
}
// 函数柯里化
function curry(fn, ...args){
    let length = fn.length; // 参数的长度
    return function(...newArgs){
        let allArgs = [...args, ...newArgs];
        if(allArgs.length < length){
            return curry.call(this, fn, ...allArgs);
        }else{
            return fn.call(this, ...newArgs);
        }
    }
}

// promise ajax
function ajax(options){
    let { methods, url } = options;
    return new Promise((resolve, reject)=>{
        let client = new XMLHttpRequest();
        client.open(methods,url);
        client.onreadystatechange = function(){
            if(this.readyState !== 4){
                return;
            }
            if(this.status === 200){
                resolve(this.responseText)
            }else{
                reject(new Error(this.statusText))
            }
        }
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
    })
}
// 深拷贝
function deepClone1(data){
    return JSON.parse(JSON.stringify(data))
}

function deepClone(data){
    var result = Array.isArray(data) ? [] : {};
    for(var key in data){
        if(data.hasOwnProperty(key)){
            if(!data[key] && typeof data[key] === 'object'){
                result[key] = deepClone(data[key]) 
            }else{
                result[key] = data[key]
            }
        }
    }
}

// 数组扁平化处理
function flat1(data){
    return data.flat(Infinity);
}

// 发布订阅模式（实现on、emit、once、off）
class EventEmit{
    constructor(){
        this.events = {};
    }
    on(name, cb){
        if(!this.events[name]){
            this.events[name] = [cb];
            return;
        }
        this.events[name].push(cb)
    }
    emit(name, ...args){
        if(!this.events[name]){
            return;
        }
        this.events[name].forEach( fn => {
            fn.call(this, ...args)
        });
    }
    off(name, fn){
        if(!this.events[name]){
            return;
        }
        this.events[name] = this.events[name].filter( cb =>{
            return fn !== cb;
        });
    }
    once(name, fn){
        let onlyOnce = ()=>{
            fn.apply(this, arguments);
            this.off(name, onlyOnce)
        }
        this.on(name, onlyOnce);
    }
}


// 继承

// 实现instanceof: 判断原型是否在这原型链上
function instanceofEvent(left, right){
    let proto = left._proto_;
    let prototype = right.prototype;
    while(true){
        if(proto === null){
            return false;
        }
        if(proto === prototype){
            return true;
        }
        proto = proto._proto_;
    }
}

/**
 * new 的过程：
 * 1. 创建一个空的简单Javascript对象
 * 2. 链接该对象（即设置该对象的构造函数）到另一个对象
 * 3. 将步骤1新创建的对象作为this的上下文
 * 4.如果该函数没有返回对象，则返回this
 */
function newEvent(cb){
    let obj = {}; // 首先创建一个对象
    obj._proto_ = cb.prototype // 然后将该对象的__proto__属性指向构造函数的protoType
    let result = cb.call(obj) // 执行构造函数的方法，将obj作为this传入
    return typeof(result) === 'object' ? result : obj;
}
// 实现sleep函数
function sleep(time){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(true)
        }, time)
    })
}

// 实现promise
class Promise{
    static STATUS_ENUM = {
        PENDING: 'pending',
        FULFILLED: 'fulfilled',
        REJECTED: 'rejected'
    }
    value = null;
    status = Promise.STATUS_ENUM.PENDING;
    cachedThen = {};
    cachedCatch = null;
    constructor(func){
        if(typeof func !== 'function'){
            return new Error('need function')
        }
        func((res)=> this.resolve(res), (err)=> this.reject(err));
        return this;
    }
    resolve(res){
        this.value = res;
        this.status =  Promise.STATUS_ENUM.FULFILLED;
        console.log('promise fulfilled');
        this.cachedThen[Promise.STATUS_ENUM.resolve](this.value);
    }
    reject(err){
        this.value = err;
        this.status = Promise.STATUS_ENUM.REJECTED;
        console.log('promise rejected');
        if(this.cachedThen[Promise.STATUS_ENUM.REJECTED]){
            this.cachedThen[Promise.STATUS_ENUM.REJECTED](this.value);
        }else if(this.cachedCatch){
            this.cachedCatch(this.value);
        }
    }
    then(onResolve, onReject){
        this.cachedThen = {
            [Promise.STATUS_ENUM.FULFILLED]: onResolve,
            [Promise.STATUS_ENUM.REJECTED]: onReject
        }
        return this;
    }
    catch(onReject){
        this.cachedCatch = onReject;
    }
}
Promise.all = function(promiseList){
    if(!Array.isArray(promiseList)){
        throw new Error('must array')
    }
    let resList = [];
    let finshedCount = 0;
    return new Promise((resolve,reject)=>{
        promiseList.forEach((promise,index) =>{
            promise.then( res =>{
                resList[index] = res;
                finshedCount++;
                if(finshedCount === promiseList.length){
                    resolve(resList)
                }
            }).catch(err => {
                reject(err)
            })
        })
    })
}
// 获取数组最大深度
function deep(arr,  count = 0, newArr = []){
    for(let index in arr){
        if(Array.isArray(arr[index])){
            count ++;
            deep(arr[index], count, newArr)
        }else {
            newArr.push(count)
        }
    }
    return Math.max.apply(null, newArr) + 1;
}

// 数组乱序
function mixArr(arr){
    return arr.sort(()=>{
        return Math.random() - 0.5;
    })
}

// 数组filter
Array.prototype.filter = function(fn, context){
    if(typeof fn !== 'function'){
        throw new Error('need function')
    }
    let arr = this;
    let result = [];
    for(var i = 0; i < arr.length; i++){
        let temp = fn.call(context, arr[i], i, arr);
        if(temp){
            result.push(arr[i])
        }
    }
    return result;
}

// call
Function.prototype.myCall = function(context){
    if(typeof this !== 'function'){
        throw new Error('need function')
    }
    context.fn = this;
    let result = context.fn([...arguments]);
    delete context.fn;
    return result;
}
// apply
Function.prototype.myApply = function(context, arr){
    if(typeof this !== 'function'){
        throw new Error('need function')
    }
    let result = [];
    if(!arr){
        result = context.fn();
    }else {
        result = context.fn(...arguments)
    }
    delete context.fn;
    return result;
}

// bind
Function.prototype.myBind = function(context){
    if(typeof this !== 'function'){
        throw new Error('need function')
    }
    let self = this;
    let args = [...arguments].slice(1);
    let bound = function(){
        let args2 = [...arguments];
        return self.apply(this instanceof bound ? this : context, args.concat(args2));
    }
    bound.prototype = self.prototype;
    return bound;
}

// 判断字符串是不是回文字符串
function run(input){
    if(typeof input !== 'function')
        return false;
    return input.split('').reverse().join('') ===  input;
}
export default {
    isArray,
    debounce,
    throttle,
    bubbleSort,
    qucikSort,
    curry,
    ajax,
    deepClone,
    deepClone1,
    flat1,
    EventEmit,
    instanceofEvent,
    deep,
}