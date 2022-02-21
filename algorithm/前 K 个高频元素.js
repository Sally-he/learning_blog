/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-09-02 15:21:27
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-02 16:22:45
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

let topKFrequent = function (nums, k) {
    let map = new Map();
    nums.forEach(value => {
        map.set(value, ((map.get(value) || 0) + 1))
    });
    return [...map.keys()].sort((a, b)=> map.get(b) - map.get(a)).slice(0, k);
};

console.log(topKFrequent([1,1,1,2,2,3], 2));