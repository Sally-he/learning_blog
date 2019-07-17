## 基本类型
*  Boolean: 与JavaScript一样，只有true/false<br/>
<pre><code>
let isDone: boolean = false;<br/>
let isDone1: boolean = new Boolean(1); // 报错 Type 'Boolean' is not  assignable to type 'boolean'. <br/>
let isDone2: boolean = Boolean(1); <br/>
</code>
</pre>
<br/>
*  Number: 与JavaScript一样所有的数字都是浮点数，浮点数的类型是number，支持进制： 二进制、八进制、十进制、十六进制
<pre><code>
let deciml: number = 6;<br/>
let hex: number = 0xf00d;<br/>
let binary: number = 0b1010; <br/>
let octal: number = 0o744;<br/>
</code>
</pre>
<br/>
* String:表示文本类型数据，可以使用单引号(')和双引号(")表示字符串，也可使用模板字符串
<pre><code>
let color: string = "blue"; <br/>
color = 'red'; <br/>
<br/>
let fullName: string = 'Sally He'; <br/>
let age: number = 37; <br/>
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next year.`; <br/>
</code></pre>
<br/>
* Array: 两种方式定义数组，一种是number[],另一种是number[] 
<pre><code>
let list: number[] = [1,2,3]; <br/>
let list2: Array<number> = [1,2, 3]; <br/>
</code></pre>
<br/> 
*  Tuple(元组): 允许表示一个已知类型的数组，各元素的类型不必相同
<pre><code>
let x:[string, number]; <br/>
x = ["hello", 10]; <br/>
x = [10, "hello"]; //  报错  Type 'string' is not assignable to type 'number'. <br/>
console.log(x[0].substring(1)); <br/>
console.log(x[1].substring(1)); // 报错 Property 'substring' does not exist on type 'number'. <br/>
x[3] = "world"; // 报错  Tuple type '[string, number]' of length '2' has no element at index '3'. <br/>
console.log(x[5].toString()); // 报错 Tuple type '[string, number]' of length '2' has no element at index '5'. <br/>
</code></pre>
<br/>
*  Enum(枚举类型): 默认从0开始，是JavaScript标准类型的一个补充
<pre><code>
enum Color {Red, Green, Blue}; <br/>
let c: Color = Color.Green; <br/>
console.log(c); // 1 <br/>
<br/>
enum Color2 {Red = 1, Green, Blue}; <br/>
let c2: Color2 = Color2.Green; <br/>
console.log(c2); // 2 <br/>
<br/>
enum Color3 {Red = 1, Green = 2, Blue = 4}; <br/>
let c3: Color3 = Color3.Green; <br/>
console.log(c3); // 2 <br/>
<br/> 
enum Color4 {Red = 1, Green, Blue}; <br/>
let colorName: String = Color4[2]; <br/>
console.log(colorName); // Green <br/>
</code></pre><br/>

* Any(任意类型):可以用于不清楚类型的变量，
<pre><code>
let notSure:any = 4; <br/>
notSure = "maybe a string instead"; <br/>
notSure = false; <br/>
<br/>
let notSure2:any = 4; <br/>
notSure2.ifItExists(); <br/>
notSure2.toFixed();<br/>
<br/>
let prettySure:Object = 4;  <br/>
prettySure.toFixed();// 报错 Property 'toFixed' does not exist on type 'Object'. <br/>

let list3: any[] = [1, true, "free"]; <br/>
list3[1] = 100; <br/>
console.log(list3); // [1, 100, "free"] <br/>
</code></pre>
<br/>
* void(空值): 与 any 类型相反，表示没有任何类型，
<pre><code>
function warnUser(): void { <br/>
    console.log("This is my warning message"); <br/>
}<br/>
// 报错  Type '"This is my warning message"' is not assignable to type   'void'. <br/>
function warnUser2(): void {  <br/>
    return "This is my warning message"; <br/>
} <br/>
let unusable: void = undefined; <br/>
</code></pre>
<br/>
* null and undefined
<pre><code>
let u:undefined = undefined; // undefined <br/>
let n: null = null; // undefined <br/>
<br/>
let u2:undefined = null; // null <br/>
let n2: null = undefined; // undefined <br/>
<br/>
let num: number = undefined; // undefined <br/>
let nn: number = null; // null <br/>
 <br/>
let su: string = undefined; // undefined <br/>
let sn: string = null; // null <br/>
<br/>
let bu: boolean = undefined; // undefined <br/>
let bn: boolean = null; // null <br/>
</code></pre>
<br/>
* Never: 表示的那些永不存在的类型
<pre><code>
// Function returning never must have unreachable end point <br/>
function error(message: string):never { <br/>
    throw new Error(message); <br/>
}<br/>
// Inferred return type is never <br/>
function fail(){ <br/>
    return error("something failed"); <br/>
}<br/>
// Function returning never must have unreachable end point <br/>
function infiniteLoop():never { <br/>
    while(true){} <br/>
} <br/>
</code></pre>
<br/>
* Object: 表示非原始类型，即除去 number，string，Boolean，symbol，null，undefined之外的类型
<pre><code>
declare function create(o: object | null):void ; <br/>
create({age: 22}); <br/>
create(null); <br/>
create(42); // 报错 Argument of type '42' is not assignable to parameter of type 'object'. <br/>
create("string"); // 报错 Argument of type '"string"' is not assignable to parameter of type 'object'. <br/>
create(false); // 报错 Argument of type 'false' is not assignable to parameter of type 'object'. <br/>
create(undefined); // 官网说报错，实际运行并没有报错 <br/>
</code></pre>
<br/>
* Type assertions(类型断言)
<pre><code>
let someValue: any = "this is a string"; <br/>
let strLength: number = (<string>someValue).length; <br/>
<br/>
let someValue2: any = "this is a string"; <br/>
let strLength2: number = (someValue2 as string).length;<br/>

</code></pre>