/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-08-23 10:54:26
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-08-23 10:57:00
 */

var fib = function (n) {
    let n1 = 0,
        n2 = 1,
        sum;
    for (let index = 0; index < n; index++) {
       sum = (n1 + n2) % 1000000007;
       n1 = n2;
       n2 = sum;
    }
    return n1;
}