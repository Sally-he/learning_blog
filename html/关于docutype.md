### DOCTYPE (文档类型声明)
> MDN解释: 在HTML中，文档类型声明是必要到。所有到文档到头部，都会看到 `<!DOCTYPE html>` 的身影。这个声明的目的是防止浏览器在渲染文档时，切换到称为 `怪异模式（兼容模式）`的渲染模式。`<!DOCTYPE html>` 确保浏览器按照最佳的相关规范进行渲染，而不是使用一个不符合规范的渲染模式。

---
- DOCTYPE 作用
   - `<!DOCTYPE>` 声明位于HTML文档中的第一行，处于<html> 标准之前。告知浏览器的解析器用声明文档标准解析这个文档。`<!DOCTYPE>` 不存在或格式不正确会导致文档已兼容模式呈现。
   - 标准模式的排版和JS运作模式都是已浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。
  
---

- 解释下`怪异模式和标准模式`
  - MDN 解释 
    -  目前浏览器的排版引擎有三种模式：怪异模式（Quirks mode）、接近标准模式（Almost standards mode）、以及标准模式（Standards mode）。
    -  在`怪异模式`下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。
    -  在`标准模式`下，行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为
    -  在`接近标准模式`下，只有少数的怪异行为被实现。
  -  页面渲染的区别
    -  盒模型， 在 `怪异模式` 和 `标准模式` 渲染下，宽度和高度的计算则不同，细节可查看 [盒模型](https://github.com/Sally-he/Learing/blob/master/css/盒模型.md)
    -  图片的对其方式
  
        - 在标准模式下,图片底部可以看到有几像素的白条  
     ![标准模式](https://github.com/Sally-he/Learing/blob/master/img/标准模式.png) [代码](https://github.com/Sally-he/Learing/blob/master/html/docutype_test.html)

        - 在怪异模式下,图片底部没有留白 
     ![怪异模式](https://github.com/Sally-he/Learing/blob/master/img/怪异模式.png) [代码](https://github.com/Sally-he/Learing/blob/master/html/docutype_test2.html)
       -  原因： CSS中的`vertical-align`属性用于设置对象的初值对其方式，定义了行内元素的`baseline`和所在行的`baseline`初值对其， 而在表格元素中,可以设置单元格里面的内容的对其方式,取值有baseline,bottom,top,middle等。![line-height](https://user-gold-cdn.xitu.io/2017/12/28/1609c3b844a0e9e9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  
      - 在标准模式下,`inline`元素和`table cell`元素的`verticle-aligh`属性默认取值是`baseline`,这也是我们有时会看到图片底部会有几像素留白的原因.但是当`inline`元素内只有图,并且处于怪异模式的时候,`inline`元素里的元素`vertical-aligh`属性默认值是`bottom`,此时就不会有白条的效果
      - 参看链接
        - [stackoverflow](https://stackoverflow.com/questions/4904668/html5-vertical-spacing-issue-with-img)
        - [标准模式与怪异模式对于渲染页面的影响](https://juejin.im/post/5a44aa4d518825146b10d69d#heading-7)
  
---

- DOCTYPE的类型
  - HTML 5
     -  `<!DOCTYPE html>` 
  -  HTML 4.01 Strict
     -  该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素(比如 font).不允许框架集(Framesets).
     - `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
  -  HTML 4.01 Transitional
     - 该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素(比如 font). 不允许框架集(Framesets)
     - `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/html4/loose.dtd">`
  -  HTML 4.01 Frameset
     - 该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容
     - `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"  "http://www.w3.org/TR/html4/frameset.dtd">`
  -  XHTML 1.0 Strict
     - 该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
     -  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  -  XHTML 1.0 Transitional
     -  该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
     -  ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
  -  XHTML 1.0 Frameset 
     - 该 DTD 等同于 XHTML 1.0 Transitional，但允许框架集内容
     - <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
  - XHTML 1.1
     -  该 DTD 等同于 XHTML 1.0 Strict，但允许添加模型（例如提供对东亚语系的 ruby 支持）
     - `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`
  
---
- 关于HTML5
  - HTML5 不基于 SGML， 因此不需要对DTD进行引用转换，但是需要doctype来规范浏览器的行为
  - HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型