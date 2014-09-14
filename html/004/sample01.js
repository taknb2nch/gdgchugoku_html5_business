(function() {

	var button_get = document.querySelector('#button_get');

	button_get.addEventListener('click', function(e) {
		var output = document.querySelector('#output');
		var file_input = document.querySelector('#file_input');

		// 
		if (file_input.files.length == 0) {
			output.innerHTML = 'ファイルが選択されていません。';
			return false;
		} 

		var fileInfo = [];

		[].forEach.call(file_input.files, function(file) {
			fileInfo.push('<li><strong>' + decodeURI(file.name) + '</strong> [' + 
				file.type + ', ' + file.size + ', ' + file.lastModifiedDate.toLocaleDateString() + ']</li>');
		});

		output.innerHTML = '<ul>' + fileInfo.join('') + '</ul>';
	}, false);

})();
