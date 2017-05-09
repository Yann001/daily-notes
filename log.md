# LOG（随手记）

[TOC]

## 文章阅读

**张鑫旭博客文章**

>1.  http://www.zhangxinxu.com
>1.  http://www.zhangxinxu.com/wordpress/2011/12/css3-pointer-events-none-javascript/
>3. http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/
>4. http://www.zhangxinxu.com/wordpress/?p=1907

**正则表达式**

>1. http://www.jb51.net/tools/zhengze.html#mission

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

















