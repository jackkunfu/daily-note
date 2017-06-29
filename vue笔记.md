

5. $event:  vue中获取点击的当前元素可以在点击的方法里传入参数 $event：
		$event.currenTarget为当前绑定事件的原生dom元素
		$event.srcElement位当前点击到的原生dom元素

6. this.$options  用于用来获取实例中自定义的属性

7. this.$data  用于用来获取实例中的data对象

8. 
	//给当前的实例中的data对象的ss属性动态增加新未声明的值 
	Vue.set(this.ss, 'a', a)  或者  vm.$set(this.ss, 'a', a);
	

	或者：

	this.ss = Object.assign({}, this.ss, { a: 1, b: 2 })   、、这个可以

	Object.assign({}, this.ss, { a: 1, b: 2 })  这句不行

	this.ss = Object.assign(this.ss, { a: 1, b: 2 })  这样第一个参数不是一个新的空对象也不行

### 异步模板
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

Vue.component('async-webpack-example', function (resolve) {
  // This special require syntax will instruct Webpack to
  // automatically split your built code into bundles which
  // are loaded over Ajax requests.
  require(['./my-async-component'], resolve)
})

Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)

new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})

### $refs 获取当前组件元素    查找元素  可以减少获取dom节点的消耗了
* 组件结构中有子组件带有属性ref="aa"标识， 获取该组件方法为 this.$refs.aa 


### 简写
* v-bind => : 
  - :src
  - :class
  - :data-xx

* v-on => @
  - @click


### vue2.0 改动
* ready => mounted
  - mounted 方法不能保证dom已经编译加载完毕，最好需要再加上 this.$nextTick(function(){  // do sth   })
* $index
  - 1.0中时直接可以在循环中使用$index, 2.0中不能使用
  - 2.0循环用 (value,index) in someArr  具体元素中直接用括号里的第二个变量字段


### 实例正常结构
```
new Vue({
  el: '',  
  data: {},   // 数据模型
  filter: () => {},   // 过滤器方法函数
  mounted: () => {},   // 加载业务逻辑
  methods: () => {}    //  事件处理注册
})
```

### Vue.set/vm.$set     //基于原生Object.defineProperty实现
* 添加data数据模型中没有的属性，为了能双向绑定需要用
* Vue.set(key(data上已存在的或者其他的字段item等), newKey(要添加的字段), value(添加字段的值))
* this.$set()  //   两种写法
* 注意点：第一个参数不能为this.$data对象，直接给根元素添加新属性值无效，新的根元素建议直接data里新增上
  - 直接this.ss.a = XXX  这种写法不能达到响应式改变页面内容的效果 需要用Vue.set或当前实例的$set

### v-model
* 用在需要联动的数据字段上，比如输入框，当输入框内容变化时，需要更新别的地方内容，需要用到v-model

