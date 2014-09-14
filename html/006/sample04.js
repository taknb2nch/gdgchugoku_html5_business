(function() {
//
var button_start = document.querySelector('#button_start');
button_start.addEventListener('click', function(e) {

	var canvas = document.getElementById('output2');
	var context = canvas.getContext('2d');
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

	var worker = new Worker('sample04_worker.js');

	worker.addEventListener('message', function(e) {

		var output = context.createImageData(canvas.width, canvas.height);

		for (var i = 0; i < e.data.length; i++) {
			output.data[i] = e.data[i];
		}

		context.putImageData(output, 0, 0);
	}, false);

	worker.addEventListener('error', function(e) {
		alert(e.filename + '\n' + e.lineno + '\n' + e.message);
	}, false);

	worker.postMessage(imageData.data);

}, false);

button_start.disabled = true;

//
var drop_zone = document.querySelector('#drop_zone');
drop_zone.addEventListener('dragover', function(e) {

	if (e.preventDefault) {
		e.preventDefault();
	}

	return false;
}, false);

// drop event handler
drop_zone.addEventListener('drop', function(e) {
	
	if (e.preventDefault) {
		e.preventDefault();
	}

	if (e.dataTransfer.items.length == 0) {
		alert('ファイルが選択されていません。');
		return false;
	}

	var file = e.dataTransfer.files[0];

	if (/^image/.test(file.type) == false) {
		alert('画像ファイルを選択してください。');
		return true;
	}

	var reader = new FileReader();
	reader.addEventListener('load', function(e) {

		var output1 = document.querySelector('#output1');

		while (output1.firstChild) {
			output1.removeChild(output1.firstChild);
		}

		var image = document.createElement('img');
		image.src = reader.result;

		image.addEventListener('load', function(e) {
			var canvas = document.querySelector('#output2');
			canvas.width = image.width;
			canvas.height = image.height;

			var context = canvas.getContext('2d');
			context.drawImage(image, 0, 0);
		}, false);

		output1.appendChild(image);

		button_start.disabled = false;

	}, false);

	reader.readAsDataURL(file);
}, false);

})();