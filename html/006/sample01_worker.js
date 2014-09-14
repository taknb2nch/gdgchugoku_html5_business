self.onmessage = function(e) {

	function timeoutHandler() {
		if (Math.floor(Math.random() * 10) > 1) {
			
			postMessage(e.data + ' world! ' + new Date().toLocaleString());

		} else {

			throw new Error('わざと発生させたエラーです。');

		}

		setTimeout(timeoutHandler, 1000);
	}

	setTimeout(timeoutHandler, 1000);
};