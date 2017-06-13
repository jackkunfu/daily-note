### entry 文件入口

### out

### resolve  require中的文件路径简写     文件后缀的处理
    - extensions : ['', '.js', '.jsx']   // 后缀简写处理，实际会按顺序一个一个查找，先找到哪个就停止
    - alias: {}    //  其他文件目录简写

### moudle
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

*最新的loaders变成rules*
// before
modules: {
  loaders: [{...}]
}

// after
modules: {
  rules: {...}
}

### require.ensure  Webpack的特殊语法，用来设置 code-split point
* 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
* Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面 —— 这也意味着我们无须明确列出 require.ensure 的依赖（传空数组就行）。

