// class USD {
//     private __nominal: void;
//     constructor(public value: number) { };
// }

import { Expression } from "typescript";

// class EUR {
//     private __nominal: void;
//     constructor(public value: number) { };
// }

// const usd = new USD(10);
// const eur = new EUR(10);

// function gross(net: USD, tax: USD) {
//     return { value: net.value + tax.value } as USD;
// }

// gross(usd, usd); // ok
// gross(eur, usd); // Error: 类型“EUR”的参数不能赋给类型“USD”的参数。类型具有私有属性“__nominal”的单独声明

// ------------------------------------------------------------------------------------------------------
// const refSymbol = Symbol.for('key');
// const refSymbol2 = Symbol.for('key');

// interface USD {
//     [refSymbol]: void;
//     value: number;
// }

// interface EUR {
//     [refSymbol2]: void;
//     value: number;
// }

// let usd: USD = { value: 10 } as USD;
// let eur: EUR = { value: 10 } as EUR;

// function gross(net: USD, tax: USD) {
//     return { value: net.value + tax.value } as USD;
// }

// gross(usd, usd); // ok
// gross(eur, usd); // Error: 类型“EUR”的参数不能赋给类型“USD”的参数。类型 "EUR" 中缺少属性 "[refSymbol]"，但类型 "USD" 中需要该属性。

// ------------------------------------------------------------------------------------------------------
// class Currency<T extends string> {
//     private as: T;
// }

// type USD = number & Currency<"USD">
// type EUR = number & Currency<"EUR">

// const usd = 10 as USD;
// const eur = 10 as EUR;

// function gross(net: USD, tax: USD) {
//     return (net + tax) as USD;
// }

// gross(usd, usd); // ok
// gross(eur, usd); // Error: Type '"EUR"' is not assignable to type '"USD"'.

// ------------------------------------------------------------------------------------------------------

// class Currency<T extends string> {
//     private as: T;
// }

// type USD = number & Currency<"USD">
// type EUR = number & Currency<"EUR">
// function ofUSD(value: number) {
//     return value as USD;
// }

// function ofEUR(value: number) {
//     return value as EUR;
// }

// const usd = ofUSD(10);
// const eur = ofEUR(10);

// function gross(net: USD, tax: USD) {
//     return ofUSD(net + tax);
// }


// ------------------------------------------------------------------------------------------------------

type Brand<K, T> = K & { __brand: T }

type USD = Brand<number, "USD">
type EUR = Brand<number, "EUR">

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
    return (net + tax) as USD;
}

gross(usd, usd); // ok

// 类型“EUR”的参数不能赋给类型“USD”的参数。不能将类型“EUR”分配给类型“{ __brand: "USD"; }”。属性“__brand”的类型不兼容。不能将类型“"EUR"”分配给类型“"USD"”
gross(eur, usd); 
