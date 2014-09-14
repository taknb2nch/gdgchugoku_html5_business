(function(){

var db = null;
var version = 3;
var indexedDB = window.indexedDB;

var reqDB = indexedDB.open('sample01');

reqDB.onsuccess = function(e) {
	console.log('データベースの接続に成功しました。 ' + e.target.result.name + ', ' + e.target.result.version);

	db = e.target.result;
};

reqDB.onerror = function(e) {
	console.log('データベースの接続に失敗しました。 ' + e);
};

// ------------------------------------------------------------
var button_update = document.querySelector('#button_update');
button_update.addEventListener('click', function(e) {

	var key = parseInt(document.querySelector('#key').value);
	var message = document.querySelector('#message').value;

	//
	var trans = db.transaction(['todo'], 'readwrite');
	var store = trans.objectStore('todo');

	var req = store.get(key);

	req.onsuccess = function(e) {

		var data = e.target.result;

		if (data) {
			console.log('データを更新します。');

			data.message = message;
			data.timestamp = new Date();

		} else {
			console.log('データを登録します。');

			data = {
				id : key,
				message : message,
				timestamp : new Date(),
			};
		}

		store.put(data);
	};

	req.onerror = function(e) {
		console.log('error ' + e);
	}

}, false);

}());