self.onmessage = function(e) {
	max = e.data;
	calc();
};

var max = 0;
var i = 1;

function calc() {
	var n = fib3(i);

	postMessage(n);

	if (i <= max) {
		i++;
		setTimeout(calc, 500);
	}
}

importScripts('sample03_worker2_fibonacci.js');
