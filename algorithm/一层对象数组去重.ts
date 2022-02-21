/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-09-01 10:37:15
 * @LastEditors: zhiyu.he
 * @LastEditTime: 2021-09-01 19:18:54
 */
/**
 * 一层对象数组去重，首先对数组有一些限定条件
 * 1、数组中每一项均为Object, 不存在Primitive类型
 * 2、数组中每一项均为Object均为一层结构,不存在多层嵌套场景
 * 3、对象中每个key所对应的value,均为Primitive类型，不存在Date、Function等应用类型
 *
 * 由于数组本身为对象数组，不能通过简单的===来进行判断，所以对于重复项的判断，约定为：结构相同的两个对象会判定为重复对象（对象的key的数量，key的值，以及每个key对应的value的类型和值一致）
 * 示例： arr数组中的第一项和第二项，满足前面约定的结构相同，需要仅保留一项；数组中第二项和第四项，不满足结构相同，原因是a所对应的value的类型不一致
 */

const arr = [
  {
    a: 1,
    b: 2,
  },
  {
    b: 2,
    a: 1,
  },
  {
    c: 1,
  },
  {
    a: "1",
    b: 2,
  },
];

function objKeyIsSame(
  objOne: Record<string, number | string | null | undefined | boolean>,
  objTwo: Record<string, number | string | null | undefined | boolean>
) {
  const keyOne = Object.keys(objOne);
  const keyTwo = Object.keys(objTwo);
  if (keyOne.length !== keyTwo.length) {
    return false;
  }
  for (const key of keyOne) {
    if (objOne[key] === null && objOne[key] !== objTwo[key]) {
      return false;
    }
    if (!Object.is(objOne[key], objTwo[key])) {
      return false;
    }
  }
  return true;
}

function dropRepeat(
  arr: Array<Record<string, number | string | null | undefined | boolean>>
) {
  // 待补充
  let obj: Record<string, number | string | null | undefined | boolean> = {};
  const result = arr.reduce((cur, next) => {
    if (!objKeyIsSame(obj, next)) {
      obj = next;
      cur.push(next);
    }
    return cur;
  }, []);
  return result;
}


const replacer = (
  key: string,
  value: number | string | null | undefined | boolean
) => {
  if (typeof value === "object") {
    return value;
  }
  return typeof value === "undefined"
    ? "undefined"
    : `${value}_${typeof value}`;
};

function dropRepeat2(
  arr: Array<Record<string, number | string | null | undefined | boolean>>
) {
  // 待补充
  let obj: string = "";
  const result = arr.reduce((cur, next) => {
    let newObj: Record<string, number | string | null | undefined | boolean> =
      {};
    Object.keys(next)
      .sort()
      .map((key) => (newObj[key] = next[key]));
    if (obj !== JSON.stringify(newObj, replacer)) {
      obj = JSON.stringify(newObj, replacer);
      cur.push(next);
    }
    return cur;
  }, []);
  return result;
}

