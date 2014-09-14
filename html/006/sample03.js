(function() {
//
var worker1 = new Worker('sample03_worker1.js');

worker1.onmessage = function(e) {
	var output1 = document.querySelector('#output1')
	output1.innerHTML = e.data;
};

worker1.onerror = function(e) {
	var output1 = document.querySelector('#output1')
	output1.innerHTML = e.filename + '<br>' + e.lineno + '<br>' + e.message;	
}

//
var button_start1 = document.querySelector('#button_start1');
button_start1.addEventListener('click', function(e) {
	var max = document.getElementById('text_max1').value;

	worker1.postMessage(max);

}, false);

//
var button_terminate1 = document.querySelector('#button_terminate1');
button_terminate1.addEventListener('click', function(e) {

	worker1.terminate();

}, false);



//
var worker2 = new Worker('sample03_worker2.js');

worker2.onmessage = function(e) {
	var output2 = document.querySelector('#output2')
	output2.innerHTML = e.data;
};

worker2.onerror = function(e) {
	var output2 = document.querySelector('#output2')
	output2.innerHTML = e.filename + '<br>' + e.lineno + '<br>' + e.message;	
}

//
var button_start2 = document.querySelector('#button_start2');
button_start2.addEventListener('click', function(e) {
	var max = document.querySelector('#text_max2').value;

	worker2.postMessage(max);

}, false);

//
var button_terminate2 = document.querySelector('#button_terminate2');
button_terminate2.addEventListener('click', function(e) {

	worker2.terminate();

}, false);

})();