(function() {

var channel = new MessageChannel();

window.parent.postMessage('dummy', 'http://localhost:80', [ channel.port2 ]);

var button_send = document.querySelector('#button_send');
button_send.addEventListener('click', function(e) {

	var value = document.querySelector('#text_message').value;

	channel.port1.postMessage(value);

}, false);

}());
