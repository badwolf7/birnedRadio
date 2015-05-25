var fs = require('fs');
var os = require('os');

// Application Utilities
var express = require('express');
var engine = require('ejs-locals');
var cluster = require('cluster');
var http = require('http');

var oneDay = 86400000;
var oneHour = 3600000;

// Skeleton of and Application
global.app = express();

// Adding httpServer to Skeleton
var httpServer = http.createServer(app);
	
// set port
var port = process.env.PORT || 8000;
global.hotlinks = {};

app.engine('ejs', engine);

fs.readdirSync("./views").forEach(function(file) {
	if(file.slice(-3) == "ejs"){
		file = file.split(".")[0];
		hotlinks[file] = '/'+file;
	}
});

var numCPUs = 1 || process.env.WORKERS || os.cpus().length;

cluster.on('exit', function (worker) {
		// Replace the dead worker,
		// we're not sentimental
		console.log('Worker ' + worker.id + ' died :(');
		cluster.fork();
});

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
} else {
	// Set View Engine to EJS
	app.engine('ejs', engine);

	// set templating engine to ejs (jade sucks)
	app.set('view engine', 'ejs');
	app.use('/views', express.static('/views', { maxAge: oneDay*365 }));
	app.use('/assets', express.static(__dirname + '/assets', { maxAge: oneDay*365 }));

	// --- Models --- //
	// No Models Right Now :'(
	// app.models = {};
	// fs.readdirSync("./models").forEach(function(file) {
	// 	if(file.slice(-2) == "js"){
	// 		require("./models/" + file)(sequelize);
	// 	}
	// });
	
	// Start up every script in the controllers folder
	fs.readdirSync("./controllers").forEach(function(file) {
		if(file.slice(-2) == "js"){
			require("./controllers/" + file)();
		}
	});

	// 404 ---- Page
	app.get("/*", function(req, res){
		res.render('404');
	});

	// starts server on specified port
	httpServer.listen(port, function(){
		console.log("Port Listening on port "+port);
	});
}