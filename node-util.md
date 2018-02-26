### util 模块 var util = require('util');
*util.inherits*
    - 只会继承原型链上的方法函数，原构造函数内部定义的方法函数不会被继承
    - util.inherits(Sub, Base);
```
// inherits 源码
exports.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};
```