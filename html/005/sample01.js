(function() {

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

var button_read = document.querySelector('#button_read');
button_read.addEventListener('click', function(e) {
	//
	window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, 
		function(fileSystem) {
			log('Opened file system: ' + fileSystem.name);

			fileSystem.root.getFile('log.txt', 
				{  },
				function(fileEntry) {
					fileEntry.file(
						function(file) {
							var reader = new FileReader();

							reader.onloadend = function (e) {
								var textArea = document.querySelector('#log');
								textArea.value = reader.result;
							};

							reader.readAsText(file);
						}, 
						errorHandler);
				}, 
				function (e) {
					alert('存在しません。');

					var textArea = document.querySelector('#log');
					textArea.value = '';

					errorHandler(e);
				});
		}, 
		errorHandler);

}, false);

var button_write = document.querySelector('#button_write');
button_write.addEventListener('click', function(e) {
	//
	window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, 
		function(fileSystem) {
			log('Write file system: ' + fileSystem.name);

			fileSystem.root.getFile('log.txt', 
				{ create: true },
				function(fileEntry) {

					fileEntry.createWriter(
						function(fileWriter) {
							fileWriter.onwrite = function(e) {
								log('Write...');
							};

							fileWriter.onwriteend = function(e) {
								log('Write completed.');
							};

							fileWriter.onerror = function(e) {
								log('Write failed: ' + e.toString());
							};

							var element = document.querySelector('#text_input');

							//var bb = new BlobBuilder();
							//bb.append('ほげほげ');

							//fileWriter.write(bb.getBlob('text/plan'));
							var blob = new Blob([ element.value + '\n' ], { type: 'text/plain;charset=UTF-8' });
							fileWriter.write(blob);
						},
						errorHandler);
				},
				errorHandler);
		},
		errorHandler);

}, false);

var button_append = document.querySelector('#button_append');
button_append.addEventListener('click', function(e) {
	//
	window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, 
		function(fileSystem) {
			log('append file system: ' + fileSystem.name);

			fileSystem.root.getFile('log.txt', 
				{ create: false },
				function(fileEntry) {

					fileEntry.createWriter(
						function(fileWriter) {
							fileWriter.onwriteend = function(e) {
								log('Write completed.');
							};

							fileWriter.onerror = function(e) {
								log('Write failed: ' + e.toString());
							};

							// seek to end
							fileWriter.seek(fileWriter.length);

							var element = document.querySelector('#text_input');

							var blob = new Blob([ element.value + '\n' ], { type: 'text/plain;charset=UTF-8' });
							fileWriter.write(blob);
						},
						errorHandler);
				},
				errorHandler);
		},
		errorHandler);

}, false);

var button_delete = document.querySelector('#button_delete');
button_delete.addEventListener('click', function(e) {
	//
	window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, 
		function(fileSystem) {
			log('delete file system: ' + fileSystem.name);

			fileSystem.root.getFile('log.txt', 
				{ create: false },
				function(fileEntry) {

					fileEntry.remove(
						function() {
							log(fileEntry.name + ' removed.');
						}, 
						errorHandler);

				},
				errorHandler);
		},
		errorHandler);

}, false);

function errorHandler(e) {
	var msg = '';

	switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
			msg = 'QUOTA_EXCEEDED_ERR';
			break;
		case FileError.NOT_FOUND_ERR:
			msg = 'NOT_FOUND_ERR';
			break;
		case FileError.SECURITY_ERR:
			msg = 'SECURITY_ERR';
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			msg = 'INVALID_MODIFICATION_ERR';
			break;
		case FileError.INVALID_STATE_ERR:
			msg = 'INVALID_STATE_ERR';
			break;
		default:
			msg = 'Unknown Error';
			break;
	};

	console.log('Error: ' + msg);
}


function log(message) {
	console.log(message);

	var element = document.querySelector('#message');
	element.innerHTML += message + '<br>';
}

})();