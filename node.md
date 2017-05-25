### http
*http.get*
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
*http.request*
```javascript
// 模拟伪造请求
var http = require('http');
var querystring = require('querystring');
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
});
// 监控http.request实例req的请求出错处理
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// 用write方法传入传递的数据postData
req.write(postData);
// 调用end方法结束改请求
req.end();
```

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

