(function() {

var drawFlag = false
  , oldX = 0
  , oldY = 0;

var canvas = document.querySelector('#myCanvas');
canvas.addEventListener('mousemove', draw, true);
canvas.addEventListener('mousedown', function(e) {
	drawFlag = true;

	var rect = e.target.getBoundingClientRect();
	oldX = e.clientX - rect.left;
	oldY = e.clientY - rect.top;

	console.log('x=%d, y=%d', oldX, oldY);
}, false);
canvas.addEventListener('mouseup', function(e) {
	drawFlag = false;
}, false);

function draw(e){
	if (!drawFlag) {
		return;
	}

 	var rect = e.target.getBoundingClientRect()
 	  , x = e.clientX - rect.left
	  , y = e.clientY - rect.top
	  , stroke_style = document.querySelector('#stroke_style').value
	  , line_width = document.querySelector('#line_width').value;

	var data = {
		stroke_style : 'rgba(' + stroke_style+ ', 1)',
		line_width : line_width,
		x1 : oldX,
		x2 : x,
		y1 : oldY,
		y2 : y,
	};

	//drawCanvas(data);

	if (ws && ws.readyState === ws.OPEN) {
		ws.send(JSON.stringify(data));
	}

	oldX = x;
	oldY = y;
}

function drawCanvas(data) {
	var cvs = document.querySelector('#myCanvas')
	  , context = cvs.getContext('2d');

	if (!data) {
		return;
	}

	context.strokeStyle = data.stroke_style;
	context.lineWidth = data.line_width;
	context.beginPath();
	context.moveTo(data.x1, data.y1);
	context.lineTo(data.x2, data.y2);
	context.stroke();
	context.closePath();
}

var ws = new WebSocket('ws://' + location.hostname + ':8091/05');
ws.onopen = function(e) {
	console.log('接続しました。');
}

ws.onmessage = function(e) {
	drawCanvas(JSON.parse(e.data));
};

ws.onerror = function(e) {
	console.log('エラーが発生しました。');
};

ws.onclose = function(e) {
	console.log('切断しました。, code=%s, reason=%s', e.code, e.reason);
};

}());