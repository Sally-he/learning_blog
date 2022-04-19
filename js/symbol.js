// const symbol1 = Symbol();
// const symbol2 = Symbol(42);
// const symbol3 = Symbol('foo');

// console.log(typeof symbol1);
// // expected output: "symbol"

// console.log(symbol2.valueOf() === 42);
// // expected output: false

// console.log(symbol3.toString());
// // expected output: "Symbol(foo)"

// console.log(Symbol('foo') === Symbol('foo'));
// // expected output: false


// var myIterable = {}
// myIterable[Symbol.iterator] = function* () {
//     yield 1;
//     yield 2;
//     yield 3;
// };
// [...myIterable] // [1, 2, 3]

// console.log(myIterable[Symbol.iterator] === myIterable.entries);
// console.log([...myIterable]);

// class caseInsensitiveSearch{
//     constructor(value){
//         this.value = value.toLowerCase();
//     }
//     [Symbol.search](string){
//         return string.toLowerCase().indexOf(this.value);
//     }
// }

// console.log('footer'.search(new caseInsensitiveSearch('ter')));


// console.log(typeof Symbol('foo') === 'symbol')
// console.log(typeof Symbol.iterator === 'symbol')
// console.log(typeof Symbol() === 'symbol')

// var obj = {};
// obj[Symbol('a')] = 'a';
// obj[Symbol.for('b')] = 'b';
// obj['c'] = 'c';
// obj.d = 'd';

// for (const key in obj) {
//     console.log(key, obj[key]);
// }

// console.log(Symbol('a').toString());
// console.log(Symbol.for('b').toString());
// console.log(obj);
// console.log(Object.getOwnPropertySymbols(obj));


// 关于Object.getOwnPropertySymbols()

// var obj = {};
// var a = Symbol('a');
// var b = Symbol.for('b');

// obj[a] = 'localSymbol';
// obj[b] = 'globalSymbol';

// var objectSymbols = Object.getOwnPropertySymbols(obj);

// console.log(objectSymbols.length);
// console.log(objectSymbols);
// console.log(obj[objectSymbols[0]]);


// console.log(JSON.stringify({[Symbol('foo')]: 'foo'}))

// let sym = Symbol('sym');
// console.log(sym.valueOf());
// console.log(sym.toString());
// console.log(sym.toString() === sym.valueOf());
// console.log(sym.description)

//--------------------------------

// console.log(Object.prototype.toString.call(new Map()));
// console.log(Object.prototype.toString.call(function *(){}));
// console.log(Object.prototype.toString.call(Promise.resolve()));

// class ValidatorClass {
//     get [Symbol.toStringTag](){
//         return 'ValidatorClass'
//     }
// }

// console.log(Object.prototype.toString.call(new ValidatorClass()));
// console.log(Object.prototype.toString.call(new Proxy({}, {})));

//--------------------------------
// var globalSymbol = Symbol.for('global');
// console.log(Symbol.keyFor(globalSymbol)); 

// var localSymbol = Symbol('local');
// console.log(Symbol.keyFor(localSymbol)); 

// console.log(Symbol.keyFor(Symbol.iterator));

//--------------------------------

// class Array1 extends Array {
//     static get[Symbol.species]() {
//         return Array;
//     }
// }

// const a = new Array1(1, 2, 3);
// const mapped = a.map(x => x * x);

// console.log(mapped instanceof Array1);
// console.log(mapped instanceof Array);

