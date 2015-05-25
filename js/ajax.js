function ajax(){
	// serialize incoming objects
	$.fn.serializeObject = function(){
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	// On click of video in search results get data from page to request individual data
	$('.res .results li').click(function(e){
		e.preventDefault();
		// get the video id (youtube)
		var vidId = $(this).children('.vidId').val();
		// let's maintain the search query
		var query = $('header form input[type=text]').val();
		// redirect to the page for the results
		window.location.replace('/search/one/youtube?q='+query+'&vidId='+vidId);
	});

	// Login Shit ---> Nothing yet
	$('.logins .button').click(function(e){
		e.preventDefault();
		var span = $(this).children('span');
		var data = {
			dir: span[0].classList[1].slice(3)
		};
		loginUser(data);
	});

	function loginUser(data){
		$("*").unbind();

		$.ajax({
			type: 'GET',
			url: '/login/'+data.dir,
			dataType: 'json',
			data: data,
			success: function(result){
				console.log(data.dir+' login success');
				console.log(result);
			},
			error: function(err){
				console.log(data.dir+' login fail');
				console.log(err);
			}
		});
	}
}
$(document).on('ready ajaxComplete',function(){
	// reset js after ajax complete
	ajax();
});