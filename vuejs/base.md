# imooc

``` bash
npm install vue
nom install vue@csp
```
``` js
new Vue({
	el:
    components:(组件注册，注册了才能在html里用标签引用)
	data:
    methods:
    watch:
})
```

数据渲染
- v-test
- v-html
- {{ }}
- v-if (直接不渲染)
- v-show (display: none)
- v-for (item in items)
- v-on: (事件绑定，从methods里取方法)
- v-bind:(属性，class)

组件之间通信
- props（写在子组件里） (父组件->子组件)