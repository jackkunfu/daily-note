### 赋值，结构 
* var {hasOwnProperty} = {}
    - 相当于 var {hasOwnProperty} = new Object()
    - var {hasOwnProperty: hasOwnProperty} = new Object()
    - var hasOwnProperty = new Object()的hasOwnProperty方法
    - var hasOwnProperty = Object.prototype.hasOwnProperty
* var {slice} = []
    - var {slice} = new Array()  var
    - var {slice: slice} = new Array()
    - var slice = new Array()的slice方法
    - var slice = Array.prototype.slice

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

*generator function 的特征是 constructor.name === 'GeneratorFunction'*
*generator 对象，特征是带有 next 与 throw 方法*
```javascript
//判断是否是 generator function
function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}
//判断是否是 generator 对象
function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
} 
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


##co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。