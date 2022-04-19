// 确定js 类型： Object.prototype.toString

function getPropsType(type) {
    return Object.prototype.toString.call(type).slice(8, -1);
}

// console.log(getPropsType(1));

// 循环遍历map数组方法
// 勿用 => ,  因为箭头函数没有自己的this对象
const myMap = function (fn, context) {
    let array = Array.prototype.slice.call(this);
    let resArr = Array();
    for (let i = 0; i < array.length; i++) {
        if (!array.hasOwnProperty(i)) continue;
        resArr[i] = fn.call(context, array[i], i, this);
    }
    return resArr;
}

Array.prototype.myMap = myMap;

// console.log([1, 2, 3].myMap(item => item * 2));

// https://juejin.cn/post/7083016475547533348
// 循环遍历filter 数组
const myFilter = function (fn, context) {


}