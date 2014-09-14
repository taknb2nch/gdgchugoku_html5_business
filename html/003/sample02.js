(function(){
	// ドラッグ&ドロップサンプル1 用のスクリプト
	var srcElement = null;

	//
	//var elements1 = document.querySelector('#drag-columns1').children;
	var elements1 = document.querySelectorAll('#drag-columns1>*');

	[].forEach.call(elements1, function(element) {
		element.addEventListener('dragstart', function(e){
			this.style.opacity = '0.4';

			// -----
			srcElement = this; // or e.target
			e.dataTransfer.setData('text/html', this.innerHTML);

			var dragIcon = document.createElement('img');
			dragIcon.src = 'http://k.yimg.jp/images/top/sp/logo.gif';
			dragIcon.width = 100;

			e.dataTransfer.setDragImage(dragIcon, 0, 0);
		});

		element.addEventListener('dragend', function(e) {
			[].forEach.call(elements1, function(e1) {
				e1.classList.remove('over');
				e1.style.opacity = '1.0';
			}, false);
		}, false);

		element.addEventListener('drop', function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}

			// -----
			if (this != srcElement) {
				srcElement.innerHTML = this.innerHTML;
				this.innerHTML = e.dataTransfer.getData('text/html');
			}

			return false;
		}, false);		

		element.addEventListener('dragenter', function(e) {
			this.classList.add('over');
		}, false);

		element.addEventListener('dragleave', function(e) {
			this.classList.remove('over');
		}, false);

		element.addEventListener('dragover', function(e) {
			if (e.preventDefault) {
				e.preventDefault();
			}

			return false;
		}, false);
	});


	// ドラッグ&ドロップサンプル2 用のスクリプト
	var elements2 = document.querySelectorAll('#drag-columns2>*');

	[].forEach.call(elements2, function(element) {
		element.addEventListener('dragstart', function(e) {
			e.dataTransfer.setData('Text', e.target.id);

			// itemsプロパティに追加する場合
			//e.dataTransfer.items.add(e.target.id, 'Text');

			e.stopPropagation();
		}, false);
	});

	var droperea1 = document.getElementById('drop-area1');

	droperea1.addEventListener('dragenter', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		return false;
	}, false);

	droperea1.addEventListener('dragover', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		return false;
	}, false);

	droperea1.addEventListener('drop', function(e) {
		var id = e.dataTransfer.getData('Text');

		// itemsプロパティから取得する場合はコールバックをしようする
		//e.dataTransfer.items[0].getAsString(function(str) {
		//	var myid = str;
		//});

		var target = document.getElementById(id);

		if (target) {
			droperea1.appendChild(target);
		}

		e.preventDefault();
	}, false);

	// ドラッグ&ドロップサンプル3 用のスクリプト
	var droperea2 = document.querySelector('#drop-area2');

	droperea2.addEventListener('dragover', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		return false;
	}, false);

	droperea2.addEventListener('drop', function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}

		var count = e.dataTransfer.files.length;

		alert(count + ' 個のファイルがドロップされました。');

		[].forEach.call(e.dataTransfer.files, function(file) {
			var elm = document.createElement('div');
			elm.className = 'column';
			elm.innerText = file.name + ' ' +  file.lastModifiedDate;

			droperea2.appendChild(elm);
		});
	}, false);

	//
	var buttonDnDDetect = document.querySelector('#button-dnd-detect');

	buttonDnDDetect.addEventListener('click', function(e) {
		var div = document.createElement('div');
		var dnd_support =  ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);

		alert(dnd_support);
	}, false);
})();