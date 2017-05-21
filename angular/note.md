调试工具
* chrome + Angular batarang
* git tortoisegit
* cmd powercmd
* grunt 编译压缩
* bower 依赖管理
* http-server 轻量级server，能映射本地文件目录为http地址
* karma jasmine 单元测试
* protractor (只能angular)

指令（directive）
``` js
myModule.directive('hello', function () {
	return {
    	scope: {}, // 创建独立作用域
    	restrict: 'A|C|E|M',
        require: 'otherDirective', // 依赖其他项
        template:'<h1>Hello World<div ng-transclude></div></h1>,
        transculde|replace: true|false, // (标签内部内容处理方式，指令嵌套)
        controler: function ($scope) {
        	// 暴露接口给外部调用，和angular的控制器不同
        }
        compile：function() {
        	// 自定义编译
        },
        link：function(scope, element, attrs, otherDirectiveCtrl) {
        	// 自定义链接，设置内部属性
        }
    }
})
```
使用：
- A
- E
- C
- M

模板缓存
// 注册完成后只执行一次
module.run(function($templateCache){})

指令执行机制
1. 加载：加载angular.js，找到ng-app指令，确定应用边界
2. 编译：
	1. 遍历DOM，找到所有指令
	2. 根据指令代码中的template，replace，transculde转换DOM 结构
	3. 如果存在compile函数则调用
3. 链接
	- 对每一条指令运行link函数
	- link函数一般用来操作DOM（添加样式，属性等），绑定事件监听器

scope的绑定策略
- @，把当前属性作为字符串传递，可以绑定来自外城scope的值，在属性中插入{{}}即可
- =，与父scope中的属性进行双向绑定
- &，传递一个来自父scope的函数，稍后调用

第三方指令库：
- angular-ui
- miniui
- easyui
- sencha
- kissyui

设计来源 Adobe flex

Server与Provider

*Chrome设置启动参数可以访问本地目录，或设置http容器访问本地目录*

Service，Provider，Factory本质都是Provider
Provider模式是策略模式+抽象工厂模式的混合体

$filter是用来进行数据格式化的专用服务

# 三

angular启动
1. 用自执行函数的形式让整个代码在加载完成之后立即执行
	- 在window上暴露一个唯一的全局对象angular
2. 检查是不是多次导入angular
	- 通过检查指定元素上是否已经存在injector进行判断
3. 绑定jQuery bindJQuery()
	- 如果有导入jQuery，则用导入的，否则用它自己的jqLite
4. 发布ng提供的API：publishExternalAPI();
	1. 工具函数拷贝到angular全局对象上
	2. 调用setupModuleLoader方法创建模块定义和加载工具（挂在全局对象window.angular上）
	3. 构建内置模块ng
	4. 创建ng内置的directive和provider
	5. 两个重要的provider：$parse和$rootScope
5. angularInit();