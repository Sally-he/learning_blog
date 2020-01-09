### Histroy 与 Location 对象
> MDN 解释： History接口允许操作浏览器曾经在标签也或者框架里面访问的会话历史记录。
1. Histroy API 
   > DOM window 对象通过 history 对象提供了对浏览器的会话历史的访问(不要与 WebExtensions history搞混了)。它暴露了很多有用的方法和属性，允许你在用户浏览历史中向前和向后跳转，同时——从HTML5开始——提供了对history栈中内容的操作。
   - `在 HTML4 的时候我们已经能够操纵浏览历史向前或向后跳转了；当时，我们能够使用的属性和方法有下面这些：`
   - `window.history.length`: 返回当前对话浏览过的页面数量
   - `window.history.go(?delta)`: 接受一个整数作为参数，按照当前页面在会话浏览历史记录中的位置为基准进行移动。如果参数为 `0 、 undefined、null、 false`，将刷新页面，相当于执行`window.location.reload()`。 如果在运行这个方法的过程中，发现移动后会超过会话浏览历史记录的边界，将没有任何效果，并且也不会报错
   - `window.history.back()`: 移动到上一页，相当于点击浏览器的后退按钮，等价与`window.history.go(-1)`
   - `window.history,forward()`: 移动到上一页,相当于点击浏览器的前进按钮，等价与`window.history.go(1)`
   - > `window.history.back()` 和 `window.history,forward()`都是通过`window.history.go(?delta)`实现的，因此如果没有上一页或者下一页，则表示超过边界，处理的方式和`window.history.go(?delta)`是一样的
   > `HTML4 的时候并没有能够改变 URL 的 API；但是，从 HTML5 开始，History API 新增了操作会话浏览历史记录的功能。以下是新增的属性和方法：`
   - `window.history.state`: 这个参数是只读，表示与会话浏览器历史的当前记录相关联的状态对象
   - `window.history.pushState(data, title, ?url)`: 在会话浏览历史记录中添加一条记录。以下是方法的参数详情：
     - `data`(状态对象): 是一个能被序列化的任何东西，例如object、array、string、null等。为来方便用户重新载入时使用，状态对象会在序列化之后保存在本地；此外，序列化之后的状态对象根据浏览器的不同有不一样的大小限制（注意： 规范并没有说需要限制大小，如果超出，将会抛出异常） 
     - `title`(页面标题)：当前所有的浏览器都会忽略这个参数，因此可以设置为空字符串
     - `url`(页面地址)：如果新的URL不是绝对的路径，那么将会相对与当前的URL处理，并且新的URL必须与当前URL同源，否认将抛出错误。另外，该参数是可选的，默认为当前页面地址
   - `window.history.replaceState(data, title, ?url)`: 与`window.history,pushState(data, title, ?url)`类似，区别在与replaceState将修改会话历史的当前记录，而不是新增一条记录，
     - > 但是，需要注意： 调用 pushState 和 replaceState 方法之后, 地址栏会更改URL，却不会立即加载新的页面，等到用户重新载入时，才会真正的进行加载。因此，同源的目的是为来防止恶意代码让用户自己处于另一个页面。
   - `popstate` 事件
     - 每当用户导航会话浏览历史的记录时，就会触发 `popstate` 事件；例如，用户点击浏览器的倒退和前进按钮；当然这些操作在 JavaScript 中也有对应的 `window.history.back()`、`window.history.forward()` 和 `window.history.go(?delta)` 方法达到同样的效果。
     - 如果导航到的记录是由 `window.history.pushState(data, title, ?url)` 创建或者 `window.history.replaceState(data, title, ?url)` 修改的，那么 `popstate` 事件对象的 `state` 属性将包含导航到的记录的状态对象的一个 拷贝。
     - 另外，如果用户在地址栏中手动修改 hash 或者通过写入 `window.location.hash` 的方式来 模拟用户 行为，那么也会触发 `popstate` 事件，并且还会在会话浏览历史中新增一条记录。需要注意的是，在调用 `window.history.pushState(data, title, ?url)` 时，如果 url 参数中有 hash，并不会触发这一条规则；因为我们要知道，`pushState`只是导致会话浏览历史的记录发生变化，让地址栏有所反应，并不是 用户导航 或者通过脚本来 模拟用户 的行为。
   - 获取当前状态对象
     - 在介绍 HTML5 中 history 对象新增的属性和方法时，有说道 window.history.state 属性，通过它我们也能得到 popstate 事件触发时获取的状态对象。
     - 在用户重新载入页面时，popstate 事件并不会触发，因此，想要获取会话浏览历史的当前记录的状态对象，只能通过 window.history.state 属性。
2. Location对象
   - Location 对象提供来URL相关的信息和操作方法，通过`document.location` 和 `window.location` 属性都能访问这个对象
   - History API 和 Location 对象实际上是通过地址栏中URL关联的，因为Location对象的值始终与地址栏中URL保持一直，所以当我们操作会话浏览历史的记录时，Location 对象也会随之更改。当然，我们修改 Location 对象，也会触发浏览器执行相应操作并且改变地址栏中的 URL。
   - 属性
     - `window.location.href`: 获取完整的URL
     - `window.location.protocal`: 当前URL的协议，包括：`https:` 、`http:` 等
     - `window.location.host`: 主机名和端口好，如果端口号是 `80（http`或者 `443（https)`, 就会省略端口号，因此只会包含主机名；
     - `window.location.hostname`: 主机名
     - `window.location.port`: 端口号
     - `window.location.pathname`: URL 的部分路径，从`/`开始
     - `window.location.seach`: 查询参数，从`?`开始
     - `window.location.hash`: 片段标识符，从`#` 开始
     - `window.location.username`: 域名前的用户名
     - `window.location.password`: 域名前的密码
     - `window.location.origin`: 只读，包含URL的协议、主机名和端口号
     - 注意： 除了`window.location.origin`之外，其他属性可读写；因此改变属性的值能让页面做出响应的变化。
   - 方法
     - `window.location.assign(url)`:接受一个URL字符串作为参数，使得浏览器立即跳转到新的URL（当前标签页）
     - `window.location.replace(url)` 方法与 `window.location.assign(url)` 实现一样的功能，区别在于 replace 方法执行后跳转的 URL 会 覆盖 浏览历史中的当前记录，因此原先的当前记录就在浏览历史中 删除 了
     - `window.location.reload(boolean)`方法使得浏览器重新加载当前URL，如果该方法没有接受值或值为`false`，那么相当于用户点击浏览器的刷新按钮，将导致浏览器拉取缓存中的页面。 当然，如果没有缓存，那就会像执行`window.location.reload(true)` 一样，重新请求 页面。
   - 
3. 参考链接
   - [Manipulating the browser history](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)
   - [HTML5 History API 和 Location 对象剖析](https://hijiangtao.github.io/2017/08/20/History-API-and-Location-Object/)
   - [【深入吧，HTML 5】 性能 & 集成 —— History API](https://juejin.im/post/5c5313905188257a4a7fbeab)
4. 