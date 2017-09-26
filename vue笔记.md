

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
  - 组件之间跳转传参
    + query: <router-link :to="{path: '/xxx', query: obj}"></router-link>
    + params: <router-link :to="{name: 'xxx', params: obj}"></router-link>
* 组件js中跳转到另一个组件
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
  * 组件之间传参，貌似传递的只是一个引用关系，内存中的数据还是同一块
    - 比如编辑列表，跳转后的编辑页面中更改内容
    - 不保存直接浏览器返回，没保存的数据也会更新到列表中有相应变化
    - 解决方法
    - 获取到传递过来的数据this.$route.xxx 之后的
    - copy出一个同样的数据到一个变量，让组件中的字段等于这个单独的变量


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

### methods
* methods 里的方法不能用箭头函数，用箭头函数访问不到data中的字段
    - 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例
```
methods: {
  add: function(){},
  edit: function(){}
}
```

### 数组内容变化，Vue检测不会更新dom
* 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
* 当你修改数组的长度时，例如： vm.items.length = newLength
* 解决方法：用Vue.set/this.$set或者用Vue的数组变异方法，可以触发dom更新
```
// 下面三个方法都可以执行
Vue.set(arr, index, newDataObj)
this.$set(arr, index, newDataObj)
arr.splice(index, 1, newDataObj)
```
* 给数组中的项增加临时的属性字段或者数组中的数组增加临时属性字段
    - 新增字段变化时，vue监测不到数据的变化，从而不会改变dom
    - 解决方法：循环设置$set
    ```
        //  准备给lists中的所有项增加一个cur字段，代表当前有没有被选中
        this.conditionArr = [
            {
                name: '周期', 
                list: [
                    {name: '今天'}, {name: '最近3天'}, {name: '最近7天'}
                ]
            },
            {
                name: '周期', 
                list: [
                    {name: '今天'}, {name: '最近3天'}, {name: '最近7天'}
                ]
            }
        ]

        var _this = this;
        this.conditionArr.forEach((element, i) => {
            element.list.forEach((el, j) => {
                //这句时注释的不能用
                // el.cur = false;   // 直接循环设置新值，vue监测不到数据变化，不会更新dom，

                // 上面那句看似正常的逻辑和下面实际正常的逻辑不能一起用，一起用会导致下面的也没有效果
                this.$set(this.conditionArr[i].list[j], 'cur', false)  // 这句设置值的同时，也把新增的属性挂在到vue上，可以被监测到
            })
        })
    ```


### mixins
* 最大化的复用代码（偷懒）
* 定义一些公用的的数据以及逻辑的一个对象
* 把该对象放到实例的mixins数组里
```
var mix = {
  data(){
    return {
      key: v,
      key2: vv
    }
  },
  methods: {
    a(){},
    b(){}
  }
}

// 实例中就可以用 mixins 引用外部的定义好的周期方法及属性
new Vue({
  mixins: [mix],
  data(){},
})
//
```
* mixins里定义的字段会先初始化，然后组件本身的属性才初始化，最终进行合并
* 重复字段的，组件本身后初始化，组件本身的优先级较高
* mixins之后，组件data里无须再定义变量，组件data里也要return {}，不然会报错
* 原因应该是Vue的合并策略methods对象可以被合并，data/mounted 这些是方法被重新执行覆盖掉了

### 生产环境部署
* vue-cli默认的打包部署到服务器子目录会出现不抱错，但是页面空白的情况
  - 原因：找不到对应路由
  - 方法：项目文件夹config文件夹index.js里 assetsPublicPath 改成 子目录的路径名称，重新打包即可

### v-html
* 可以让html结构以html结构展示


### vue子组件获取父组件异步传来的数据
* 传递不了数据的变化,深层次的新增的动态变量数据，须this.$set，来让数据vue监控数据的变化
* 传值props时的变量要用 v-bind:xxx    简写成 :xxx
* 解决：
  - 调用子组件时，外层再增加个异步请求到的数据的判断，有变化或者存在时才渲染，能获取到异步请求之后的数据
    + div(v-if="pageInfo.curPage")
      + page-ctn(:curPage="pageInfo.curPage" :totalPage="pageInfo.totalPage" @pageChange="pageChange")
  - 异步请求之后，要用this.$set设置数据的监控
    + this.$set(this.pageInfo, 'curPage', d.model.page)
      + this.$set(this.pageInfo, 'totalPage', d.model.total)

### 子组件获取到props之后的处理
* props中的获取的变量，不能直接使用在子组件dom中，须子组件定义一个新值去保存传递过来的数据
```
props: ['aaa'],
data(){
  return {
    : this.aaa
  }
}
```
* 当子组件渲染之后,父组件中的传递过来的数据变化时，子组件的数据却不跟着变化的解决方法
  - 需要用到computed, computed中定义变量的方法是 return 传过来的值，这样就可以更新父组件中的值的变化
  - 不过这样可能会报xxx没有设置setter
```
props: ['aaa'],
computed: {
  xxx() {
    return this.aaa
  }
}
```
  - 设置setter
```
props: ['aaa'],
computed: {
  xxx: function() {
    get: function(){
      return this.aaa
    },
    set: function(v){
      this.aaa = v
    }
    
  }
}
```
  - 不过设置好set之后，功能正常了，不过可能会有错误信息，说不能直接使用props里的值，但不影响功能



### 复杂数据渲染时，可能深层次的数据缺失，导致报错，渲染失败
* 需要在深层次dom数据渲染的dom 或父级元素上 做个判断 v-if 就会避免数据缺失报错，不渲染的情况
```
div(v-if="item.acApiStatistics")
  .row 访问量: {{item.acApiStatistics.visitCount}}
  .row 总耗时: {{item.acApiStatistics.durationSize}}
  .row 平均耗时: {{item.acApiStatistics.durationSizeAverage}}
  .row 成功次数: {{item.acApiStatistics.visitSuccessCount}}
  .row 失败次数: {{item.acApiStatistics.visitFailCount}}
  .row 成功率: {{item.acApiStatistics.visitSuccessPercent}}
```


### 小规范
* props数组里的属性，不需要在data里再次声明，可以直接dom中用
* computed里的属性，在data里重复定义会报错, 应该是我computed没搞懂
* 组件template里根元素只能有一个，多个会报错
* methods 对象里的方法不能用箭头函数，继承不到this

### 小技巧
* @click=""的事件中可以写多条执行语句
    - span(@click="cur=j;someMthod(i,j)")






