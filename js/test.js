/**
* @author: zhiyu.he
* @file: description
* @Date: 2021-09-13 16:48:56
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-13 17:29:18
 */


// var fn;
// function foo(){
//     var a = 2;
//     function baz(){
//         console.log(a)
//     }
//     fn = baz;
// }

// function bar(){
//     fn();
// }

// foo();
// bar();

// demo03
// function foo() {
//     var a = 2;
  
//     return function bar() {
//       var b = 9;
  
//       return function fn() {
//         console.log(a, b);
//       }
//     }
//   }
  
//   var bar = foo();
//   var fn = bar();
//   fn();

// demo05
(function () {

    var a = 10;
    var b = 20;
  
    var test = {
      m: 20,
      add: function (x) {
        return a + x;
      },
      sum: function () {
        return a + b + this.m;
      },
      mark: function (k, j) {
        return k + j;
      }
    }
  
    window.test = test;
  
  })();
  
  test.add(100);
  test.sum();
  test.mark();
  
  var _mark = test.mark;
  _mark();