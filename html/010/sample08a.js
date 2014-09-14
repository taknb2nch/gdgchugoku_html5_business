(function() {

var iframeHost = 'http://' + window.location.hostname +':8090';
var iframeUrl_b = iframeHost + '/gdgchugoku/html5/010/sample08b.html';
var iframeUrl_c = iframeHost + '/gdgchugoku/html5/010/sample08c.html';

var channel;

function addIFrame(url, id) {

	var elm = document.createElement('iframe');
	elm.src = url;
	elm.id = id;
	elm.className = 'iframe';

	document.querySelector('#iframe_box').appendChild(elm);
}

addIFrame(iframeUrl_b, 'targetFrame1');
addIFrame(iframeUrl_c, 'targetFrame2');

window.addEventListener('message', function(e) {

	var otherFrame = document.querySelector('#targetFrame2');

	if (e.ports.length < 1) {
		return;
	}
	
	otherFrame.contentWindow.postMessage('', iframeHost, [ e.ports[0] ]);

	console.log('send port to otherFrame.');

}, false);

}());