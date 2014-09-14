(function() {

var fileSystem = null;

// file system の初期化
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
	fileSystem = fs;
}, errorHandler);

var entries = new Array();

var treeview = document.querySelector('#treeview');
var preview = document.querySelector('#preview');

// ※最低限 dragover と drop のイベントハンドラを定義します。
var drop_zone = document.querySelector('#drop_zone');
// dragover event handler
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
		message.innerHTML = 'ファイルが選択されていません。';
		return false;
	}

	for (var i = 0; i < e.dataTransfer.items.length; i++) {
		entries.push(e.dataTransfer.items[i].webkitGetAsEntry());
	}
	
	copyNextIfExist();
}, false);

function copyNextIfExist() {
	if (entries && entries.length > 0) {
		var entry = entries.shift();

		copyEntry(entry);
	}

	treeview.innerHTML = '';

	readDirectory(treeview, fileSystem.root);
}

function copyEntry(entry) {
	entry.copyTo(fileSystem.root, null, function(copiedEntry) {
		log(copiedEntry.fullPath + ' copied.');

		copyNextIfExist();
	}, errorHandler);
}

function readDirectory(parentElement, directoryEntry) {
	var dirReader = directoryEntry.createReader();

	dirReader.readEntries(function(entries) {

		var div = document.createElement('div');

		var ul = document.createElement('ul');
		ul.className = 'tree';
		
		for (var i = 0; i < entries.length; i++) {
			var entry = entries[i];

			var li = document.createElement('li');

			if (entry.isDirectory) {
				li.className = 'tree-item-folder-close';
				li.dataset.opened = 0;
				li.onclick = directoryClick;
			} else {
				li.className = 'tree-item-file';
				li.onclick = fileClick;
			}

			li.dataset.fullpath = entry.fullPath;
			li.innerHTML = entry.name;

			li.draggable = 'true';
			li.ondragover = liDragOver;
			li.ondrop = liDrop;

			ul.appendChild(li);
		}

		div.appendChild(ul);

		parentElement.appendChild(div);
		
	}, errorHandler);
}

function readFile(parentElement, fileEntry) {
	preview.innerHTML = '';

	fileEntry.file(
		function(f) {
			var reader = new FileReader();

			reader.onerror = function(e) {
				parentElement.innerHTML = 'プレビュー表示出来ません。';
			}

			if (/^video/.test(f.type)) {
				reader.onload = function(e) {
					log(f.name + ' の読み込みが正常に完了しました。');

					var element = document.createElement('video');
					element.type = f.type;
					element.src = reader.result;
					element.controls = true;
					element.width = 480;

					preview.appendChild(element);
				};

				reader.readAsDataURL(f);
			} else if (/^image/.test(f.type)) {
				reader.onload = function(e) {
					log(f.name + ' の読み込みが正常に完了しました。');

					var element = document.createElement('img');
					element.src = reader.result;
					element.className = 'thumbnail';

					preview.appendChild(element);
				};

				reader.readAsDataURL(f);
			} else if (/^text/.test(f.type)) {
				reader.onload = function(e) {
					log(f.name + ' の読み込みが正常に完了しました。');

					preview.innerHTML = reader.result;
				};

				reader.readAsText(f);
			} else {
				preview.innerHTML = '未対応のファイルです。';
			}
		}, 
		function(e) {
			preview.innerHTML = 'プレビュー表示出来ません。';
			errorHandler(e);
		});
}

function directoryClick(e) {
	// important!上位要素へのイベントの伝播を止めます。
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	
	var element = e.target;

	if (element.dataset.opened == 0) {
		element.className = 'tree-item-folder-open';
		element.dataset.opened = 1

		fileSystem.root.getDirectory(element.dataset.fullpath, {}, function(de) {
			readDirectory(element, de);
		}, errorHandler);
	} else {
		if (element.lastChild) {
			element.removeChild(element.lastChild);
		}

		element.className = 'tree-item-folder-close';
		element.dataset.opened = 0
	}

	return false;
}

function fileClick(e) {
	// important!上位要素へのイベントの伝播を止めます。
	if (e.stopPropagation) {
		e.stopPropagation();
	}

	var element = e.target;

	fileSystem.root.getFile(element.dataset.fullpath, {}, function(fe) {
		readFile(element, fe);
	}, errorHandler);

	return false;
}

function liDragEnter(e) {

}

function liDragLeave (e) {

}

function liDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
	}

	return false;
}

function liDrop (e) {

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

		treeview.innerHTML = '';
		preview.innerHTML = '';

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
}

function log(message) {
	console.log(message);

	var element = document.querySelector('#message');
	element.innerHTML += message + '<br>';
}
	
})();