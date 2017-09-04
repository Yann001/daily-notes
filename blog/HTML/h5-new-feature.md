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

### 1. 应用程序缓存

通过创建cache manifest文件，可以轻松地创建web应用的离线版本

离线缓存的三个优势：

- 离线浏览：用户可在离线时使用
- 速度：已缓存资源加载得更快
- 减少服务器负载：浏览器将只从服务器下载更新过的资源

**App Cache**

 原理：

![](http://opzww7anw.bkt.clouddn.com/mk/image/appcache-theory.png)

使用方法：

1. 页面声明使用App Cache

   ``` html
   <!DOCTYPE HTML>
   <html manifest="index.manifest">
   ```

2. 清单文件写明资源

   ``` javascript
   CACHE MANIFEST
   theme.css
   logo.gif
   main.js

   NETWORK:
   login.asp

   FALLBACK:
   /html5/ /404.html
   ```

**manifest 文件可分为三个部分：**

CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存

NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存

FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

CACHE MANIFEST，是必需的
NETWORK 规定文件 "login.asp" 永远不会被缓存，且离线时是不可用的
FALLBACK 规定如果无法建立因特网连接，则用 "404.html" 替代 /html5/ 目录中的所有文件

### 2. 本地存储

- localStorage（一直存在本地）
- sessionStorage（关闭窗口就消失）

HTML5的本地存储，还提供了一个storage事件，可以对键值对的改变进行监听，使用方法如下：

``` js
if (window.addEventListener) {
  window.addEventListener("storage", handle_storage, false);
} else if(window.attachEvent) {
 window.attachEvent("onstorage", handle_storage);
}
function handle_storage (e) {
 if (!e) {
   e = window.event;
 }
 //showStorage();
}
```

对于事件变量e，是一个StorageEvent对象，提供了一些实用的属性，可以很好的观察键值对的变化，如下表：

| 属性       | 类型     | 描述                      |
| :------- | ------ | ----------------------- |
| key      | String | 被添加、移除或修改的key值          |
| oldValue | Any    | 之前的值或null               |
| newValue | Any    | 新值或null                 |
| url/uri  | String | 调用方法触发改变localStorage的页面 |



### 3. 索引数据库（IndexDB）



### 4. 文件接口

- 获取文件名：fileList[i].name
- readAsDataURL()：开始读取指定的Blob对象或File对象中的内容，当读取操作完成时，readyState属性的值会成为DONE,如果设置了onloadend事件处理程序，则调用之。同时，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容
- readAsBinaryString()：开始读取指定的Blob对象或File对象中的内容，当读取操作完成时，readyState属性的值会成为DONE,如果设置了onloadend事件处理程序，则调用之。同时，result属性中将包含所读取文件的原始二进制数据
- readAsText()：开始读取指定的Blob对象或File对象中的内容，当读取操作完成时，readyState属性的值会成为DONE,如果设置了onloadend事件处理程序，则调用之。同时，result属性中将包含一个字符串以表示所读取的文件内容
- 事件处理程序
  - onabort：读取操作被终止时调用
  - onerror：读取操作发生错误时调用
  - onload：读取操作成功时调用
  - onloadend：读取操作完成时调用，不管成功还是失败
  - onloadstart：读取将要开始之前调用
  - onprogress：读取过程中周期性调用

## 设备访问特性

大致包括地理位置API、媒体访问API、访问联系人及事件、设备方向

### 1. 地理位置API

**getCurrentPosition()**

HTML5 Geolocation API 用于获得用户的地理位置。

鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。

实例：

``` javascript
var x=document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    x.innerHTML="Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML="Latitude: " + position.coords.latitude +
  "<br />Longitude: " + position.coords.longitude;
}
```

若成功，则 getCurrentPosition() 方法返回对象。始终会返回 latitude、longitude 以及 accuracy 属性。如果可用，则会返回其他下面的属性。

| 属性                      | 描述          |
| ----------------------- | ----------- |
| coords.latitude         | 十进制数的纬度     |
| coords.longitude        | 十进制数的经度     |
| coords.accuracy         | 位置精度        |
| coords.altitude         | 海拔，海平面以上以米计 |
| coords.altitudeAccuracy | 位置的海拔精度     |
| coords.heading          | 方向，从正北开始以度计 |
| coords.speed            | 速度，以米/每秒计   |
| timestamp               | 响应的日期/时间    |

- watchPosition() - 返回用户的当前位置，并继续返回用户移动时的更新位置（就像汽车上的 GPS）。
- clearWatch() - 停止 watchPosition() 方法

### 2. 媒体访问API

**getUserMedia()**

### 3. 联系人管理API（未纳入正式标准）

### 4. 设备方向和运动API

**1. DeviceOrientation**

DeviceOrientation常用于检测重力感应方向，DeviceMotion常用于摇一摇功能。

当浏览器的Orientation发生变化时，触发DeviceOrientation事件，并返回一个DeviceOrientationEvent对象，其属性列表如下：

| 属性    | 释义                   |
| ----- | -------------------- |
| alpha | 设备指示的方向，根据指南针的设定情况而定 |
| beta  | 设备绕x轴旋转的角度           |
| gamma | 设备绕y轴旋转的角度           |

**2. DeviceMotion**

摇一摇功能是很多原生APP都可以实现的功能，如微信中的摇一摇找好友，QQ音乐中的摇一摇换歌等。它们都是利用了手机加速传感器提供的API，当监听到手机加速变化的事件时，根据获取的加速值来执行不同的动作。

在Web APP中HTML5 也提供了类似的接口，就是DeviceMotionEvent。DeviceMotion封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。

DeviceMotionEvent对象属性列表：

| 属性                                 | 释义                                  |
| ---------------------------------- | ----------------------------------- |
| event.accelaration                 | x(y,z):设备在x(y,z)方向上的移动加速度值          |
| event.accelarationIncludingGravity | x(y,z):考虑了重力加速度后设备在x(y,z)方向上的移动加速度值 |
| event.rotationRate                 | alpha,beta,gamma:设备绕x,y,z轴旋转的角度     |



## 连接特性

- Web Sockets
- Server-Sent Events



## 网页多媒体特性

- Audio和Video标签
- Audio API和Video API



## 三维、图形及特效特性

- SVG
- Canvas
- WebGL（Web Graphics Library）
- CSS3 3D



## 性能与集成特性

- Web Workers
- XMLHttpRequest 2

当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

Ajax向服务器端发送请求，是异步接收响应的。不然页面会卡住。

Web Workers 是运行在浏览器后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 Web Workers 在后台运行。

**1. Web Workers 用法**

在html5规范中引入了web workers概念，解决客户端JavaScript无法多线程的问题，其定义的worker是指代码的并行线程，不过web worker处于一个自包含的环境中，无法访问主线程的window对象和document对象，和主线程通信只能通过异步消息传递机制。

我们需要把希望单独执行的javascript代码放到一个单独的js文件中，然后在页面中调用Worker构造函数来创建一个线程，参数是该文件路径，参数存放如果是相对地址，那么要以包含调用Worker构造函数语句所在脚本为参照，如果是绝对路径，需要保证同源（协议+主机+端口）。这个文件不需要我们在页面使用script标签显示引用。

``` javascript
var worker = new Worker("/example/html5/demo_workers.js");
```

worker对象只有两个属性，其实是两个回调函数句柄。

- onerror：当worker运行出现错误，并且没有在worker中被捕获，会在此捕
- onmessage：当worker向主线程发送消息是调用

在其prototype内有两个重要方法

- postMessage：woker的postMessage方法和window的比较类似，但参数略有不同，只需要传递消息内容就可以，而且支持所有JavaScript原生数据类型，当然不放心的话同样也可以序列化为字符串传递
- terminate：终止worker执行，有些worker执行比较慢，主线程可以主动终止其执行

**2. 新的Ajax**

XMLHttpRequest是一个浏览器接口，使得Javascript可以进行HTTP(S)通信。也就是Ajax。

上一代Ajax有以下缺点。

- 只支持文本数据的传送，无法用来读取和上传二进制文件。
- 传送和接收数据时，没有进度信息，只能提示有没有完成。
- 受到"同域限制"（Same Origin Policy），只能向同一域名的服务器请求数据，不能跨域。

XMLHttpRequest 2也就是新的Ajax。针对老版本的缺点，做出了大幅改进，有下面的特点。

- 可以设置HTTP请求的时限。
- 可以使用FormData对象管理表单数据。
- 可以上传文件。
- 可以请求不同域名下的数据（跨域请求）。
- 可以获取服务器端的二进制数据。
- 可以获得数据传输的进度信息。







