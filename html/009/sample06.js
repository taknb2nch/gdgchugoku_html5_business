var database_name = 'sample01';
var os_customer = 'customer';
var os_history = 'history';
var version = 10;

var indexedDB = window.indexedDB;
var db = null;

// ------------------------------------------------------------
var button_createdb = document.querySelector('#button_createdb');
button_createdb.addEventListener('click', function(e) {

	var req = indexedDB.open(database_name, version);

	req.onsuccess = function(e) {
		console.log('データベースの接続に成功しました。 ' + e.target.result.name + ', ' + e.target.result.version);

		db = e.target.result;
	};

	req.onerror = function(e) {
		console.log('データベースの接続に失敗しました。: ' + e.target.error);
	};

	req.onupgradeneeded = function(e) {
		console.log('データベースをアップグレードします。 ' + e.target.result.name + ', ' + e.target.result.version);

		setupDB(e.target.result);
	};

}, false);

// ------------------------------------------------------------
function setupDB(myDB) {

	for (var i = 0; i < myDB.objectStoreNames.length; i++) {
		var objectStoreName = myDB.objectStoreNames[i];

		myDB.deleteObjectStore(objectStoreName);

		console.log('オブジェクトストアを削除しました。: ' + objectStoreName);
	};

	var storeCustomer = myDB.createObjectStore(os_customer, { keyPath : 'id', autoIncrement : true });
	var storeHistory = myDB.createObjectStore(os_history, { keyPath : 'id', autoIncrement : true });

	console.log('オブジェクトストアを作成しました。');

}

// ------------------------------------------------------------
var button_dropdb = document.querySelector('#button_dropdb');
button_dropdb.addEventListener('click', function(e) {

	if (db != null) {
		db.close();
		db = null;
	}

	var req = indexedDB.deleteDatabase(database_name);

	req.onsuccess = function(e) {
		console.log('データベースの削除に成功しました。 ');

		db = null;
	};

	req.onerror = function(e) {
		console.log('データベースの削除に失敗しました。: ' + e.target.error);
	};

}, false);

// ------------------------------------------------------------
var button_put_abort = document.querySelector('#button_put_abort');
button_put_abort.addEventListener('click', function(e) {

	var trans = db.transaction([ os_customer, os_history ], 'readwrite');

	trans.oncomplete = function(e) {
		console.log('トランザクションが完了しました。 : ' + e.target.result);
	};

	trans.onabort = function(e) {
		console.log('トランザクションをロールバックしました。 : ' + e.target.result);
	};

	trans.onerror = function(e) {
		console.log('トランザクション中にエラーが発生しました。 ' + e.target.result);
	};

	var storeCustomer = trans.objectStore(os_customer);
	var storeHistory = trans.objectStore(os_history);

	var isRollback = document.querySelector('#rollback').checked;

	for (var i = 1; i <= 10; i++) {
		var data = {
			name : 'テストユーザ' + i,
			timestamp : new Date(),
		};

		var req = storeCustomer.put(data);

		req.onsuccess = function(e) {
			console.log('登録しました。: ' + os_customer + ' : ' + e.target.result + ', ' + i);
		};

		req.onerror = function(e) {
			console.log('登録に失敗しました。: ' + e.target.error);
		}
	}

	for (var i = 1; i <= 10; i++) {
		var data = {
			commnt : 'テストコメント' + i,
			timestamp : new Date(),
		};

		var req = storeHistory.put(data);

		req.onsuccess = function(e) {
			console.log('登録しました。: ' + os_history + ' : ' + e.target.result + ', ' + i);

			if (isRollback && e.target.result == 10) {
				// 以下のどちらでも構いません。
				//e.target.transaction.abort();
				req.transaction.abort();
			}
		};

		req.onerror = function(e) {
			console.log('登録に失敗しました。: ' + e.target.error);
		}
	}

}, false);

