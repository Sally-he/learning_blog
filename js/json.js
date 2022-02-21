/**
* @author: zhiyu.he
* @file: description
* @Date: 2021-10-11 11:32:42
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-10-11 17:58:51
 */

// 默认情况下数据是这样的
// let signInfo = [
//     {
//       fieldId: 539,
//       value: undefined
//     },
//     {
//       fieldId: 540,
//       value: undefined
//     },
//     {
//       fieldId: 546,
//       value: undefined
//     },
//   ]
  // 经过JSON.stringify之后的数据,少了value key,导致后端无法读取value值进行报错
  // 具体原因是`undefined`、`任意的函数`以及`symbol值`，出现在`非数组对象`的属性值中时在序列化过程中会被忽略
//   console.log(JSON.stringify(signInfo))
  // '[{"fieldId":539},{"fieldId":540},{"fieldId":546}]'
  
  
  const toJSON = {
      name: 'sally',
      toJSON(){
          return 'JSON.stringify';
      }
  }

//   console.log(JSON.stringify(toJSON)); // "JSON.stringify"

// 1.转换普通值
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

// 2.转换对象、数组
JSON.stringify({x: 5, y: 6});
// "{"x":5,"y":6}"
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// '[1,"false",false]'
JSON.stringify({x: undefined, y: Object, z: Symbol("")});
// '{}'
JSON.stringify([undefined, Object, Symbol("")]);
// '[null,null,null]'

// 不可枚举的属性默认会被忽略：
JSON.stringify(
    Object.create(
        null,
        {
            x: { value: 'x', enumerable: false },
            y: { value: 'y', enumerable: true }
        }
    )
);
// "{"y":"y"}"

// 3.指定replacer函数
let signInfo = [
  {
    fieldId: 539,
    value: undefined
  },
  {
    fieldId: 540,
    value: undefined
  },
  {
    fieldId: 546,
    value: undefined
  },
];
console.log(JSON.stringify(signInfo, (key, value)=> {
  return value === undefined ? 'undefined': value
}));
 
