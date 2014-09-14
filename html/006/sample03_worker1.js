self.onmessage = function(e) {

	for (var i = 1; i <= e.data; i++) {
		var result = 0;

		for (var j = 1; j <= i; j++) {
			if (i % j == 0) {
				result++;
			}
		}

		if (result == 2) {
			postMessage(i);
		}
	}
};