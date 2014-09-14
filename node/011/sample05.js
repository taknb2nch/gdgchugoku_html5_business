var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
	port : 8091,
	path : '/05'
});

var clients = []
  , i
  , l
  , dest;

wss.on('connection', function(ws) {

	console.log('接続されました。');

	clients.push(ws);

	ws.on('message', function(data, flag) {

		console.log('< ' + (flag.binary ? 'binary' : data));

		for (i = 0, l = clients.length; i < l; i++) {
			dest = clients[i];
			
			if (!dest) {
				continue;
			}

			dest.send(data, { binary : flag.binary });
		}

	});

	ws.on('close', function() {

		for (i = 0, l = clients.length; i < l; i++) {
			if (ws === clients[i]) {
				clients.splice(i, 1);
				console.log('切断されました。');
				return;
			}
		}

	});

});