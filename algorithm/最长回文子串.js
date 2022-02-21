/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-09-08 16:39:03
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-08 17:16:34
 */

/**
 * 暴力解法
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let len = s.length;
    for (let i = 0; i < len / 2; i++) {
        if (s.charAt(i) !== s.charAt(len - i - 1)) {
            return false;
        }
    }
    return true;
};

function getAllSubString(s) {
    if (s.length < 2) {
        return s;
    }
    let result = '',
        max = 0,
        len = s.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j <= len.length; j++) {
            const ele = s.substring(i, j);
            if (longestPalindrome(ele) && ele.length() > max) {
                result = s.substring(i, j);
                max = Math.max(max, result.length);
            }
        }

    }
    return result;
}

/**
 * 解法2
 * @param {}} s 
 * @returns 
 */
function longestPalindrome2(s) {
    if (s.length < 2) {
        return s
    }
    let start = 0,
        end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, 1),
            len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len1);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end);
}

function expandAroundCenter(s, left, right) {
    let L = left,
        R = right;
    while (L >= 0 && R < s.length && s.charAt(L) == s.charAt(R)) {
        L--;
        R--;
    }
    return R - L - 1;
}