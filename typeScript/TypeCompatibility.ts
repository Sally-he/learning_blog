// interface Pet {
//     name: string;
// }

// class Dog {
//     name: string;
// }

// let pet: Pet;
// let dog = { name: 'orange', owner: 'Sally' };
// pet = dog;

// ---------------------------------------------
// interface Pet {
//     name: string;
// }
// let dog = { name: 'orange', owner: 'Sally' };

// function greet(pet: Pet){
//     console.log(`Hello ${pet.name}`);
// }

// greet(dog);

// ---------------------------------------------
// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;

// y = x;
// x = y; // Error


// let items = [1,2,3];
// items.forEach((item, index, array) => console.log(item));

// items.forEach(item => console.log(item));

// ---------------------------------------------

// emun EventType {
//     Mouse,
//     Keyboard
// }

// ---------------------------------------------
// 类型兼容性
// let str: string = 'hello';
// let num: number = 123;

// // Error: 不能将类型“number”分配给类型“string”。
// str = num;
// // Error: 不能将类型“string”分配给类型“number”。
// num = str;


// let a: any = '123';
// let b: unknown = 123;
// b = a; // OK 

// ---------------------------------------------
// 安全性
// let foo: any = 25.123456;
// foo = 'hello';
// foo.toPrecision(2); 
// console.log(foo.toPrecision(2));


// ---------------------------------------------
// 结构化
// interface Point {
//     x: number;
//     y: number;
// }

// class Point2D {
//     constructor(public x: number, public y: number) { }
// }

// let p: Point;

// p = new Point2D(2, 1); // OK


// interface Point2D {
//     x: number;
//     y: number;
// }
// interface Point3D {
//     x: number;
//     y: number;
//     z: number;
// }

// const point2D: Point2D = { x: 1, y: 2 };
// const point3D: Point3D = { x: 1, y: 2, z: 3 };

// function takePoint2d(p: Point2D) {
//     console.log(p.x);
//     console.log(p.y);
// }

// takePoint2d(point2D); // 完全匹配
// takePoint2d(point3D); // 额外的信息，没关系
// takePoint2d({ x: 1 }); // 错误，没有y属性
// takePoint2d({ x: 1, y: 2, z: 3 }); // 错误，z不存在

// 参数数量
// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;

// y = x; // OK
// x = y; // error: 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”


// 可选和reset 
// let foo = (x?: number, y?: number) => { };
// let bar = (x: number, y: number) => { };
// let bas = (...args: number[]) => { };

// bar = foo; // ok
// bas = foo; // ok
// foo = bas; // ok
// foo = bar; // ok
// bas = bar; // ok
// bar = bas; // ok





// ---------------------------------------------
// 变体

// 函数参数类型
// interface Event {
//     timestamp: number;
// }

// interface MouseEvents extends Event {
//     x: number;
//     y: number;
// }

// interface KeyEvents extends Event {
//     keyCode: number;
// }

// enum EventType {
//     Mouse,
//     Keyboard
// }

// function addEventLister(event: EventType, handler: (n: Event) => void) {
//     // ...
// }

// addEventLister(EventType.Mouse, (e: MouseEvents) => console.log(e.x + ',' + e.y));

// ---------------------------------------------
// 类
// class Animal {
//     feet: number;
//     constructor(name: string, numFeet: number) { }
// }

// class Size {
//     feet: number;
//     constructor(meters: number) { }
// }

// let a: Animal;
// let s: Size;

// a = s;
// s = a;

// -------------
// class Animal {
//     protected feet: number;
// }

// class Cat extends Animal { }

// let animal: Animal;
// let cat: Cat;

// animal = cat; 
// cat = animal;

// class Size {
//     protected feet: number;
// }

// let size: Size;
// animal = size;
// size = animal;


// -------------
// interface Empty<T> {
//     data: T;
// }

// let x: Empty<number>;
// let y: Empty<string>;

// x = y;

// --------------------------
// 枚举

// enum EventType {
//     Mouse,
//     Keyboard
// }

// enum Color {
//     Red,
//     Green,
//     Blue,
//     White
// }

// let events = EventType.Keyboard;
// let color = Color.Green;

// events = color; //  Error: 不能将类型“Color.Green”分配给类型“EventType”

// --------------------------
// class

// class Animal {
//     protected name: string;
//     constructor(name: string, feet: number) { }
// }

// class Cat extends Animal {
// }

// let animal: Animal;
// let cat: Cat;

// animal = cat; // ok
// cat = animal; // ok

// class Dog {
//     protected name: string;
//     constructor(name: string) { }
// }
// let dog: Dog;

// animal = dog; // error: 不能将类型“Dog”分配给类型“Animal”。属性“name”受保护，但类型“Dog”并不是从“Animal”派生的类
// dog = animal; // error: 不能将类型“Animal”分配给类型“Dog”。属性“name”受保护，但类型“Dog”并不是从“Animal”派生的类
// dog = cat; // 不能将类型“Cat”分配给类型“Dog”

// --------------------------
// 泛型
// interface Empty<T> {
//     data: T;
// }

// let x: Empty<number>;
// let y: Empty<string>;

// x = y; // 不能将类型“Empty<string>”分配给类型“Empty<number>”。不能将类型“string”分配给类型“number”


// let identity = function<T>(x: T): T {
// };

// let reverse = function<U>(y: U): U {
// };

// identity = reverse; // ok, 因为 `(x: any) => any` 匹配 `(y: any) => any`


// class List<T> {
//     add(val: T) { }
// }

// class Animal {
//     name: string;
// }
// class Cat extends Animal {
//     run() {
//         // ..
//     }
// }

// const animals = new List<Animal>();
// animals.add(new Animal()); // ok
// animals.add(new Cat()); // ok

// const cats = new List<Cat>();
// cats.add(new Animal()); // Error: 类型“Animal”的参数不能赋给类型“Cat”的参数。类型 "Animal" 中缺少属性 "run"，但类型 "Cat" 中需要该属性。
// cats.add(new Cat()); // ok


