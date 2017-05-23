var Ss = {
	getDayArr: function(){     // 计算2018年到2050年有几个周几，  可以改进具体周期之间的个数
		var arr = [0, 0, 0, 0, 0, 0, 0]
		for(var i = 2018; i<2050; i++){
			for(var j = 0; j<12; j++){
				var d = j == 0|2|4|6|7|9|11 ? 32 : (j == 1 ? 30:31)
				for(var k = 1; k<d; k++){
					arr[new Date(i,j,k).getDay()]++
				}
			}
		}

		console.log(arr)
		
		var obj = arr.reduce(function(a, b, c){
			var name = c == 0 ? '周日的个数' : '周'+c+'的个数'
			//a[name] = b;
			var str = name+'是'+b;
			a.push(str)
			return a;
		},[])

		return obj
	},
	getRandomNum: function(num){   // 生成数组随机排列 0 - num-1 这些数字整数

		var n = parseInt(num, 10);
		var arr = [];

		function pushArr(){
			if(arr.length >= n){
				return arr
			}

			var curNum = Math.floor(Math.random()*n);
			//console.log(curNum)
			if(arr.indexOf(curNum) == -1){
				arr.push(curNum)
			}
			pushArr()
		}

		pushArr();
		return arr;	
	},
	shuffle: function(array){     //  数组洗牌

		// ----------  获取随机下标 ---------------
		var arr = [];
		if(this.length == 0){ return arr }

		var thisLength = this.length;
		//console.log(thisLength+" thisLength")

		var a  = thisLength, array = [];

		var ss = Ss.getRandomNum(a);

		var _this = this

		var newArr = _this.reduce(function(a, b, i){
			var sNum = parseInt(ss[i], 10);
			a.push(_this[sNum])
			return a;
		}, [])

		return newArr



		// ------------- splice -----------
		/* 普通调用 shuffle(array)，需要传参*/
		// var arr = [];
		// if(array.length == 0){ return [] }
	
		// do{
		// 	console.log(array.length)
		// 	arr.push(array.splice(Math.floor(Math.random()*(array.length-1)), 1)[0])
		// }while(array.length != 0)
		
		// return arr

		/* 面向对象调用 array.shuffle()，不需要传参*/
		// var arr = [];
		// if(this.length == 0){ return arr }
	
		// do{
		// 	//console.log(this.length)
		// 	arr.push(this.splice(Math.floor(Math.random()*(this.length-1)), 1)[0])
		// }while(this.length != 0)
		
		// return arr

	}
}

/* 获取一段时间内各个周几分别有多少次 */
// console.log(Ss.getDayArr())


/* 测试构造函数本身 return 的效果 ==> 如果存在return 且return 出的是个对象 new的时候则返回return 的对象，  其他正常返回实例 */
// function F1(){
// 	this.a = 1
// }
// function F2(){
// 	this.a = 1
// 	return new Number(32)
// }

// var a1 = new F1();
// var a2 = new F2();

// console.log(a1)
// console.log(a2)


/* 数组洗牌 */
var aarr = [11,22,33,44,55]
// console.log(Ss.shuffle(aarr))   //  普通调用
console.log(Ss.shuffle.call(aarr))// 面向对象调用