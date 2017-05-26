##字节流

### Buffer
*二进制保存数据*
```javascript
var buf = new Buffer('Hello 慕课网');
// <Buffer 48 65 6c 6c 6f 20 e6 85 95 e8 af be e7 bd 91>
```
* 其中48代表H，65代表e，6c代表l以此类推，20代表空格，之后三个一组表示一个汉字
*默认是utf-8的格式，可以换成base64的格式*
```javascript
var buf = new Buffer('Hello 慕课网', 'base64');
// <Buffer 1d e9 65 a1 44>  // 这个对应逻辑暂时未知
```
*可以实例化时设置buffer的长度*
*用write写入存储的数据，超过长度的将忽略*
```javascript
var buf = new Buffer(7);
buf.write('12345678');  // 长度为7 写入8位，最后一个将被忽略，不被存储
```
*存储数组数据*
```javascript
var buf = new Buffer([1,2,3,4]);  // 如果数组里的值是小数，保存时不会存储小数，取整存储
buf[0]   // 1  (可以通过下标获取原数组的对应的下标值)
```
*读取Buffer实例中的数据转换成别的编码数据,toString*
* buf.toString()默认的参数是'utf8'，可以传入其他编码格式转换成其他编码的数据
* 同一个数据的不同编码的保存内容
```javascript
var buf = new Buffer('hello 哈哈');
console.log(buf.toString())    // 'hello 哈哈'  
console.log(buf.toString('base64'))  // aGVsbG8g5ZOI5ZOI
```

#### Buffer使用，fs同步读取文件
*fs.readFile('xx.xx'. function(err, data)(){}) 回调中的data就是buffer实例*
```javascript
var fs = require('fs');
fs.readFile('./xx.png', function(err, data){
    //回调中的data是buffer实例对象
    console.log(Buffer.isBuffer(data)) // true   
    //回调中的data传入writeFile,在同级目录生成1.png
    fs.writeFile('1.png', data, function(err){console.log(err)})   

    // 转换成其他编码的Buffer也可以，默认是utf-8
    var data2 = data.toString('base64'); 
    fs.writeFile('1.png', data2, function(err){console.log(err)}) 
})
```

### process.binding javascript与c++通信的桥梁

*图片base64存储结构，这个结构可以直接给img标签的 src使用，显示图片*
    - data:image/png;base64,...    //省略号表示图片的base64编码值

*小文件可以同步快速读取,大文件就需要异步流stream处理*
### Stream 流
* 流可以监听过程的各个事件
* ： 
```javascript
var fs = require('fs');
// 创建可读流
var readStream = fs.createReadStream('xx.png');
// 创建可写流
var writeStream = fs.createWriteStream('xx2.png');

// 方法一、监听各个事件
readStream
    .on('data', function(stream){   // 回调重的stream流也是Buffer实例对象
        console.log(stream.toString('utf8'));
        // 可写流的写入
        // 由于磁盘读写速度的差距不同，可能导致流传递问题，所以要判断控制下
        if(writeStream.write(stream) === false){
            // 读的数据缓存区还没写完，就先暂停读取写入缓存区
            readStream.pause();
        }
    })
    .on('readable',function(){})
    .on('end',function(){
        // 读取完成后，写入流也关闭
        writeStream.end();
    })
    .on('close',function(){})
    .on('error',function(e){console.log(e)})
writeStream.on('drain', function(){   // 
    // 缓存区的读完写完后事件，让读取流重启读取源数据到缓存区
    readStream.resume();
})
```

## 上面方法用pipe一行就可以搞定
```javascript
var fs = require('fs');
// 创建可读流
var readStream = fs.createReadStream('xx.png');
// 创建可写流
var writeStream = fs.createWriteStream('xx2.png');

// 方法二、用pipe方法，上面一堆用一行就够了
readStream.pipe(writeStream);
```


*流的暂停*
    - readStream.pause()
*流的重启*
    - readStream.resume()