(function() {

var storage = window.localStorage;
//
var image_id = 'myimage';

//
var droparea = document.querySelector('#droparea');
var imagearea = document.querySelector('#imagearea');

//
droparea.addEventListener('dragover', function(e) {

	if (e.preventDefault) {
		e.preventDefault();
	}

	return false;

}, false);

//
droparea.addEventListener('drop', function(e) {
	
	if (e.preventDefault) {
		e.preventDefault();
	}

	if (e.dataTransfer.files.length == 0) {
		return false;
	}

	readImageFromFile(e.dataTransfer.files[0]);

}, false);

//
function readImageFromFile(file) {

	var reader = new FileReader();

	reader.onerror = function(e) {

		alert('読み込みに失敗しました。');

	};

	reader.onload = function(e) {

		addImageElement(reader.result);
		
	};

	reader.readAsDataURL(file);
}

function addImageElement(src) {

	var element = document.createElement('img');
	element.src = src;
	element.className = 'thumbnail';
	element.id = image_id;

	while (imagearea.lastChild) {
		imagearea.removeChild(imagearea.lastChild);
	}

	imagearea.appendChild(element);
}

//
var form1 = document.querySelector('#form1');
form1.addEventListener('submit', function(e) {

	if (e.preventDefault) {
		e.preventDefault();
	}

	var data = new Object();
	data['user_name'] = document.querySelector('#user_name').value;
	data['user_email'] = document.querySelector('#user_email').value;
	data['user_url'] = document.querySelector('#user_url').value;
	data['user_affiliation'] = document.querySelector('#user_affiliation').value;

	var element = document.getElementById(image_id);

	if (element != null) {
		data[image_id] = element.src;
	}

	var json = JSON.stringify(data);

	storage.setItem('data', json);
})


// onload
if (storage.getItem('data') != null) {

	var json = storage.getItem('data');

	var data = JSON.parse(json);

	document.querySelector('#user_name').value = data['user_name'];
	document.querySelector('#user_email').value = data['user_email'];
	document.querySelector('#user_url').value = data['user_url'];
	document.querySelector('#user_affiliation').value = data['user_affiliation'];

	addImageElement(data[image_id]);

}

}());
