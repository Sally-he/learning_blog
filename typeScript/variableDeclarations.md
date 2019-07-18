 ### var 变量
 <pre>
 <code>
var a = 10; // 定义一个名 a 值为10 的变量

// 也可以在函数内部声明变量
function f(){
    var message = "hello world";
    return message;
}
// 也可以在函数内部访问相同的变量名
function f2(){
    var a = 10;
    return function g(){
        var b = a + 1;
        return b;
    }
}
var g = f2();
g(); // 11

function f3(){
    var a = 1;
    a = 2;

    var b= g();
    a = 3;
    return b;

    function g(){
        return a;
    }
}
f3(); // 2
</code>
</pre>
<br/>
###  Scoping rules(作用域)
<pre>
<code>
function f4(shouldInitialize: boolean){
    if(shouldInitialize){
        var x = 10;
    }
    return x;
}
f4(true); // 10
f4(false); // undefinded

//  使用for循环会覆盖变量i， 因为所有i都引用相同的函数作用域内的变量
function sumMatrix(matrix: number[][]){
    var sum  = 0;
    for(var i = 0; i < matrix.length; i++){
        var currentRow = matrix[i]
        for(var i =0; i < currentRow.length; i++){
            sum += currentRow[i];
        }
    }
    return sum
}
//  对应数组循环，其实可以使用forEach
function sumMatrix2(matrix: number[][]){
    var sum  = 0;
    matrix.forEach(item => {
        item.forEach(value => {
            sum += value
        })
    })
    return sum
}
</code>
</pre>
<br/>

*  Variable capturing quirks(捕获变量怪异之处)<br/>
<pre>
<code>
// 实际上传给 setTimeout 的每一个函数表达式实际上都引用了相同作用域里的同一个i
for(var i = 0; i< 10; i++ ){
    setTimeout(function (){
        console.log(i);
    }, 100 * i)
} // 输出 10 10 10 10 10 10 10 10 10 10

//  通常解决上面👆的问题，会使用闭包
for(var i = 0; i < 10; i++){
    (function(i){
        setTimeout(function (){
            console.log(i);
        }, 100 * i)
    })(i);
} // 输出 0 1 2 3 4 5 6 7 8 9
</code>
</pre>
<br/>
###  let
<pre>
<code>
let hello = "hello";

//  Block-scoping 块级作用域
function f5(input: boolean){
    let a = 100;
    if(input){
        let b= a + 1;
        return b;
    } 
    return b; // 报错 Cannot find name 'b'
}
//  catch 中同样有作用域规则
try{
    throw "oh, no!";
}catch(e){
    console.log("oh, well.")
}
console.log(e);// 报错 Cannot find name 'e'.
</code>
</pre>
<br/>
* 块级作用域的另一个特点是，不能在声明之前被读或写 <br/>
<pre>
<code>
a ++ ;
let a; // Duplicate identifier 'a'.

function foo(){
    return test;
}
//  不能再‘test’被声明前调用，运行时抛异常
foo();
let test ;
</code>
</pre>
*  Re-declarations and Shadowing(重定义及屏蔽) <br/>
<pre>
<code>
// 使用var声明时，不管声明多次，只会得到一次
function f6(){
    var x;
    var x ;
    if(true){
        var x;
    }
}
let x = 10;
let x = 20; // 报错 Cannot redeclare block-scoped variable 'x'.

function f7(x){
    let x = 10; // 报错  Duplicate identifier 'x'.
}
function g(){
    let x = 100; // 报错 Cannot redeclare block-scoped variable 'x'.
    var x = 100; // 报错 Cannot redeclare block-scoped variable 'x'.
}

function f8(condition, x){
    if(condition){
        let x = 100;
        return  x;
    }
    return x;
}
f8(false, 0); // 0
f8(true, 0); // 100

function sumMatrix3(matrix: number[][]){
    var sum  = 0;
    for(let i = 0; i < matrix.length; i++){
        var currentRow = matrix[i]
        for(let i =0; i < currentRow.length; i++){
            sum += currentRow[i];
        }
    }
    return sum
} // 10 10 10 10 10 10 10 10 10 10 
</code>
</pre>
<br/>
###  const 
<pre>
<code>
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}
kitty = { // 报错 Cannot assign to 'kitty' because it is a constant.
    name: "Danielle",
    numLives: numLivesForCat,
}

kitty.name = "Toary";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives -- ;
</code>
</pre>
<br/>
###   Destructuring(解构) <br/>
<pre>
<code>
let input = [1,2];
let [first, second] = input; // first = input[0] sencond = input[1]
console.log(first); // 1
console.log(second); // 2

function f9([first, sencond]: [number,number]){
    console.log(first);
    console.log(sencond);
}
f9(input);

let [first, ...rest] = [1,2,3,4];
console.log(first); // 1
console.log(rest); // 2,3,4
</code>
</pre>
<br/>
*  对象的解构 <br/>
<pre>
<code>
let o = {
    a: "foo",
    b: 12,
    c: "bar"
}
let {a, b} = o;
console.log(a); // foo
console.log(b);  // 12

// 属性重命名
let {a: newName1, b: newName2} = o;
let {a,b}: {a: string, b: number} = o;

// 默认值，属性为undefined时使用缺省值
function keepWholeObject(wholeObject: {a: string, b?: number}){
    let {a, b = 1001} = wholeObject;
}
</code>
</pre>
### let vs const
* 两种作用域相似的声明方式，具体使用哪个依赖情况而定
* 使用最小权原则

