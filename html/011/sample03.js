(function() {

var button_connect = document.querySelector('#button_connect')
  , button_close = document.querySelector('#button_close')
  , button_send = document.querySelector('#button_send')
  , drop_zone = document.querySelector('#drop_zone');

var ws = null;

button_connect.addEventListener('click', function(e) {

	if (ws) {
		ws = null;
	}

	ws = new WebSocket('ws://' + location.hostname + ':8091/03');

	ws.onopen = function(e) {
		console.log('接続しました。');
	}

	ws.onmessage = function(e) {

		if (typeof(e.data) === 'string') {

			appendResult(createStringElement(e.data));

		} else {

			appendResult(createImageElement(e.data));

		}
	};

	ws.onerror = function(e) {
		console.log('エラーが発生しました。');
	};

	ws.onclose = function(e) {
		console.log('切断しました。, code=%s, reason=%s', e.code, e.reason);
	};


}, false);

button_close.addEventListener('click', function(e) {

	if (ws) {
		ws.close();
	}

}, false);

button_send.addEventListener('click', function(e) {

	var element = document.querySelector('#text_message');

	if (!ws || ws.readyState !== ws.OPEN) {
		return;
	}

	if (element.value) {
		ws.send(element.value);
	}

}, false);

drop_zone.addEventListener('dragover', function(e) {

	if (e.preventDefault) {
		e.preventDefault();
	}

}, false);

drop_zone.addEventListener('drop', function(e) {
	
	var file = e.dataTransfer.files[0];

	if (e.preventDefault) {
		e.preventDefault();
	}

	if (!ws || ws.readyState !== ws.OPEN) {
		return;
	}

	if (file) {
		ws.send(file);
	}

}, false);

function appendResult(element) {

	var li
	  , ul
	  , div
	  , firstChild;

	div = document.createElement('div');
	div.className = 'log_message';
	div.appendChild(element);

	li = document.createElement('li');
	li.appendChild(div);

	ul = document.querySelector('#output ul');

	firstChild = ul.firstChild;

	if (firstChild) {
		ul.insertBefore(li, firstChild);
	} else {
		ul.appendChild(li);
	}

}

function createStringElement(str) {

	var span = document.createElement('span');
	span.innerHTML = str.replace(/\r?\n/g, '<br>');

	return span;
}

function createImageElement(bolb) {

	var img
	  , url
	  , anchor;

	url = window.URL.createObjectURL(bolb);

	img = document.createElement('img');
	img.src = url;
	img.className = 'thumbnail';

	anchor = document.createElement('a');
	anchor.href = url;
	anchor.target = '_blank';
	anchor.appendChild(img);

	return anchor;

}

}());