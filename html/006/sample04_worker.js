self.onmessage = function(e) {

	var data = e.data;

	var length = e.data.length;
	var pixels = length / 4;

	for (var i = 0; i < pixels; i++) {
		var r = data[i * 4];
		var g = data[i * 4 + 1];
		var b = data[i * 4 + 2];

		var gs = parseInt((11 * r + 16 * g + 5 * b) / 32);

		data[4 * i] = g;
		data[4 * i + 1] = g;
		data[4 * i + 2] = g;
	}

	postMessage(data);

	data = null;
};