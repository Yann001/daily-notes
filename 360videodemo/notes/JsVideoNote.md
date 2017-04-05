## 第三讲
### let const
- let 解决了for循环闭包问题
- const定义的变量不能被修改
---
### 变量不声明直接使用
```JavaScript
//"use strict"
(function(){
    var a = b = 10;
})();
console.log(a);
console.log(b);
```
- 非严格模式：
    - 提升为全局变量，undefined
- 严格模式
    - 报错
---
### 类型转换
布尔操作符&&和||并不会转换类型，有短路特性。
### 处理字符
模板字符串：
```JavaScript
//注意不是单引号
const mulStr = `这里是
	多行
	字符串 `;
console.log(mulStr,typeof mulStr);
let who = 'YXY',
    what = 'JS';
let	str = `${who} like ${what}`;
console.log(str,typeof str);
let output = (a,b) => `${a} + ${b} is ${a + b}`;
console.log(output(3,4));
```
---
## 第四讲 函数
- 函数声明、函数表达式
- 匿名函数
- 函数参数
- 作用域、闭包、this
- apply、call、bind
- 关于异步回调
- 函数的动态构建
- 函数式编程
- 如何封装好的函数
### 函数声明和函数表达式（hosting）
函数声明会被提升
### 匿名函数与arguments.callee

```JavaScript
//arguments.callee
function countDown(count, interval, callback){
  if(count <= 0) return;
  callback(count);
  setTimeout(function(){
    if(--count > 0){
      setTimeout(arguments.callee, interval);
    }
    callback(count);
  }, interval);
}
countDown(10, 1000, t => console.log(t));
```
推荐使用具名函数
```JavaScript
//具名函数update
function countDown(count, interval, callback){
  if(count <= 0) return;
  callback(count);
  setTimeout(function update(){
    if(--count > 0){
      setTimeout(update, interval);
    }
    callback(count);
  }, interval);
}
countDown(10, 1000, t => console.log(t));
```
### 函数的参数
- function.length
- 可变参数与arguments
- rest参数

```JavaScript
let add = (...args) => args.reduce((a,b) => a + b);
console.log(add(1,2,3,4)); //10
console.log(add.length); //0
function deepCopy(des, src) {
    if(!src || typeof src !== 'object') {
        return des;
    }
    for(let key in src) {
        let obj = src[key];
        if(obj && typeof obj === 'object') {
            des[key] = des[key] || {};
            deepCopy(des[key], obj);
        } else {
            des[key] = src[key];
        }
    }
    return des;
}
function merge(des, ...objs){
  return [des, ...objs].reduce((a, b) => deepCopy(a, b));
}
console.log(merge({x:1}, {y:2}, {z:3})); //[object Object] {x: 1, y: 2, z: 3}
```
参数默认值：
```JavaScript
//es5
function say(message){
    var msg = message || 'default message';
    console.log(msg);
}
//es6
function say(message = 'default message'){
    console.log(msg);
}
```
## 作用域、闭包、this
- 重要：ES5 用函数来构建作用域
- IIFE：立即执行函数
- 什么是“闭包”
- JavaScript 的 “this”

```JavaScript
//闭包
for(var i = 0; i < 10; i++){
    (function(i) {
        setTimeout(function(){
            console.log(i);
        }, 100 * i);
    })(i);
}
//bind(部分执行)
for(var i = 0; i < 10; i++){
  setTimeout((function(i){
    console.log(i);
  }).bind(null, i), 100 * i);
}
// let
for(let i = 0; i < 10; i++){
    setTimeout(function(){
        console.log(i);
    }, 100 * i);
}
```
闭包与私有数据

```JavaScript
// 闭包
var MyClass = (function(){
  var privateData = 'privateData';
  function Class(){
    this.publicData = 'publicData';
  }
  Class.prototype.getData = function(){
    return privateData;
  }
  return Class;
})();
var myObj = new MyClass();
console.log([myObj.publicData, myObj.privateData, myObj.getData()]);
// let
let Class;
{
  let privateData = 'privateData';
  Class = function(){
    this.publicData = 'publicData';
  }
  Class.prototype.getData = function(){
    return privateData;
  }
};
var myObj = new Class();
console.log([myObj.publicData, myObj.privateData, myObj.getData()]);
```
this：
JavaScript 的 this 是由函数求值时的调用者决定的！！

```JavaScript
function Point2D(x, y){
  this.x = x;
  this.y = y;
}
Point2D.prototype.showLength = function(){
  var length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  console.log(length);
}
Point2D.prototype.showLengthAsync = function(){
  var self = this;
  setTimeout(function(){
    self.showLength();
  }, 1000);
  /*setTimeout(() => {
    this.showLength();
  }, 1000);*/
}
var x = 30, y = 40;
var p = new Point2D(3, 4);
```
### apply、call、bind
- 通过 apply、call 指定 this 调用函数
- ES5 的 bind
- bind 的重要意义和高级用法
## 异步与回调函数
JavaScript的异步
- Timer(requestAnimationFrame)
- 事件
- 获取数据 API
- Promise
- 其他异步模型
## 函数的动态构建
- Function 构造器与函数模板
- 过程抽象与高阶函数

用 Function 处理不规范的 JSON

```JavaScript
//处理不规范的 json
var brokenJSON = `{
  a: 1,
  b: 2,
  c: 'message',
}`;
function parseData(data){
  return (new Function('return ' + data))();
}
try{
  console.log(JSON.parse(brokenJSON));
}catch(ex){
  console.log(ex.message);
  console.log(parseData(brokenJSON));
}
var add = new Function('x', 'y', 'return x + y;');
add(1, 2);
```
## 过程抽象与函数式编程
- 过程抽象的定义
- 纯函数
- 等价函数
- 举例说明
- 过程抽象与函数式编程

### 纯函数
**什么是纯函数？**  
一个函数如果输入参数确定，如果输出结果是唯一确定的，那么它就是纯函数。  
**纯函数的好处？**  
无状态、无副作用、幂等、无关时序  
过程抽象提升函数纯度：

```JavaScript
function setColor(el, color){
  el.style.color = color;
}
// 原始方法
function setColors(els, color){
  Array.from(els).map(el=>setColor(el, color));
}
// 过程抽象
function __multi__(fn){
  return function(arrayLike, ...args){
    return Array.from(arrayLike).map(item=>fn(item, ...args));
  }
}
//let setColors = __multi__(setColor);
setColors(document.querySelectorAll('#datalist > li'), 'red');
// 再比如
function add(x, y) {
    return x + y;
}
add = __multi__(add);
console.log(add([1, 2, 3],3)); // [4, 5, 6]
```
等价函数：
- 拦截和监控
- 性能优化?
- 函数异步化和串行执行（reduce&pipe）（express底层）

```JavaScript
function __equal__(fn){
  // 可以做些什么
  return function(...args){
    // 也可以在这里做些什么
    return fn.apply(this, args);
  }
}
```
throttle 避免重复点击：
```JavaScript
const btn = document.getElementById('btn');

function throttle(fn, wait){
    var timer;
    return function(...args){
        if(!timer){
            timer = setTimeout(()=>timer=null, wait);
            return fn.apply(this, args);
        }
    }
}

//按钮每500ms一次点击有效
btn.onclick = throttle(function(){
    console.log("button clicked");
}, 500);const btn = document.getElementById('btn');
function throttle(fn, wait){
    var timer;
    return function(...args){
        if(!timer){
            timer = setTimeout(()=>timer=null, wait);
            return fn.apply(this, args);
        }
    }
}
//按钮每500ms一次点击有效
btn.onclick = throttle(function(){
    console.log("button clicked");
}, 500);
```
debounce 避免重复点击:
```JavaScript
const btn = document.getElementById('btn');
function debounce(fn, delay){
    var timer = null;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}
btn.onclick = debounce(function(){
    console.log("clicked");
}, 300);
```
multicast 批量操作 DOM 元素:
```JavaScript
function multicast(fn){
  return function(list, ...args){
    if(list && list.length != null){
      return Array.from(list).map((item)=>fn.apply(this, [item,...args]));
    }else{
      return fn.apply(this, [list,...args]);
    }
  }
}
function setColor(el, color){
  return el.style.color = color;
}
setColor = multicast(setColor);
var list = document.querySelectorAll("li:nth-child(2n+1)");
setColor(list, "red");
```
### 如何封装好的函数
- 明确职责
- 限制副作用
- 过程的优化
- 掌握抽象度
---
## 第五讲 BOM&DOM
### UI组件设计
如何设计一个UI组件
1. 结构设计
2. API设计
3. 控制流设计

