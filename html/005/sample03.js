(function() {

var fileSystem = null;

// file system の初期化
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
	fileSystem = fs;
}, errorHandler);

//
var button_download = document.querySelector('#button_download');
button_download.addEventListener('click', function(e) {

	var element = document.querySelector('#message');

	if (!element.value) {
		clearDownloadArea();

		return false;
	}

	createFile(element.value);

}, false);

function createFile(message) {

	var fileName = 'sample.txt';

	fileSystem.root.getFile(fileName, { create: true }, function (fe) {

		fe.createWriter(function(fw) {

			fw.onwrite = function (e) {
				setDownloadArea(fe.toURL(), fileName);
			};

			fw.onerror = function (e) {
				clearDownloadArea();
			}

			var blob = new Blob([ message ], { type: 'text/plain;charset=utf-8' });

			fw.write(blob);

		}, errorHandler);

	}, errorHandler);

}

function setDownloadArea(url, fileName) {
	var download_area = document.querySelector('#download_area');
	download_area.innHTML = '';
	
	var anchor = document.createElement('a');
	anchor.href = url;
	anchor.innerText = fileName;

	download_area.appendChild(anchor);
}

function clearDownloadArea() {
	var download_area = document.querySelector('#download_area');
	download_area.innHTML = '';
}

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

	log('Error: ' + msg);
	alert('Error: ' + msg);
}


})();