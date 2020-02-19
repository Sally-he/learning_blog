![service worker](https://mdn.mozillademos.org/files/12632/sw-events.png)

1. Service Worker 介绍
 Service Worker(sw)主要是应用在富离线体验、消息推送、定时默认更新等功能；
 sw 是一段运行在浏览器后段的脚本，独立于页面，是一个worker,也可以理解为一个网络代理服务器。因此sw 是无法与DOM进行交互的，但是可以与js 主线程进行通信。

2. 实现的功能
   - 后台数据的同步
   - 从其他域获取资源请求
   - 接受计算密集型数据的更新，多页面共享该数据
   - 客户端编译与依赖管理
   - 后端服务的hook机制
   - 根据URL模式，自定义模版
   - 性能优化
   - 消息推送
   - 定时默认更新
   - 地理围栏
   - Http 请求的拦截，今儿实现离线也用，提升页面的性能体验
3.  应用
    1. service worker URL 通过 serviceWorkerContainer.register() 来获取和注册
    2. 如果注册成功，service worker 就在 ServiceWorkerGlobalScope 环境中运行； 这是一个特殊类型的 woker 上下文运行环境，与主运行线程（执行脚本）相独立，同时也没有访问 DOM 的能力。
    3. service worker 现在可以处理事件了。
    4. 受 service worker 控制的页面打开后会尝试去安装 service worker。最先发送给 service worker 的事件是安装事件(在这个事件里可以开始进行填充 IndexDB和缓存站点资源)。这个流程同原生 APP 或者 Firefox OS APP 是一样的 — 让所有资源可离线访问。
    5. 当 oninstall 事件的处理程序执行完毕后，可以认为 service worker 安装完成了
    6. 下一步是激活。当 service worker 安装完成后，会接收到一个激活事件(activate event)。 onactivate 主要用途是清理先前版本的service worker 脚本中使用的资源。
    7. Service Worker 现在可以控制页面了，但仅是在 register()  成功后的打开的页面。也就是说，页面起始于有没有 service worker ，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让 service worker 获得完全的控制
4. 生命周期
   - register （注册/获取） - >  install （oninstall安装）-> activate(onactivate 激活，并清理数据) -> 接收消息 (feetch/sync/push)
5. 参考
   1. [使用 Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
   2. [前端之路 - DRY](http://zhenhua-lee.github.io/http/service-worker.html)
   3. [Service worker 介绍](https://juejin.im/entry/59015d3c1b69e60058bb5cd9)