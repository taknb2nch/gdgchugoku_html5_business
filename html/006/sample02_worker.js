self.onmessage = function(e) {

	function timeoutHandler() {
		if (Math.floor( Math.random() * 10) > 1) {
			
			switch (e.data.cmd) {
				case 'exec' : 
					postMessage(e.data.message + ' world! ' + new Date().toLocaleString());

					setTimeout(timeoutHandler, 1000);

					break;
				
				case 'stop' : 
					postMessage('ワーカーを終了します。');

					// close メソッドを読んでワーカー自身で終了します。
					self.close();
					break;
			}

		} else {

			throw new Error('わざと発生させたエラーです。');

		}
	}

	setTimeout(timeoutHandler, 1000);
};