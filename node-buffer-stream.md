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