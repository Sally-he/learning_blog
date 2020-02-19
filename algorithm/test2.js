// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
Array.from(new Set(arr.flat(Infinity).sort((a, b)=> {return a - b})))
