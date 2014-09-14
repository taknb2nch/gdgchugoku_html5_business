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

	var store = myDB.createObjectStore(os_name, { keyPath : 'id', autoIncrement : true });

	console.log('オブジェクトストアを作成しました。: ' + store.name);

	initial_data.forEach(function(d) {
		store.put(d);
	});

	console.log('テストデータを登録しました。: ' + initial_data.length);

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
var button_select_list = document.querySelector('#button_select_list');
button_select_list.addEventListener('click', function(e) {

	var trans = db.transaction([ os_name ], 'readonly')
	var store = trans.objectStore(os_name);
	//
	getAndDisplayCount(store);

	var req = openCursor(store);

	clearResult();

	req.onsuccess = function(e) {
		
		var cursor = e.target.result;

		if (cursor) {

			var data = cursor.value;
			
			addResultList(formatData(data));

			cursor.continue();
		}
	};

	req.onerror = function(e) {
		addResultList('一覧取得に失敗しました。: ' + e.target.error);
	};

}, false);

// ------------------------------------------------------------
var button_update = document.querySelector('#button_update');
button_update.addEventListener('click', function(e) {

	var trans = db.transaction([ os_name ], 'readwrite')
	var store = trans.objectStore(os_name);
	//
	var req = openCursor(store);

	clearResult();

	req.onsuccess = function(e) {
		
		var cursor = e.target.result;

		if (cursor) {

			var data = cursor.value;

			data.name = '----------';

			var rq = cursor.update(data);

			rq.onsuccess = function(e) {
				// primary key
				addResultList('更新しました。: ' + e.target.result);
			};
			rq.onerror = function(e) {
				addResultList('更新に失敗しました。: ' + e.target.error + ' : ' + data.id);
			};

			cursor.continue();
		}
	};

	req.onerror = function(e) {
		addResultList('一覧取得に失敗しました。: ' + e.target.error);
	};

}, false);

// ------------------------------------------------------------
var button_delete = document.querySelector('#button_delete');
button_delete.addEventListener('click', function(e) {

	var trans = db.transaction([ os_name ], 'readwrite')
	var store = trans.objectStore(os_name);
	//
	var req = openCursor(store);

	clearResult();

	req.onsuccess = function(e) {
		
		var cursor = e.target.result;

		if (cursor) {

			var data = cursor.value;

			var rq = cursor.delete(data);

			rq.onsuccess = function(e) {
				// e.target.result is undefined.
				addResultList('削除しました。: ' + data.id);
			};
			rq.onerror = function(e) {
				addResultList('削除に失敗しました。: ' + data.id);
			};

			cursor.continue();
		}
	};

	req.onerror = function(e) {
		addResultList('一覧取得に失敗しました。: ' + e.target.error);
	};

}, false);


// ------------------------------------------------------------
// ------------------------------------------------------------
function openCursor(store) {
	//
	var range = buildRange();
	var direction = buildDirection();

	var req;

	if (direction) {
		req = store.openCursor(range, direction);
	} else {
		req = store.openCursor(range);
	}

	return req;

}

function getAndDisplayCount(store) {
	//
	var range = buildRange();
	var direction = buildDirection();

	var req = store.count(range);

	req.onsuccess = function(e) {
		setResultCount('取得結果: ' + e.target.result + '件')
	};

	req.onerror = function(e) {
		setResultCount('カウントの取得に失敗しました。' + e.target.error);
	};

}
