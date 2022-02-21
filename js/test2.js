/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-09-17 18:27:18
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-09-29 16:18:11
 */
// 假设当前环境仅存在两个线程，browser和worker
// 两个环境在初始化时都会自动引入common.js这个模块
// 两个环境中均存在一个名叫postMessage的全局方法，在browser线程中调用时，消息自动发送到worker线程，反之同理
// 两个环境中均可通过类似globalThis.addEventListener('message', () => {})注册消息接收到来自另一个线程中postMessage所传递的信息
// 现要求补充rpc方法体的实现，满足如下场景：

// 各个线程单独处理各自的函数
const handler = (methodTarget, params) => {
    const methodArr = methodTarget.splice(".");

    let index = 0, len = methodArr.length,
        data = this;

    while (index !== len) {
        if (data[methodArr[index]]) {
            index++;
            data = data[methodArr[index]];
            if (index === len - 1) {
                return data.bind(this, params);
            }
        } else {
            return new Error("function not exit");
        }
    }
};

// common.js
globalThis.rpc = (methodTarget, params) => {
    // 向另一线线程发送消息，以调用其method
    postMessage({
        methodTarget,
        params
    }, "*");

    let browserCallback = null;
    return new Promise((resolve, reject) => {
        globalThis.addEventListener(
            "message",
            (browserCallback = (e) => {
                const { data } = e;
                resolve(data);
                globalThis.removeEventListener("message", browserCallback);
            })
        );
    });
};

// browser thread
globalThis.a = {
    count: 1,
    add(num) {
        this.count += num;
        return this.count;
    },
};
let eventListener = null;
globalThis.addEventListener(
    "message",
    (eventListener = (e) => {
        const { methodTarget, params } = e;
        const result = handler(methodTarget, params);
        postMessage(result, "*");
        globalThis.removeEventListener("message", eventListener);
    })
);

// worker thread
(async () => {
    const result = await rpc("a.add", 2);
    console.log(result);
    // 3
    const result = await rpc("a.add", 2);
    console.log(result);
    // 5
});


declare function poseMessage(message: any): void;

const callbackMap: Record<string, undefined | ((value: any) => void)> = {};
let id = 0;

globalThis.rpc = (methodTarget: string, params: any) => {
    return new Promise((resolve) => {
        id++;
        callbackMap[id] = resolve;
        poseMessage({
            id,
            data: {
                methodTarget,
                params,
            },
            type: 'send',
        });
    });
}

globalThis.addEventListener('message', async (msg: any) => {
    const {
        id,
        data,
        type,
    } = msg;
    if (type === 'send') {
        const { methodTarget, params } = data;
        const fn = new Function('params', `return globalThis.${methodTarget}(params})`);
        const result = await fn(params);
        poseMessage({
            id,
            data: result,
            type: 'receive',
        });
    } else {
        callbackMap[id]?.(data);
        callbackMap[id] = undefined;
    }
});