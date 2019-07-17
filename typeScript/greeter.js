var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
// -------- class: 类 ------------------
// -------- interface: 接口 -------------
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return 'Hello, ' + person.lastName + " " + person.firstName;
}
var user = new Student("Sally", "MS.", "He");
document.body.innerText = greeter(user);
// --------- 字符串模板 ---------------
var names = "Sally";
function getImg() {
    return "<i></i>";
}
var html = "<div>" + names + "<span>" + getImg() + "</span></div>";
function getData(template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}
var age = 22;
getData(__makeTemplateObject(["\u4F60\u597D\uFF0C\u6211\u7684\u540D\u5B57\u662F", ", \u6211\u4ECA\u5E74", "\u5C81\u4E86"], ["\u4F60\u597D\uFF0C\u6211\u7684\u540D\u5B57\u662F", ", \u6211\u4ECA\u5E74", "\u5C81\u4E86"]), names, age);
// ---------- 参数 -------------
//  类型声明与默认参数
function isString(name, age) {
    return true;
}
console.log(isString(names, age));
function max(x, y) {
    if (y === void 0) { y = 4; }
    return x > y ? x : y;
}
var result1 = max(2);
var result2 = max(2, undefined);
// let result3 = max(2, 4, 7); // 报错
var result4 = max(2, 7);
// 可选参数
function max2(x, y) {
    if (y) {
        return x > y ? x : y;
    }
    else {
        return x;
    }
}
var result5 = max2(2, null);
var result6 = max2(2, undefined);
// let result7 = max2(2, 4, 7); // 报错
var result8 = max2(2, 7);
//  -------- 函数 ----------------
//  -------- 剩余函数 ------------
function sum(x) {
    var restOfNumber = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfNumber[_i - 1] = arguments[_i];
    }
    var result = x;
    restOfNumber.forEach(function (value) { return result += value; });
    return result;
}
var result9 = sum(1, 2, 3, 4, 5, 6, 7, 8);
console.log(result9);
var result10 = sum(2);
console.log(result10);
var result11 = sum(2, 5);
console.log(result11);
//  ------ generator 函数 ------
// function getPrice(stock){
//     while(1){
//        return Math.round() * 100;
//     }
// }
// var priceGenerator = getPrice('doc');
// var limitPrice = 51;
// var price = 100;
// while(price > limitPrice){
//     price = priceGenerator;
//     console.log(`this generator return ${price}`)
// }
// console.log(`buying at ${price}`)
