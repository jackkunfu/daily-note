/*  类数组转数组  */
// Array.prototype.slice
var { slice } = []
function toArray(){
    return slice.call( arguments )
}
toArray(1, 2, 3)    // [1,2,3]

// Array.from
function toArray1(){
    return Array.from( arguments )
}
console.log(toArray1(1, 2, 3))    // [1,2,3]

// 数组反转 reverse
var arr = [1,2,3,4];
arr.reverse()

// 字符串反转
// Array.prototype.reverse.call(str)  会报错，达不到目的
var str = '12345'
str.split('').reverse().join('')   // '54321'

// 指定数字展示小数点之后位数，四舍五入，不够补零
var a = 42.59;
a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"

// n 秒钟延迟执行
Number.prototype.delayDo = function(fn){
    var n = parseInt(this);
    setTimeout(fn, n*1000);
}
// 可以直接数字调用Number.prototype上的方法
// 不过没有小数点的会报错   3.delayDo(); 会报错，语法错误，因为.会被当作3.0数字对象的一部分，无执行运算符.调用delayDo
// 再加个小数点就不会报错3..delayDo, 或者加个空格 3 .delayDo,有些压缩工具可能会把空格去掉，导致出错，仅作了解，不建议用
3..delayDo(function(){alert(1)})

// 问题：
0.1 + 0.2 === 0.3; // false   !!!!
0.1 + 0.2   // 0.30000000000000004  !!!
// 解决：Number.EPSILON
// ES6 开始，该值定义在Number.EPSILON 中，我们可以直接拿来用
if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2,-52);
}
function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs( n1 - n2 ) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual( a, b ); // true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false

// 检测数字是否是整数 es6 中 Number.isInteger
if (!Number.isInteger) {
    Number.isInteger = function(num) {
        return typeof num == "number" && num % 1 == 0;
    };
}
Number.isInteger( 42 ); // true
Number.isInteger( 42.000 ); // true
Number.isInteger( 42.3 ); // false