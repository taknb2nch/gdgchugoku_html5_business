(function() {

var iframeHost = 'http://' + window.location.hostname +':8090';
var iframeUrl = iframeHost + '/gdgchugoku/html5/010/sample07b.html';

var channel;

(function(url) {

	var elm = document.createElement('iframe');
	elm.src = url;
	elm.id = 'targetFrame';
	elm.className = 'iframe';

	document.querySelector('#iframe_box').appendChild(elm);

}(iframeUrl));



var button_connect = document.querySelector('#button_connect');
button_connect.addEventListener('click', function(e) {

	//channel.port1.start();

	channel = new MessageChannel();
	
	channel.port1.onmessage = function(e) {

		console.log('#1 < %s, %s, %s, %s, %s', e.data, e.origin, e.lastEventId, e.source, e.ports);

	};

	var iframe = document.querySelector('#targetFrame');

	iframe.contentWindow.postMessage('dummy', iframeHost, [ channel.port2 ]);

}, false);

var button_open = document.querySelector('#button_open');
button_open.addEventListener('click', function(e) {

	channel.port1.start();

}, false);

var button_close = document.querySelector('#button_close');
button_close.addEventListener('click', function(e) {

	channel.port1.close();

}, false);


var button_channel1 = document.querySelector('#button_channel1');
button_channel1.addEventListener('click', function(e) {

	var value = document.querySelector('#text_channel1').value;

	channel.port1.postMessage(value);

}, false);

}());