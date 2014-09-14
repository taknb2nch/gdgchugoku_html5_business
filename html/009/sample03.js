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
var button_get = document.querySelector('#button_get');
button_get.addEventListener('click', function(e) {

	var key = parseInt(document.querySelector('#key').value);

	//
	var trans = db.transaction(['todo'], 'readonly');
	var store = trans.objectStore('todo');

	var req = store.get(key);

	req.onsuccess = function(e) {
		console.log('success add ' + e.target.result);

		pushResults(key, e.target.result);
	};

	req.onerror = function(e) {
		console.log('error ' + e);
	}

}, false);

function pushResults(key, data) {
	var result = document.querySelector('#result');

	if (data) {
		result.innerHTML += key + ', ' + data.message + ', ' + data.timestamp.toLocaleString() + '<br>';
	} else {
		result.innerHTML += key + ' は存在しません。<br>';
	}
}

}());