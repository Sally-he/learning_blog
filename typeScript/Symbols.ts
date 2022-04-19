// let  sym1 = Symbol();

// import { type } from "os";

// let sym2 = Symbol('key');

//---------------------------------------------
// let sym3 = Symbol('key');

// sym2 === sym3; // false

// const sym = Symbol();

// let obj = {
//     [sym]: 'value'
// };

// console.log(obj[sym]); // value

//---------------------------------------------
// const getClassNameSymbol = Symbol();

// class C {
//     [getClassNameSymbol]() {
//         return 'C';
//     }
// }

// let c = new C();
// let className = c[getClassNameSymbol]();


// console.log(c);
// console.log(className);

//---------------------------------------------
// declare const sym1: unique symbol;

// const sym2: unique symbol = Symbol();

// let sym3: typeof sym1 = sym1;
// let sym4: typeof sym1 = sym1;

// class C {
//     static readonly StaticSymbol: unique symbol = Symbol();
// }

// console.log(sym3 === sym2);
// console.log(sym3 === sym4);

//---------------------------------------------

// const key: symbol = Symbol();
// const symbolHasInstance: symbol = Symbol.hasInstance;


//---------------------------------------------
// const s0: symbol = Symbol();
// const s1: symbol = Symbol.for('foo');
// const s2: symbol = Symbol.hasInstance;
// const s3: symbol = Symbol.isConcatSpreadable;
// const s4: symbol = s0;
// const s4: unique symbol = Symbol();

// interface Foo {
//     [s2]: string;
//     [s4]: string;
// }

// ---------------------------------------------

// const a: unique symbol = Symbol();
// interface WithUniqueSymbol {
//     readonly b: unique symbol;
// }
// class C {
//     static readonly c: unique symbol = Symbol();
// }

// ---------------------------------------------
// const s0: unique symbol = Symbol();
// const s1: unique symbol = Symbol.for('foo');

// const s2: unique symbol = s0; // error: Type 'typeof s0' is not assignable to type 'typeof s2'.
// const s3: unique symbol = Symbol.for('foo');


// ---------------------------------------------

// error: 类型为 "unique symbol" 的变量必须为 "const"。
// let a: unique symbol = Symbol.for('same');

// error: 类型为 "unique symbol" 的变量必须为 "const"。
// let b: unique symbol = Symbol.for('same');

// if(a === b){
//     console.log('same');
// }

// ---------------------------------------------
// export const FOO = Symbol('FOO');
// export const BAR = Symbol('BAR');

// interface Thing {
//     [FOO]: boolean;
//     [BAR]: number;
// }

// const thing: Thing = undefined;
// console.log(thing);

// const foo = thing[FOO];
// const bar = thing[BAR];

// console.log(foo, bar);

// ---------------------------------------------
// export type FOO = string & { FOO: true };
// export const F00: FOO = Symbol('FOO') as symbol;

// const NEVER: never = Symbol("Never?");


// const Foo = Symbol("foo");
// type Foo = typeof Foo;

// typeof Symbol('foo') === symbol

// export const FOO: unique symbol = Symbol('FOO');
// export const BAR: unique symbol = Symbol('BAR');

// export function onlyFOO(value: typeof FOO): void {
//    // ...
// }

// onlyFOO(FOO); // ✔️ 
// onlyFOO(BAR); // 

// export const FOO: unique symbol = Symbol('FOO');
// export type FOO = typeof FOO;


// ---------------------------------------------
// const ACADEMIC_TITLE = Symbol('title')
// const ARTICLE_TITLE = Symbol('title')

// if(ACADEMIC_TITLE ===  ARTICLE_TITLE) {

// }


// ---------------------------------------------

// Symbol.for('print');
// const user = {
//     name: 'Sally',
//     age: 25,
//     [Symbol.for('print')]: function() {
//         console.log(`${this.name} is (${this.age}) years old`);
//     }
// }

// JSON.stringify(user);
// user[Symbol.for('print')]();

// ---------------------------------------------

// const sym = Symbol('foo')

// function extendObject (obj: object, symbol: symbol, value: unknown){
//     obj[symbol] = value;
// }

// extendObject({}, sym, 'bar');

// console.log(sym)

// ---------------------------------------------

// type UserSignupDto = {
//     username: string;
//     password: string;
// }

// const staff: unique symbol = Symbol();
// type UserSignupCommand = UserSignupDto & {
//     [staff]?: boolean;
// }

// declare function deserialize(input: unknown): UserSignupDto;
// declare function signup(command: UserSignupCommand): Promise<void>{
//     if(command[staff]){
//         // console.log('->>>>>', command[staff].valueOf())
//     }
//     return Promise.resolve();
// }

// declare const requestBody: unknown;
// const userSignupDto = deserialize(requestBody);

// signup({
//     ...userSignupDto,
//     [staff]: false
// })




// const x: unique symbol = Symbol();
// const y: symbol = Symbol();

// interface Foo {
//     [x]: string;
//     [y]: string;
// }

// // 必须使用const声明
// const a: unique symbol = Symbol();

// interface WithUniqueSymbol {

//     // 必须使用readonly修饰符
//     readonly b: unique symbol;
// }

// class C {
//     // 必须使用static和readonly修饰符
//     static readonly c: unique symbol = Symbol();
// }


// const a: unique symbol = Symbol();
// const b: unique symbol = Symbol.for('same');

// // 错误：不能将类型“typeof a”分配给类型“typeof c”, a的类型与c的类型不兼容
// const c: unique symbol = a;

// // 错误：不能将类型“typeof b”分配给类型“typeof d”, d的类型与b的类型不兼容
// const d: unique symbol = b;

// // 
// const a: unique symbol = Symbol.for('same');
// const b: unique symbol = Symbol.for('same');

// 
// const a: unique symbol = Symbol();
// const b: unique symbol = Symbol();

// // 该条件永远为false
// if (a === b) {
//    console.log('code should not be executed');
// }

// ——————————————

// const a: unique symbol = Symbol();

// const b: symbol = a;

// a和b均为'symbol'类型，因为没有使用const声明
// let a = Symbol();
// let b = Symbol.for('');

// // c和d均为'unique symbol'类型
// const c = Symbol();
// const d = Symbol.for('');

// // e和f均为'symbol'类型，没有使用Symbol()或Symbol.for()初始化
// const e = a;
// const f = a;


const refSymbol: unique symbol = Symbol();
const refSymbol2 = Symbol();

interface USD {
    [refSymbol]: void;
    value: number;
}

interface EUR {
    [refSymbol2]: void;
    value: number;
}

let usd: USD = { value: 10 } as USD;
let eur: EUR = { value: 10 } as EUR;

function gross(net: USD, tax: USD) {
    return { value: net.value + tax.value } as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Error: 类型“EUR”的参数不能赋给类型“USD”的参数。类型 "EUR" 中缺少属性 "[refSymbol]"，但类型 "USD" 中需要该属性。