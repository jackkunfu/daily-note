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