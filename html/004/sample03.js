(function() {
	var reader = null;

	var button_cancel = document.querySelector('#button_cancel');

	button_cancel.addEventListener('click', function(e) {
		if (reader) {
			reader.abort();
			reader = null;
		}
	}, false);

	var drop_zone = document.querySelector('#drop_zone');

	// ※最低限 dragover と drop のイベントハンドラを定義します。

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
		
		var message = document.querySelector('#message');
		var output = document.querySelector('#output');

		output.innerHTML = '';
		message.innerHTML = '';

		// dataTransfer の files にドロップされたファイル情報がセットされています。
		if (e.dataTransfer.files.length == 0) {
			message.innerHTML = 'ファイルが選択されていません。';
			return false;
		} 

		var file = e.dataTransfer.files[0];

		reader = new FileReader();

		reader.onloadstart = function(e) {
			message.innerHTML = '<strong>' + file.name + '</strong> の読み込みを開始しました。<br>';
		};

		reader.onprogress = function(e) {
			//if (e.lengthComputable == true && e.total > 0) {
			//}
			if (e.lengthComputable == true) {
				message.innerHTML += e.total + 'バイト中 ' + e.loaded + 'バイトを読み込みました。<br>';
			} else {
				message.innerHTML += e.loaded + 'バイトを読み込みました。<br>';
			}
		};

		reader.onabort = function(e) {
			message.innerHTML += '読み込みが中止されました。<br>';
		};

		reader.onerror = function(e) {
			message.innerHTML += '読み込み中にエラーが発生しました。<br>';
		};

		//reader.onload = function(e) {
		//	message.innerHTML += '読み込みが正常に完了しました。<br>';

		//	output.innerHTML = reader.result;
		//};

		reader.onloadend = function(e) {
			message.innerHTML += '読み込みが終了しました。<br>';
		}

		if (/^video/.test(file.type)) {
			reader.onload = function(e) {
				message.innerHTML += '読み込みが正常に完了しました。<br>';

				var element = document.createElement('video');
				element.type = file.type;
				element.src = reader.result;
				element.controls = true;
				element.height = 280;

				output.appendChild(element);
			};

			reader.readAsDataURL(file);
		} else if (/^image/.test(file.type)) {
			reader.onload = function(e) {
				message.innerHTML += '読み込みが正常に完了しました。<br>';

				var element = document.createElement('img');
				element.src = reader.result;
				element.height = 280;

				output.appendChild(element);
			};

			reader.readAsDataURL(file);
		} else if (/^text/.test(file.type)) {
			reader.onload = function(e) {
				message.innerHTML += '読み込みが正常に完了しました。<br>';

				output.innerHTML = reader.result;
			};

			reader.readAsText(file);
		} else {
			reader.onload = function(e) {
				message.innerHTML += '読み込みが正常に完了しました。<br>';

				var bytes = new Uint8Array(reader.result);
				var str = '';

				for (var i = 0, len = Math.min(bytes.length, 100); i < len; i++) {
					str += ('0' + bytes[i].toString(16)).slice(-2);
					str += ((i + 1) % 16 == 0) ? '\n' : ' ';
				}

				output.innerHTML = str;
			}
			
			reader.readAsArrayBuffer(file);
		}
	}, false);
})();
