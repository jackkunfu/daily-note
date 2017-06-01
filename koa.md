### koa2
*定义POST接口，没有正确的用ctx.body返回当前要返回的数据，结果该接口一直报404*
* 之前写的ctx.res.end(data), 错误，不正确返回，会进入koa路由的错误处理机制，最终跑到404需要深入了解
* 正确的写法，接口抛出数据 ctx.body = data;

*koa-router prefix*
* 定义改路由实例的公共实例
* var router = require('koa-router')({ prefix: '/api' })
* 有些地方说可以不在require('koa-router')后面括号里传参，可以另一行 router.prefix = '/api'， 实测这种无效
* 之后router定义的各个路由和接口，具体访问请求时为'/api/xx'  xx为自定义的各个路由接口
    - router.post('/aa', async(ctx, next)=>{ctx.body = data})     
    - 具体访问/aa接口时完整的地址为'/api/a'

