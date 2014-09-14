var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
	port : 8091,
	path : '/01'
});

wss.on('connection', function(ws) {

	console.log('接続されました。');

	ws.on('message', function(data, flag) {

		console.log('< ' + (flag.binary ? 'binary' : data));

		ws.send(data, { binary : flag.binary });

	});

	ws.on('close', function() {

		console.log('切断されました。');

	});

});