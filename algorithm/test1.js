// 已知数据结构users，请实现语法支持user.unique能够按照name字段去重，并输出结构为：["a","b"]
var users = [{
    id: 1,
    name: "a"
}, {
    id: 2,
    name: "a"
}, {
    id: 3,
    name: "b"
}, {
    id: 4,
    name: "v"
}]

Array.prototype.unique = function(){
    this.map( item =>{
        this[item.id - 1] = item.name
    });
    return Array.from(new Set(this));
}
console.log(users.unique())