(function() {

	var files = new Array();

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
		var output_text = document.querySelector('#output_text');
		var output_video = document.querySelector('#output_video');
		var output_image = document.querySelector('#output_image');

		// dataTransfer の files にドロップされたファイル情報がセットされています。
		if (e.dataTransfer.files.length == 0) {
			message.innerHTML = 'ファイルが選択されていません。';
			return false;
		}

		for (var i = 0; i < e.dataTransfer.files.length; i++) {
			files.push(e.dataTransfer.files[i]);
		}
		
		readNextIfExist();
	}, false);

	function readNextIfExist() {
		if (files && files.length > 0) {
			var file = files.shift();

			readFile(file);
		}
	}

	function readFile(file) {
		var reader = new FileReader();

		reader.onloadstart = function(e) {
			message.innerHTML += '<strong>' + file.name + '</strong> の読み込みを開始しました。<br>';
		};

		reader.onprogress = function(e) {
			//if (e.lengthComputable == true && e.total > 0) {
			//}
			if (e.lengthComputable == true) {
				message.innerHTML += '<strong>' + file.name + '</strong> の' + e.total + 'バイト中 ' + e.loaded + 'バイトを読み込みました。<br>';
			} else {
				message.innerHTML += '<strong>' + file.name + '</strong> の' + e.loaded + 'バイトを読み込みました。<br>';
			}
		};

		reader.onabort = function(e) {
			message.innerHTML += '<strong>' + file.name + '</strong> の読み込みが中止されました。<br>';
		};

		reader.onerror = function(e) {
			message.innerHTML += '<strong>' + file.name + '</strong> の読み込み中にエラーが発生しました。<br>';
		};

		reader.onloadend = function(e) {
			message.innerHTML += '<strong>' + file.name + '</strong> の読み込みが終了しました。<br>';

			readNextIfExist();
		}

		if (/^video/.test(file.type)) {
			reader.onload = function(e) {
				message.innerHTML += '<strong>' + file.name + '</strong> の読み込みが正常に完了しました。<br>';

				var element = document.createElement('video');
				element.type = file.type;
				element.src = reader.result;
				element.controls = true;
				element.height = 120;

				output_video.appendChild(element);
			};

			reader.readAsDataURL(file);
		} else if (/^image/.test(file.type)) {
			reader.onload = function(e) {
				message.innerHTML += '<strong>' + file.name + '</strong> の読み込みが正常に完了しました。<br>';

				var element = document.createElement('img');
				element.src = reader.result;
				//element.height = 80;
				element.className = 'thumbnail';

				output_image.appendChild(element);
			};

			reader.readAsDataURL(file);
		} else if (/^text/.test(file.type)) {
			reader.onload = function(e) {
				message.innerHTML += '<strong>' + file.name + '</strong> の読み込みが正常に完了しました。<br>';

				output_text.innerHTML += reader.result + '<hr>';
			};

			reader.readAsText(file);
		} else {
			message.innerHTML += '<strong>' + file.name + '</strong> は未対応のファイルです。<br>';

			readNextIfExist();
		}
	}
})();