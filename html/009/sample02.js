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
var button_add = document.querySelector('#button_add');
button_add.addEventListener('click', function(e) {

	var message = document.querySelector('#message').value;

	if (!message) {
		return;
	}

	//
	var data = {
		message : message,
		timestamp : new Date(),
	};

	//
	var trans = db.transaction(['todo'], 'readwrite');
	var store = trans.objectStore('todo');

	var req = store.put(data);

	req.onsuccess = function(e) {
		console.log('success add ' + e.target.result);
	};

	req.onerror = function(e) {
		console.log('error ' + e);
	}

}, false);

}());