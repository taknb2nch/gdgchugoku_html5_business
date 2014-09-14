(function(){

// navigarot.onLine
var onload_status = document.querySelector('#onload_status');

if (window.navigator.onLine) {
	onload_status.innerHTML = 'online';
} else {
	onload_status.innerHTML = 'offline';
}

// online or offline event
var onlive_status = document.querySelector('#onlive_status');

window.addEventListener('online', function(e) {
	onlive_status.innerHTML = 'オンラインになりました。';
}, false);

window.addEventListener('offline', function(e) {
	onlive_status.innerHTML = 'オフラインになりました。';
}, false);

})();