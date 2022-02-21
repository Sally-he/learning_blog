/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-07-08 10:47:23
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-16 16:55:43
 */

//  es6 数组转对象

// const arr = [{
//     key: "id",
//     name: "编号"
//   },
//   {
//     key: "name",
//     name: "名称"
//   },
// ];

/**
 * 函数的扩展
 */

// const obj = Object.fromEntries(arr.map(item => [item.key, item]));
// console.log(obj);

// function log(x, y) {
//   y = y || 'World';
//   console.log(x, y);
// }

// log('hello');
// log('hello', 'china');

// function log(x, y = 'World') {
//   console.log(x, y);
// }

// function foo({
//   x,
//   y = 5
// }) {
//   console.log(x, y)
// }
// foo({});

// foo({
//   x: 1
// })

// console.log((function (a) {
// }).length)

// console.log((function (a = 5) {
// }).length)

// function f(y = x) {
//   console.log(y)
// }
// f(1);

// const obj = {
//   s
// }

// function f() {
//   let m = 1;
//   let n = 2;
//   return getComputedStyle(m + n);
// }

// function f(n) {
//   if (n === 1) return 1;
//   return n * f(n - 1);
// }

// function factorial(n ,total){
//   if(n === 1) return total;
//   return factorial(n - 1, n * total);
// }

// function Factorial(n) {
//   if (n <= 1) return 1;
//   return Factorial(n -1) + Factorial(n - 2);
// }

// Factorial(10)

// function currying(fn, n) {
//   return function (m) {
//     return fn.call(this, m, n)
//   }
// }

// function tailFactorial(n, total) {
//   if (n === 1) return total;
//   return tailFactorial(n - 1, n * total);
// }

// const factorial = currying(tailFactorial, 1);
// console.log(factorial(5));

// function tco(f) {
//   var value;
//   var active = false;
//   var accumulated = [];
//   return function accumulator() {
//     accumulated.push(arguments);
//     if (!active) {
//       active = true;
//       while (accumulated.length) {
//         value = f.apply(this, accumulated.shift());
//       }
//       active = false;
//       return value;
//     }
//   }
// }
// var sum = tco(function (x, y) {
//   if (y > 0) {
//     return sum(x + 1, y - 1)
//   }
//   return x;
// })
// console.log(sum(1, 10000));

// function foo() {}
// console.log(foo.toString());

// let map = new Map([
//   [1, 'one'],
//   [2, 'two'],
//   [3,'three']

// ]);

// console.log(map.keys());
// console.log(map.values());
// console.log(map);

// let arrayLike = {
//   '0': 'a',
//   '1': 'b',
//   '2': 'c',
//   length: 3
// };

// console.log(arrayLike);
// console.log(Array.from(arrayLike));

// console.log(Array.of(3, 11, 9))

// let a = [1, 2, 3, 4, 5].copyWithin(0, 2);
// // console.log(a);

// let b = [1, 2, 3, 4, 5].copyWithin(0, 2, 4);
// console.log(b)

// let a = new Array(3).fill(6); // [ 6, 6, 6 ]
//  ['a','b','c'].fill(7); // [ 7, 7, 7 ]
// console.log(a);

// let b = ['a', 'b', 'c'].fill(7, 1, 2); // [ 'a', 7, 'c' ]

// console.log(b);


// for (let index of ['a', 'b'].keys()) {
//   console.log(index);
// }
// // 0
// // 1

// for (let elem of ['a', 'b'].values()) {
//   console.log(elem);
// }
// // a
// // b

// for (let [index, elem] of ['a', 'b'].entries()) {
//   console.log(index, elem);
// }
// // 0 a
// // 1 b

// let letter = ['a', 'b', 'c'];
// let entries = letter.entries();
// console.log(entries.next()); // { value: [ 0, 'a' ], done: false }
// console.log(entries.next().value); // [1, 'b']
// console.log(entries.next().value); // [2, 'c']

// let a = [1, 2, [3, 4]].flat();
// // [ 1, 2, 3, 4 ]
// console.log(a);

// let b = [1, 2, [3, [4, 5]]].flat(); // 默认只会“拉平”一层
// // [ 1, 2, 3, [ 4, 5 ] ]
// console.log(b);

// let c =  [1, 2, [3, [4, 5]]].flat(2);
// // [ 1, 2, 3, 4, 5 ]
// console.log(c);

// let d = [1, [2, [3]]].flat(Infinity); // 不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
// // [ 1, 2, 3 ]
// console.log(d);

// let e = [1, 2, , 4, 5].flat();  // 原数组有空位，flat()方法会跳过空位。
// // [ 1, 2, 4, 5 ]
// console.log(e);

// // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
// let a = [2, 3, 4].flatMap(x => [x, x * 2]);
// // [ 2, 4, 3, 6, 4, 8 ]
// console.log(a);

// // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
// let b = [1, 2, 3, 4].flatMap(x => [
//   [x * 2]
// ]);
// // [ [ 2 ], [ 4 ], [ 6 ], [ 8 ] ]
// console.log(b);

// console.log(Array(3));

// let ms = {};

// function getItem(key) {
//   return key in ms ? ms[key] : null;
// }

// function setItem(key, value) {
//   ms[key] = value;
// }

// function clear() {
//   ms = {};
// }

// module.export = {
//   getItem,
//   setItem,
//   clear
// }

// let obj = { foo: 123 };
// Object.getOwnPropertyDescriptor(obj, 'foo')
// // { value: 123, writable: true, enumerable: true, configurable: true }
// console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));

// const proto = {
//   foo: 'hello'
// };
// const obj = {
//   foo: 'world',
//   find(){
//     return super.foo;
//   }
// };

// Object.setPrototypeOf(obj, proto);
// console.log(obj.find());

// Object.is('foo', 'foo');

// Object.defineProperty(Object, 'is', {
//   value: function (x, y) {
//     if (x === y) {
//       // 针对+0 不等于 -0 的情况
//       return x !== 0 || 1 / x === 1 / y;
//     }
//     // 针对NaN的情况
//     return x !== x && y !== y;
//   },
//   configurable: true,
//   enumerable: false,
//   writable: true
// })

// const targe = {
//   a: 1
// };
// const source1 = {
//   b: 2
// };
// const source2 = {
//   c: 3
// };
// Object.assign(targe, source1, source2);
// // console.log(targe);

// console.log(typeof Object.assign(2));

// let obj = {
//   a: 1
// };
// console.log(Object.assign(obj, undefined) === obj);
// console.log(Object.assign(obj, null) === obj);

// let v1 = 'abc';
// let v2 = true;
// let v3 = 10;

// console.log(Object.assign({}, v1, v2, v3));

// const obj1 = {
//   a: {
//     b: 1
//   }
// };

// const obj2 = Object.assign({}, obj1);


// class Point {
//   constructor(x, y) {
//     Object.assign(this, {
//       x,
//       y
//     })
//   }
// }

// const a = new Point(1, 4);
// console.log(a.x, a.y, a);


// const source = {
//   set foo(value) {
//     console.log(value);
//   }
// };

// const target2 = {};
// Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
// Object.getOwnPropertyDescriptor(target2, 'foo')
// console.log(target2);

// let mix = (object) => ({
//   with: (...mixins) => mixins.reduce(
//     (c, mixin) => Object.create(
//       c, Object.getOwnPropertyDescriptors(mixin)
//     ), object)
// });
// let a = {a: 'a'};
// let b = {b: 'b'};
// let c = {c: 'c'};
// let d = mix(c).with(a, b);

// console.log(d, d.c, d.b, d.a);

// let sym = Symbol('My symbol');
// console.log(String(sym));
// console.log(sym.toString());

// const shapeType = {
//   triangle: 'Triangle'
// };

// function getArea(shape, options) {
//   let area = 0;
//   switch (shape) {
//     case shapeType.triangle:
//       area = .5 * options.width * options.height
//       break;
//     default:
//       break;
//   }
//   return area;
// }

// class MyClass {
//   [Symbol.hasInstance](foo){
//     return foo instanceof Array;
//   }
// }
// console.log([1,2,3] instanceof new MyClass());

// let s = Symbol();
// let s3 = Symbol('test');

// console.log(s2 === s3);

// let s4 = new Symbol('test'); // TypeError: Symbol is not a constructor

// let result = s + 100; // TypeError: Cannot convert a Symbol value to a number

// let s2 = Symbol.for('test'); // 创建一个 symbol 并放入 symbol 注册表中，键为 "test"
// let s3 = Symbol.for('test'); // 从 symbol 注册表中读取键为"foo"的 symbol

// console.log(String(s2)); // Symbol(test)
// console.log(s2.toString()); // Symbol(test), 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串

// console.log(s2.description); // test
// s2 === s3  // true，证明了上面说的

// console.log(s2 === s3); // Symbol(test)


// let userInfo = {
//   name: 'test',
//   age: 24
// };
// let methods = {
//   up: Symbol(),
//   down: Symbol()
// };

// userInfo[methods.up] = function () {
//   console.log('this is up');
// }
// userInfo[methods.down] = function () {
//   console.log('this is down');
// }

// console.log(userInfo);

// function getUserInfo() {
//   const name = Symbol('test');
//   const obj = {};
//   obj[name] =  'test';
//   return obj;
// }

// const userInfo = getUserInfo();
// console.log(Object.keys(userInfo)); // []

// // 除非用 symbol 的引用，否则无法访问该属性
// console.log(userInfo[Symbol('test')]); // undefined

// // 用 getOwnPropertySymbols() 可以拿到 symbol 的引用
// const [symbol] = Object.getOwnPropertySymbols(userInfo);
// console.log(userInfo[symbol]); // 'test'


// const symbol = Symbol('test');
// const userInfo = {
//   [symbol]: 'test', name: symbol
// };

// console.log(JSON.stringify(userInfo)); // "{}"

// const myIterable = new Object();
// myIterable[Symbol.asyncIterator] = async function* (){
//   yield 'hello';
//   yield 'async';
//   yield 'Iterator';
// };

// (async ()=> {
//   for await (const x of myIterable){
//     console.log(x);
//   }
// })();

// hello
// async
// Iterator

// class caseInsensitiveSearch{
//   constructor(value){
//     this.value = value.toLowerCase();
//   }
//   [Symbol.search](string){
//     return string.toLowerCase().indexOf(this.value);
//   }
// }

// console.log('foobar'.search(new caseInsensitiveSearch('sar'))); // -1
// console.log('foobar'.search(new caseInsensitiveSearch('bar'))); // 3

// class caseSplit {
//   constructor(value){
//     this.value = value;
//   }
//   [Symbol.split](string){
//     const index = string.indexOf(this.value);
//     return `${this.value}${string.substr(0, index)}/${string.substr(index + this.value.length)}`;
//   }
// }

// console.log('foobar'.split(new caseSplit('foo')));

// // 一个没有提供 Symbol.toPrimitive 属性的对象，参与运算时的输出结果
// var obj1 = {};
// console.log(+obj1);     // NaN
// console.log(`${obj1}`); // "[object Object]"
// console.log(obj1 + ""); // "[object Object]"

// // 接下面声明一个对象，手动赋予了 Symbol.toPrimitive 属性，再来查看输出结果
// var obj2 = {
//   [Symbol.toPrimitive](hint) {
//     if (hint == "number") {
//       return 10;
//     }
//     if (hint == "string") {
//       return "hello";
//     }
//     return true;
//   }
// };
// console.log(+obj2);     // 10      -- hint 参数值是 "number"
// console.log(`${obj2}`); // "hello" -- hint 参数值是 "string"
// console.log(obj2 + ""); // "true"  -- hint 参数值是 "default"

// let items = [
//   ['name', 'test'],
//   ['title', 'Author']
// ];
// let map = new Map();

// items.forEach(([key, value])=> map.set(key, value));

// console.log(map);

// const map = new Map([
//   ['F', 'no'],
//   ['T', 'yes']
// ]);

// for (const key of map.keys()) {
//   console.log('key: ', key);
// }
// for (const value of map.values()) {
//   console.log('value: ', value);
// }

// for (const item of map.entries()) {
//   console.log(item[0], item[1]);
// }

// for (let [key, value] of map) {
//   console.log(key, value);
// }

// const theObject = {
//   a: 1,
//   b: 2
// };

// const registry = new FinalizationRegistry(heldValue => {
//   console.log(heldValue);
// });


// let obj = new Proxy({},)

// function multiRequest(urls = [], maxNum) {
//     const len = urls.length;
//     const result = new Array(len).fill(false);

//     let count = 0;

//     return new Promise((resolve, reject) => {
//         while (count < maxNum) {
//             next();
//         }

//         function next() {
//             let current = count++;
//             if (current >= len) {
//                 !result.includes(false) && resolve(resolve);
//                 return;
//             }

//             const url = urls[current];
//             fetch(url).then(res => {
//                 result[current] = res;
//                 if(current < len){
//                     next();
//                 }
//             }).catch(err => {
//                 result[current] = res;
//                 if(current < len){
//                     next();
//                 }
//             })
//         }
//     })
// }

// var color = 'blue';
// function changeColor() {
//     var anotherColor = 'red';
//     function swapColor() {
//         var tempColor  = anotherColor;
//         anotherColor = color;
//         color = tempColor;
//     }

//     swapColor()
// }
// changeColor()
// console.log(color);

// var name = 'window';
// var p = {
//     name: 'Perter',
//     getName: function () {
//         var self = this;
//         return function(){
//             return self.name;
//         }
//     }
// }

// var getName = p.getName();
// var _name = getName();
// console.log(getName);

// function foo() {
//     console.log('function foo');
// }
// console.log(foo);
// var foo = 20;

// function test() {
//     console.log(a);
//     console.log(foo());
//     var a = 1;
//     function foo() {
//         return 2;
//     }
// }


// function test() {
//     function foo() {
//         return 2;
//     }
//     var a;
//     console.log(a);
//     console.log(foo());
//     a = 1;
// }
// test();

// function test() {
//     console.log(foo);
//     console.log(bar);

//     var foo = 'foo';
//     console.log(foo);
//     var bar = function () {
//         return 'world';
//     }
//     function foo() {
//         return 'hello';
//     }
// }

// test()
// function test() {
//     function foo() {
//         return 'hello';
//     }
//     console.log(foo);
//     var bar;
//     console.log(bar);
//     var foo = 'foo';
//     console.log(foo);
//     var bar = function () {
//         return 'world';
//     }
// }

// var a = 20;
// function test() {
//     var b = a + 10;
//     function insertTest() {
//         var c = 10;
//         return b + c;
//     }
//     return insertTest();
// }

// test();


// var a = 20;

// function foo() {
// console.log(a)
//   if (!a) {
//     a = 100;
//   }

//   var a = 10;

//   return a;
// }

// console.log(foo());


// innerTestEC = {
//     VO: {...},  // 变量对象
//     scopeChain: [VO(foo), VO(global.a), VO(foo.a)], // 作用域链
//   }

// var coinChange = function (coins, amount) {
//     if (amount === 0) {
//         return 0;
//     }

//     let dp = new Array(amount + 1).fill(amount + 1);
//     dp[0] = 0;
//     coins.forEach((coin) => {
//         for (let i = coin; i <= amount; ++i) {
//             if (dp[i - coin] == amount + 1) continue;
//             dp[i] = Math.min(dp[i - coin], dp[i])
//         }
//     });
//     return dp[amount] == amount + 1 ? -1 : dp[amount];
// }

// class Solution {
//     public:
//         int coinChange(vector < int > & coins, int amount) {
//             vector < int > dp(amount + 1, INT_MAX);
//             // 总金额为0，自然不需要硬币
//             dp[0] = 0;

//             //
//             for (const int & coin: coins)
//                 for (int i = coin; i <= amount; ++i) {
//                     if (dp[i - coin] == INT_MAX) continue;
//                     dp[i] = min(dp[i - coin] + 1, dp[i]);
//                 }
//             return dp[amount] == INT_MAX ? -1 : dp[amount];
//         }
// };

// function foo() {
//     var a = 20;
//     var b = 30;
//     function bar() {
//         return a + b;
//     }
//     return bar;
// }

// var fn = null;
// function foo(paams) {
//     var a = 2;
//     function innerFoo(params) {
//         console.log(a);
//         console.log(c);
//     }
//     fn = innerFoo;
// }
// function bar(params) {
//     var  c = 100;
//     fn();
// }

// foo();
// bar();

// (function () {
//     var a = 10,
//         b = 20;
//     function add(num1, num2) {
//         var num1 = !!num1 ? num1: a;
//         var num2 = !!num2 ? num2: b;
//         return num1 + num2;
//     }
//     window.add = add;
// })();

// add(10, 20);

// for (var i = 1; i <= 5; i++) {
//    (function (i) {
//     setTimeout(function timer() {
//         console.log(i);
//       }, i * 1000)
//    })(i)
// }

// for (let i = 1; i <= 5; i++) {
//     setTimeout(function timer() {
//       console.log(i);
//     }, i * 1000);
//   }

// var timer = setTimeout(() => {
//     console.log('setTimeout actions.');
//     clearTimeout(timer);
// }, 0);
// console.log('other actions.');

// setTimeout(() => {
//     console.log(a); // 4 10
// }, 0);

// var a = 10;

// console.log(b); // 1 undefined
// console.log(fn); // 2 [Function fn]

// var b = 20;

// function fn() {
//     setTimeout(() => {
//         console.log('setTimeout 10ms'); // 5 setTimeout 10ms
//     }, 10);
// }

// fn.toString = function () {
//     return 30;
// }

// console.log(fn); // 3 [function fn: toString]

// setTimeout(() => {
//     console.log('setTimeout 20ms'); // 6 setTimeout 20ms
// }, 20);

// fn();

// var a = 10;
// var obj = {
//     a: 20
// };
// function fn() {
//     console.log(this.a);
// }
// fn();
// fn.call(obj);

// var a = 10;
// function fn() {
//     console.log(this.a);
// }
// fn();

// var a = 20;
// function fn() {
//     function foo() {
//         console.log(this.a);
//     }
//     foo();
// }
// fn();

// var a = 30;
// var obj = {
//     a: 10,
//     c: this.a + 20,
//     fn: function () {
//         return this.a;
//     }
// }
// console.log(obj.c); // 50
// console.log(obj.fn()); // 10

// function fn() {
//     'use strict';
//     console.log(this);
// }
// fn();
// window.fn();

// 'use strict';
// var a = 20;
// function foo() {
//     var a = 1;
//     var obj = {
//         a: 10,
//         c: this.a + 20,
//         fn: function () {
//             return this.a;
//         }
//     }
//     return obj.c;
// }
// console.log(foo()); // 21
// console.log(window.foo()); // 10

// var a = 20;
// var foo = {
//     a: 10,
//     getA: function () {
//        return this.a; 
//     }
// }

// console.log(foo.getA()); // 10

// var test = foo.getA;
// console.log(test());

// function foo(){
//     console.log(this.a);
// }

// function active(fn) {
//     fn();
// }

// var a  = 20;
// var obj = {
//     a: 10,
//     getA: foo
// }
// active(obj.getA); // 10

// function fn(){
//     console.log(this.a);
// }
// var obj = {
//     a: 20
// }
// fn.call(obj); // 20

// function fn(num1, num2){
//     console.log(this.a + num1 + num2);
// }
// var obj = {
//     a: 20
// }
// fn.call(obj, 100, 10); // 130
// fn.apply(obj,[20, 10]) // 50


// function exam(a, b, c, d, e) {
//     console.log(arguments);

//     var arg = [].slice.call(arguments);
//     console.log(arg);
// }
// exam(2,3,5,6,7);

// var foo = {
//     name: 'joker',
//     showName: function(){
//         console.log(this.name);
//     }
// };
// var bar = {
//     name: 'rose'
// };
// foo.showName.call(bar);

// var Person = function (name, age) {
//     this.name = name;
//     this.age = age;
//     this.gender = ['man', 'woman'];
// };

// var Student = function (name, age, high) {
//     Person.call(this, name, age);
//     this.high = high;
// }

// Student.prototype.message = function () {
//     console.log(`name: ${this.name}, age: ${this.age}, high: ${this.high}, gender: ${this.gender[0]}`);
// }

// new Student('xiaomin', 12, '150cm').message();

// var obj = {
//     a: 20,
//     getA: function () {
//       setTimeout(function () {
//         console.log(this.a)
//       }, 1000)
//     }
//   }

//   obj.getA();

// var obj = {
//     a: 20,
//     getA: function () {
//       var self = this;
//       setTimeout(function () {
//         console.log(self.a)
//       }, 1000)
//     }
//   }

// function bind(fn, obj) {
//     return function () {
//       return fn.apply(obj, arguments);
//     }
//   }

//   var obj = {
//     a: 20,
//     getA: function () {
//       setTimeout(bind(function () {
//         console.log(this.a)
//       }, this), 1000)
//     }
//   }

// var obj = {
//     a: 20,
//     getA: function () {
//       setTimeout(function () {
//         console.log(this.a)
//       }.bind(this), 1000)
//     }
//   }
//   obj.getA();

//  new 操作
/**
 * 1. 创建一个新的对象
 * 2. 将构造函数的this指向这个对象
 * 3. 指向构造函数，为这个对象添加函数，属性等
 * 4. 返回新对象
 */

// 自执行创建模块
// (function () {
//     // states 结构预览
//     // states = {
//     //     a: 1,
//     //     b: 2,
//     //     m: 30,  
//     //     o: {}
//     // }
//     var states = {}; // 私有变量，用来存储状态与数据

//     // 判断数据类型
//     function type(elem) {
//         if (elem == null) {
//             return elem + '';
//         }
//         return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
//     }


//     /**
//      * @Param name 属性名
//      * @Description 通过属性名获取保存在states中的值
//      */
//     function get(name) {
//         return states[name] ? states[name] : '';
//     }

//     function getStates() {
//         return states;
//     }

//     /*
//      * @param options {object} 键值对
//      * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
//      * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
//      */
//     function set(options, target) {
//         var keys = Object.keys(options);
//         var o = target ? target : states;

//         keys.map(function (item) {
//             if (typeof o[item] == 'undefined') {
//                 o[item] = options[item];
//             } else {
//                 type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
//             }
//             return item;
//         })
//     }

//     // 对外提供接口
//     window.get = get;
//     window.set = set;
//     window.getStates = getStates;
// })()

// // 具体使用如下

// set({
//     a: 20
// }); // 保存 属性a
// set({
//     b: 100
// }); // 保存属性b
// set({
//     c: 10
// }); // 保存属性c

// // 保存属性o, 它的值为一个对象
// set({
//     o: {
//         m: 10,
//         n: 20
//     }
// })

// // 修改对象o 的m值
// set({
//     o: {
//         m: 1000
//     }
// })

// // 给对象o中增加一个c属性
// set({
//     o: {
//         c: 100
//     }
// })
// console.log(getStates())


// function createCurry(func, args) {
//     var arity = func.length, args = args || [];
//     return function(){
//         var _args = [].slice.call(arguments);
//         [].push.apply(_args, args);

//         if(_args.length < arity){
//             return createCurry.call(this.func, _args);
//         }

//         return func.apply(this, _args);
//     }
// }

// function add() {
//     var _args = [].slice.call(arguments);

//     var adder = function(){
//         var _adder = function(){
//             _args.push(...arguments);
//             return _adder;
//         }
//         _adder.toString = function () {
//             return _args.reduce(function (a, b) {
//                 return a + b;
//             });
//         };
//         return _adder
//     };

//     return adder(..._args);
// }


// demo01  出自于上面我引用文章的一个例子，我们来根据上面的结论，一步一步分析具体的执行过程。
// 为了方便理解，我以打印出来的字符作为当前的任务名称
// setTimeout(function() {
//     console.log('timeout1');
// })

// new Promise(function(resolve) {
//     console.log('promise1');
//     for(var i = 0; i < 1000; i++) {
//         i == 99 && resolve();
//     }
//     console.log('promise2');
// }).then(function() {
//     console.log('then1');
// })

// console.log('global1');


// // demo02
// console.log('goal1'); // 1

// setTimeout(function () {
//     console.log('timeout1'); // 4
//     process.nextTick(function () {
//         console.log('timeout1_nextTick'); // 5
//     })
//     new Promise(function (resolve) {
//         console.log('timeout1_promise'); // 4
//         resolve();
//     }).then(function () {
//         console.log('timeout1_then')
//     })
// })

// setImmediate(function () {
//     console.log('immediate1'); // 4
//     process.nextTick(function () {
//         console.log('immediate1_nextTick'); // 5
//     })
//     new Promise(function (resolve) {
//         console.log('immediate1_promise'); // 4
//         resolve();
//     }).then(function () {
//         console.log('immediate1_then')
//     })
// })

// process.nextTick(function () {
//     console.log('glob1_nextTick'); // 2
// })
// new Promise(function (resolve) {
//     console.log('glob1_promise'); // 1
//     resolve();
// }).then(function () {
//     console.log('glob1_then') // 3
// })

// setTimeout(function () {
//     console.log('timeout2'); // 4
//     process.nextTick(function () {
//         console.log('timeout2_nextTick'); // 5
//     })
//     new Promise(function (resolve) {
//         console.log('timeout2_promise'); // 4
//         resolve();
//     }).then(function () {
//         console.log('timeout2_then')
//     })
// })

// process.nextTick(function () {
//     console.log('glob2_nextTick'); // 2
// })
// new Promise(function (resolve) {
//     console.log('glob2_promise'); // 1
//     resolve();
// }).then(function () {
//     console.log('glob2_then') // 3
// })

// setImmediate(function () {
//     console.log('immediate2'); // 4
//     process.nextTick(function () {
//         console.log('immediate2_nextTick'); // 5
//     })
//     new Promise(function (resolve) {
//         console.log('immediate2_promise'); // 4
//         resolve();
//     }).then(function () {
//         console.log('immediate2_then')
//     })
// })


// function fn(num) {
//     return new Promise(function(resolve, reject) {
//         if (typeof num == 'number') {
//             resolve();
//         } else {
//             reject();
//         }
//     }).then(function() {
//         console.log('参数是一个number值');
//     }, function() {
//         console.log('参数不是一个number值');
//     })
// }

// fn('hahha');
// fn(1234);

// function fn(num) {
//     return new Promise(function(resolve, reject) {
//         if (typeof num == 'number') {
//             resolve();
//         } else {
//             reject();
//         }
//     })
//     .then(function() {
//         console.log('参数是一个number值');
//     })
//     .then(null, function() {
//         console.log('参数不是一个number值');
//     })
// }

// fn('hahha');
// fn(1234);

// for (let i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(new Date, i);
//     }, 1000);
// }

// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(new Date, i);
//         }, 1000)
//     })(i)
// }

// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(new Date, i);
//     }, i);
// }

//  1
// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(new Date, i);
//         }, 1000);
//     })(i)
// }
// console.log(new Date, i);

//  2
// var output = function (i) {
//     setTimeout(function () {
//         console.log(new Date, i);
//     }, 1000);
// }
// for (var i = 0; i < 5; i++) {
//     output(i)
// }
// console.log(new Date, i);

// 3

// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(new Date, i);
//         }, 1000 * i);
//     })(i)
// }
// setTimeout(function () {
//     console.log(new Date, i);
// }, 1000 * i);

// const tasks = [];
// for (var i = 0; i < 5; i++) {
//     ((j) => {
//         tasks.push(new Promise(resolve => {
//             setTimeout(()=> {
//                 console.log(new Date, i);
//                 resolve()
//             }, 100* j)
//         }))
//     })(i)
// }


class Schedule {
    constructor(name) {
        this.list = [];
        this.isWait = false;

        const task = (name) => {
            console.log(`> ${name} is notified`);
        }
        this.list.push(task.bind(this, name))
        this.print();
    }

    wait(time) {
        const task = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`等待  ${time}  秒`);
                resolve();
            }, time * 1000);
        });
        this.list.push(task);
        this.print();
        return this;
    }
    waitFirst(time) {
        const task = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`等待  ${time}  秒`);
                resolve();
            }, time * 1000);
        });
        this.list.unshift(task);
        this.print();

        return this;
    }
    print() {
        if (this.isWait) {
            return;
        }
        this.isWait = true;
        
        const goNext = () => {
            if (!this.list.length) {
                this.isWait = false;
            } else {
                let task = this.list.shift();
                if (task.then) {
                    task.then(() => {
                        goNext();
                    })
                } else {
                    task();
                    goNext();
                }
            }
        }
        Promise.resolve().then(() => {
            goNext();
        });
    }
    do(event) {
        const task = (event) => {
            console.log(`> Start  to ${event}`);
        }
        this.list.push(task.bind(this, event));
        this.print();
        return this;
    }
}

function task(name) {
    const schedule = new Schedule(name);
    return schedule;
}

// task('William');
// task('William').wait(5).do('commit');
task('William').waitFirst(5).do('push');