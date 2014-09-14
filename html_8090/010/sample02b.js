(function(){

var host = 'http://' + window.location.hostname;

window.addEventListener('message', function(e) {

	var element,
		img,
		item, 
		url;

	if (e.origin === host) {
		if (e.data.type === 'text') {

			element = document.createElement('span');
			element.innerHTML = e.data.data.replace(/\r?\n/g, '<br />');

		} else if (e.data.type === 'file') {

			item = e.data.data;

			if (/^image/.test(item.type)) {

				url = window.URL.createObjectURL(item);

				img = document.createElement('img');
				img.src = url;
				img.className = 'thumbnail';

				element = document.createElement('a');
				element.href = url;
				element.target = '_blank';
				element.appendChild(img);
			} 
		}

		appendAndScroll(element);

		console.log('#frame > %s, %s, %s, %s, %s', e.data.data, e.origin, e.lastEventId, e.source, e.ports);

		e.source.postMessage('@' + e.data.data, e.origin);
	}

}, false);

function appendAndScroll(element) {

	var element1,
		element2,
		li;

	li = document.createElement('li');
	li.appendChild(element);

	element1 = document.querySelector('#output ul');
	element1.appendChild(li);

	element2 = document.querySelector('#output');
	element2.scrollTop = element2.scrollHeight;

}

}());
