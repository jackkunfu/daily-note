1. v-bind:  v-bind:src="{{ img.src }}" 简写成 :src="img.src" (简写后{{}}需去掉)

2. v-for:   v-for="item in items" 或者 v-for="(value, index) in items"  //value在前~

3. $index： <div @click="delItem($index)"></div> //$index可以在v-on=的方法中直接用来作为参数

4. data-XXX:  <div :data-index="index"></div>   //前面加:来绑定
	
5. $event:  vue中获取点击的当前元素可以在点击的方法里传入参数 $event：
		$event.currenTarget为当前绑定事件的原生dom元素
		$event.srcElement位当前点击到的原生dom元素

6. this.$options  用于用来获取实例中自定义的属性

7. this.$data  用于用来获取实例中的data对象

8. Vue.set/vm.$set     //基于原生Object.defineProperty实现
	//给当前的实例中的data对象的ss属性动态增加新未声明的值 
	Vue.set(this.ss, 'a', a)  或者  vm.$set(this.ss, 'a', a);
	注意点：第一个参数不能为this.$data对象，直接给根元素添加新属性值无效，新的根元素建议直接data里新增上
		直接this.ss.a = XXX  这种写法不能达到响应式改变页面内容的效果 需要用Vue.set或当前实例的$set

	或者：

	this.ss = Object.assign({}, this.ss, { a: 1, b: 2 })   、、这个可以

	Object.assign({}, this.ss, { a: 1, b: 2 })  这句不行

	this.ss = Object.assign(this.ss, { a: 1, b: 2 })  这样第一个参数不是一个新的空对象也不行
