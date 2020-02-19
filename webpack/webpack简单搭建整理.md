### webpack 简单搭建及整理
> 主要是用于熟悉 webpack ，实际上用的是项目搭建: yarn + webpack + vue<br/>
> 选择yarn的原因： 1.安装更快； 2.安装版本统一； 3.更简洁输出； 4.更好的语义化 <br/>

- 接下来就是项目的简单搭建
> 在此之前需要安装 `yarn` `node`; macOS系统，可以使用 `brew install yarn`,`brew install node` 进行安装<br/>
1. 项目初始化
   - 新建目录，并初始化
        <pre>yarn init</pre>
   - 安装webpack,其中 webpack 是运行在node 的环境的
        <pre>yarn add webpack webpack-cli</pre>
   - 然后在项目中，新建 `src/main.js`, 可以写一些测试代码
       <pre>console.log('this is test webpack')</pre>
   - 接着配置 `pack.json` 命令
      <pre>
       "scripts": {
            "build": "webpack src/main.js"
        }
      </pre>
   - 执行 打包命令
     <pre>yarn build</pre>
     > 此时如果生成了一个dist文件夹，并且内部含有main.js说明已经打包成功了
  
2.  webpack 文件配置
   - 新建 `webpack.config.js`, 并配置 `mode` 、`entry` 、`output`， 并更改打包命令
        <pre>
            const path  =  require('path');
            module.exports = {
                mode: 'development', // 开发模式
                entry: { // 入口文件
                    main: path.resolve(__dirname, './src/main.js')
                },
                output: { 
                    filename: '[name].[hash:8].js', // 打包后的文件名称
                    path: path.resolve(__dirname, './dist') // 打包的目录
                }
            }
        </pre>
     打包命令为： ` "build": "rm -rf dist; webpack --config webpack.config.js"`;<br/>
     > `rm -rf dist`,主要是用于清除上一次打包后的文件，避免再使用 `clean-webpack-plugin`

   - 配置html模版
     - webpack 打包后的 js 文件需要引入到 html 中，此时可以利用 `html-webpack-plugin`
     - 先添加`html-webpack-plugin`
      <pre>yarn add html-webpack-plugin</pre>
     - 新建 `src/index.html`, 再添加配置
        <pre>
            const path  =  require('path');
            const HtmlWebpackPlugin =  require('html-webpack-plugin');


            module.exports = {
                mode: 'development', // 开发模式
                entry: { // 入口文件
                    main: path.resolve(__dirname, './src/main.js')
                },
                output: { 
                    filename: '[name].[hash:8].js', // 打包后的文件名称
                    path: path.resolve(__dirname, './dist') // 打包的目录
                },
                plugins: [
                    new HtmlWebpackPlugin({
                        template: path.resolve(__dirname,  './src/index.html')
                    })
                ]
            }
        </pre>
     - 执行打包命令，此时发现 js 已经引入到 html 中
   - 引入 CSS,  目前中用的是 Saas, 因此需要引入相关 loader, 然后配置相关的解析规则 rule
      <pre>yarn add style-loader css-loader</pre> <br/>
      <pre>yarn add sass-resources-loader sass-loader node-sass</pre> <br/>
      <pre>
      const defaultCssLoaders = [
            'style-loader',
            'css-loader'
        ]
        const sassResourceLoader = [
            ...defaultCssLoaders,
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    sourceMap: true,
                    resources: [ `./src/sass/var.scss` ], // 存放公共变量
                }
            }
        ];

        modules: {
            rules: [{
                test: /\.css$/,
                use: [...defaultCssLoaders]
            },{
                test: /\.(sass|scss)$/,
                use: sassResourceLoader
            }],
        },
      </pre>
   - 拆分 CSS， `mini-css-extract-plugin`: 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
     <pre>yarn add mini-css-extract-plugin</pre><br/>
     <pre>
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash:8].css",
            chunkFilename: "[id].css"
        })
     </pre>
   - 打包 图片、字体、媒体、等文件, 安装 `file-loader url-loader` 
      <pre>yarn add file-loader url-loader</pre><br/>
      <pre>
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        name: 'fonts/[name].[hash:8].[ext]',// 将字体放入fonts文件夹下
                    }
                },
            }]
        },{
            test: /\.(jpe?g|png|gif)$/i, //图片文件
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]', // 将图片放在img文件夹中
                        }
                    }
                }
            }]
        }
      </pre>
   - 用babel转义js文件, 创建文件`.babelrc`, webpack 加载 `babel-loader` 的时候会 根据文件配置解析
     - 需要安装的依赖 `babel-loader @babel/preset-env @babel/core`
   -  搭建vue开发环境
      -  需要的依赖有 `vue-loader vue-template-compiler vue-style-loader vue`
   -  配置 热更新 `webpack-dev-server`
3.  最终实现代码 [git地址](https://github.com/Sally-he/vue_webpack)
4.  webpack 配置参数说明
    1. mode
       1. 提供 mode 配置选项，告知 webpack 使用相应环境的内置优化。
       2. 可能有：`node` 、`development` 、`production`（默认）
    2.  entry
        1.  指定文件一个或多个的入口
    3. output
       1. 配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只指定一个 output 配置。
    4.  loader
        1.  loader 用于对模块源代码进行转换。 loader 可以在 import或加载 模块是预处理文件。因此，loader类似于其他构建工具中对“任务（task）”，并提供处理了前端构建步骤的强大方法。
        2.  loader 特性
            1.  loader支持链式传递，链中的每个loader会将转换应用在已处理过的资源上。
            2.  loader可以是同步的，也可以是异步的
            3.  loader 运行在 node.js 中，并且能够执行任何Node.hs 能坐的操作
            4.  loader可以通过 options对象配置
            5.  除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
            6.  插件(plugin)可以为 loader 带来更多特性。
            7.  loader 能够产生额外的任意文件。
    5. plugin（插件）
       1. 插件是 webpack 的支柱功能，目的在于解决 loader 无法实现的其他事
    6. configuration（配置）
       1. webpack 的配置文件，是一个导出 webpack 配置对象 的 JavaScript 文件
       2.  webpack 配置是标准的 Node.js CommonJS 模块，你可以做到以下事情
           1. 通过 require(...) 导入其他文件
           2.  通过 require(...) 使用 npm 的工具函数
           3.  使用 JavaScript 控制流表达式，例如 ?: 操作符
           4.  对常用值使用常量或变量
           5.  编写和执行函数，来生成部分配置
    7. module（模块）
       1. 在 模块化编程 中，开发者将程序分解为功能离散的 chunk(discrete chunks of functionality)，并称之为_模块_。
       2. 每个模块具有比完整程序更小的接触面，使得验证、调试、测试轻而易举。 精心编写的_模块_提供了可靠的抽象和封装界限，使得应用程序中每个模块，都具备了条理清楚的设计和明确的目的
       3. 支持类型：
          1. CoffeeScript
          2. TypeScript
          3. ESNext (Babel)
          4. Sass
          5. Less
          6. Stylus
    8. resolve： 配置寻找模块的规则
    9. Chunk： 代码块，一个 Chunk由多个模块组合而成，用于代码合并与分割
5. webpack 构建作用
   构建工具就是将源代码转换为可执行的Javascript、Css、HTML代码，包括以下内容
   - 代码转换：将 TypeScript 编译成 JavaScript、将 SCSS 编译成 CSS 等；
   - 文件优化： 压缩JavaScript、CSS、HTML代码，压缩合并图片等；
   - 代码分割： 提取多个页面的公共代码，提取首屏不需要执行部分的代码，让其异步加载
   - 模块合并：在采用模块化的项目里会有很多个模块和文件，需要通过构建功能将模块分类合并成一个文件
   - 自动刷新：监听本地源代码变化，自动重新构建、刷新浏览器
   - 代码校验： 在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试石头通过
   - 自动发布： 更新代码后，自动构建相互线上发布代码并传输给发布系统 
6. 流程概述
   1. 初始化参数： 从配置文件和shell语句中读取与合并参数，得出最终从参数
   2. 开始编译： 用上一步得到的参数初始化Compiler对象，加载所有配置的插件，通过执行对象的run方法开始执行编译
   3. 确定入口： 根据配置中的entry找出所有入口文件
   4. 编译模块： 从入口文件触发，调用所有配置的loader对模块进行翻译，再找出模块依赖的模块，再递归本不走直到所有入口依赖的文件都经过了本步骤的处理
   5. 完成模块编译：在经过第四步使用loader编译完所有的模块后，得到了每个模块被翻译的最终内通及他们之间的依赖关系
   6. 输出资源： 根据入口和模块之间的依赖关系，组装称一个个包含多个模块的chunk,再见chunk 转换为一个单独的文件加入输出列表中，这是可以修改输出内容的最后机会
   7. 输出完成： 在确定好输出内容后，根据配置确定输出的路径和文件名，将文件的内容写入文件系统中
7.  相关plugin解释说明
    - `clean-webpack-plugin`: 用于在下一次打包时清除之前打包的文件，其实也就是清除打包后的 `/dist`文件， 实际可以运用 `rm -rf dist` 直接强制删除文件
    - `html-webpack-plugin`: 当使用 webpack打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
      - 相关配置介绍：[详情](https://github.com/jantimon/html-webpack-plugin)
        - `title: [String]`: 网页 `document.title` 的配置
        - `filename: [String]`: 输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置
        - `template: [String]`: 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，
        - `templateParameters: [Boolean|Object|Function]`: 覆盖默认的模版中使用的参数
        - `inject: [Boolean|String]`: 制定`webpack`打包的`js css`静态资源插入到`html`的位置， 为`true`或者`body`时， 将会把`js`文件放到 `body`的底部， 为`head`时， 将`js`脚本放到`head`元素中。
        - `favicon: [String]`: 为生成的 html 配置一个 favicon
        - `minify: [Boolean|Object]`: 设置静态资源的压缩情况, 如果 mode 设置为 production 默认为 true 否则设置为 false
        - `hash: [Boolean]`: 如果为真，则向所有包含的 js 和 CSS 文件附加一个惟一的 webpack 编译散列。这对于更新每次的缓存文件名称非常有用
        - `cache: [Boolean]`: 设置 js css 文件的缓存，当文件没有发生变化时， 是否设置使用缓存
        - 其他见 [github](https://github.com/jantimon/html-webpack-plugin#options)
    - `mini-css-extract-plugin`: 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
      - 只能用在webpack4中，对比另一个插件 extract-text-webpack-plugin有点:
        - 异步加载
        - 不重复编译，性能更好
        - 更容易使用，
        - 只针对CSS
    - `happypack`: 将文件解析任务分解成多个子进程并发执行。子进程处理完任务后再将结果发送给主进程。从而提升 webpack 构建速度
      - HappyPack 参数
        - `id: String`: 用唯一的标识符ID来代表当前的HappyPack 是用来处理一类特定的文件
        - `loaders: Array`: 用法和webpack loaders 配置一样
        - `thread: Number`: 代表开启几个子进程去处理这一类型的文件, 默认是3个，类型必须是整数
        - `verbose: Boolean`: 是否允许HappyPack输出日志，默认是true
        - `threadPool: HappyThreadPool`: 代表共享进程池，即多个HappyPack实例都使用同一个共享进程池中都子进程去处理任务，已防止资源占用过多
        - `verboseWhenProfiling: Boolean`: 开启`webpack --profile`,仍然希望HappyPack 产生输出
        - `debug: Boolean`: 启动debug 用于故障排查，默认是false
        - 
    - `optimize-css-assets-webpack-plugin`: 主要用来压缩css文件
      - 参数：
        - `assetNameRegExp`: 一个正则表达式，指示应优化/最小化的资产的名称。提供正则的表达式针对配置中
        - `ExtractTextPlugin`: 实例导出的文件的文件名运行，而不是源CSS的文件文件名。默认为/.css$/g
        - `cssProcessor`: 用于优化/最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随
        - `cssnano.process`: 接口的函数（接收CSS和选项参数并返回一个Promise）
        - `cssProcessorOptions`：传递给cssProcessor的选项，默认为 {}
        - `cssProcessorPluginOptions`: 传递给cssProcessor的插件选项，默认为 {}
        - `canPrint`: 一个布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    - `vue-template-compiler`: 通常将 `vue-loader`和`vue-template-compiler` 一起安装——除非你是使用自行 fork 版本的 Vue 模板编译器的高阶用户,需要独立安装的原因是单独指定vue的版本
    - `webpack-bundle-analyzer`: 生产代码分析报告，帮助提升代码质量和网站性能
    - `webpack-parallel-uglify-plugin`: 加速项目构建，
       - `test`: 使用正则去匹配哪些文件需要被 ParallelUglifyPlugin 压缩，默认是 /.js$/。
       - `include`: 使用正则去包含被 ParallelUglifyPlugin 压缩的文件，默认为 []。
       - `exclude`: 使用正则去不包含被 ParallelUglifyPlugin 压缩的文件，默认为 []
       - `cacheDir`: 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回，cacheDir 用于配置缓存存放的目录路径。默认不会缓存，想开启缓存请设置一个目录路径。
       - `workerCount`：开启几个子进程去并发的执行压缩。默认为cpus的数量 - 1或资产数量（以较小者为准）。
       - `sourceMap`：是否为压缩后的代码生成对应的Source Map, 可选布尔值。会减慢编译速度。默认为false。
       - `uglifyJS`：用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。不能与uglifyES一起使用。
       - `uglifyES`：用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。不能与uglifyJS一起使用
    - `CommonsChunkPlugin`: 提取公共模块
8. 相关loader解释说明
   - `babel-loader`:  只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等), 因此 需要借助`babel-polyfill`帮助转换,通常会添加 `.babelrc` 文件配置解析规则
   - `sass-loader`: 是CSS的一种扩展
   - `sass-resources-loader`: 加载器将 @import 您的SASS资源放入每个required SASS模块中。因此，您可以在所有SASS样式中使用共享变量和mixin，而无需在每个文件中手动导入它们。使用CSS模块
9.  相关module解释说明
    1.  `webpack-dev-server`: 提供一个小型Express服务器，使用它可以为webpack 打包生成的资源文件提供web 服务 
        1.  功能：
            1.  为静态文件提供服务
            2.  自动刷新和热替换
    2. `webpack-merge`: 主要用于配置分离， 它允许连接数组并合并对象，而不是覆盖组合
10. 其他
    1. `tree-shaking`: 主要作用是用来清除代码中无用部分.
        1.  目前 `webpack4` 中 `mode: production`时，会自动开启`tree-shaking`。但是如果想要生效，生产的代码必须是ES6模块。
        2.  不能使用其他类型的模块如`CommonJS`之类。如果使用`Babel`的话，这里有一个小问题，因为`Babel`的预案`（preset）`默认会将任何模块类型都转译成`CommonJS`类型，这样会导致`tree-shaking`失效。修正这个问题也很简单，在`.babelrc`文件或在`webpack.config.js`文件中设置`modules： false`就好了
    2. 
11. 参考文章
    1.  [2020年了,再不会webpack敲得代码就不香了](https://juejin.im/post/5de87444518825124c50cd36#heading-23)
    2.  [happypack 原理解析](https://fed.taobao.org/blog/taofed/do71ct/happypack-source-code-analysis/?spm=taofed.blogs.header.7.63f85ac8aUFWJA)
    3.  [webpack优化之HappyPack 实战](https://juejin.im/post/5ad9b0ecf265da0b7155d521)