(function() {

var button_connect = document.querySelector('#button_connect')
  , button_close = document.querySelector('#button_close')
  , input_send = document.querySelector('#input_send');

var ws = null;

button_connect.addEventListener('click', function(e) {

	var ul = document.querySelector('#output ul');

	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	if (ws) {
		ws = null;
	}

	ws = new WebSocket('ws://' + location.hostname + ':8091/04');

	ws.onopen = function(e) {
		console.log('接続しました。');
	}

	ws.onmessage = function(e) {
		appendResult(createStringElement(e.data));
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

input_send.addEventListener('click', function(e) {

	var element = document.querySelector('#text_message');

	if (!element.value) {
		return;
	}

	if (!ws || ws.readyState !== ws.OPEN) {
		return;
	}

	ws.send(element.value);

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

function createStringElement(obj) {

	var data
	  , span;

	data = JSON.parse(obj);
	
	span = document.createElement('span');
	span.innerHTML = '';

	// if (data.status === 'keyword-changed') {
	// 	span.innerHTML += 'キーワードが変更 : ';
	// 	span.className = 'keyword-changed';
	// }

	span.innerHTML += data.text.replace(/\r?\n/g, '<br>');

	return span;
}

}());