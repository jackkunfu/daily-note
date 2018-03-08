### 赋值，结构
* var {hasOwnProperty} = {}
    - 相当于 var {hasOwnProperty} = new Object()
    - var {hasOwnProperty: hasOwnProperty} = new Object()
    - var hasOwnProperty = new Object()的hasOwnProperty方法
    - var hasOwnProperty = Object.prototype.hasOwnProperty
* var {slice} = []
    - var {slice} = new Array()
    - var {slice: slice} = new Array()
    - var slice = new Array()的slice方法
    - var slice = Array.prototype.slice

### 字典 ？

### 代理 proxy  ??? 

### 委托关联（继承）
* Object.setPrototypeOf(child.prototype, parent.prototype)
    - 把child.prototype对象的原型链对象设置为parent.prototype，实现委托关联（继承）
* child.prototype = Object.create(parent.prototype)
    - 把child.prototype设置为parent.prototype，实现委托关联（继承）
* 不推荐，有副作用的
    - child.prototype = parent.prototype; // 直接引用，改变child.prototype会影响parent.prototype
    - child.prototype = new parent();     // parent构造函数本身的方法逻辑会影响child实例

### class
* 多态：父类的通用行为可以被子类用更特殊的行为重写。实际上，相对多态性允许我们从重写行为中引用基础行为。
* super    // extends 继承中的 constructor 中的 super()相当于es5中的 Parent.call(this, argements)
    - super()    // 调用父级的constructor属性方法，extends类时须用，不然可能会报错 this is not defined
        + super(arguments)   相当于 Parent.call(this, arguments)
    - super.fun()    // 传入this调用父级的静态方法  Parent.fun.call(this, arguments)
        + super.fun(arguments)   相当于 Parent.fun.call(this, arguments)

### instanceof
* 判断对象是不是某个构造函数的实例
    - var a = {};   a instanceof Object     // true

### Object.getPrototypeOf()
* 获取对象的原型对象
    - function A(){}
    - var a = new A()
    - Object.getPrototypeOf(a) === A.prototype     // true
    - Object.getPrototypeOf(a).constructor === A    // true
    
    - Object.getPrototypeOf( Object ) === Function.prototype;   // true
    - Object.getPrototypeOf( Object ) === Object.prototype;   // false

    - var obj = new Object()
    - Object.getPrototypeOf( obj ) === Object.prototype;   // true
    - Object.getPrototypeOf( obj ) === Function.prototype;   // false

### isPrototypeOf
* 获取原型是否是属于对象的原型, 构造函数的原型链，构造函数原型链的原型链。。。Object.prototype   都属于，都返回true
    - function A(){}
    - var a = new A()
    - A.prototype.isPrototypeOf(a)   // true
    - A.isPrototypeOf(a)   // false
    - Object.prototype.isPrototypeOf(a)    // true
    - Object.isPrototypeOf(a)    // false

### Object.assign
* 给target对象拓展source对象的属性
    - Object.assign(target, source)
* source对象中的属性值被覆盖原有的target中相同属性名的值
* 属于浅拷贝

### Object.create
* 创建一个以第一个参数对象为原型的对象
    - var obj = { s: 1 }
    - var a = Object.create(obj)
    - a.s     //   得到 1
    - obj.s = 2
    - a.s     //   得到 2
    - console.log(a.__proto__)     // { s: 2 }
    - a.__proto__.constructor == Object    // true  obj原型对象中没有 constructor 属性，所以继续向上委托查找，委托到Object.prototype上得到Object.prototype.constructor 所以是 Object
* 第二个参数是配置新对象中的各个属性以及属性值的各个属性描述：是否可配置，可修改，可枚举，属性值
    - var a = Object.create({ s: 1 }, {
        d: {
            value: 42,
            writable: true,
            enumerable: true,
            configurable: true
        }
    })
    - a.s     //   得到 1
    - a       //  得到一个 { d: 42 }

### 属性设置和屏蔽
* 获取对象的某个属性值的时候，总是会选择原型链中最底层的该属性的值，其他的高层中的同名属性值都会被屏蔽
* 如果在[[Prototype]] 链上层存在名为foo 的普通数据访问属性并且没有被标记为只读（writable:false），那就会直接在myObject 中添加一个名为foo的新属性，它是屏蔽属性。
* 如果在[[Prototype]] 链上层存在foo，但是它被标记为只读（writable:false），那么无法修改已有属性或者在myObject 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会生屏蔽。
* 如果在[[Prototype]] 链上层存在foo 并且它是一个setter，那就一定会调用这个setter。foo 不会被添加到（或者说屏蔽于）myObject，也不会重新定义foo 这个setter。

### Object.getOwnPropertyDescriptor   // 获取属性相关描述
* Object.getOwnPropertyDescriptor(obj, 'key')
* 返回值对象 { value: xx, configurable: true, enumerable: true, writable: true }

### Object.getOwnPropertyDescriptors   // 获取所有自身属性相关描述，无则返回空对象{}
* 返回值:  
{
    key1: { value: xx, configurable: true, enumerable: true, writable: true },
    key2: { value: xx, configurable: true, enumerable: true, writable: true },
    key3: { value: xx, configurable: true, enumerable: true, writable: true }
}

### Object.defineProperty
* 四个属性： value configurable writable enumerable
* configurable
    - configurable为false时，单项操作，不能撤回，因为已经不可配置，不能配置为true了
    - configurable为false时，可以禁止delete操作
* 如果设置的属性值是一个新的对象，几个属性设置为false的效果，不影响深层次的对象操作，如有需要继续深层次使用Object.defineProperty

### Object.preventExtensions
* 禁止扩展：不能给对象增加新的属性，可对原有属性值进行修改

### Object.seal
* 密封：在 Object.preventExtensions 基础上把所有属性的 configurable 设置为 false
    - 禁止扩展
    - 禁止配置
    - 可以修改已有属性值

### Object.freeze
* 冻结：在 Object.seal 基础上把所有属性的writable设置为false
    - 不可扩展
    - 不可配置
    - 不可修改已有属性值

### hasOwnProperty
* 判断对象是否包含某个属性，不包含原型链上的, 包括不可枚举的也返回true
* in 操作符会检查原型链上的属性

### someObj.propertyIsEnumerable('someKey')
* 判断 someObj 中是否存在可枚举的 属性名未为someKey的属性，返回值为 true 或 false
* someKey 为可枚举的，并且不是原型链上的属性才会返回true

### 对象遍历： Object.keys
* 只返回可枚举的属性名数组
* 只查找本身，不查找原型链上的

### Object.getOwnPropertyNames
* 返回所有属性名数组，包括不可枚举的
* 只查找本身，不查找原型链上的

### 对象遍历 for in
* 遍历对象的可枚举属性，包括原型链上的

### 数组遍历
* for循环
* for in
    - 回调参数值是每一项的属性
* for of 数组中内置 @@iterator 对象，可以用for of遍历，ES6 中的符号Symbol.iterator 来获取数组对象的@@iterator 内部属性
    - for..of会寻找内置或者自定义的 @@iterator 对象并调用它的next() 方法来遍历数据值
    - 回调参数值是每一项的具体的值
    - 原理过程是会向被访问对象请求一个迭代器对象，然后调用迭代器的next()方法来遍历所有值
    - var arr = [ 1, 2, 3 ]
    - var it = arr[Symbol.iterator]();    // 声明一个此数组迭代器
    - it.next()     // { value:1, done:false }
    - it.next()     // { value:2, done:false }
    - it.next()     // { value:3, done:false }     // 调到 3 的时候并没有结束
    - it.next()     // { done:true }     //  这里再调一次才会结束
    - 和数组不同，普通对象没有内置的@@iterator，不能用for of 遍历，可以手动给对象增加@@iterator，来使对象能用for of
    - var obj = { a: 1, b: 2 }
    - Object.defineProperty(obj, Symbol.iterator, {       //  你不知道的javascript上卷
        enumerable: false,    //  不可枚举
        writable: false,
        configurable: true,
        value: function(){
            var idx = 0;
            var keys = Object.keys(this);
            var _this = this;
            return {
                next: function(){
                    return {
                        value: _this[keys[idx++]],
                        done: (idx > keys.length)
                    }
                }
            }
        }
    })
    - 带有 迭代器 属性的对象都可以用 for of 遍历，迭代器对象key键值 Symbol.iterator
    - var randoms = {
        [Symbol.iterator] : function () {
            return {
                next: function(){
                    return {
                        value: Math.random()      // 此处无done  调用时应手动控制结束
                    }
                }
            }
        }
    }
    
    var blankArr = []
    for(var v of randoms){
        blankArr.push(v);
        if(blankArr.length == 100) break;      // 手动控制  break  来结束
    }


* forEach
    - 会遍历数组中所有值，忽略返回值，不能中间停止
    - 回调函数中的操作会改变元数组
* every
    - 判断数组中是否全部都满足某个条件，返回 true 或 false，全部都满足才返回true
* some
    - 判断数组中是否存在满足某个条件，返回 true 或 false，有一个就返回true

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
* async 函数总是返回promise，即使直接返回一个primitive值(return 1;)，async函数也会通过return自动将返回值包装成一个Promise对象返回
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
* 基本写法
```
class A{
    constructor(x, y){
        this.x = x;
        this.y = y;

        // 直接在方法后面写.bind(this)，会报错
        // 解决方法是在constructor里指定，如下
        this.funA = this.funA.bind(this);  // 某些地方调用this.funA时，可能this指向会出错，可以在此bind this来修复，例如在jsx代码中

    }

    funA(){      
        // do sth
    }
}
```
* 与es5构造函数写法的不同
    - class不会变量提升， class未声明之前调用，会出错
    - class 表达式声明的class，会变量提升
    - class 具体执行时必须用new 实例，不然会报错，es5中的构造函数本身也是方法，可直接执行
    - class 中用static标识的静态方法，可以由class本身调用，实例调用会报错
    - 继承class的子类，可以继承class的静态方法，可以调用，子类的实例不能调用， 子类中可以用super关键字调用

### 箭头函数this
* 默认会继承上层的this
* 别的对象调用某个对象的方法a， 如果a 是一个箭头函数，执行时this指向还是原来的对象，会自动保存创建时的this，不受调用影响。
