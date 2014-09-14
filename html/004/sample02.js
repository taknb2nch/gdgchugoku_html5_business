(function() {

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
		
		var output = document.querySelector('#output');

		// dataTransfer の files にドロップされたファイル情報がセットされています。
		if (e.dataTransfer.files.length == 0) {
			output.innerHTML = 'ファイルが選択されていません。';
			return false;
		} 

		var fileInfo = [];

		[].forEach.call(e.dataTransfer.files, function(file) {
			fileInfo.push('<li><strong>' + decodeURI(file.name) + '</strong> [' + 
				file.type + ', ' + file.size + ', ' + file.lastModifiedDate.toLocaleDateString() + ']</li>');
		});

		output.innerHTML = '<ul>' + fileInfo.join('') + '</ul>';
	}, false);
	
})();
