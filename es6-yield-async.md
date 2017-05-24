### koa中可以直接用 var data = yield Promise.resolve(data):
* 因为koa中集成了co，可以直接获取生成器函数的执行结果
* [koa-co](http://book.apebook.org/minghe/koa-action/co/start.html)
```javascript
co(function* (){
	var data = yield Promise.resolve({a:1});
	console.log(data.a)    // 1
})
```

* [co实现原理](http://book.apebook.org/minghe/koa-action/co/co.html)
```javascript
function co(fn) {
    return function(done) {
        var ctx = this;
        var gen = fn.call(ctx);
        var it = null;
        function _next(err, res) {
            if(err) res = err;
            // 把res作为最后的next(res)的参数传递出去，让外部变量获取这个值
            it = gen.next(res);
            //{value:function(){},done:false}
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}
```

*不用co时，调用最后一次next()方法，里面传参，该参数会是改生成器函数的返回值*
```javascript
var d = null;
function* gen(){
    d = yield 1;
}
var a = gen();
a.next();
a.next({c:1});
console.log(d)    //  {c:1}
```

### async/await:
* 类似yield，比yield多了层语法糖
* 不需要在继承co模块，直接就可以var d = await 异步方法的形式把异步结果赋给变量
```javascript
async function aa(){
    var data = await Promise.resolve({a:1});
    console.log(data.a)    // 1
}
aa();    // 1
```
