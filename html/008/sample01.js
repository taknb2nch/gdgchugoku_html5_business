(function(){

//
function getStorage() {
	var storageType = document.querySelector('#storage_type').value;

	var mystorage;

	if (storageType == 'local') {
		mystorage = window.localStorage;
	} else {
		mystorage = window.sessionStorage;
	}

	return mystorage;
}

// 登録
var button_regist = document.querySelector('#button_regist');
button_regist.addEventListener('click', function(e) {

	var mystorage = getStorage();

	var key = document.querySelector('#field_key1').value;
	var value = document.querySelector('#field_value1').value;

	mystorage.setItem(key, value);

}, false);



// 取得
var button_read = document.querySelector('#button_read');
button_read.addEventListener('click', function(e) {

	var mystorage = getStorage();

	var key = document.querySelector('#field_key2').value;

	var value = mystorage.getItem(key);

	if (value == null) {
		alert(key + ' は登録されていません。')
		document.querySelector('#field_value2').value = null;
	} else {
		document.querySelector('#field_value2').value = value;
	}

}, false);



// 更新
var button_update = document.querySelector('#button_update');
button_update.addEventListener('click', function(e) {

	var mystorage = getStorage();

	var key = document.querySelector('#field_key2').value;
	var value = document.querySelector('#field_value2').value;

	mystorage.setItem(key, value);

}, false);



// 削除
var button_delete = document.querySelector('#button_delete');
button_delete.addEventListener('click', function(e) {

	var mystorage = getStorage();

	var key = document.querySelector('#field_key3').value;

	var value = mystorage.getItem(key);

	if (value == null) {
		alert(key + ' は登録されていません。')
	} else {
		mystorage.removeItem(key);
	}

}, false);



// 一覧
var button_list = document.querySelector('#button_list');
button_list.addEventListener('click', function(e) {

	var mystorage = getStorage();

	var result = '';

	for (var i = 0; i < mystorage.length; i++) {
		var key = mystorage.key(i);
		var value = mystorage.getItem(key);

		result += key + ' / ' + value + '<br>';
	}

	var element = document.querySelector('#content');
	element.innerHTML = result;

}, false);



// クリア
var button_clear = document.querySelector('#button_clear');
button_clear.addEventListener('click', function(e) {

	var mystorage = getStorage();

	mystorage.clear();

}, false);


})();