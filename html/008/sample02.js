(function(){

var mystorage = window.sessionStorage;

function getKey() {
	return document.querySelector('#field_key').value;	
}

function getValue() {
	return document.querySelector('#field_value').value;
}

// --------------------------------------------------------------------------------
// 登録
var button_regist1 = document.querySelector('#button_regist1');
button_regist1.addEventListener('click', function(e) {

	var key = getKey();
	var value = getValue();

	mystorage.setItem(key, value);

}, false);

// 読み込み
var button_read1 = document.querySelector('#button_read1');
button_read1.addEventListener('click', function(e) {

	var key = getKey();
	var value = mystorage.getItem(key);

	alert(value);

}, false);




// --------------------------------------------------------------------------------
// 登録
var button_regist2 = document.querySelector('#button_regist2');
button_regist2.addEventListener('click', function(e) {

	var key = getKey();
	var value = getValue();

	mystorage[key] = value;

}, false);

// 読み込み
var button_read2 = document.querySelector('#button_read2');
button_read2.addEventListener('click', function(e) {

	var key = getKey();
	var value = mystorage[key];

	alert(value);

}, false);




// --------------------------------------------------------------------------------
// 登録
var button_regist3 = document.querySelector('#button_regist3');
button_regist3.addEventListener('click', function(e) {

	var value = getValue();

	mystorage.storage_key = value;

}, false);

// 読み込み
var button_read3 = document.querySelector('#button_read3');
button_read3.addEventListener('click', function(e) {

	var value = mystorage.storage_key;

	alert(value);

}, false);

// 読み込み
var button_read3_2 = document.querySelector('#button_read3_2');
button_read3_2.addEventListener('click', function(e) {

	var value = mystorage.hoge_hoge;

	alert(value);

}, false);


})();