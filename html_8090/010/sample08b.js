(function() {

var parentHost = 'http://' + window.location.hostname;

var channel = new MessageChannel();

channel.port1.onmessage = function(e) {

	appendAndScroll(e.data);

}

window.parent.postMessage('', parentHost, [ channel.port2 ]);

var button_send = document.querySelector('#button_send');
button_send.addEventListener('click', function(e) {

	var element = document.querySelector('#text_message');

	if (!element.value) {
		return;
	}

	channel.port1.postMessage(element.value);

}, false);

function appendAndScroll(str) {

	var element1,
		element2,
		li;

	li = document.createElement('li');
	li.innerHTML = str;

	element1 = document.querySelector('#output ul');
	element1.appendChild(li);

	element2 = document.querySelector('#output');
	element2.scrollTop = element2.scrollHeight;

}

}());