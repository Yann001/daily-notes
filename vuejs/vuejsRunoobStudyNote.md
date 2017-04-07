# Vue.js Study（runoob)
## Vue.js 目录结构
![img]()
- bulid：最终发布的代码存放位置。
- config：	配置目录，包括端口号等。我们初学可以使用默认的。
- node_modules：npm 加载的项目依赖模块
- src：这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：
    - assets: 放置一些图片，如logo等。
    - components: 目录里面放了一个组件文件，可以不用。
    - App.vue: 项目入口文件，我们也可以直接将组建写这里，而不使用 components 目录。
    - main.js: 项目的核心文件。
- static：静态资源目录，如图片、字体等。
- test：初始测试目录，可删除
- .xxxx文件：这些是一些配置文件，包括语法配置，git配置等。
- index.html：首页入口文件，你可以添加一些 meta 信息或同统计代码啥的。
- package.json：项目配置文件。
- README.md：项目的说明文档，markdown 格式
## Vue.js模板语法
Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。  
Vue.js 的核心是一个允许你采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统。  
结合响应系统，在应用状态改变时，Vue能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上
### 插值
#### 文本
数据绑定最常见的形式就是使用 {{...}}（双大括号）的文本插值：

```html
<div id="app">
    <p>{{ message }}</p>
</div>
```
#### Html
使用 v-html 指令用于输出 html 代码：
```html
<!--v-html指令-->
<div id="app">
    <div v-html="message"></div>
</div>
<script>
    new Vue({
      el: '#app',
      data: {
        message: '<h1>菜鸟教程</h1>'
      }
    })
</script>
```
#### 属性
HTML 属性中的值应使用 v-bind 指令。  
以下实例判断 class1 的值，如果为 true 使用 class1 类的样式，否则不使用该类：
```html
<!--v-bind指令-->
<div id="app">
  <label for="r1">修改颜色</label><input type="checkbox" v-model="class1" id="r1">
  <br><br>
  <div v-bind:class="{'class1': class1}">
    directiva v-bind:class
  </div>
</div>
<script>
new Vue({
    el: '#app',
  data:{
      class1: false
  }
});
</script>
```
#### 表达式
Vue.js 都提供了完全的 JavaScript 表达式支持。
```html
<!--javaScript表达式-->
<div id="app">
    {{5+5}}<br>
    {{ ok ? 'YES' : 'NO' }}<br>
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id">菜鸟教程</div>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    ok: true,
    message: 'RUNOOB',
    id : 1
  }
})
</script>
```
#### 指令
指令是带有 v- 前缀的特殊属性。
指令用于在表达式的值改变时，将某些行为应用到 DOM 上。
#### 参数
参数在指令后以冒号指明。例如， v-bind 指令被用来响应地更新 HTML 属性：
```html
<div id="app">
    <pre><a v-bind:href="url">菜鸟教程</a></pre>
    <!--在这里参数是监听的事件名-->
    <a v-on:click="doSomething">
</div>
<script>
new Vue({
  el: '#app',
  data: {
    url: 'http://www.runoob.com'
  }
})
</script>
```
#### 修饰符
修饰符是以半角句号 . 指明的特殊后缀，用于指出一个指定应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
```html
<form v-on:submit.prevent="onSubmit"></form>
```
#### 用户输入
在 input 输入框中我们可以使用 v-model 指令来实现双向数据绑定：
```html
<div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  }
})
</script>
```
按钮的事件我们可以使用 v-on 监听事件，并对用户的输入进行响应。  
以下实例在用户点击按钮后对字符串进行反转操作：
```html
<!--字符串反转-->
<div id="app">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">反转字符串</button>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
</script>
```
#### 过滤器
Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。由"管道符"指示, 格式如下：
```html
<!-- 在两个大括号中 -->
{{ message | capitalize }}
<!-- 在 v-bind 指令中 -->
<div v-bind:id="rawId | formatId"></div>
```
过滤器函数接受表达式的值作为第一个参数。  
以下实例对输入的字符串第一个字母转为大写：
```html

<div id="app">
  {{ message | capitalize }}
</div>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'runoob'
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
</script>
```
过滤器可以串联：
```html
{{ message | filterA | filterB }}
```
过滤器是 JavaScript 函数，因此可以接受参数：
```html
{{ message | filterA('arg1', arg2) }}
```
这里，message 是第一个参数，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。
#### 缩写
**v-bind 缩写**  
Vue.js 为两个最为常用的指令提供了特别的缩写：
```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```
**v-on 缩写**
```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```
### Vue 实例
#### 构造器
每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例来启动的：
```js
var vm = new Vue({
  // 选项
})
```
#### 属性与方法
每个 Vue 实例都会代理其 data 对象里所有的属性：
```js
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```
除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。例如：
```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```