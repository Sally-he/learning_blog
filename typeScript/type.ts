//  基本类型
// Boolean: 与JavaScript一样，只有true/false
let isDone: boolean = false;
let isDone1: boolean = new Boolean(1); // 报错 Type 'Boolean' is not assignable to type 'boolean'.
let isDone2: boolean = Boolean(1);

// Number: 与JavaScript一样所有的数字都是浮点数，浮点数的类型是number，支持进制： 二进制、八进制、十进制、十六进制
let deciml: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String:表示文本类型数据，可以使用单引号(')和双引号(")表示字符串，也可使用模板字符串
let color: string = "blue";
color = 'red';

let fullName: string = 'Sally He';
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next year.`;

// Array: 两种方式定义数组，一种是number[],另一种是number[] 
let list: number[] = [1,2,3];
let list2: Array<number> = [1,2, 3];

// Tuple(元组): 允许表示一个已知类型的数组，各元素的类型不必相同
let x:[string, number];
x = ["hello", 10];
x = [10, "hello"]; //  报错  Type 'string' is not assignable to type 'number'.
console.log(x[0].substring(1));
console.log(x[1].substring(1)); // 报错 Property 'substring' does not exist on type 'number'.
x[3] = "world"; // 报错  Tuple type '[string, number]' of length '2' has no element at index '3'.
console.log(x[5].toString()); // 报错 Tuple type '[string, number]' of length '2' has no element at index '5'.

// Enum(枚举类型): 默认从0开始，是JavaScript标准类型的一个补充
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
console.log(c); // 1

enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;
console.log(c2); // 2

enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Green;
console.log(c3); // 2

enum Color4 {Red = 1, Green, Blue};
let colorName: String = Color4[2];
console.log(colorName); // Green

// Any(任意类型):可以用于不清楚类型的变量，
let notSure:any = 4;
notSure = "maybe a string instead";
notSure = false;

let notSure2:any = 4;
notSure2.ifItExists();
notSure2.toFixed();

let prettySure:Object = 4; 
prettySure.toFixed();// 报错 Property 'toFixed' does not exist on type 'Object'.

let list3: any[] = [1, true, "free"];
list3[1] = 100;
console.log(list3); // [1, 100, "free"]

// void(空值): 与 any 类型相反，表示没有任何类型，
function warnUser(): void {
    console.log("This is my warning message");
}
// 报错  Type '"This is my warning message"' is not assignable to type 'void'.
function warnUser2(): void { 
    return "This is my warning message";
}
let unusable: void = undefined;

// null and undefined
let u:undefined = undefined; // undefined
let n: null = null; // undefined

let u2:undefined = null; // null
let n2: null = undefined; // undefined

let num: number = undefined; // undefined
let nn: number = null; // null
 
let su: string = undefined; // undefined
let sn: string = null; // null

let bu: boolean = undefined; // undefined
let bn: boolean = null; // null

// Never: 表示的那些永不存在的类型
// Function returning never must have unreachable end point
function error(message: string):never {
    throw new Error(message);
}
// Inferred return type is never
function fail(){
    return error("something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop():never {
    while(true){

    }
}
// Object: 表示非原始类型，即除去 number，string，Boolean，symbol，null，undefined之外的类型
declare function create(o: object | null):void ;
create({age: 22});
create(null);
create(42); // 报错 Argument of type '42' is not assignable to parameter of type 'object'.
create("string"); // 报错 Argument of type '"string"' is not assignable to parameter of type 'object'.
create(false); // 报错 Argument of type 'false' is not assignable to parameter of type 'object'.
create(undefined); // 官网说报错，实际运行并没有报错

// Type assertions(类型断言)
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;

