### koa中可以直接用 var data = yield Promise.resolve(data):
	* 因为koa中集成了co，可以直接获取生成器函数的执行结果
	* [koa-co](http://book.apebook.org/minghe/koa-action/co/start.html)

```javascript
co(function* (){
	var data = yield Promise.resolve({a:1});
	console.log(data.a)    // 1
})
```
