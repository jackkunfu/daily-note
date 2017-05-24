var http = require('https');
var cheerio = require('cheerio');

module.exports = function(url){
	http.get(url, function(res){
		var html = '';
		res.on('data', function(str){
			html += str;
		})

		res.on('end', function(){
			console.log(html);
			console.log('===================================')
			cherrioHtml(html)
		})
	}).on('error', function(err){
		console.log(err);
	})
}


function cherrioHtml(html){
	var $ = cheerio.load(html);
	console.log($('.site-logo').html());
}