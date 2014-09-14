(function() {
	
	var worker = new Worker('sample02_worker.js');

	worker.onmessage = function(e) {
		var output = document.querySelector('#output')
		output.innerHTML = e.data;
	};

	worker.onerror = function(e) {
		var output = document.querySelector('#output')
		output.innerHTML = e.filename + '<br>' + e.lineno + '<br>' + e.message;	
	}

	//
	var button_start = document.querySelector('#button_start');
	button_start.addEventListener('click', function(e) {

		worker.postMessage({ 'cmd' : 'exec', 'message' : 'hello'});

	}, false);

	//
	var button_terminate = document.querySelector('#button_terminate');
	button_terminate.addEventListener('click', function(e) {

		worker.terminate();

	}, false);

	//
	var button_close = document.querySelector('#button_close');
	button_close.addEventListener('click', function(e) {

		worker.postMessage({ 'cmd' : 'stop', 'message' : 'empty'});

	}, false);

})();