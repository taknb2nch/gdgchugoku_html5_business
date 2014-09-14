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
var button_delete = document.querySelector('#button_delete');
button_delete.addEventListener('click', function(e) {

	var key = parseInt(document.querySelector('#key').value);

	//
	var trans = db.transaction(['todo'], 'readwrite');
	var store = trans.objectStore('todo');

	var req = store.delete(key);

	req.onsuccess = function(e) {
		console.log('データを削除しました ' + key + ' ' + e);
	};

	req.onerror = function(e) {
		console.log('error ' + e);
	}

}, false);

// ------------------------------------------------------------
var button_delete_all = document.querySelector('#button_delete_all');
button_delete_all.addEventListener('click', function(e) {

	//
	var trans = db.transaction(['todo'], 'readwrite');
	var store = trans.objectStore('todo');

	var req = store.clear();

	req.onsuccess = function(e) {
		console.log('データを全件削除しました ' + e);
	};

	req.onerror = function(e) {
		console.log('error ' + e);
	}

}, false);

}());