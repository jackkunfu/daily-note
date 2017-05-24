var co = require('co');

function PromiseData(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve({a:1})
		}, 2000);
	})
}
function PromiseData2(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve({a:2})
		}, 2000);
	})
}
console.log(0);

co(function *(){
  var d = yield PromiseData();
  console.log(d);
  var d2 = yield PromiseData2();
  console.log(d2);
  
  console.log(d2.a+d.a);


  // resolve multiple promises in parallel 
  // var a = Promise.resolve(1);
  // var b = Promise.resolve(2);
  // var c = Promise.resolve(3);
  // var res = yield [a, b, c];
  // console.log(res);
  // => [1, 2, 3] 
}).catch(onerror);

function onerror(err) {
  // log any uncaught errors 
  // co will not throw any errors you do not handle!!! 
  // HANDLE ALL YOUR ERRORS!!! 
  console.error(err.stack);
}


// 直接在node环境中yield没反应
function* aa(){
	yield PromiseData();
}
aa().next().value.then(function(data){console.log(data)});


function co(fn) {
    return function(done) {
        var ctx = this;
        var gen = fn.call(ctx);
        var it = null;
        function _next(err, res) {
            if(err) res = err;
            it = gen.next(res);
            //{value:function(){},done:false}
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}

async function aa(){
  var d = await PromiseData();
  console.log(d.a);
}

aa()   // 1