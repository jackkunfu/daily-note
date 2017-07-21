### node 常用模块
*url*
* url.parse(url, false, false)
    - // 结果解析的url的各个字段信息
    - // 后两个参数可以不传，默认false
    - // 第二个参数设成true可以把query字段值得字符串变成对象
    - // 第二个参数设成true可以避免url不规范时获取值得准确
    - url.parse
* url.resolve(url, path)
    - // 把url, path拼接起来
    - // 如果url中有好几级，会把原有的多级去掉
    - url.resolve('http://www.aa.com/b/c/d', '/e/f') // 'http://www.aa.com/e/f'


*querystring*
* querystring.stringify()   // 把对象序列化成字符串
    - (object, 各个键值对的分隔符, 键值key与键值的分隔符)
    - 第二个，第三个参数可以不传，默认是&符号和=符号
* querystring.parse()   // 反序列化，把对象字符串序列化成对象
    - 三个参数和stringify参数一致，反序列化的符号，根据字符串连接的符号处理
* querystring.escape(str)  // 把汉字转义
    - querystring.escape('<囧>')   // '%3C%E5%9B%A7%3E'
* querystring.escape(str)  // 反转义
    - querystring.escape('%3C%E5%9B%A7%3E')   // '<囧>'

### cross-env
*启动项目时设置环境变量命令，兼容window和mac*
    - npm i cross-env --save-dev 
    - cross-env NODE_ENV=development && ....



## http
* http.get
* 一般用在不用传递参数数据，查询获取一些数据
```javascript
// 获取网页源码
var http = require('http');
http.get(url, function(res){
    var html = '';
    // 参数res的监听data事件
    res.on('data', function(str){
        html += str;
    })
    // 参数res的监听end事件
    res.on('end', function(){
        console.log(html);
    })
}).on('error', function(err){
    console.log(err);
})
```

* http.request
* 一般用于存在post请求，需要传递数据以及更改数据
```javascript
// 模拟伪造请求
var http = require('http');
var querystring = require('querystring');
// 传递的参数数据
var postData = querystring.stringfy({
    key1: '',
    key2: ''
})
// 封装参数对象
var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    // 这里是请求头中个各种headers信息
    'Accept': '',
    'Accept-Language': 'es,zh'
    'Content-Length': postData.length,
    'Origin': '',
    ...
    'Cookies': '',
    ...
  }
};
// 声明一个http.request实例对象 req
var req = http.request(options, function(res) {    
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {    // 监控http.request的data变化事件
    console.log('BODY: ' + chunk);
  });
  res.on('end',function(){
    console.log('执行同步')
  })
});
// 监控http.request实例req的请求出错处理
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// 用write方法传入传递的参数数据postData
req.write(postData);
// 调用end方法结束改请求
req.end();
```


## Event 
* node事件处理方法
* var EventEmitter = require('events').EventEmitter;
* var emit = new EventEmitter();
* emit.on('事件名', callback-function)
* 同一个事件名称官方建议最多绑定10个事件
* 移除已注册添加的事件：removeListener('事件名', 事件方法)
* 移除所有的事件方法：removeAllListeners('事件名')   // 如果不传事件名，会移除所有事件名的所有事件
```
var EventEmitter = require('events').EventEmitter;
var emit = new EventEmitter();

var f1 = function(){
  console.log(1)
}

var f2 = function(){
  console.log(2)
}

// 注册实例各个事件
emit.on('data', f1)
emit.on('data', f2)

// 移除某个注册的事件
emit.removeListener('data', f1)

// 移除某个注册的事件
emit.removeListener('data', f1)

// 触发执行注册的事件
emit.emit('data')
```



### V8优化技术
* 隐藏类（Hidden Class）
  - 为了减少JavaScript中访问属性所花的时间，V8采用了和动态查找完全不同的技术实现属性的访问：动态地为对象创建隐藏类。这并不是什么新想法，基于原型的编程语言Self就用map来实现了类似功能。在V8中，当一个新的属性被添加到对象中时，对象所对应的隐藏类会随之改变
  - 使用隐藏类主要有两个好处：属性访问不再需要动态字典查找；为V8使用经典的基于类的优化和内联缓存技术创造了条件。 
* 内联缓存（Incline Cache）
  - 在第一次执行到访问某个对象的属性的代码时，V8会找出对象当前的隐藏类。同时，假设在相同代码段里的其他所有对象的属性访问都由这个隐藏类进行描述，并修改相应的内联代码让他们直接使用这个隐藏类。当V8预测正确时，属性值的存取仅需一条指令即可完成。如果预测失败，则再次修改内联代码并移除刚才加入的内联优化。 
  - 如果对象的隐藏类和缓存的隐藏类不一样，执行会跳转到V8运行系统中处理内联缓存预测失败的地方，在那里原来的内联代码会被修改，以移除相应的内联缓存优化。如果预测成功，属性x的值会被直接读出来。 
* 两次编译与反优化（Crankshaft）
  - 尽管JavaScript是个非常动态的语言，且原本的实现是解释性的，但现代的JavaScript运行时引擎都会进行编译。V8（Chrome的JavaScript）有两个不同的运行时（JIT）编译器。
  - “完全”编译器（Unoptimized）：一开始，所有V8代码都运行在Unoptimized状态。它的好处是编译速度非常快，使代码初次执行速度非常快
  - “优化”编译器（Optimized）：当V8发现某段代码执行非常热时，它会根据通常的执行路径进行代码优化，生成Optimized代码。优化代码的执行速度非常快。 
* 高效垃圾收集 
  - 最初的V8引擎垃圾收集是不分代的，但目前V8引擎的GC机制几乎采用了与Java Hotspot完全相同的GC机制。对Java虚拟机有经验的开发者直接套用。
  - 但V8有一个重要的特性却是Java没有的，而且是非常重要的特性，因此必须要提一下，这个特性叫Incremental Mark+Lazy Sweep。它的设计思路与Java的CMS垃圾收集类似，就是尽量减少GC系统停顿的时间。不过在V8里这是默认的GC方式，不象CMS需要非常复杂的配置，而且还可能有Promotion Fail引起的问题
  - 只要保证Node.js内存大小不超过500MB，V8即使发生Full GC也能控制在50毫秒内，这使Node.js在开发高实时应用（如实时游戏）时比Java更有优势。
* 编写对V8友好的高性能代码 
  - 在构造函数里初始化所有对象的成员（因此这些实例之后不会改变其隐藏类）。 
  - 隐藏类：避免使用了不同的隐藏类，越避免隐藏类的派生，就会获得越高的性能。
    + 总是以相同的次序初始化对象成员。
    + 永远不要delete对象的某个属性。
  - Deoptimized的教训 
    + 如果一个操作的输入总是相同类型，则其为单态操作。否则，操作调用时的某个参数可以跨越不同的类型，那就是多态操作。
    + 单态操作优于多态操作；
    + 谨慎使用try catch与for in。

