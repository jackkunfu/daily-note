

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
  filters: () => {},   // 过滤器方法函数
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

### Vue.prototype
* 添加全局方法，供各个vue实例调用

### vue-resource
* this.$http.get().then(function(data){  var result = data.body;  // 具体的值在返回值的body键值对里，vue又封装了一层 })

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


### vuex
* 使用
  - Vue.use(Vuex)
  - new Vuex.Store({ state, ..., ... })
  - 各个组件中使用这些值 this.$store.xxx
* 公共状态展示，比如页面顶部导航，每个页面的顶部内容显示都不同
  - 一般在store定义存储一个变量 var state = { topTip:'' }
  - 公共模板实例中 computed : { topTip(){ return this.$store.state.topTip } }
  - 子组件变化时 在子组件 mounted: { this.$store.state.topTip = 'xxx' }, 就可以改变顶部内容的值


### vue-router
* 使用
  - Vue.use(vue-router)
  - 指定模板路径： const XXX = require('@/page/xxx.vue'))
  - 懒加载指定模板路径
    + const XXX = r => require.ensure([], () => r(require('@/page/login')), 'xxx');
    + require.ensure 是webpack 打包时的语法
    + 最后一个参数是包文件的名称
  - var routes = [{path: '/xx', component: XXX, children: [] }]
  - new vueRouter({ routes })
* 命名路由
  - 指定路由路径，组件时加上name字段
  - 组件直减跳转传参
    + query: <router-link :to="{path: '/xxx', query: obj}"></router-link>
    + params: <router-link :to="{name: 'xxx', params: obj}"></router-link>
* 组件中路由跳转
  - this.$router.push(path)
* 路由跳转前的钩子
  ```
    router.beforeEach((to, from, next) => {
      // 路由跳转前的钩
      // console.log(to)
      // console.log(from)
      if (to.matched.some(record => record.meta.requiresAuth)) {
          if (window.localStorage.pdUserId == undefined) {
              next({
                  path: '/',
                  query: { redirect: to.fullPath }
              })
          } else {
              next()
          }
      } else {
          next() // 确保一定要调用 next()
      }  
    })

  ```


### router-view
  - var routes = [{ path: '/xx', component: XXX, children: [{path: '/xx', component: XXX}] }]
  - 组件中可以继续使用router-view


### 抽象组件
* 不会渲染成真实的dom结构
* tempalte
  - 当循环体不是同一个结构时，可以在tempate上进行 v-for 循环，v-if v-else判断不同的情况渲染不同的结构
  - 组件模板必须只有一个根元素，不然会报错
* transtion
  - 定义元素过度的动画，包在需要动画的结构外面，不会渲染出另外的结构
* keep-alive
  - 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
  - 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
  - 组件被缓存，再次切换回来时，貌似不触发组件mounted里的代码
* router-view
  - 配合vue-router使用，渲染不同的组件模板单页应用
  - 组件里也可以使用router-view,这时候一般渲染改组件模板对应路由中的 children 数组中定义的组件



### data
* 如果组件里data中的值是根据另外一个值的判断来初始化为什么值的时候，
  - 可能不能取到准确更新的值，应该是因为数据是同步渲染的，一句判断的时候还在声明阶段，值为undefined
  - 解决方法：需要判断的都默认个初始值，在mounted 函数里再次判断更新这个值

