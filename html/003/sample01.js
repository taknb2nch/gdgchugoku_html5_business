var button1 = document.querySelector('#button-sample1');
button1.addEventListener('click', function(e) {

	var cars = document.querySelectorAll('#sample ul li');
	var output = 'What color are Kimberly cars?';

	for (var i = 0; i < cars.length; i++) {

		if (cars[i].dataset) {
			output += cars[i].dataset.color;
		} else {
			output += cars[i].getAttribute('data-color');
		}
		
		if (i != (cars.lenght - 1)) {
			output += ', '
		}
	}

	document.querySelector('#dataset-result').innerHTML = output;

}, false);

var button2 = document.querySelector('#button-sample2');
button2.addEventListener('click', function(e) {

	var cars = document.querySelectorAll('#sample ul li');

	for (var i = 0; i < cars.length; i++) {
		
		if (cars[i].dataset) {
			cars[i].dataset.color = 'yellow';
			cars[i].dataset.rating = 'awesome';
		} else {
			cars[i].setAttribute('color') = 'yellow';
			cars[i].setAttribute('rating') = 'awesome';
		}
	}
}, false);
