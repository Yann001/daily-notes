# JavaScript高级程序设计学习笔记

[TOC]

# 第一章 JavaScript简介

# 第二章 在HTML中使用JavaScript

## 2.1 <script>元素

1. 延迟脚本（defer属性）：<script defer="defer"></script> 只适用于外部脚本文件，先加载，不执行，一般在</html>后，DOMContentLoaded事件之前执行，最好只包含一个延迟脚本。
2. 异步脚本（async属性）：指定async 属性的目的是不让页面等待脚本下载和执行，也是只适用于外部脚本，从而异步加载页面其他内容，因此异步脚本不要在加载器件修改DOM。标记为async 的脚本并不保证按照指定它们的先后顺序执行


## 2.2 嵌入代码与外部文件

在HTML 中嵌入JavaScript 代码虽然没有问题，但一般认为最好的做法还是尽可能使用外部文件来包含JavaScript 代码。不过，并不存在必须使用外部文件的硬性规定，但支持使用外部文件的人多会强调如下优点。
- 可维护性：遍及不同HTML 页面的JavaScript 会造成维护问题。但把所有JavaScript 文件都放在一个文件夹中，维护起来就轻松多了。而且开发人员因此也能够在不触及HTML 标记的情况下，集中精力编辑JavaScript 代码。
- 可缓存：浏览器能够根据具体的设置缓存链接的所有外部JavaScript 文件。也就是说，如果有两个页面都使用同一个文件，那么这个文件只需下载一次。因此，最终结果就是能够加快页面加载的速度。
- 适应未来：通过外部文件来包含JavaScript 无须使用前面提到XHTML 或注释hack。HTML 和XHTML 包含外部文件的语法是相同的。

## 2.3 文档模式

IE5.5 引入了文档模式的概念，而这个概念是通过使用文档类型（doctype）切换实现的。最初的两种文档模式是：混杂模式（quirks mode）①和标准模式（standards mode）。混杂模式会让IE 的行为与（包含非标准特性的）IE5 相同，而标准模式则让IE 的行为更接近标准行为。虽然这两种模式主要影响CSS内容的呈现，但在某些情况下也会影响到JavaScript 的解释执行。
在IE 引入文档模式的概念后，其他浏览器也纷纷效仿。在此之后，IE 又提出一种所谓的准标准模式（almost standards mode）。这种模式下的浏览器特性有很多都是符合标准的，但也不尽然。不标准的地方主要体现在处理图片间隙的时候（在表格中使用图片时问题最明显）。
如果在文档开始处没有发现文档类型声明，则所有浏览器都会默认开启混杂模式。但采用混杂模式不是什么值得推荐的做法，因为不同浏览器在这种模式下的行为差异非常大，如果不使用某些hack 技术，跨浏览器的行为根本就没有一致性可言。
对于标准模式，可以通过使用下面任何一种文档类型来开启：
``` html
<!-- HTML 4.01 严格型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<!-- XHTML 1.0 严格型 -->
<!DOCTYPE html PUBLIC
"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!-- HTML 5 -->
<!DOCTYPE html>
```

## 2.4 <noscript>元素

早期浏览器都面临一个特殊的问题，即当浏览器不支持JavaScript 时如何让页面平稳地退化。对这个问题的最终解决方案就是创造一个<noscript>元素，用以在不支持JavaScript 的浏览器中显示替代的内容。这个元素可以包含能够出现在文档<body>中的任何HTML 元素——<script>元素除外。包含在<noscript>元素中的内容只有在下列情况下才会显示出来：
- 浏览器不支持脚本
- 浏览器支持脚本，但脚本被禁用

# 第三章 基本概念
1. 区分大小写
2. 标识符：第一个字母为字母、下划线或美元符$。驼峰式命名（getElementById）。
3. 注释：单行//  块级注释（多行）/* 开头 */结尾。
4. 严格模式：脚本中添加 "use strict"。
5. 语句：推荐末尾加分号，尽量使用代码块（使用{}将代码括起来），哪怕if语句后只有一句代码。
6. 变量：使用 var 关键字定义，未初始化时会保存一个特殊的值--undefined，在修改变量值得同时可以修改变量的类型，但不推荐，通过var定义的变量是局部变量。省略var关键字课定义全局变量，但不推荐。
7.ECMAScript中有5种简单数据类型：Undefined、Null、Boolean、Number、String。1种复杂数据类型Object。
8. typeof操作符（不是函数，可以不要()）：返回下列某个字符串
  - "undefined"--如果值未定义
  - "boolean"--如果值是布尔值
  - "string"--如果值是字符串
  - "number"--如果值是数值
  - "object"--如果值是对象或null
  - "function"--如果值是函数
9. Undefined类型：只有一个值，即特殊的undefined。对于声明未进行初始化或未进行声明的变量使用typeof操作符都会返回"undefined"。
10. Null类型：也只有一个值null（逻辑上看表示一个空对象指针），实际上undefined是派生自null的对它们使用==符号判断时会返回true。
11. Boolean类型：只有true和false两个值。
12. Number类型
十进制，八进制（0开头，如果后面包含大于7的数字，则会忽略0，直接解析成十进制数），十六进制（0x开头，后面字母可大写可小写）。在进行算数运算时，最终都将转换成十进制数值。可以保存正零（+0）和负零（-0），正零和负零被认为相等。
浮点数值：数值中必须包含一个小数点，并且小数点后面至少有一位数字。可以用e/E表示法（科学计数法）表示数值。浮点数的最高精度是17位小数。默认情况下，ECMAScript会将小数点后面带有6个零以上的数值转换成e表示法表示的数值。
数值范围：ECMAScript表示的最大值保存在Number.MAX_VALUE中，最小值保存在Number.MIN_VALUE中，超出范围将会自动转换成特殊值+Infinity或-Infinity，可以使用isFinite函数判断一个数值是否是有穷的。
NaN：非数值（Not a Number），用于表示一个本来要返回数值的操作数未返回数值的情况。NaN与任何值都不相等，包括NaN本身。
数值转换：Number( )、parseInt( )、parseFloat( )。
13. String类型
转换为字符串：toString()方法、String()方法。
14. Object类型
- constructor
- hasOwnProperty(propertyName)
- isPrototypeOf(object)
- propertyIsEnumerable(propertyName)
- toLocaleString()
- toString()
- valueOf()
15. 语句
- if else
- do while
- while
- for（由于ECMAScript中不存在块级作用域，因此在循环内部定义的变量也可以在循环外部访问）
- for in
- label（label:statement）
- with（不建议使用，严格模式下不允许）
- switch
16. 函数：arguments对象

# 第四章 变量、作用域和内存问题

1. 基本类型和引用类型的值
  - 动态属性（只能给引用类型值动态添加属性）
  - 复制变量值：复制基本类型值时会创建独立的副本，但复制引用类型的值时两个变量将引用同一个对象。
  - 传递参数：所有函数的参数都是按照值传递的。
  - 检测类型：result = variable instanceof constructor

2. 执行环境及作用域
	Web浏览器中，全局执行环境被认为是windows对象。
	- 延长作用域链
	- 当执行流进入下列任何一个语句时，作用域链就会得到加长：
  	- try-catch语句的catch块
  	- with语句
	- 没有块级作用域
		- 声明变量：如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境中。严格模式下，不声明会导致错误。
		- 查询标识符：作用域链逐级向上搜索。

3. 垃圾收集
  1、标记清除（常用）
  2、引用计数
  3、性能问题（垃圾收集器周期运行）
  4、管理内存

# 第五章 引用类型

1. Object类型

2. Array类型
检测数组：value instanceof Array 会因存在两个或以上的全局环境出现问题，ECMAScript 5新增了Array.isArray(value)方法，检测值value是不是数组。
转换方法：toLocaleString()、toString()、valueOf()方法。
栈方法：push()、pop()。
队列方法：shift()与push()，队列。unshift()与pop()，反方向队列。
重排序方法：reverse()和sort()。
操作方法
- concat()方法连接数组；
- slice()方法返回数组中的某一段，如果该方法中包含负数，则用数组长度加上该数来确定位置，结束位置小于起始位置时返回空数组。
- splice()方法：删除，插入，替换。splice()始终返回一个数组，是空数组或者院数组中删除的项。
- 位置方法：indexOf()和lastIndexOf()方法，返回要查找的项在数组中第一次出现位置的索引值。
- 迭代方法：every()、filter()、forEach()、map()、some()。
- 归并方法：reduce()和reduceRight()方法

3. Date类型
Date.parse()、Date.UTC()和Date.now()方法

4. RegExp类型
var expression = / pattern / flags ;
正则表达式的匹配模式支持下列3个标志（flags）：
  1. g：表示全局模式
  2. i：表示不区分大小写
  3. m：表示多行模式
  4. 方法：exec()，test()。

5. Function类型
没有重载
函数声明与函数表达式
作为值的函数：callSomeFunction(functionName , parameter)
函数内部属性：
两个特殊对象：arguments和this。
arguments主要用途是保存函数参数，还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。
this引用的是函数执行的环境对象，当在网页的全局作用域中调用函数时，this对象引用的就是windows。
caller属性：保存着调用当前函数的函数的引用。
函数的属性和方法
函数是一个对象，每个函数都包含两个属性：length和prototype。
- length属性表示函数希望接受的命名参数的个数。
- prototype属性是不可枚举的，因此使用for in无法发现。
每个函数都包含两个非继承而来的方法：apply()和call()，
- 扩充了作用域，对象不需要与方法有任何耦合关系。
- ECMAScript5还定义了一个方法 bind()，该方法创建一个函数实例，其this值会被绑定到传给bind()函数的值。

6. 基本包装类型
三个特殊的引用类型：Boolean、Number和String。
引用类型与基本包装类型的主要区别就是对象的生存期。
Boolean类型：
布尔表达式中的所有对象都会被转成true
Number类型：
toFixed()（四舍五入）、toExponential()（e表示法）、toPrecision()方法（自动选择合适方法）。
String类型
字符方法：charAt()、charCodeAt()。
字符串操作方法：concat()、slice()、substr()、substring()。
字符串位置方法：indexOf()、lastIndexOf()。
trim()方法：删除前缀及后缀空格。
字符串大小写转换方法：toLowerCase()、toLocaleLowerCase()、toUpperCase()、toLocaleUpperCase()。
字符串模式匹配方法：match()方法与RegExp的exec()方法相同，search()方法返回字符串中的第一个匹配项的索引，始终从字符串开头向后查找。replace()方法；split()方法。
localeCompare()方法：比较两个字符串并返回1、0或-1。
fromCharCode()方法：静态方法，接受字符编码转换成字符串，与charCodeAt()相反。

7. 单体内置对象

Global对象
  1. URI编码方法：
    - encodeURI()--替换空格；
    - encodeURIComponent()--替换所有非字母数字字符；
    - decodeURI()方法；
    - decodeURIComponent()方法。
  2. eval()方法：
  3. Global对象属性：特殊值，原声引用类型构造函数都是Global对象属性。
  4. window对象

Math对象
  1. 属性：大都是数学计算中可能会用到的一些特殊值
  2. min()和max()方法。
  3. 舍入方法：
    - Math.ceil()：向上舍入
    - Math.floor()：向下舍入
    - Math.round()：标准四舍五入
  4. random()方法
	5. 其他还包括一些完成简单或复杂计算的方法。

# 第六章 面向对象的程序设计

扩展知识：属性名前加下划线表示只能通过对象方法访问的属性（p141）

1. 理解对象
属性类型：数据属性和访问器属性。
数据属性
数据属性有四个描述其行为的特性：
  - [[Configurable]]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特型，或者能否把属性修改为访问器属性。默认值为true。
  - [[Enumerable]]：表示能否通过for in 返回属性。默认值为true。
  - [[Writable]]：表示能否修改属性的值。默认值为true。
  - [[Value]]：包含这个属性的数据值。默认值为undefined。
要修改属性的默认特性（以上四个），必须使用ECMAScript5的Object.defineProperty()方法。该方法接收三个参数，属性所在对象、属性的名字和一个描述符对象（以上四个）。调用该方法时，如果不指定，四个特性的默认值都是false。
访问器属性
访问器属性有四个特性：
  - [[Configurable]]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特型，或者能否把属性修改为访问器属性。默认值为true。
  - [[Enumerable]]：表示能否通过for in 返回属性。默认值为true。
  - [[Get]]：在读取属性时调用的函数。默认值为undefined。
  - [[Set]]：在写入属性时调用的函数。默认值为undefined。
访问器属性不能直接定义，必须使用Object.defineProperty()来定义。
定义多个属性
Object.defineProperties()方法，第一个参数是要添加和修改其属性的对象，第二个与第一个对象中要添加或修改的属性一一对应。
读取属性的特性
Object.getOwnPropertyDescriptor()方法，参数为属性所在对象和要读取属性的名称，返回值是一个对象。

2. 创建对象
工厂模式，用函数来封装已特定接口创建对象的细节。
构造函数模式
原型模式：
创建的每一个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
isPrototypeOf()方法
Object.getPrototypeOf()方法
hasOwnProperty()方法
原型与in操作符，只要能通过对象访问到属性就返回true，hasOwnProperty()只有属性存在于实例中时才返回true，因此只要in操作符返回true，而hasOwnProperty()返回false，就可以确定属性是原型中的属性。 
Object.keys()方法取得对象上所有可以枚举的属性。
Object.getOwnPropertyNames()方法取得所有实例属性，包括不可枚举（constructor等）
原型的动态性
原生对象的原型
组合使用原型模式和构造函数模式
寄生构造函数模式
稳妥构造函数模式

3. 继承
原型链


# 第七章 函数表达式

函数声明、函数表达式（匿名函数、拉姆达函数）
1. 递归
arguments.callee是一个指向正在执行函数的指针。也可使用一个命名的函数表达式来实现。

2. 闭包
闭包与变量
关于this对象
内存泄漏

3. 模仿块级作用域
``` js
(function (){
	//块级作用域
})();
```
函数表达式后面可以跟圆括号，而函数声明后面不能跟圆括号。

4. 私有变量
特权方法（有权访问私有变量的公有方法）
静态私有变量
模块模式：如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式。
增强的模块模式

# 第八章 BOM

1. window对象
BOM对象的核心是window，它表示浏览器的一个实例。在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。
全局作用域：全局变量不能通过delete操作符删除，而直接在window对象上定义的属性可以。尝试访问未声明的变量会出错，但可以通过查询window对象，可以知道某个可能未声明的变量是否存在。
窗口关系及框架：
``` html
<frameset><frame></frame></frameset>
```
window.frames[0]、top.frames[0]。
parent，在没有框架的情况下parent一定等于top，它们都等于window。
窗口位置：
screenLeft和screenTop属性（screenX，screenY）。moveTo()和moveBy()方法。
窗口大小：
innerWidth、innerHeight、outerWidth、outerHeight。
resizeTo()、resizeBy()方法可以调整浏览器窗口的大小。
导航和打开窗口：
window.open()。
window.close()，仅适用于window.open()打开的窗口，对于浏览器的主窗口，如果没有得到用户允许是不能关闭它的。
新创建的window对象有一个opener属性，其中保存着打开他的原始窗口对象。
安全限制（弹出窗口）
弹出窗口屏蔽程序
间歇调用和超时调用：
超时调用，setTimeout()，第一个参数可以是包含JS代码的字符串，也可以是一个函数（推荐），第二个参数是毫秒表示的时间。调用setTimeout()方法之后，会返回一个数值ID，表示超时调用，这个超时调用ID是计划执行代码的唯一标识符，可以通过它来取消超时调用。
demo：
``` js
//设置超时调用
var timeoutId = setTimeout(function(){
	alert("hello world !");
}, 1000);
//把它取消
clearTimeout(timeoutId);
//执行以上代码什么都不会发生。
```
间歇调用，setInterval()，clearInterval()使用与超时调用类似。
系统对话框：
alert()、confirm()、prompt()。

2. location对象

3. navigator对象

4. screen对象

5. history对象

# 第九章 客户端检测

1. 能力检测（特性检测）
2. 怪癖检测
3. 用户代理检测：
主流四大浏览器内核：
	- Trident ：Internet Explore
	- Gecko：Mozilla Firefox、Netscape
	- WebKit：Safari、Chrome
	- Presto：Opera

# 第十章 DOM

DOM（文档对向模型）是针对HTML和XML文档的一个API。

1. 节点层次
文档节点（document）是每个节点的根节点。总共有12种节点类型。
Node类型
每个节点都有一个nodeType属性，用于表明节点的类型。节点类型由在Node类型中定义的下列12个常量属性来表示：
  1. Node.ELEMENT_NODE=1
  2. Node.ATTRIBUTE_NODE=2
  3. Node.TEXT_NODE=3
  4. Node.CDATA_SECTION_NODE=4
  5. Node.ENTITY_REFERENCE_NODE=5
  6. Node.ENTITY_NODE=6
  7. Node.PROCESSING_INSTRUCTION_NODE=7
  8. Node.COMMENT_NODE=8
  9. Node.DOCUMENT_NODE=9
  10. Node.DOCUMENT_TYPE_NODE=10
  11. Node.DOCUMENT_FRAGMENT_NODE=11
  12. Node.NOTATION_NODE=12

2. nodeName和nodeValue属性：
对于元素节点，nodeName中保存的始终都是元素的标签名，而nodeValue的值始终为null。

3. 节点关系
每个节点都有一个childNodes属性，其中保存着一个NodeList对象，NodeList是一种类数组对象，用于保存一组有序节点，可以通过位置来访问这些节点，但它并不是Array的实例。DOM结构的变化能够自动反映在NodeList对象中。
每个节点都有一个parentNode属性，该节点指向文档树中的父节点。包含在childNodes中的节点具有相同的父节点，每个节点之间是同胞节点，可以通过previousSilbling和nextSibling属性访问。
hasChildNodes()方法在节点包含一个或多个子节点的情况下返回true。
所有节点都有的一个属性是ownerDocument，该属性指向表示整个文档的文档节点。

4. 操作节点
appendChild()方法用于向childNodes列表的末尾添加一个节点，返回值为新增的节点。
insertBefore()将节点放在列表中某个特定的位置上。
replaceChild()替换列表中某节点，并且返回被替换掉并从列表中移除的节点。
removeChild()移除节点，并返回被移除的节点。

5. 其他方法
cloneNode()方法用于创建节点副本，传入参数true表示执行深度复制（复制节点及整个子节点树），false执行浅复制（只复制节点本身）。
normalize()方法处理文档树中的文本节点。当某个节点调用它时就会在该节点的子节点中查找，如果找到了空文本节点，则删除它，如果找到相邻节点，则将他们合并成一个节点。

**Document类型**

在浏览器中，document对象是HTMLDocument（继承自Document类型）的一个实例。
Document节点特征：
- nodeType值为9
- nodeName值为"#document"
- nodeValue、parentNode、ownerDocument值为null
- 其子节点可能是一个DocumentType（最多一个）、Element（最多一个）、ProcessingInstruction或Comment。

1. 文档子节点
内置访问子节点快捷方式：
	- document.documentElement属性始终指向HTML页面中的<html>元素
	- document.body属性直接指向<body>元素

2. 文档信息
title属性
URL属性：包含页面完整的URL
domain属性：只包含页面的域名，可以设置，但不能将其设置为URL中不包含的域
referrer属性保存着链接到当前页面的那个页面的URL

3. 查找元素
getElementById()
getElementByTagName()，返回一个HTMLCollection对象，与NodeList对象类似，可以通过下标（方括号）或item()方法取得其中值，如果包含name属性，也可以通过namedItem()方法取得。
getElementByName()，常用取得单选按钮。

4. 特殊集合

5. DOM一致性检测
document.implementation.hasFeature("XML", "1.0")，返回true或者false。

6. 文档写入
write()、writeln()、open()、close()。

**Element类型**

在HTML中，标签名（tagName）始终都以全部大写表示。
1. HTML元素
标准特性：
id、title、lang、dir、className
2. 取得特性
getAttribute()、setAttribute()、removeAttribute()。
两类特殊属性虽然有对应属性名，但属性的值与通过getAttribute()返回的并不同。第一类特性就是style，第二类特性是onclick这样的事件处理程序。
3. attributes属性
4. 创建元素
createElement()方法创建新元素，IE中可以直接传入标签来创建。
5. 元素子节点
Text类型
开始标签与结束标签之间只要存在内容，就会创建一个文本节点。
1. 创建文本节点
createTextNode()。
2. 规范化文本节点
normalize()方法，在包含两个或多个文本节点的父元素上调用normalize方法时，则会将所有文本节点合并成一个节点。
3. 分隔文本节点
splitText()方法与normalize()方法相反，按指定位置分隔nodeValue值，返回包含剩余部分的一个节点。
Comment类型
Comment类型与Text类型继承自相同的基类。
createComment()方法创建注释节点，浏览器不会识别位于<html>标签外的注释。
CDATASection类型
只针对于XML文档，继承自Text类型。
createCDataSection()方法来创建CDATA区域。
DocumentType类型
不常用，仅Firefox，Safari，Opera支持，浏览器会把DocumentType对象保存在document.doctype中，包括三个属性：name，entities，notations。
DocumentFragment类型
虽然不能把文档片段直接添加到文档中，但可以将它当做一个仓库来使用，即可以在里面保存将来可能会添加到 文档中的节点。
Attr类型
元素的特性在DOM中以Attr类型来表示，特性就是存在于attributes属性中的节点。
2、DOM操作技术
1. 动态脚本

# 第20章 JSON

1、语法
JSON语法可以表示以下三种类型的值：
      ○ 简单值：可以在JSON中表示字符串（双引号）、数值、布尔值和null，不支持JS中的undefined
      ○ 对象：一组无序的键值对（对象属性名要加双引号）
      ○ 数组：一组有序的值列表（用中括号表示，不要末尾分号，与JS数组字面量表示类似）
2、解析与序列化
早期使用JS的eval()函数。
JSON对象有两个方法：
JSON.stringify();
JSON.parse();

# 第21章 Ajax与Comet

1、XMLHttpRequest对象
var xhr=createXHR(); //创建
xhr.open("get", "example.php", true); //准备发送
xhr.send(null); //发送
xhr.abort(); //取消发送
xhr对象具有readyState属性，取值如下：
- 0：未初始化。尚未调用open方法。
- 1：启动。已调用open，未调用send方法。
- 2：发送。已调用send方法，未接收到响应。
- 3：接收。已接收到部分数据。
- 4：完成。已接收到全部数据，而且已经可以在客户端使用了。

HTTP头部信息
setRequestHeader()方法设置自定义请求头部信息，接收两个参数，头部字段的名称和值，需在open之后，send之前调用该方法。
getResponseHeader()方法并传入头部字段名称可取得相应头部信息。
getAllResponseHeader()方法获取一个包含头部信息的长字符串。
GET请求
xhr.open("get", "example.php?name1=value1&name2=value2", true);
POST请求
xhr.open("get", "example.php", true);
send(data);
XMLHttpRequest 2级
- FormData类型
- 超时设定：timeout属性，ontimeout事件。
- overrideMimeType()方法

进度事件
- loadstart事件
- progress事件
- error事件
- abort事件
- load事件
- loadend事件

跨域资源共享
CORS（跨源资源共享）
- 设置请求头Origin
- 使用绝对地址
- 其他跨域技术：
  - 图像Ping（只能发送GET请求，无法访问服务器的响应文本）
  - JSONP（JSON with padding）（从其他域中加载代码执行，不安全，请求失败验证不容易）
  - Comet（长轮询，短轮询，定时发送数据；HTTP流，一次请求，定时发送）

服务器发送事件
- SSE（Server Send Events，服务器发送事件） API
- 事件流

Web Sockets
全双工、双向通信
建立连接取得响应后升级为Web Socket协议，URL的模式也不同，未加密http://变为
ws://，加密https://变为ws://。



