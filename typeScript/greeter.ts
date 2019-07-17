// -------- class: 类 ------------------
// -------- interface: 接口 -------------
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName){
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string,
    lastName: string
}

function greeter(person: Person){
    return 'Hello, ' + person.lastName + " " + person.firstName;
}

let user = new Student("Sally", "MS.", "He");

document.body.innerText = greeter(user);


// --------- 字符串模板 ---------------
var names = "Sally";
function getImg(){
    return `<i></i>`
}
var html = `<div>${names}<span>${getImg()}</span></div>`

function getData(template, name, age){
    console.log(template);
    console.log(name);
    console.log(age);
}
var age = 22
getData`你好，我的名字是${names}, 我今年${age}岁了`;

// ---------- 参数 -------------
//  类型声明与默认参数
function isString(name: string, age: number): boolean{
    return true
}
console.log(isString(names, age))

function max(x: number, y: number = 4): number{
    return x > y ? x: y;
}
let result1 = max(2);
let result2 = max(2, undefined);
// let result3 = max(2, 4, 7); // 报错
let result4 = max(2, 7);

// 可选参数
function max2(x: number, y: number){
    if(y){
        return x > y ? x: y;
    }else{
        return x;
    }
}
let result5 = max2(2, null);
let result6 = max2(2, undefined);
// let result7 = max2(2, 4, 7); // 报错
let result8 = max2(2, 7);

//  -------- 函数 ----------------
//  -------- 剩余函数 ------------
function sum (x: number, ...restOfNumber: number[]){
    let result = x ;
    restOfNumber.forEach(value => result += value);
    return result
}
let result9 = sum(1, 2, 3, 4, 5, 6, 7, 8);
console.log(result9);

let result10 = sum(2);
console.log(result10);

let result11 = sum(2,5);
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
