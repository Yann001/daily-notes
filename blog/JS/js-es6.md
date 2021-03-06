# ECMAScript 6 入门学习笔记

> 作者：阮一峰
> 地址：[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)

[TOC]

## ECMAScript 6 简介

1. ECMAScript 和 JavaScript 的关系
2. ES6 与 ECMAScript 2015 的关系
3. 语法提案的批准流程
4. ECMAScript 的历史
5. 部署进度
6. Babel 转码器
7. Traceur 转码器

## let 和 const 命令

### 1. let 命令

#### 基本用法

使用let 的for循环会有两个作用域，设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域，如下例子：

``` js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

#### 不存在变量提升

#### 暂时性死区

注意typeof 操作符使用

#### 不允许重复声明

### 2. 块级作用域

### 3. const命令

ES6 声明变量的六种方法：

- var
- function
- let
- const
- import
- class

### 4. 顶层对象的属性

顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。ES5之中，顶层对象的属性与全局变量是等价的。

ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

### 5. global 对象

## 变量的解构赋值

### 1. 数组的解构赋值

#### 基本用法

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。


### 2. 对象的解构赋值
### 3. 字符串的解构赋值
### 4. 数值和布尔值的解构赋值
### 5. 函数参数的解构赋值
### 6. 圆括号问题
### 7. 用途

## 字符串的扩展

## 正则的扩展

## 数值的扩展

## 函数的扩展

### 1. 函数参数的默认值

### 2. rest 参数

### 3. 严格模式

### 4. 那么属性

### 5. 箭头函数

### 6. 绑定this

### 7. 尾调用优化

### 8. 函数参数的尾逗号

## 数组的扩展

### 1. 扩展运算符

### 2. Array.from()

### 3. Array.of()

### 4. 数组实例的 copyWithin()

### 5. 数组实例的 find() 和 findIndex()

### 6. 数组实例的fill()

### 7. 数组实例的 entries()，keys() 和 values()

### 8. 数组实例的 includes()

### 9. 数组的空位

## 对象的扩展

### 1. 属性的简洁表达式

### 2. 属性名表达式

### 3. 方法的name属性

### 4. Object.is()

### 5. Object.assign()

### 6. 属性的可枚举性

### 7. 属性的遍历

- for in
- Object.keys(obj)
- Object.getOwnPropertyNames(obj)
- Object.getOwnPropertySymbols(obj)
- Reflect.ownKeys(obj)

### 8. __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

### 9. Object.keys()，Object.values()，Object.entries()

### 10. 对象的扩展运算符

### 11. Object.getOwnPropertyDescriptors()

### 12. Null 传导运算符

- ?.

``` js
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
// 等效于
const firstName = message?.body?.user?.firstName || 'default';
```

## Symbol()

### 1. 概述

### 2. 作为属性名的Symbol

### 3. 实例：消除魔术字符串

### 4. 属性名的遍历

### 5. Symbol.for()，Symbol.keyFor()

### 6. 内置的Symbol值

## Set和Map数据结构

### 1. Set

### 2. WeakSet

### 3. Map

### 4. WeakMap

## Proxy

### 1. 概述

### 2. Proxy实例的方法

### 3. Proxy.revocable()

### 4. this问题

### 5. 实例：Web服务器的客户端

## Reflect

### 1. 概述

### 2. 静态方法

### 3. 实例：使用Proxy实现观察者模式

**使用Proxy拦截赋值操作**

## Promise()对象

### 1. Promise的含义

### 2. 基本用法

### 3. Promise.prototype.then()

### 4. Promise.prototype.catch()

### 5. Promise.all()

### 6. Promise.race()

### 7. Promise.resolve()

### 8. Promise.reject()

### 9. 两个附加方法

- done()
- finally()

### 10. 应用

- 加载图片
- Generator函数与Promise的结合

### 11. Promise.try()

## Iterator和for of循环

### 1. Iterator（遍历器）的概念

### 2. 默认Iterator接口

### 3. 调用Iterator接口的场合

- for of
- 解构赋值
- 扩展运算符
- yield*
- Array.from
- Map(),WeakMap(),Set(),WeakSet()
- Promise.all()
- Promise.race()

### 4. 字符串的Iterator（）接口

### 5. Iterator接口与Generator()函数

### 6. 遍历器对象的return(),throw()

### 7. for of 循环

## Generator函数的语法

### 1. 简介

### 2. next()方法的参数

### 3. for of 循环

### 4. Generator.prototype.throw()

### 5. Generator.property.return()

### 6. yield*

### 7. 作为对象属性的Generator函数

### 8. Generator函数的this

### 9. 含义

### 10. 应用

- 异步操作的同步化表达
- 控制流管理
- 部署Iterator()接口
- 作为数据结构

## Generator函数的异步应用

### 1. 传统方法

- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

### 2. 基本概念

### 3. Generator函数

### 4. Thunk函数

### 5. co模块

## async函数

### 1. 含义

### 2. 用法

### 3. 语法

### 4. async函数的实现原理

### 5. 与其他异步处理方法的比较

### 6. 实例：按顺序完成异步操作

### 7. 异步遍历器

## Class的基本语法

### 1. 简介

### 2. 严格模式

### 3. constructor()方法

### 4. 类的实例对象

### 5. Class表达式

### 6. 不存在变量提升

### 7. 私有方法

### 8. 私有属性

### 9. this的指向

### 10. name属性

### 11. Class的取值函数（getter）和存值函数（setter）

### 12. Class的Generator方法

### 13. Class的静态方法

### 14. Class的静态属性和实例属性

### 15. new.target属性

## Class继承

### 1. 简介

### 2. Object.getPrototypeOf()

### 3. super关键字

### 4. 类的prototype属性和__proto__属性

### 5. 原生构造函数的继承

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

### 6. Mixin模式的实现

## 修饰

### 1. 类的修饰

### 2. 方法的修饰

### 3. 为什么修饰器不能用于函数

- 函数提升

### 4. core-decorators.js

### 5. 使用修饰器实现自动发布事件

### 6. Minxin

### 7. Train

### 8.Babel转码器的支持

## Module的语法

### 1. 概述

### 2. 严格模式

严格模式主要有一下限制：

- 变量必须声明后再使用
- 函数参数不能有同名属性
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用0表示八进制数，否则报错
- 不能删除不可删除的属性否则报错
- 不能删除变量delete prop，会报错， 只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字（比如protected，static和interface）

### 3. export命令

### 4. import命令

### 5. 模块的整体加载

### 6. export default命令

### 7. export与import的复合写法

### 8. 模块的继承

### 9. 跨模块常量

### 10 import()

提案，实现动态加载

## Module的加载实现

### 1. 浏览器加载

- defer
- async

< script>标签打开defer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

defer与async的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。

### 2. ES6 模块与 CommonJS 模块的差异

### 3. Node加载

### 4. 循环加载

### 6. ES6模块的转码

- ES6 module transpiler
- SystemJS

## 编程风格

### 1. 块级作用域

- let取代var
- 全局常量和线程安全

### 2. 字符串

### 3. 解构赋值

### 4. 对象

### 5. 数组

### 6. 函数

### 7. Map结构

### 8. Class

### 9. 模块

### 10. ESLint的使用

## 读懂 ECMAScript 规格

> http://www.ecma-international.org/ecma-262/6.0/

### 1. 概述

### 2. 例子

- 相等运算符
- 数组的空位
- 数组的map方法



