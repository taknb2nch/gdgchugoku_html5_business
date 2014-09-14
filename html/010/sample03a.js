(function() {

var channel = new MessageChannel();

// channel.port1.start();
// channel.port2.start();

channel.port1.onmessage = function(e) {

	console.log('#1 > %s, %s, %s, %s, %s', e.data, e.origin, e.lastEventId, e.source, e.ports);

	var element = document.querySelector('#output1');

	appendAndScroll(element, e.data);

};

channel.port2.onmessage = function(e) {

	console.log('#2 > %s, %s, %s, %s, %s, ', e.data, e.origin, e.lastEventId, e.source, e.ports)

	var element = document.querySelector('#output2');

	appendAndScroll(element, e.data);

};

channel.port1.start();
channel.port2.start();

var button_channel1 = document.querySelector('#button_channel1');
button_channel1.addEventListener('click', function(e) {

	var element = document.querySelector('#text_channel1');

	if (!element.value) {
		return;
	}

	channel.port1.postMessage(element.value);

	element.value = '';

}, false);

var button_channel2 = document.querySelector('#button_channel2');
button_channel2.addEventListener('click', function(e) {

	var element = document.querySelector('#text_channel2');

	if (!element.value) {
		return;
	}

	channel.port2.postMessage(element.value);

	element.value = '';

}, false);

function appendAndScroll(element, str) {

	var element1,
		li;

	li = document.createElement('li');
	li.innerHTML = str;

	element1 = element.querySelector('ul');
	element1.appendChild(li);

	element.scrollTop = element.scrollHeight;

}

}());