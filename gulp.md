
## gulp

### gulp执行顺序比较重要
* gulp各任务之间时异步并行的，直接同时执行达不到目的
* 任务之间的依赖在定义task的时候在中括号中添加依赖
    - gulp.task('xx', ['a', 'b'], cb)
    - x任务依赖的a、b任务仍然是并行的
    - 并行执行a、b后执行回掉cb方法
* gulp 4.0 支持任务依次执行， 目前还未正式发布
    - gulp.task('xx', gulp.series('a', 'b', gulp.parallel('c', 'd'), e))
    - 执行a之后执行b，执行b之后，并行执行c和d
    - series里的任务是顺序执行的，parallel里的任务是同时执行的。

```
gulp.task('del-rev', function(){
    return del([revDir, destDir])
})

gulp.task('rev-json', ['del-rev'], function(){
    return gulp.src(["./app/**/*.css", "./app/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest(destDir))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revDir))
});

gulp.task('rev', ['rev-json'], function(){
    gulp.src([revDir+'/**/*.json', devDir+"/*.html"])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(destDir))
})

// gulp 4.0
gulp.task('rev',gulp.series('del-rev',gulp.parallel('css-json', 'js-json'),cb))
```


### gulp-rev gulp-rev-collector
* 解决缓存严重问题，通过加上文件hash值解决
* 先把文件名称中添加md5
* 先rev()出对应的json文件
* 然后根据json文件替换掉html中的文件链接名称
* 如果文件没有改动，多次重复执行rev得到的hash值都是一样的
```
    gulp.task('del-rev', function(){
        return del([revDir, destDir])
    })

    gulp.task('rev-json', ['del-rev'], function(){
        return gulp.src(["./app/**/*.css", "./app/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest(destDir))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revDir))
    });

    gulp.task('rev', ['rev-json'], function(){
        gulp.src([revDir+'/**/*.json', devDir+"/*.html"])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(destDir))
    })
```