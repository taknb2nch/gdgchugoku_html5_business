(function() {

var iframeHost = 'http://' + window.location.hostname +':8090';
var iframeUrl = iframeHost + '/gdgchugoku/html5/010/sample06b.html';

(function(url) {

	var elm = document.createElement('iframe');
	elm.src = url;
	elm.id = 'targetFrame';
	elm.className = 'iframe_small';

	document.querySelector('#iframe_box').appendChild(elm);

}(iframeUrl));


window.addEventListener('message', function(e) {

	for (i = 0; i < e.ports.length; i++) {

		var port = e.ports[i];

		var f = function (index) {
			var idx = index;

			port.onmessage = function(e1) {

				console.log('#%s > %s, %s, %s, %s, %s, ', idx, e1.data, e1.origin, e1.lastEventId, e1.source, e1.ports);

				appendAndScroll('#' + idx + ', ' + e1.data)

			};
		};

		f(i);
	}

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