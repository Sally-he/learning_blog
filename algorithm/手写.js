/**
 *  手写 Object.create
 */

function create(obj) {
    function f() {

    }
    f.prototype = obj;
    return f;
}


/**
 * 手写instanceof
 */
/**
 * instanceof 运算符用于判断构造函数的prototype属性是否出现在对象的原型链中的任何位置
 * 实现步骤
 *  1. 首先获取类型的原型
 *  2. 获取对象的原型
 *  3. 一直循环判断对象的原型是否等于类型的原型，知道对象的原型为null，因为原型链最终为null
 */

function instance(left, right) {
    let proto = Object.getPrototypeOf(left),
        prototype = right.prototype;

    while (true) {
        if (!proto) {
            return false;
        }
        if (proto === prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
}

/**
 * 数据类型判断
 * typeOf 可以准确的识别：undefined,Boolean,Number,String,Symbol,Function等类型的数据，
 * 但是对于其他的都会认为是object, 比如null、Date等。所以通过typeof来判断数据类型不准备，
 * 但可以使用Object.prototype.toString 实现
 */

function typeOf(obj) {
    let res = Object.prototype.toString.call(obj).split(' ')[1];
    res = res.substring(0, res.length - 1);
    return res;
}

/**
 * 继承
 */

function Animal() {
    this.colors = ['black', 'white'];
}

Animal.prototype.getColor = function () {
    return this.colors;
}

function Dog() {

}

Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push('brown');

