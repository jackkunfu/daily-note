## webpack

### entry 文件入口
* 数组，最终所有打包成一个文件的时候用，数组里填入需要打包的文件
* 对象，打包出各个文件，各个文件名为对象的键值

### output
* 文件输出
* filename: 单一文件时为自定义的名称，多个文件时用[name].[hash/chunkhash].js

### resolve  require中的文件路径简写     文件后缀的处理
* extensions:['', '.js', '.jsx'] //后缀简写处理，实际会按顺序一个一个查找，先找到哪个就停止
* alias: {} //  其他文件目录简写

### moudle
```
moudle: {
    preLoaders: [{    //   preLoaders  所有的处理之前都要经过的处理
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,     //  排除不处理的文件目录
        loader: 'eslint-loader'    // 多个loader之间用！，具体执行顺序是由后往前，先用babel-loader处理，然后再用react-loader处理babel-loader处理之后的文件
    }],
    loaders: [{    //   
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,     //  排除不处理的文件目录
        loader: 'react-loader!babel-loader'    // 多个loader之间用！，具体执行顺序是由后往前，先用babel-loader处理，然后再用react-loader处理babel-loader处理之后的文件
    }]
}
* loaders
    - 数组
    - 每一个代表一种文件类型
    - 每种文件类型的loader可以是多个，顺序是从又往左，之间用!隔开
    - 需要传参的某个loader，可以加 ?xx=xx 的形式，也可以增加，query字段的形式
    - babel-loader 传参也可以在pakage.json里添加"babel":["presets":"latest"]

* test 匹配文件扩展名
* loader
    - 匹配文件的解析器
    - 多个之间用!隔开
    - 执行顺序是从右往左
    - 每个解析器传参可以加 ?xx=xx 的形式，也可以增加，query字段的形式

* css
    - style-loader!css-loader?importLoaders=1!postcss-loader
    - style-loader!css-loader!postcss-loader!less-loader(或者用sass-loader)
    - postcss-loader不能给css中用@import引用的样式处理前缀
        + 如果是less\sass预编译器文件，less\sass会处理
        + 如果不是less、sass,须给css-loader?importLoaders=1

* postcss，和entry output module同级，值可以是数组，也可以是函数返回一个数组
* 处理css，比如给css3属性自动添加各浏览器前缀
```
postcss:[
    require('autoprefixer')({browsers:"latest 5 versions"}),
    require('xxx')
]
```

* html
    - 如果是一般的结构片段用html-loader返回的是一段结构字符串，可以直接插入到页面中
        + var html = require('./a.html')
        + document.body.innerHTML = html
    - 如果是模板文件，需要用到对应的模板loader
        + 返回的是一个函数
        + 具体使用：得到返回的函数然后把模板数据data传递给该函数，得到结构
        + var tpl = require('./a.ejs')
        + var html = tpl(data)
        + document.body.innerHTML = html


### require.ensure  Webpack的特殊语法，用来设置 code-split point
* 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
* Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面 —— 这也意味着我们无须明确列出 require.ensure 的依赖（传空数组就行）。


### htmlwebpackplugin
* template： html模板文件路径名称
* inject： 打包后的文件注入的位置：一般有head body或者不需要注入的时候用false