var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyDHfgLKwgaPudVVKMTmCgT_mZGD2ZF8NVo');

module.exports = function(){
	app.get('/login/youtube', function(req,res){
		console.log('');
		console.log('||========================================>>>> YOUTUBE LOGIN');
		console.log('');

		// YouTube Login Time

		res.redirect('/login');
	});
};