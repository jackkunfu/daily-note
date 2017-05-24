### http
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