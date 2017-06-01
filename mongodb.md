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
