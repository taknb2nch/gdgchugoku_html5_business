(function(){

var applicationCache = window.applicationCache;
var message = document.querySelector('#message');

applicationCache.addEventListener('checking', function(e) {
	message.innerHTML += 'checking...' + '<br>';
}, false);

applicationCache.addEventListener('noupdate', function(e) {
	message.innerHTML += 'noupdate...' + '<br>';
}, false);

applicationCache.addEventListener('downloading', function(e) {
	message.innerHTML += 'downloading...' + '<br>';
}, false);

applicationCache.addEventListener('updateready', function(e) {
	message.innerHTML += 'updateready...' + '<br>';
}, false);

applicationCache.addEventListener('cached', function(e) {
	message.innerHTML += 'cached...' + '<br>';
}, false);

applicationCache.addEventListener('error', function(e) {
	message.innerHTML += 'error...' + '<br>';
}, false);

applicationCache.addEventListener('progress', function(e) {
	if (e.lengthComputable) {
		message.innerHTML += 'progress... ' + Math.round(e.loaded / e.total * 100) + '%<br>';
	} else {
		message.innerHTML += 'progress... (' + e.loaded + ' / ' + e.total + ')<br>';
	}
}, false);

applicationCache.addEventListener('absolete', function(e) {
	message.innerHTML += 'absolete...' + '<br>';
}, false);

//
var button_update = document.querySelector('#button_update');
button_update.addEventListener('click', function(e) {
	applicationCache.update();
}, false);

})();