### BFC
> BFC（Block formatting context）直译为“会级格式化上下文”。它收到后 i一个独立的渲染区域，只有Block-level Box 参与，它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
> 常说的文档流其实分为定位流、浮动流和普通流三种，而普通流其实就是指BFC中的FC
>  FC是formatting context的是首字母缩写，直译过来就是格式化上下文，是页面的一块渲染区域，有一套渲染规则，决定流其子元素如何布局以及和其他元素之间的关系和作用。
> 常见的FC有 BFC（块级格式化上下文）、IFC（行级格式化上下文）和GFC（网格布局格式化上下文）和FFC（自适应格式化上下文）
> `通俗解释： BFC为某个元素的一个CSS属性，只不过这个属性不能被开发者显式的修改，拥有这个属性的内部元素和外部元素会表现出一些特性`

1. BFC的创建
   - float为 left | right
   - overflow 为 hidden | auto | scroll
   - display 为 table-cell | table-caption | inline-block | inline-flex | flex
   - position 为 absolute | fixed
   - 根元素， 即HTML元素
2. BFC的布局规则
   - 内部的Box会在垂直方向，一个接一个的放置
   ![常用布局方式](https://github.com/Sally-he/Learing/blob/master/img/BFC垂直布局.png)
     - 常说盒子是有margin、border、padding、content组成的，实际上每种类型的四遍定义了一个盒子，分别是content-box、padding-box、border-box、margin-box.四种类型的盒子会一直存在，即是设置为0.决定块盒在包含块中与相邻块盒的垂直间距便是margin-box
   - Box的垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠
     - 相邻兄弟元素margin重叠问题
      ![相邻兄弟元素margin重叠问题](https://github.com/Sally-he/Learing/blob/master/img/相邻兄弟元素margin重叠问题.png)
      [代码片段](https://codepen.io/sally-he/pen/eYmMZjp)
        > 相邻的两个P元素之间的距离原本应该为 200px，实际上只有100px, 是因为发生了margin重叠。
        > 处理方式，在p外层再包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。
        
        ![相邻兄弟元素margin重叠问题2](https://github.com/Sally-he/Learing/blob/master/img/相邻兄弟元素margin重叠问题2.png)
        [代码片段](https://codepen.io/sally-he/pen/LYEdNdy)
     - 父子元素margin重叠问题
      ![父子元素margin重叠问题1](https://github.com/Sally-he/Learing/blob/master/img/父子元素margin重叠问题1.png)
      [代码片段](https://codepen.io/sally-he/pen/bGNvpmz)
        > 理论上 .wrap 与h1 元素之间存在40上下的margin值，实际上父子元素并没有上下margin值。但与此同时div元素之间的间距为40px.
        > 处理方式： 1. 在.wrap 添加 overview： hidden | auto; 使得父元素形成一个BFC。2. 或者在 .wrap 添加 border: 1px solid; | padding: 1px;也可以解决margin重叠问题
        ![父子元素margin重叠问题2](https://github.com/Sally-he/Learing/blob/master/img/父子元素margin重叠问题2.png)
        [代码片段](https://codepen.io/sally-he/pen/vYERGPj)
        ![父子元素margin重叠问题3](https://github.com/Sally-he/Learing/blob/master/img/父子元素margin重叠问题3.png)
        [代码片段](https://codepen.io/sally-he/pen/eYmMZoZ)
   - 每个元素的margin box的左边，与包含块border box的左边相接触（对于从左往由的格式化，否则相反），即是存在浮动也是一样的。
     <code>
        <div class="par">
        <div class="child">1</div>
        <div class="child">2</div>
        </div>
     </code>
      - 给这两个子div加浮动，浮动的结果，如果没有清除浮动的话，父div不会将下面两个div包裹，但还是在父div的范围之内，左浮是子div的左边接触父div的border-box的左边，右浮是子div接触父div的border-box右边，除非设置margin来撑开距离，否则一直是这样
   - BFC 的区域不会与float box 重叠
     ![重叠问题5](https://github.com/Sally-he/Learing/blob/master/img/BFC问题5.png)
     ![重叠问题6](https://github.com/Sally-he/Learing/blob/master/img/BFC问题6.png)
     [代码片段](https://codepen.io/sally-he/pen/oNgqLXE)
     - .wrap 盒子是有一个浮动属性，覆盖了.child 盒子的内容，.child盒子并没有清除.wrap 盒子的浮动，只是设置了`overflow: hidden;` 就触发了自身的BFC，然后就不在被.wrap 盒子覆盖了；因此BFC的区域不会与float box 重叠
   - BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是一样的
     <code>
        <div style="float: left; width: 100px; height: 100px; background: #000;"></div>
        <div style="height: 200px; background: #aaa;">
            <div style=" width: 30px; height: 30px; background: red;"></div>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
            <p>content</p>
        </div>
     </code>
     ![重叠问题7](https://github.com/Sally-he/Learing/blob/master/img/BFC问题7.png)
     - 问题： 左上角的div 被覆盖了，而文本却没有被覆盖，float不应该跟普通流不在一个层级吗？是否是float没有生效呢？
       ![重叠问题8](https://github.com/Sally-he/Learing/blob/master/img/BFC问题8.png)
     - 去掉 `width: 100px;`会发现`float: left;`确实是生效了，那么实际上是 被覆盖了。div会被float覆盖，而文本却没有被float覆盖，是因为float当初设计的时候就是为了使文本围绕在浮动对象的周围。 
   - 计算BFC的高度时，浮动元素也参与计算， margin计算：
     - 如果 margin 都是正数，则取他们当中的最大值
     - 如果 margin 中有正有负，则取最大的正数加上最小的负数（如最大的 margin 是 20px，最小的 margin 是 -20px，则他们计算后的值是 0）
     - 如果 margin 中都是负数，则取他们当中的最小值
3. BFC的作用
   - 自适应两栏布局
   - 可以阻止元素被浮动元素覆盖
   - 可以包含浮动元素 - 清除内部浮动
     - 给父元素的div加上 `overflow： hidden；`
     - 触发父div的BFC属性，使下面的子div都处在父div的同一个BFC区域之内，此时已成功清除浮动
   - 分属于不同的BFC可以阻止margin 重叠
4. 文本流、文档流: `文档流和文本流可以理解为定位/位置`
   1. 文本流
     - 文档的读取和输出顺序，也就是通常看到的由左到右、由上而下的读取和输出形式
   2. 文档流
      - 将窗体自上而下分成一行一行,并在每行中按从左至右的挨次排放元素，即为普通流/文档流。
      - 文档流处于网页的最底端，它表示的是一个在页面中的位置，我们所创建的元素默认处于文档流中
      - 文档流的特点：
          - 文档流指的是元素排版布局过程中，元素会默认从左到右，从上往下的流式排列方式。并最终窗体自上而下分成一行行，并在每行中从左至右的顺序排列元素
          - 浮动(float)、绝对定位(absolute)、固定定位(fixed)三种方式定位会脱离文档流。 同时上面的两种定位还能让浮动失效。
          - 元素分为三种大类型：块状（display：block）、内联（display：inline）和内联块（display：inline-block）；每一种都有自己的特性
      - 脱离文档流的情况
         - `float` 浮动
            > 浮动会脱离文档流而不会文本流，其他盒模型中的文字还是会为其让出位置，或环绕在其周围
         - `position: absolute | fixed;`绝对定位
            > 绝对定位会使元素脱离文档流同时脱离文本流，其他盒模型元素和其中的文字的排> 列都会忽略它
      - 脱离文档流会发生什么
          - 会打乱元素的排序规则，设置浮动，定位后会按照自己设置的属性值来摆放
          - 让各类元素失去来原本鸽子的特性，变成来同一种元素
              - 浮动会让元素有块元素部分性质，如：支持所有css样式，子元素和内容能撑开自身（不设置） 。 但是不会独占一行，不能继承父元素宽高。（给元素只设置高，然后浮动元素，元素会因为没有宽度而无法显示）
              - 对于父元素来说，脱离了文档流的子元素不能再撑开父元素了，所以会出现高度塌陷的问题。
      - 标准文档流等级
          - 内联元素文档流
              - 内联元素的文档流是从左到右流动的，当一行满流之后会另起一行从新开始
              - 与其他元素并排；不能设置宽高，默认的宽高就是文字的高度    
          - 块级元素文档流
              - 会计元素文档流是从上往下依次流动的，每个块级元素占满一行
              - 霸占一行，不能与其他元素并列；能接受宽高；如果不设置宽高，那么默认宽高变成为父亲的100%；
      - 
5. 参考
   1. [BFC原理剖析](https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md)