<!--
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-08-17 18:55:38
 * @LastEditors: zhiyu.he
 * @LastEditTime: 2021-08-18 16:11:09
-->
1. Array.from(): 类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
    ```
   let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
    };
    Array.from(arrayLike);  // ['a', 'b', 'c']
   ```
2. Array.of: 用于将以一组值，转换为数组
    ```
    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]
    Array.of(3).length // 1
    ```
3. Array.fill: 给定值，填充一个数组，接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
    ```
    ['a','b','c'].fill(7); // [ 7, 7, 7 ]
    new Array(3).fill(6); // [ 6, 6, 6 ]
    ['a', 'b', 'c'].fill(7, 1, 2); // [ 'a', 7, 'c' ]
    ```
4. 数组实例的 entries()，keys() 和 values()
    ```
    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
        console.log(elem);
    }
    // a
    // b

    for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
    }
    // 0 a
    // 1 b

    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next()); // { value: [ 0, 'a' ], done: false }
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']
    ```
5. 数组实例的 flat()，flatMap(): 对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组 
    ```
    [1, 2, [3, 4]].flat();
    // [ 1, 2, 3, 4 ]

    [1, 2, [3, [4, 5]]].flat(); // 默认只会“拉平”一层
    // [ 1, 2, 3, [ 4, 5 ] ]

    [1, 2, [3, [4, 5]]].flat(2);
    // [ 1, 2, 3, 4, 5 ]

    [1, [2, [3]]].flat(Infinity); // 不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
    // [ 1, 2, 3 ]

    [1, 2, , 4, 5].flat();  // 原数组有空位，flat()方法会跳过空位。
    // [ 1, 2, 4, 5 ]

    // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
    [2, 3, 4].flatMap(x => [x, x * 2]);
    // [ 2, 4, 3, 6, 4, 8 ]

    // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
    [1, 2, 3, 4].flatMap(x => [
    [x * 2]
    ]);
    // [ [ 2 ], [ 4 ], [ 6 ], [ 8 ] ]
    ```
6. 对象的属性的可枚举性和遍历
    - 可枚举性： 对象的每一个属性
7. 
  

