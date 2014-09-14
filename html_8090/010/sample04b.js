(function() {

window.addEventListener('message', function(e) {

	var port = e.ports[0];

	port.onmessage = function(e1) {

		console.log('#2 > %s, %s, %s, %s, %s, ', e1.data, e1.origin, e1.lastEventId, e1.source, e1.ports);

		appendAndScroll(e1.data);

		port.postMessage('@' + e1.data);
	};

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