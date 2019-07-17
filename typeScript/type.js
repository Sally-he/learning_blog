//  基本类型

// Boolean: 与JavaScript一样，只有true/false
var isDone = false;
var isDone1 = new Boolean(1); // 报错 Type 'Boolean' is not assignable to type 'boolean'.
var isDone2 = Boolean(1);

// Number: 与JavaScript一样所有的数字都是浮点数，浮点数的类型是number，支持进制： 二进制、八进制、十进制、十六进制
var deciml = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;

// String:表示文本类型数据，可以使用单引号(')和双引号(")表示字符串，也可使用模板字符串
var color = "blue";
color = 'red';
var fullName = 'Sally He';
var age = 37;
var sentence = "Hello, my name is " + fullName + ". I'll be " + (age + 1) + " years old next year.";

// Array: 两种方式定义数组，一种是number[],另一种是number[] 
var list = [1, 2, 3];
var list2 = [1, 2, 3];

// Tuple(元组): 允许表示一个已知类型的数组，各元素的类型不必相同
var x;
x = ["hello", 10];
x = [10, "hello"]; //  报错  Type 'string' is not assignable to type 'number'.
console.log(x[0].substring(1));
console.log(x[1].substring(1)); // 报错 Property 'substring' does not exist on type 'number'.

x[3] = "world"; // 报错  Tuple type '[string, number]' of length '2' has no element at index '3'.
console.log(x[5].toString()); // 报错 Tuple type '[string, number]' of length '2' has no element at index '5'.

// Enum(枚举类型): 默认从0开始，是JavaScript标准类型的一个补充
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;

var c = Color.Green;
console.log(c); // 1

var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["Blue"] = 3] = "Blue";
})(Color2 || (Color2 = {}));
;

var c2 = Color2.Green;
console.log(c2); // 2

var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
;

var c3 = Color3.Green;
console.log(c3); // 2

var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 1] = "Red";
    Color4[Color4["Green"] = 2] = "Green";
    Color4[Color4["Blue"] = 3] = "Blue";
})(Color4 || (Color4 = {}));
;

var colorName = Color4[2];
console.log(colorName); // Green

// Any(任意类型):可以用于不清楚类型的变量，
var notSure = 4;
notSure = "maybe a string instead";
notSure = false;

var notSure2 = 4;
notSure2.ifItExists();
notSure2.toFixed();

var prettySure = 4;
prettySure.toFixed(); // 报错 Property 'toFixed' does not exist on type 'Object'.

var list3 = [1, true, "free"];
list3[1] = 100;
console.log(list3); // [1, 100, "free"]

// void(空值): 与 any 类型相反，表示没有任何类型，
function warnUser() {
    console.log("This is my warning message");
}
// 报错  Type '"This is my warning message"' is not assignable to type 'void'.
function warnUser2() {
    return "This is my warning message";
}
var unusable = undefined;

// null and undefined
var u = undefined; // undefined
var n = null; // undefined

var u2 = null; // null
var n2 = undefined; // undefined

var num = undefined; // undefined
var nn = null; // null

var su = undefined; // undefined
var sn = null; // null

var bu = undefined; // undefined
var bn = null; // null

// Never: 表示的那些永不存在的类型
// Function returning never must have unreachable end point
function error(message) {
    throw new Error(message);
}
// Inferred return type is never
function fail() {
    return error("something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop() {
    while (true) {
    }
}
create({ age: 22 });
create(null);
create(42); // 报错 Argument of type '42' is not assignable to parameter of type 'object'.
create("string"); // 报错 Argument of type '"string"' is not assignable to parameter of type 'object'.
create(false); // 报错 Argument of type 'false' is not assignable to parameter of type 'object'.
create(undefined); // 官网说报错，实际运行并没有报错

// Type assertions(类型断言)
var someValue = "this is a string";
var strLength = someValue.length;
var someValue2 = "this is a string";
var strLength2 = someValue2.length;
