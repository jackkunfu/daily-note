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

// ... 操作符
function toArray2(){
    return [...arguments]
}
toArray2(1,2,3,4,5)

// 数组去重
var a = [...new Set([1,2,3,3,4,2,1])]    //  [1,2,3,4]

// 数组反转 reverse
var arr = [1,2,3,4];
arr.reverse()    //  [4, 3, 2, 1]

// 字符串反转
// Array.prototype.reverse.call(str)  会报错，达不到目的
var str = '12345'
str.split('').reverse().join('')   // '54321'

typeof NaN === 'number'   // true

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

// 能够被“安全”呈现的最大整数是 2^53 - 1，即 9007199254740991，在 ES6 中被定义为Number.MAX_SAFE_INTEGER。最小整数是 -9007199254740991，在 ES6 中被定义为 Number.MIN_SAFE_INTEGER。
// 判断数字是不是安全的整数，es6 Number.isSafeInteger
if (!Number.isInteger) {
    Number.isSafeInteger = function(num) {
        return Number.isInteger(num) && 
            Math.abs(num) <= Math.pow(2, 53) - 1;
    };
}

// isNaN 判断一个值是不是数字
// Numeber.isNaN 判断一个值是不是 NaN
isNaN('foo')   // true
Numeber.isNaN('foo')   // false

// 判断两个值是否是绝对相等 Object.is ,非特殊情况 比如判断 0 和 -0 建议用 == 或者 === 效率性能更高
Object.is(0, -0)   // false
0 === -0    // true

// 前端优化
// 减少http请求
// cdn加速
// 文件压缩合并
// 雪碧图
// 图片字体
// 懒加载
// css 放在head中
// script置底

// 代码优化
// 减少dom操作
// 慎用with
// 避免使用eval和Function构造函数
// 减少变量作用域查找 （使用全局变量时，可以在方法内申明一个等于全局变量的变量，便于更快找到）
// 数据缓存

function foo(x) {
    x.push( 4 );
    x; // [1,2,3,4]
    // 然后
    x = [4,5,6];
    x.push( 7 );
    x; // [4,5,6,7]
}
var a = [1,2,3];
foo( a );
a; // 是[1,2,3,4]，不是[4,5,6,7]
// 我们向函数传递 a 的时候，实际是将引用 a 的一个复本赋值给 x，而 a 仍然指向 [1,2,3]。在函数中我们可以通过引用 x 来更改数组的值（push(4) 之后变为 [1,2,3,4]）。但 x =[4,5,6] 并不影响 a 的指向，所以 a 仍然指向 [1,2,3,4]。

Object.prototype.toString.call( null );   // "[object Null]"
Object.prototype.toString.call( undefined );    // "[object Undefined]"
Object.prototype.toString.call( "abc" );    // "[object String]"
Object.prototype.toString.call( 42 );    // "[object Number]"
Object.prototype.toString.call( true );    // "[object Boolean]"

// 想要得到封装对象中的基本类型值，可以使用 valueOf() 函数：
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );
a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true

// new Array(1,2,3)  和  Array(1,2,3)  一样的效果，Array可以省略掉new 不过一般直接声明 [1,2,3]

// 当前时间戳
Date.now();   // es5 es6
if(!Date.now){
    Date.now = function(){
        return (new Date()).getTime();
    }
}

// throw 后面的都不会执行相当于return了

// Symbol: 符号，不能用new构造实例，不然会报错，并非对象，属于一种简单标量基本类型
var mysymbol = Symbol('my own symbol');
mysymbol;    // Symbol(my own symbol)
mysym.toString();    // "Symbol(my own symbol)"
typeof mysym;    // "symbol"

var a = { };
a[mysym] = "foobar";

// getOwnPropertySymbols
Object.getOwnPropertySymbols( a );    // [ Symbol(my own symbol) ]

// String.prototype
// indexOf 在字符串中找到指定子字符串首次出现的位置
'aabbccddbcc'.indexOf('bcc')   // 3

// charAt  获得字符串指定位置上的字符。
'aabbccddbcc'.charAt(3)    // b

// substr  substring 截取
'aabbccddbcc'.substr(3, 5)   // "bccdd"  前start  后length,length<=0时返回''，start为负数时，加上总长度为起始点
'aabbccddbcc'.substring(3, 5)   // "bc"    start  end  不分前后，小的start 大的 end 负数会直接变为零
'aabbccddbcc'.substring(5, 3)   // "bc"    start  end  不分前后，小的start 大的 end 负数会直接变为零

// slice 截取， 如果是负数时，负数都加上字符串总长度求值，第二个参数比第一个小则返回空字符串
'aabbccddbcc'.slice(3, 5)   // "bc"    前start  后end
'aabbccddbcc'.slice(3, 1)   // "" 

// 事件 addEventListener
// 任何事件都有三个阶段：捕获、目标元素、冒泡
// 第三个参数为true时表示想在捕获阶段处理事件，false表示想在冒泡阶段处理事件，默认是false
// window.addEventListener  document.addEventListener 事件不管是冒泡还是捕获都会经过window和document区别在于处理顺序不一样
// 捕获时window先于document       冒泡时document先于window
window.addEventListener('click',function(){
    console.log('window addEventListener');
},true);
document.addEventListener('click',function(){
    console.log('document addEventListener')
},true);
$('body').click(function(){console.log('body click')})
document.body.onclick = function(){console.log('111')}
$(document).on('click',function(){console.log('2222')})
// 点击下body的结果是
// window addEventListener
// document addEventListener
// body click
// 111
// 222

// 上面几个事件的执行顺序调整之后， 
// 打印顺序基本不变， window 和 document 的最先执行
// jq 的 on 绑定事件都是最后执行
// 直接的事件原生和jq谁先申明谁先执行
$(document).on('click',function(){console.log('2222')})
document.body.onclick = function(){console.log('111')}
$('body').click(function(){console.log('body click')})
document.addEventListener('click',function(){
    console.log('document addEventListener')
},true);
window.addEventListener('click',function(){
    console.log('window addEventListener');
},true);
// 点击下body的结果是
// window addEventListener
// document addEventListener
// 111
// body click
// 222

