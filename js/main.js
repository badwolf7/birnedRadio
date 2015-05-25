$(function(){

	// header push - for having the header position: fixed
	var padding = 15;
	var headerHeight = $('header').height()+(padding*2);
	$('header').css({'padding':padding+'px 0 '});
	$('#headerPush').height(headerHeight);
	
	// results date formater
	var zDate;
	if($('main').hasClass('searchResults')){
		// multiple dates to be formated on the results page ... take em all and process em
		for(var i=1;i<=$('.date').length;i++){
			zDate = $('.res .results li:nth-child('+i+') .date').html();
			dateString = convertDate(zDate);
			$('.res .results li:nth-child('+i+') .date').html(dateString);
		}
	}else{
		// individual date conversions
		zDate = $('.date').html();
		dateString = convertDate(zDate);
		$('.date').html(dateString);
	}
	function convertDate(zDate){
		var date = new Date(zDate),
		month = date.getMonth(),
		day = date.getDate(),
		year = date.getFullYear(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		meridiem = 'AM';

		// convert month num to words
		switch(month){
			case 0:
				month = 'Jan';
				break;
			case 1:
				month = 'Feb';
				break;
			case 2:
				month = 'Mar';
				break;
			case 3:
				month = 'Apr';
				break;
			case 4:
				month = 'May';
				break;
			case 5:
				month = 'June';
				break;
			case 6:
				month = 'July';
				break;
			case 7:
				month = 'Aug';
				break;
			case 8:
				month = 'Sep';
				break;
			case 9:
				month = 'Oct';
				break;
			case 10:
				month = 'Nov';
				break;
			case 11:
				month = 'Dec';
				break;
		}
		if(hour > 12){
			hour -= 12;
			meridiem = 'PM';
		}
		if(minute < 10){
			minute = '0'+minute;
		}

		var dateString = month+' '+day+', '+year+' '+hour+':'+minute+' '+meridiem;
		return dateString;
	}

	// Video Duration Formatting - make it more readable for the user
	if($('main').hasClass('single')){
		var duration = $('.duration').html().slice(2,$('.duration').html().length);
		var minLoc = duration.indexOf('M')+1;
		var str = duration.slice(0,minLoc)+' '+duration.slice(minLoc,duration.length);
		$('.duration').html(str);
	}


	// Search Bar
	// maintain search query in search bar
	$('header form input[name=q]').val($('input[type=hidden].query').val());
	// search bar height and padding
	var buttonHeight = $('header form button').height();
	var buttonPadT = $('header form button').css('padding-top');
	var buttonPadB = $('header form button').css('padding-bottom');
	// remove px and turn to Int
	buttonPadT = parseInt(buttonPadT.substring(0, buttonPadT.length-2));
	buttonPadB = parseInt(buttonPadB.substring(0, buttonPadB.length-2));
	// Add it all up
	var buttonTot = buttonHeight+buttonPadT+buttonPadB;
	// set the input to match -> .css cause .height was adding to my total ¿weird?
	$('header form input[name=q]').css({'height':buttonTot});

	// go back button
	$('.goBack').click(function(){
		window.history.back();
	});

	// img height for hover box height
	var imgHeight = $('#single .content .thmb-hover img').height();
	var playHeight = $('#single .content .thmb-hover .thmb-click p').height();
	$('#single .content .thmb-hover .thmb-click').height(imgHeight);
	$('#single .content article.medium-4').height(imgHeight);
	$('#single .content .thmb-hover .thmb-click').css({'margin-top':'-'+imgHeight+'px'});
	$('#single .content .thmb-hover .thmb-click p').css({'margin-top':imgHeight/2-playHeight/2+'px'});

	// Just to mess around on the landing page ;)
	var startPos = 45;
	var opacity = .8333333333;
	var dir = 'down';
	
	if($('main').hasClass('landing')){
		// if we're on the landing page ...
		$(function ctaTrans(){
			// self executing - I WANT IT TO RUN
			// transitions layers in the CTA (black to white and vice versa)
			setTimeout(function(){
				// every 10 sec do ...
				var ctaInt = setInterval(function(){
					// in 100 ms complete the transition
					// adjust the opacity based on direction
					if(dir == 'up'){
						// adjust the opacity of the black layer - we're going up
						opacity *= 100;
						opacity += 16.66666666;
						opacity /= 100;
						$('#landing .dark').css({'bottom':startPos++,'opacity':opacity});
					}else{
						// adjust the opacity of the black layer - we're going down
						opacity *= 100;
						opacity -= 16.66666666;
						opacity /= 100;
						$('#landing .dark').css({'bottom':startPos--,'opacity':opacity});
					}
					// not only are we adjusting opacity but also the position of the layer
					if(startPos <= 40){
						dir = 'up';
						console.log(dir);
						clearInterval(ctaInt);
						ctaTrans();
					}else if(startPos >= 45){
						dir = 'down';
						console.log(dir);
						clearInterval(ctaInt);
						ctaTrans();
					}
				},100);
			}, 10000);
		});
	}

});
