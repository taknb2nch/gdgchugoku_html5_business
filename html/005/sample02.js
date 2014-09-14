(function() {

var fileSystem = null;

// file system の初期化
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
	fileSystem = fs;
}, errorHandler);

//
var button_create = document.querySelector('#button_create');
button_create.addEventListener('click', function(e) {
	var folders = document.querySelector('#folders').value.split('/');
	
	createDirectory(fileSystem.root, folders);
}, false);

function createDirectory(root, folderNames) {
	if (folderNames.length == 0) {
		return;
	}

	createFile(root, folderNames[0] + '-file.txt');

	root.getDirectory(folderNames[0], { create: true }, function(directoryEntry) {
		log(directoryEntry.fullPath + ' created.');
		//if (folderNames.length > 0) {
			createDirectory(directoryEntry, folderNames.slice(1));
		//}
	}, errorHandler);
}

function createFile(root, fileName) {
	root.getFile(fileName, { create : true }, function(fileEntry) {

		fileEntry.createWriter(function(fileWriter) {

			fileWriter.onwriteend = function(e) {
				log(fileEntry.fullPath + ' wrote.');
			};

			fileWriter.onerror = function(e) {
				log(fileEntry.fullPath + ' failure.');
			};

			var blob = new Blob([ fileEntry.name + '\n', new Date() ], { type: 'text/plain;charset=UTF-8' });

			fileWriter.write(blob);

		}, errorHandler);

	}, errorHandler);
}

var button_list = document.querySelector('#button_list');
button_list.addEventListener('click', function(e) {

	readDirectory(fileSystem.root);

}, false);

function readDirectory(root) {
	var dirReader = root.createReader();

	dirReader.readEntries(function(entries) {
		
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i];

			log(entry.fullPath + ' ' + i);

			if (entry.isDirectory) {
				readDirectory(entry);
			}
		};
		
	}, errorHandler);
}


var button_delete_all = document.querySelector('#button_delete_all');
button_delete_all.addEventListener('click', function(e) {

	var dirReader = fileSystem.root.createReader();

	dirReader.readEntries(function(entries) {
		
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i];

			if (entry.isFile) {
				
				entry.remove(function() {
					log('ファイルを削除しました。');
				}, errorHandler);

			} else if (entry.isDirectory) {
				
				entry.removeRecursively(function() {
					log('ディレクトリを削除しました。');
				}, errorHandler);

			}
		}
	}, errorHandler);

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

	log('Error: ' + msg);
	//alert('Error: ' + msg);
}

function log(message) {
	console.log(message);

	var element = document.querySelector('#message');
	element.innerHTML += message + '<br>';
}

})();