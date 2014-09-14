(function(){

var host = 'http://' + window.location.hostname;

window.addEventListener('message', function(e) {

	var element1,
		element2,
		li;

	if (e.origin === host) {
		if (e.data.type === 'text') {

			element1 = document.querySelector('#output ul');

			li = document.createElement('li');
			li.innerHTML = e.data.data;

			element1.appendChild(li);

			element2 = document.querySelector('#output');
			element2.scrollTop = element2.scrollHeight;

		} else if (e.data.type === 'color') {

			element1 = document.querySelector('body');
			element1.style.backgroundColor = e.data.data;

		}

		console.log('#frame > %s, %s, %s, %s, %s', e.data.data, e.origin, e.lastEventId, e.source, e.ports);

		e.source.postMessage('@' + e.data.data, e.origin);
	}

}, false);

}());
