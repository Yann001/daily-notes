# LOG（随手记）

[TOC]

## 文章阅读

**张鑫旭博客文章**

>1.  http://www.zhangxinxu.com
>1.  [CSS3 pointer-events:none应用举例及扩展](http://www.zhangxinxu.com/wordpress/2011/12/css3-pointer-events-none-javascript/)
>3. [好吧，CSS3 3D transform变换，不过如此！](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
>4. [CSSOM视图模式(CSSOM View Module)相关整理](http://www.zhangxinxu.com/wordpress/?p=1907)
>5. [CSS3 Transitions, Transforms和Animation使用简介与应用展示](http://www.zhangxinxu.com/wordpress/?p=1268)
>6. [理解CSS3 transform中的Matrix(矩阵)](http://www.zhangxinxu.com/wordpress/?p=2427)

**正则表达式**

>1. http://www.jb51.net/tools/zhengze.html#mission

**angular, ionic**
>1. http://www.jianshu.com/p/ea0dcf1d31c9#

## jQuery方法

### jQuery创建DOM

``` js
$('<div>');
```
### jQuery wrap(), wrapAll(), wrapInner()

- wrap() 方法把每个被选元素放置在指定的 HTML 内容或元素中。
- wrapAll() 在指定的 HTML 内容或元素中放置所有被选的元素。
- wrapInner() 方法使用指定的 HTML 内容或元素，来包裹每个被选元素中的所有内容 (inner HTML)。

``` js
// 原代码
<p>我是占位子的。</p>
<p>我是占位子的。</p>

// wrap() 方法
$("p").wrap("<strong></strong>");
// 结果
<strong>
  <p>我是占位子的。</p>
</strong>
<strong>
  <p>我是占位子的。</p>
</strong>

// wrapAll() 方法
$("p").wrapAll("<strong></strong>");
// 结果
<strong>
  <p>我是占位子的。</p>
  <p>我是占位子的。</p>
</strong>

// wrapInner() 方法
$("p").wrapInner("<strong></strong>");
// 结果
<p>
  <strong>我是占位子的。</strong>
</p>
<p>
  <strong>我是占位子的。</strong>
</p>
```

### jQuery 文档操作

*电子书 HTML 解析*
1. replaceWith() 方法：用指定的 HTML 内容或元素替换被选元素。

## CSS

#### transition相关

1. **transform-origin** 属性：设置旋转元素的基点位置
``` css
transform-origin: x-axis y-axis z-axis;
```
x-axis: 定义视图被置于 X 轴的何处。可能的值：
[ left, center,| right, length, % ]
y-axis: 定义视图被置于 Y 轴的何处。可能的值：
[ top, center, bottom, length, % ]
z-axis: 定义视图被置于 Z 轴的何处。可能的值：
[ length ]

2. **gradient** 属性
``` css
-webkit-gradient(type, start_point, end_point, / stop...)
-webkit-gradient(type, inner_center, inner_radius, outer_center, outer_radius, / stop...)
```
type:	渐变的类型，可以是线性渐变(linear)或是径向渐变(radial)
start_point:	渐变图像中渐变的起始点
end_point:	渐变图像中渐变的结束点
stop:	color-stop()方法，指定渐变进程中特定的颜色
inner_center:	内部中心点，径向渐变起始圆环
inner_radius:	内部半径，径向渐变起始圆
outer_center:	外部渐变结束圆的中心点
outer_radius:	外部渐变结束圆的半径

3. **transform**  中的Matrix（矩阵）
















