(function(){

var db = null;
var version = 1;
var indexedDB = window.indexedDB;

// ------------------------------------------------------------
var button_create_db = document.querySelector('#button_create_db');
button_create_db.addEventListener('click', function(e) {

	var database_name = document.querySelector('#database_name').value;

	if (!database_name) {
		return;
	}

	var req = indexedDB.open(database_name, 1);

	req.onsuccess = function(e) {
		console.log('データベースの接続に成功しました。 ' + e.target.result.name + ', ' + e.target.result.version);
		db = e.target.result;

		db.close();
	};

	req.onerror = function(e) {
		console.log('データベースの接続に失敗しました。 ' + e);
	};

	req.onupgradeneeded = function(e) {
		console.log('データベースをアップグレードします。 ' + e.target.result.name + ', ' + e.target.result.version);

		setupDB(e.target.result);
	};

}, false);

// ------------------------------------------------------------
function setupDB(myDB) {

	if (myDB.objectStoreNames.contains('todo')) {
		myDB.deleteObjectStore('todo');

		console.log('オブジェクトストアを削除しました。');
	}

	var store = myDB.createObjectStore('todo', { keyPath : 'id', autoIncrement : true });

	console.log('オブジェクトストアを作成しました。: ' + store.name);
}

// ------------------------------------------------------------
var button_drop_db = document.querySelector('#button_drop_db');
button_drop_db.addEventListener('click', function(e) {

	var database_name = document.querySelector('#database_name').value;

	if (!database_name) {
		return;
	}

	var req = indexedDB.deleteDatabase(database_name);

	req.onsuccess = function(e) {
		console.log('データベースを削除しました。 ' + database_name);
	};

	req.onerror = function(e) {
		console.log('データベースの削除に失敗しました。 ' + e);
	};

}, false);

}());