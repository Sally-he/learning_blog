/**
* @author: zhiyu.he
* @file: description
* @Date: 2021-09-02 14:34:11
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-02 15:09:37
 */


/**
 * 找到数组中重复的元素
 */
const arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];

function duplicates(arr) {
   let result = [];
   arr.forEach((key, value) => {
       if(arr.indexOf(value) !== arr.lastIndexOf(value) && result.indexOf(value) === -1){
           result.push(value);
       }
   }); 
   return result;
}

function duplicates2(arr) {
    return arr.filter((value, index) => arr.lastIndexOf(value) !== index && index === arr.indexOf(value));
}
