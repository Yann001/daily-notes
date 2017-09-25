1. `prototype`和`__proto__`的关系是什么?

> http://rockyuse.iteye.com/blog/1426510
>
> https://www.zhihu.com/question/34183746/answer/58068402

``` javascript
var Person = function () {};
var p = new Person();
// new 的作用
// 1. var p = {};
// 2. p.__proto__ = Person.prototype;
// 3. Person.call(p);
// __proto__隐式原型 prototype显式原型
```

2. meta viewport 原理是什么？

> http://blog.csdn.net/zhouziyu2011/article/details/60570547

3. 域名收敛是什么？

   > https://segmentfault.com/a/1190000004641599
   >
   > http://www.chinaz.com/web/2016/0408/520211.shtml

4. 首屏、白屏时间计算

   > http://www.cnblogs.com/littlelittlecat/p/6810294.html
   >
   > https://www.zhihu.com/question/23212408

5. Promise原理，实现异步方法

   > https://segmentfault.com/a/1190000009478377

   ​

   牛客用户总结：

   > https://www.nowcoder.com/discuss/44247?type=0&order=0&pos=8&page=1

   1. cookie和session, cookie和webStorage的区别，如果cookie被篡改怎么办

      2. 跨域的方法  

      3. 因为引用计数产生的内存泄漏，在ES6中的解决办法是什么  

      4. js中基本类型在内存中存储方式是什么，引用类型的存储方式是什么  

      5. 手写jsonp以及常见的响应码，特别问了401  

      6. 渐进增强和优雅降级  

      7. 封装的js插件，事件委托和性能优化  

      8. http连接性能优化，长连接，keep-alive  

   2. 从输入url到看到页面发生了什么  http://www.cnblogs.com/xianyulaodi/p/6547807.html

      10. 前端缓存机制，如果去掉etagslast-modefiedcache-control这些控制缓存的字段，浏览器会怎么处理缓存  

      11. 说一下前端性能优化的各种情况，然后讲清楚每一个类别的细节  

      12. 给定两个整数a和b，要求在使用任何辅助空间的情况下，交换两个的值  

      13. 给两个杯子，一个5升，一个6升，水随便用，最后取出3升水  

      14. 给10个箱子，有一个比其他得要轻，用最少的比较次数找出这个箱子  

      15. React组件声明周期，要传送数据在哪个周期发生，应该怎么实现  

      16. 设计一个产品，实现非前端人员或者运维人员可以方便使用，达到不需要专业前端开发人员就可以实现前端交互实现的功能，详细介绍产品设计的思路、技术选型、用户体验考虑、前端底层支撑实现、项目架构设计和后台架构设计。  

      17. 给你一个团队，怎么去带，怎么分配任务和把控项目进度  

      18. 论文算法细节、创新点。 项目中的架构和技术细节。  

      19. let暂时性死区和块级作用域  

   ​    21.手写给出一个工厂方法实现   

   ​    22.手写给出一个策略模式实现   

   ​    23.手写给出一个装饰者模式实现   

   ​    24.实现深拷贝的方法   

   ​    25.前端安全（XSS、CSRF以及应对措施）   

   ​    26.类数组有哪些   

   ​    27.for in的缺点   

   ​    28.forEach()   

   ​    29.ES6中map遍历的实现原理   

   ​    30.数组去重问题   

   ​    31.React的思想和原理，虚拟DOM树和diff算法   

> https://www.nowcoder.com/discuss/46726?type=0&order=0&pos=30&page=1

https://www.nowcoder.com/discuss/46726?type=0&order=0&pos=30&page=1

## html CSS

- js版本实现快排，优化。

- overflow问题
- em和rem和px
- bfc原理
- 弹性盒子问题， flex布局
- 绝对定位和相对定位
- 让一个不知道尺寸的元素居中。

## JavaScript

- 深度克隆。
- 数组去重所有方法，如果里面有function怎么办？
- 对象的遍历。（hasOwnproperty，for。。。in区别）
- 对象的方法。（能说少说多少）
- 作用域相关知识（ES5中的理解，和Es6中的理解，最好都说一下）
- 箭头函数
- 懒加载
- 声明提升问题（ES5和ES6中的各种区别）
- 事件委托机制的原理（这里可以展开讲，1000万个li，逐一绑定使用事件委托）
- Object.assign方法
- break对forEach的影响。会不会终止forEach循环？
- js中的对象属于什么数据结构?
- 原生实现call apply new
- ES6 中的set
- ES6中的继承（class）
- 设计模式，策略模式，观察者模式
- 判断数组和对象的方法（典型的有三种，toString，instanceof，constructor）
- this的指向问题
- class和prototype的区别，prototype和**proto** 的区别

## 网络

- 手动封装一个ajax
- 手写一个jsonp
- jsonp和ajax的区别
- 跨域相关问题（方法，区别）
- 输入一个URL，发生了什么事情？
- 手写解析URL参数
- 网络协议，各种网络协议分别属于什么层？
- http和https长连接
- 请求报文heade常用字段
- 状态码403和500 分别代表什么
- get和post的区别

## 框架和库其他

- zepto和jQuery事件委托的区别？
- webpack的有什么用
- vue和vuex的区别
- onload和onready的区别
- vue是怎样实现双向绑定的？
- react的生命周期

## 计算机相关知识

- 服务端变成怎样提高效率
- 操作系统的功能
- 寄存器存的是什么的。
- js中的对象属于什么数据结构?
- 链表和数组的区别
- 排序有哪些（你会的），快排的原理
- 数据库的常用方法
- 操作系统 线程有什么状态
- js的线程机制
- 求二叉树的深度