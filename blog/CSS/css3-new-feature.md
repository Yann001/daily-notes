# CSS3 新特性学习笔记

>https://www.ibm.com/developerworks/cn/web/1202_zhouxiang_css3/

[TOC]

## CSS3选择器

- :first-child()
- :last-child()
- :nth-child()
- :not()
- :nth-last-child()
- :nth-of-type()
- :nth-last-of-type()
- :first-of-type()
- :only-child()
- :only-of-type()
- :empty()
- :checked
- :enabled
- :disabled
- ::section

## @Font-face特性

Font-face 可以用来加载字体样式，而且它还能够加载服务器端的字体文件，让客户端显示客户端所没有安装的字体。

客户端字体样式基本写法如下：

``` css
selector {
  font-family: arial;
}
```

服务端字体样式写法：

``` css
@font-face {
  font-family: BorderWeb;
  src: url(BORDERW0.eto);
}
@font-face {
  font-family: Runic;
  src: url(RUNICMT0.eto);
}
selector {
  font-family: BorderWeb;
}
selector {
  font-family: Runic;
}
```

## Word-wrap & Text-overflow 样式

### Word-wrap

加入了“word-wrap: break-word”，设置或检索当当前行超过指定容器的边界时是否断开转行，文字此时已被打散。

### Text-overflow

word-wrap 设置或检索当当前行超过指定容器的边界时是否断开转行，而 text-overflow 则设置或检索当当前行超过指定容器的边界时如何显示。

``` css
selector {
  /*clip 不显示省略标记，而是简单的裁切条*/
  /*ellipsis 当对象内文本溢出时显示省略标记*/
  text-overflow: clip | ellipsis;
}
```

## 文字渲染（text-decoration）

- Text-fill-color: 文字内部填充颜色
- Text-stroke-color: 文字边界填充颜色
- Text-stroke-width: 文字边界宽度

## CSS3 的多列布局（multi column layout）

- Column-count：表示布局几列。
- Column-rule：表示列与列之间的间隔条的样式
- Column-gap：表示列于列之间的间隔

## 边框和颜色（color, border）

- rgba(red, green, blue, alpha)
- border-radius: 2px;

## CSS3 的渐变效果（Gradient）

1. 线性渐变
左上（0% 0%）到右上（0% 100%）即从左到右水平渐变：
``` css
background-image:-webkit-gradient(linear,0% 0%,100% 0%,from(#2A8BBE),to(#FE280E));
background-image:-webkit-gradient(linear,0% 0%,100% 0%,from(#2A8BBE),color-stop(0.33,#AAD010),color-stop(0.33,#FF7F00),to(#FE280E));
```

2. 径向渐变
从一个圆到另一个圆的渐变。
``` css
backgroud: -webkit-gradient(radial,50 50,50,50 50,0,from(black),color-stop(0.5,red),to(blue));
```
前面“50,50,50”是起始圆的圆心坐标和半径，“50,50,0”蓝色是目标圆的圆心坐标和半径，“color-stop(0.5,red)”是断点的位置和色彩

## CSS3 的阴影（Shadow）和反射（Reflect）效果

阴影效果既可用于普通元素，也可用于文字。

``` css
.class1{
  text-shadow:5px 2px 6px rgba(64, 64, 64, 0.5);
}
.class2{
  box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);
}
```

对于文字阴影：表示 X 轴方向阴影向右 5px,Y 轴方向阴影向下 2px, 而阴影模糊半径 6px，颜色为 rgba(64, 64, 64, 0.5)。其中偏移量可以为负值，负值则反方向。元素阴影也类似。

反射看起来像水中的倒影

``` css
.classReflect{
  -webkit-box-reflect: below 10px;
  -webkit-gradient(linear, left top, left bottom, from(transparent),     to(rgba(255, 255, 255, 0.51)));
}
```

## CSS3的背景效果

“Background Clip”，该属确定背景画区，有以下几种可能的属性：

* background-clip: border-box; 背景从 border 开始显示 ;
* background-clip: padding-box; 背景从 padding 开始显示 ;
* background-clip: content-box; 背景显 content 区域开始显示 ;
* background-clip: no-clip; 默认属性，等同于 border-box;

“Background Origin”，用于确定背景的位置，它通常与 background-position 联合使用，您可以从 border、padding、content 来计算 background-position（就像 background-clip）。

* background-origin: border-box; 从 border. 开始计算 background-position;
* background-origin: padding-box; 从 padding. 开始计算 background-position;
* background-origin: content-box; 从 content. 开始计算 background-position;

“Background Size”，常用来调整背景图片的大小，注意别和 clip 弄混，这个主要用于设定图片本身。有以下可能的属性：

* background-size: contain; 缩小图片以适合元素（维持像素长宽比）
* background-size: cover; 扩展元素以填补元素（维持像素长宽比）
* background-size: 100px 100px; 缩小图片至指定的大小 .
* background-size: 50% 100%; 缩小图片至指定的大小，百分比是相对包	含元素的尺寸 .

“Background Break”属性，CSS3 中，元素可以被分成几个独立的盒子（如使内联元素 span 跨越多行），background-break 属性用来控制背景怎样在这些不同的盒子中显示。

* background-break: continuous; 默认值。忽略盒之间的距离（也就是像元	素没有分成多个盒子，依然是一个整体一样）
* background-break: bounding-box; 把盒之间的距离计算在内；
* background-break: each-box; 为每个盒子单独重绘背景。

CSS3 中支持多背景图片

## CSS3 的盒子模型

- display: box;
- box-flex: 1;

## CSS3 的 Transitions, Transforms 和 Animation

### Transitions

Transition 有下面些具体属性：

- transition-property：用于指定过渡的性质，比如 transition-property:backgrond 就是指 backgound 参与这个过渡
- transition-duration：用于指定这个过渡的持续时间
- transition-delay：用于制定延迟过渡的时间
- transition-timing-function：用于指定过渡类型，有 ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier

### Transform

Transform，其实就是指拉伸，压缩，旋转，偏移等等一些图形学里面的基本变换。

“skew”是倾斜，“scale”是缩放，“rotate”是旋转，“translate”是平移。最后需要说明一点，transform 支持综合变换。

### Animation

- animation-name: anim1; 动画名称
- animation-duration: 1.5s; 动画持续时间
- animation-iteration-count: 4; 动画重复次数
- animation-direction: alternate; 动画执行完一次后方向的变化方式
- animation-timing-function: ease-in-out; 变化的模式





