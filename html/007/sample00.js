
$("#tweets").text('"#gdgchugoku に関するツイートを取得中"');

$.getJSON('https://api.twitter.com/1.1/search/tweets.json', 
	{ 'q' : '#gdgchugoku' }, 
	function(obj, e) {
		var tweets = obj.results;
		var str = '';

		for (var i = 0; i < tweets.length; i++) {
			var t = tweets[i];
			str += t.from_user + ' : ' + t.text + '<br>';
		}

		$("#tweets").html(str);
	});

$("#button_calculate").click(function() {
	$('#value3').val(parseInt($('#value1').val()) + parseInt($('#value2').val()));
});
