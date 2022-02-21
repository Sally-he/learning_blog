/**
* @author: zhiyu.he
* @file: description
* @Date: 2021-09-07 18:43:07
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-07 18:51:00
 */

var lengthOfLongestSubstring = function(s) {
    const repeat = new Set();
    const n = s.length;

    let rk = -1, repeatLen = 0;
    for (let index = 0; index < s.length; ++index) {
        console.log(repeat);
        if(index !== 0){
            repeat.delete(s.charAt(index - 1))
        }

        while (rk + 1 < n && !repeat.has(s.charAt(rk + 1))){
            repeat.add(s.charAt(rk + 1));
            ++rk;
        }
        repeatLen = Math.max(repeatLen, rk - index + 1)
    }
    return repeatLen;
};