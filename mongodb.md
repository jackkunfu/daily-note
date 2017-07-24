### MongoDB
*安装及配置本地服务*
[http://blog.csdn.net/a1104258464/article/details/51011167](http://blog.csdn.net/a1104258464/article/details/51011167)
* mongod.exe  --logpath "d:\mongodb\data\logs\mongodb.cfg" --logappend         --dbpath "d:\mongodb\data\db" --serviceName MongoDB --install
* net start mongodb
* net stop mongodb  
* sc delete mongodb   // 删除本地服务

*基本操作*
* show dbs   // 查看数据库
* use test   // 创建数据库表已存在的切换过去,此处创建名为test的表（use test 之后必须给新建的表需要进行一定的操作之后才会show dbs展示出来）
* db.test.insert({a:1,b:2})  // db.名称.insert插入一组数据
* db.test.find(条件)    // 查询，条件可选，如果不填查询所有
* db.test.update(条件：{a:1},{$set: {b:2}})   //更新
* db.test.remove(条件：{a:1})   //移除
* db.dropDatabase()  // 删除当前数据表


### mongoose
* 项目中使用直接在server启动文件中开启连接就行了
	- 在app.js或server.js中import 连接对象
* 不必每次请求每次连一次
* 具体每次请求时直接schema操作即可
* DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
* 连接之前加上一句 mongoose.Promise = global.Promise;  来解决
* var db = mongoose.connect("mongodb://127.0.0.1:27017/mongooseTest");  
```
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('http:localhost:27107/test', {server:{auto_reconnect:true}});

const db = mongoose.connection;

db.once('open', () => {
	console.log('连接数据库成功')
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect('http:localhost:27107/test', {server:{auto_reconnect:true}});
});

export default db;
```
