# HTML5新特性学习笔记

> 整理来源：http://www.ganecheng.tech/blog/52819118.html

[TOC]

2014年10月29日，W3C宣布，经过接近8年的艰苦努力，HTML5标准规范终于制定完成。

## HTML5新特性

1. 语义特性：赋予网页更好的意义和结构。
2. 本地存储特性：基于HTML5开发的网页APP拥有更短的启动时间，更快的联网速度，这些全得益于HTML5 APP Cache，以及本地存储功能。
3. 设备访问特性。
4. 连接特性。
5. 网页多媒体特性。
6. 三维、图形及特效特性。
7. 性能与集成特性。

## 语义特性

HTML5增加了新的内容标签，这些标签带有一定的语义，使搜索引擎爬取你的网站信息更高效。

> http://blog.csdn.net/garvisjack/article/details/54754928

1. 结构标签
   - section：独立内容区块，可以用h1~h6组成大纲，表示文档结构，也可以有章节、页眉、页脚或页眉的其他部分；
   - article：特殊独立区块，表示这篇页眉中的核心内容；
   - aside：标签内容之外与标签内容相关的辅助信息；
   - header：某个区块的头部信息/标题；
   - hgroup：头部信息/标题的补充内容；
   - footer：底部信息；
   - nav：导航条部分信息；
   - figure：独立的单元，例如某个有图片与内容的新闻块。
2. 表单标签
   - email：必须输入邮件
   - url：必须输入url地址
   - number：必须输入数值
   - range：必须输入一定范围内的数值
   - date pickers：
     - date：选取日月年
     - month：选取月年
     - week：选取周和年
     - time：选取时间（小时和分钟）
     - datetime：选取时间、日、月、年（UTC时间）
     - datetime-local：选取时间、日、月、年（本地时间）
   - search：搜索常规的文本域
   - color：颜色
3. 媒体标签
   - audio：音频
   - video：视频
   - embed：嵌入内容（包括各种媒体），Midi、Wav、AU、MP3、Flash、AIFF等
4. 其他功能标签
   - mark：标注
   - progress：进度条
   - time：数据标签，给搜索引擎使用
   - ruby和rt：对某一个字进行注释
   - wbr：软换行，页面宽度到需要换行时换行
   - canvas：使用JS代码做内容进行图像绘制
   - command：按钮
   - deteils ：展开菜单
   - dateilst：文本域下拉提示
   - keygen：加密
5. 新增属性
   - defer：延迟加载
   - async：异步加载
   - sizes（link）：图标大小
   - manifest属性：定义页面需要用到的离线应用文件，一般放在<html>标签里
   - charset属性：meta属性之一,定义页面的字符集
   - sizes属性：<link>新增属性，当link的rel="icon"时，用以设置图标大小
   - base属性:<base href="http://localhost/" target="_blank">表示当在新窗口打开一个页面时，会将href中的内容作为前缀添加到地址前
   - defer属性：script标签属性，表示脚本加载完毕后，只有当页面也加载完毕才执行（推迟执行）
   - async属性：script标签属性，脚本加载完毕后马上执行（运行过程中浏览器会解析下面的内容），即使页面还没有加载完毕（异步执行）
   - media属性：<a>元素属性：表示对何种设备进行优化
   - hreflang属性：<a>的属性，表示超链接指向的网址使用的语言
   - ref属性：<a>的属性,定义超链接是否是外部链接
   - reversed属性:<ol>的属性，定义序号是否倒叙
   - start属性：<ol>的属性，定义序号的起始值
   - scoped属性：内嵌CSS样式的属性，定义该样式只局限于拥有该内嵌样式的元素，适用于单页开发
6. HTML5全局属性：对任意标签都可以使用的，以下6个：data-property、hidden、Spenllecheck、tabindex、contenteditable、desginMode。
   - 可直接在标签里插入的：data-自定义属性名字
   - hidden（直接放上去就是隐藏）
   - spellcheck="true"（语法纠错）
   - tabindex="1"（Tab跳转顺序）
   - contenteditable="true"(可编辑状态，单击内容，可修改)
   - 在JavaScript里插入的window.document.designMode = 'on'（JavaScript的全局属性，整个页面的文本都可以编辑了）

## 本地（离线）存储特性

HTML5离线存储包含 `应用程序缓存`，`本地存储`，`索引数据库`，`文件接口`。

### 应用程序缓存



