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
* async 函数总是返回promise，返回值只是一个primitive值，async函数也会通过return自动将返回值包装成一个Promise对象返回
```
var a = someArr.map(async (item)=>{
    var lists = (await tryAwait('get', '/permission/menu/' + item.id, {})).model || [];
    item.lists = lists;
    console.log(item)
    return item;
})
console.log(a)  //   虽然map 循环里已经只i额return await 之后的值了 ，但是最终 a里的每一项还都是一个promise
// 想得到最终的数据 还是需要await处理下，这里是个Promise数组 可以用Promise.all处理
//  Promise.all前面的await不能省略
var aa = await Promise.all(a);    
console.log(aa)    // 经过Promise.all处理的结果 会是想要的数组，每一项是正常的值

// 上面可以简写
var aa = await Promise.all(
    v.map(async (item)=>{
        var lists = (await tryAwait('get', '/permission/menu/' + item.id, {})).model || [];
        item.lists = lists;
        console.log(item)
        return item;
    })
)
```
* async await如果直接执行出错，会导致后面的代码都不执行，所以需要用到try catch捕获异常处理

### async await 捕获异常
* 直接执行 await somePromiseFun()， 如果存在异常错误，会导致后面的代码全都不执行
```
try{
    await somePromiseFun()
}
catch(e){
    console.log(e);
}
```

### co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。


### class
```
class A{
    constructor(x, y){
        this.x = x;
        this.y = y;


        // 如果想给funA 使用 bind 绑定到this，
        // 直接在方法后面写.bind(this)，会报错
        // 解决方法是在constructor里指定，如下
        this.funA = this.funA.bind(this);

    }

    funA(){      
        // do sth
    }
}
```

### 箭头函数this
* 默认会继承上层的this
* 别的对象调用某个对象的方法a， 如果a 是一个箭头函数，执行时this指向还是原来的对象，会自动保存创建时的this，不受调用影响。
