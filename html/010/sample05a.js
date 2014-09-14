(function() {

var iframeHost = 'http://' + window.location.hostname +':8090';
var iframeUrl = iframeHost + '/gdgchugoku/html5/010/sample05b.html';

(function(url) {

	var i,
		iframe_box = document.querySelector('#iframe_box');

	for (i = 0; i < 5; i++) {
		var elm = document.createElement('iframe');
		elm.src = url;
		elm.id = 'targetFrame';
		elm.className = 'iframe_small';

		iframe_box.appendChild(elm);
	}

}(iframeUrl));

window.addEventListener('message', function(e) {

	var port = e.ports[0];

	port.onmessage = function(e1) {

		console.log('#2 > %s, %s, %s, %s, %s, ', e1.data, e1.origin, e1.lastEventId, e1.source, e1.ports);

	};

}, false);

}());