(function() {

var parentHost = 'http://' + window.location.hostname;

var channel1 = new MessageChannel();
var channel2 = new MessageChannel();

window.parent.postMessage('dummy', parentHost, [ channel1.port2, channel2.port2 ]);

var button_send1 = document.querySelector('#button_send1');
button_send1.addEventListener('click', function(e) {

	var element = document.querySelector('#text_message');

	if (!element.value) {
		return;
	}

	channel1.port1.postMessage(element.value);

	element.value = '';

}, false);

var button_send2 = document.querySelector('#button_send2');
button_send2.addEventListener('click', function(e) {

	var element = document.querySelector('#text_message');

	if (!element.value) {
		return;
	}

	channel2.port1.postMessage(element.value);
	
	element.value = '';

}, false);

}());