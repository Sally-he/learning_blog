const animals = {};

let dog = {
    emoji: "dog"
};

let cat = {
    emoji: "cat"
};

animals[dog] = {
    ...dog,
    name: "Mara"
};

animals[cat] = {
    ...cat,
    name: "Sara"
};

console.log(animals[dog]); // { emoji: 'cat', name: 'Sara' }
/**
 * 原因: 对象作为key的时候，调用了toString
 **/