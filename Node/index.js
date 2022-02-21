/**
* @author: zhiyu.he
* @file: description
* @Date: 2021-08-25 17:45:16
* @LastEditors: zhiyu.he
* @LastEditTime: 2021-08-25 17:45:16
 */
(argv.ports)?.split(',').forEach((port) => {
    /** 启动server */
    server.start(port);
})