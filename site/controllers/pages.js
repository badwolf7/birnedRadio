// MAKE SURE REQUIRES GO OUTSIDE THE MODULE
// The reason being that requires are pointers however
// when included into a module they get stored into memory
// every time a module is called upon
var fs = require("fs");
var sm = require('sitemap');
var mongojs = require('mongojs');
var collections = ['users'];

if(process.env.PORT){
	var db = mongojs('104.131.82.47:27017/birnedradio',collections);
}else{
	var db = mongojs('localhost:27017/birnedradio',collections);
}

module.exports = function(){
	// PAGES
	// at location run function
	app.get('/',function(req, res){
		res.render('index', {message: req.params.id});
	});
	app.get('/:page',function(req, res){
		if(fs.existsSync('views/'+req.params.page+'.ejs')){
			if(fs.existsSync('views/'+req.params.page+'.ejs')){
				res.render(req.params.page, {message: req.params.id});
			}else{
				res.render('404');
			}
		}else if(req.params.page === "sitemap.xml"){
			sitemap.toXML( function (xml) {
				res.header('Content-Type', 'application/xml');
				res.send( xml );
			});
		}
	});

	var sitemap = sm.createSitemap ({
		hostname: 'http://www.hollyspringsteen.com',
		cacheTime: 60000,        // 60 sec - cache purge period
		urls: [
			{ url: '/',  changefreq: 'daily', priority: 1.00 },
			{ url: '/creations/web-menu',  changefreq: 'daily',  priority: 0.9 },
			{ url: '/creations/photo-menu',  changefreq: 'daily',  priority: 0.9 },
			{ url: '/creations/graphic-menu',  changefreq: 'daily',  priority: 0.9 }
		]
	});
}