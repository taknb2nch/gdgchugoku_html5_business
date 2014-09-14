(function() {

var iframeHost = 'http://' + window.location.hostname +':8090';
var iframeUrl = iframeHost + '/gdgchugoku/html5/010/sample02b.html';

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

	targetFrame.contentWindow.postMessage({ type: 'text', data: text_data.value }, iframeHost);

	text_data.value = '';

}, false);


var drop_zone = document.getElementById('drop_zone');

drop_zone.addEventListener('dragover', function(e) {

	if (e.preventDefault) {
		e.preventDefault();
	}

	return false;
}, false);


drop_zone.addEventListener('drop', function(e) {

	var file, 
		targetFrame;

	if (e.preventDefault) {
		e.preventDefault();
	}

	if (e.dataTransfer.items.length == 0) {
		return false;
	}

	file = e.dataTransfer.items[0].getAsFile();

	if (/^image/.test(file.type)) {

		targetFrame = document.querySelector('#targetFrame');

		targetFrame.contentWindow.postMessage({ type: 'file', data: file }, iframeHost);
	}

}, false);


}());