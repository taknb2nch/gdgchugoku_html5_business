(function() {

var iframeHost = 'http://' + window.location.hostname +':8090';
var iframeUrl = iframeHost + '/gdgchugoku/html5/010/sample01b.html';

(function(url) {

	var elm = document.createElement('iframe');
	elm.src = url;
	elm.id = 'targetFrame';
	elm.className = 'iframe';

	document.querySelector('#iframe_box').appendChild(elm);

}(iframeUrl));


window.addEventListener('message', function(e) {

	if (e.origin === iframeHost) {

		console.log('#frame < %s, %s, %s, %s, %s', e.data, e.origin, e.lastEventId, e.source, e.ports);

	}

}, false);


var button_data = document.querySelector('#button_data');
button_data.addEventListener('click', function(e) {

	var text_data = document.querySelector('#text_data');
	var targetFrame = document.querySelector('#targetFrame');

	if (!text_data.value) {
		return;
	}

	//targetFrame.contentWindow.postMessage({ type: 'text', data: text_data }, 'http://localhost');
	targetFrame.contentWindow.postMessage({ type: 'text', data: text_data.value }, iframeHost);

}, false);


var button_color = document.querySelector('#button_color');
button_color.addEventListener('click', function(e) {

	var color = document.querySelector('#select_color').value;
	var targetFrame = document.querySelector('#targetFrame');

	targetFrame.contentWindow.postMessage({ type: 'color', data: color }, iframeHost);

}, false);

}());