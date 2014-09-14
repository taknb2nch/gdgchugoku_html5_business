(function(){

//
var mystorage = window.localStorage;

//
function getKey() {
	return document.querySelector('#field_key').value;	
}

function getValue() {
	return document.querySelector('#field_value').value;
}


// イベント
window.addEventListener('storage', function(e) {

	var message = 'key : ' + e.key + 
		', oldValue : ' + e.oldValue + 
		', newValue : ' + e.newValue + 
		', url : ' + e.url + 
		', storageArea : ' + e.storageArea + 
		'<br>';

	var element = document.querySelector('#message');
	element.innerHTML += message;

}, false);


// 更新
var button_update = document.querySelector('#button_update');
button_update.addEventListener('click', function(e) {

	var key = getKey();
	var value = getValue();

	mystorage.setItem(key, value);

}, false);



// 取得
var button_read = document.querySelector('#button_read');
button_read.addEventListener('click', function(e) {

	var key = getKey();
	var value = mystorage.getItem(key);

	if (value == null) {
		alert(key + ' は登録されていません。')
		document.querySelector('#field_value').value = null;
	} else {
		document.querySelector('#field_value').value = value;
	}

}, false);



// 削除
var button_delete = document.querySelector('#button_delete');
button_delete.addEventListener('click', function(e) {

	var key = getKey();
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

	mystorage.clear();

}, false);


})();