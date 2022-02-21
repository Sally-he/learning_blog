/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-07-26 20:59:21
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-07-27 21:01:28
 */

let robot = function (command, obstacles, x, y) {
    const RIGHT = 'R'; // x 移动
    let map = new Map();
    let m = 0, // x 
        n = 0; // y
    map.set('00', 1); // 初始化原点

    //记录指令的路线
    for (const step of command) {
        step === RIGHT ? m++ : n++;
        map.set(m + '' + n, 1)
    }
    // 判断终点是否在线上
    if (!inline(x, y, map, m, n)) {
        return false;
    }
    // 是否有障碍
    for (const item of obstacles) {
        let [a, b] = item;
        if (a <= x && b <= y && inline(a, b, map, m, n)) {
            return false
        }
    }
    return true
}

// 
function inline(x, y, map, m, n) {
    if (map.has(x + '' + y)) {
        return true;
    }
    const scale = Math.floor(x / m);
    let [a, b] = [x - scale * m, y - scale * n];
    if (map.has(a + '' + b)) {
        return true;
    }
    return false;
}