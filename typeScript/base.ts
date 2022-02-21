// const message = "hello world";
// message.toLowerCase();
// // message();

// const user = {
//   name: "Sally",
//   age: 26,
// };

function greet(person: string, date: Date) {
  console.log(`Hello, ${person}, today is ${date.toDateString()}!`);
}

greet("Sally", new Date());

let myName = "Alice";

function getFavoriteNumber(): number {
  return 26;
}

const names = ["Alice", "Bob", "Eve"];
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

function printName(obj: { first: string; last?: string }) {
  console.log(obj.first + obj.last);
}

printName({ first: "Bod" });
printName({ first: "Alice", last: "Alison" });

function printEd(id: string | number) {
  // console.log(id.toUpperCase());
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

type Point = {
  x: number;
  y: number;
};
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

// Interface
// interface Animal {
//   name: string;
// }

// interface Bear extends Animal {
//   honey: boolean;
// }

// type
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

function getBear(data?: Bear): Bear {
  return {
    name: data.name || "",
    honey: data.honey || true,
  };
}
const bear = getBear();
bear.honey;
bear.name;

declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method as "GET");

const oneHundred: bigint = BigInt(100);

const firstName = Symbol("name");
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3;

function padLeft(padding: number | string, input: string): string {
  //   return " ".repeat(padding) + input;
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  }
  return values.map((x) => x * factor);
}

interface Container {
  value: number | null | undefined;
}
function multiplyValue(container: Container, factor: number) {
  if (container.value !== null) {
    console.log(container.value);
    container.value *= factor;
  }
}

let x = Math.random() < 0.5 ? 10 : "hello world";

function example() {
  let x: string | number | boolean;
  x = Math.random() < 0.5;

  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
  } else {
    x = 100;
    console.log(x);
  }

  return x;
}

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck = shape;
      return _exhaustiveCheck;
  }
}

function greeter(fn: (a: string) => void) {
  fn("Hello World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

type SomeContractor = {
  new (s: string): any;
};

function map<Input, OutPut>(
  arr: Input[],
  func: (arg: Input) => OutPut
): OutPut[] {
  return arr.map(func);
}

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");

// const notOk = longest(10, 100);

function minimumLength<Type extends { length: number }>(
  obj: Type,
  minium: number
) {
  if (obj.length >= minium) {
    return obj;
  } else {
    return {
      length: minium,
    };
  }
}

const arr = minimumLength([1, 2, 3], 6);

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1,3);

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
len("12");
len([1, 3, 4]);

const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = false;
  },
};

interface User {
  id: number;
  admin: boolean;
}
declare const getDB: () => DB;

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admin = db.filterUsers(function (this: User) {
  return this.admin;
});

type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};
const f2: voidFunc = () => true;
const f3: voidFunc = function () {
  return true;
};

interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age); // 42
writablePerson.age++;
console.log(readonlyPerson.age); // 43

interface StringArray {
  [index: number]: string;
}

// type StringNumberPair = [string, number];

function doSomething1(pair: [string, number]) {
  const a = pair[0];
  const b = pair[1];
}

interface StringNumberPair {
  length: 2;
  0: string;
  1: number;
}