var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

	if (req.headers.accept && req.headers.accept == 'text/event-stream') {
		if (req.url === '/events') {
			sendSSE(req, res);
		} else {
			console.log('1');
			res.writeHead(404);
			res.end();
		}
	} else {
		console.log('2');
		res.writeHead(200, { 'Content-Type' : 'text/html' });
		res.write(fs.readFileSync(__dirname + '/sample01.html'));
		res.end();
	}

}).listen(8090);

function sendSSE(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/event-stream', 
		'Cache-Control' : 'no-cache', 
		'Connection' : 'keep-alive'
	});

	var id = (new Date()).toLocaleTimeString();

	setInterval(function() {
		constructSSE(res, id, (new Date()).toLocaleTimeString());
	}, 5000);

	constructSSE(res, id, (new Date()).toLocaleTimeString());
}

function constructSSE(res, id, data) {
	res.write('id: ' + id + '\n');
	res.write('data: ' + data + '\n\n');
}
