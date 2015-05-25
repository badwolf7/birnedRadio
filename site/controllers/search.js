// Access YouTube API NPM
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyDHfgLKwgaPudVVKMTmCgT_mZGD2ZF8NVo');

// Access SoundCloud API NPM
var SoundCloudAPI = require('soundcloud-node');
var sc_clientId = 'd18f51088ba8eab21e9ca1099b1bd69e';
var sc_clientSecret = 'ced34579f35a1deca9971c436c213dbc';
var sc_redirect = 'http://107.0.0.1:8000/soundcloud/redirect';
var client = new SoundCloudAPI(sc_clientId, sc_clientSecret, sc_redirect);

// SpellChecker NPM
var SpellChecker = require('spellchecker');

// webremix - convert media urls and links to embedded HTML
// var remix = require('webremix');
// var options = {
// 	width: 500,
// 	height: 200
// };
// remix.generate('https://www.youtube.com/watch?v=XYc6ZiV07ZE', options,function(err,response){
// 	console.log(response);
// 	// returns:
// 	// <div class="object-wrapper"><iframe width="500" height="200" src="//www.youtube.com/embed/XYc6ZiV07ZE?wmode=transparent" frameborder="0" allowfullscreen></iframe></div>
// });

// Global Variables
var query, numResults, word;
var corrections = [];
var results = {
	YouTube: {}
};
var resNum = 25; // number of results to get

module.exports = function(){
	app.get('/search/all', function(req,res){
		console.log('');
		console.log('||========================================>>>> SEARCH');
		console.log(req.query.q);
		query = req.query;
		res.redirect('/spellcheck/check');
	});
	app.get('/spellcheck/check',function(req,res){
		// utilize SpellChecker NPM to check for spelling mistakes in search
			// help the user --> returns corrections

		// the search string
		var str = query.q;
		// split where there are spaces to check words individually
		word = str.split(' ');
		corrections = {};
		corrections.list = [];
		for(var k=0;k<word.length;k++){
			// loop through all of the words that have been searched
			console.log(' ');
			console.log('Original: ');
			console.log(word[k]);
			// if a word is misspelled lets do something with the right words
			if(SpellChecker.isMisspelled(word[k])){
				// fill the array with suggested corrections
				corrections[k] = SpellChecker.getCorrectionsForMisspelling(word[k]); // returns an array of suggested corrections
				console.log(' ');
				console.log('Corrections: ');
				console.log(corrections);
				// loop through the corrections (when there's more than one)
				for(var l=0;l<corrections[k].length;l++){
					// split the returned arrays to be individually stored in one array (for multiple words)
					corrections.list.push(corrections[k][l]);
				}
				// once all words are seperated move forward
				if(k === word.length-1){
					// set the number of corrections as a var in our corrections obj
					corrections.num = word.length;
					console.log(corrections.list);
					// sort the list (alphabetical)
					corrections.list = corrections.list.sort();
					console.log('sorted:');
					console.log(corrections.list);
					// loop through the sorted array - checking for duplicates
					for(var m=0;m<corrections.list.length;m++){
						console.log('m1 '+m);
						console.log(corrections.list[m]);
						console.log(corrections.list[m+1]);
						// if the words are the same - checking based on location in the array
						if(corrections.list[m] == corrections.list[m+1]){
							// remove the duplicate suggestion
							corrections.list.splice(m,1);
							console.log('m2 '+m);
						}
					}
					// now that we are done with the spell check move on to our search
					res.redirect('/search/all/youtube');
				}
			}else{
				if(k === word.length-1){
					// all words are spelled correctly according to the db ... let's crack on, shall we
					console.log("it's ALL good");
					console.log(corrections);
					res.redirect('/search/all/youtube');
				}else{
					// current word is good, moving on to the next
					console.log("it's good");
				}
			}
		}
	});
	app.get('/search/all/youtube', function(req,res){
		// YouTube Search		
		// search('search phrase',resultsPerPage,callback)
		youTube.search(query.q,resNum,function(error,result){
			if(error) throw error;
			// youtube has been searched, here are the results
			results.YouTube = result;
			res.redirect('/search/res');
		});
	});

	// SoundCloud
	app.get('/search/all/soundcloud', function(){

	});

	// Return all searches ---> own function for multiple searches to come to one place
	app.get('/search/res', function(req,res){
		// retuns the JSON result
		// res.send(results.YouTube);
		numResults = results.YouTube.pageInfo.totalResults;
		// render the view with the reults
		res.render('results', {q: query.q,numResults: numResults,results: results, corrections: corrections});
	});

	app.get('/search/one/youtube', function(req,res){
		// for individual youtube videos  -->  when user clicks on a video on the results page
		youTube.getById(req.query.vidId, function(error, result){
			if(error) throw error;
			// return the JSON of the individual video
			// res.send(result);
			// render the view with the video data
			res.render('single', {q: req.query.q, video: result});
		});
	});
};

