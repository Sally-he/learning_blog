var _a;
var sym1 = Symbol();
var sym2 = Symbol('key');
var sym3 = Symbol('key');
sym2 === sym3; // false
var sym = Symbol();
var obj = (_a = {},
    _a[sym] = 'value',
    _a);
console.log(obj[sym]); // value
