### 百分比是一种相对于包含块的计量单位。

首先知道百分比的宽度：
**目标元素宽度/父级元素宽度=百分比宽度**

在说到百分比是前，先简单了解下基本的单位

 - 英寸（inch） ：in  *1 in=2.54cm*
 - 厘米（centimeter）：cm
 - 毫米（millimeter）：mm
 - 磅（point）：pt      *1pt=1/72  in*
 - 皮卡（pica）:pc      *1pc==12 pt*
 - 像素（pixel unit）：px  *1px=0.75 pt*
 - 相对长度单位(相对于当前对象内文本的字体尺寸)：em   *1em=16px*
 - CSS3新增的一个相对单位root em: rem   *1rem=16px*
 
 接下来就是关于CSS中常用属性的百分比
 <table>
<tr><th>width</th><th>基于父级的width</th></tr>
<tr><th>height</th><th>基于父级的height</th></tr>
<tr><th>margin（top,right,bottom,left）</th><th>基于父级的width</th></tr>
<tr><th>padding（top,right,bottom,left）</th><th>基于父级的width</th></tr>
<tr><th>left,top,right,bottom</th><th>基于父元素的width，height，width，height</th></tr>
<tr><th>font-size</th><th>基于继承得到的font-size</th></tr>
<tr><th>line-height</th><th>基于当前字体的font-size</th></tr>
<tr><th>transform(left, top)</th><th>基于自身的left， top</th></tr>
</table>

百分比的demo

```
<style type="text/css">
			*{
				margin: 0;
				padding: 0;
			}
			.box{
				position: relative;
				margin-top: 10%;
				width: 100px;
				height: 100px;
				padding: 15px;
				border: 4px solid yellow;
				background: red;
			}
			.box>.absolute-div{
				z-index: 1;
				position: absolute;
				top: 100%;
				left: 100%;
				width: 10%;
				height: 10%;
				padding: 10%;
				border: 4px solid blue;
				background: white;
			}
			.box>.relative-div{
				z-index: 1;
				position: relative;
				top: 100%;
				left: 100%;
				width: 10%;
				height: 10%;
				padding: 10%;
				border: 4px solid blue;
				background: white;
			}
		</style>

```

```
<div class="box">
			<div class="relative-div"></div>
		</div>
		<div class="box">
			<div class="absolute-div"></div>
		</div>
```
父盒子盒模型与相对定位的子盒子的盒模型（relative）：
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMTA3MjIwMTAxMDE3?x-oss-process=image/format,png)![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMTA3MjE1ODUzODYz?x-oss-process=image/format,png)![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMTA3MjE1OTAyNDA1?x-oss-process=image/format,png)

父盒子盒模型与相对定位的子盒子的盒模型（absolute）：
![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMTA3MjE1OTI3NzUz?x-oss-process=image/format,png)![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMTA3MjE1OTM0Njky?x-oss-process=image/format,png)![这里写图片描述](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTgwMTA3MjE1OTQyNjM1?x-oss-process=image/format,png)


### px、rem与em的区别
- px
  - px像素（Pixel）。相对单位，像素px是相对于显示器分辨率而言的
  - px特点
    - IE无法调整适用px作为单位使用的字体大小
    - 国内的大部分网站能够调整的原因在于使用了em/rem 作为字体单位
    - Firefox能够调整px和em，rem，但是96%以上的中国网民使用IE浏览器(或内核)。
- em
  - em是相对长度单位。相对与当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸违背未被设置，则相对于浏览器的默认字体尺寸 16px
  - em特点
    - em的值并不是固定的
    - em 会继承父级元素的字体大小
  - `注意：任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了`
- rem
  - rem是CSS3新增的一个相对单位（root em，根em）
  - 这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。
  - 目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。
  - `注意： 选择使用什么字体单位主要由你的项目来决定，如果你的用户群都使用最新版的浏览器，那推荐使用rem，如果要考虑兼容性，那就使用px,或者两者同时使用。`
- px 与 rem 的选择？
  - 对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可 。
  - 对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备。