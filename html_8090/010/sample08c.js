(function() {

var parentHost = 'http://' + window.location.hostname;

window.addEventListener('message', function(e) {

	if (e.ports.length < 1) {
		return;
	}

	var port = e.ports[0];

	port.onmessage = function(e1) {

		appendAndScroll(e1.data);

		port.postMessage('@@@' + e1.data);

	}

	console.log('received port from parent.')

}, false);

// var button_send = document.querySelector('#button_send');
// button_send.addEventListener('click', function(e) {

// 	var element = document.querySelector('#text_message');

// 	if (!element.value) {
// 		return;
// 	}

// 	channel.port1.postMessage(element.value, parentHost);

// }, false);

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