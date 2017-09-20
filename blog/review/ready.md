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

      9. 从输入url到看到页面发生了什么  

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