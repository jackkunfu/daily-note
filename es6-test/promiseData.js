function PromiseData(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve({a:1})
		}, 2000);
	})
}

module.exports = PromiseData;