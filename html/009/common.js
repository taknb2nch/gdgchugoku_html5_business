var database_name = 'sample01';
var os_name = 'custormer';
var version = 13;

var initial_data = [
		{"id":1,"name":"北条仁継","sex":"男","email":"masatsugu75146@btgpvng.tmb","birthday":new Date("1970/12/29"),"age":42,"blood":"AB","interest":[ "html5", "angularJS", "android" ]},
		{"id":2,"name":"長坂朱音","sex":"女","email":"akane_nagasaka@mbjn.sv","birthday":new Date("1982/04/26"),"age":31,"blood":"B","interest":[ "angularJS" ]},
		{"id":3,"name":"赤羽悦代","sex":"女","email":"ukyfhq-kgafqetsuyo8453@myix.ql","birthday":new Date("1969/05/02"),"age":44,"blood":"A","interest":[ "html5" ]},
		{"id":4,"name":"飯島果歩","sex":"女","email":"njduhlqkaho0365@wtrrorhv.wv","birthday":new Date("1978/05/15"),"age":35,"blood":"O","interest":[ "angularJS", "android" ]},
		{"id":5,"name":"坂田寧音","sex":"女","email":"nene7247@fhsy.pjz","birthday":new Date("1953/10/13"),"age":59,"blood":"O","interest":[ "html5", "android" ]},
		{"id":6,"name":"小口拓海","sex":"男","email":"Takumi_Oguchi@ffmj.aaj","birthday":new Date("1976/09/23"),"age":36,"blood":"A","interest":[ "android" ]},
		{"id":7,"name":"松島誠子","sex":"女","email":"masako32220@rbiqcxmrsg.bsjls.fu","birthday":new Date("1969/07/21"),"age":43,"blood":"A","interest":[ "angularJS", "android" ]},
		{"id":8,"name":"難波舞","sex":"女","email":"llbjcdgmai5700@ejtwmbrwdk.vvyq.ur","birthday":new Date("1970/11/29"),"age":42,"blood":"AB","interest":[ "android" ]},
		{"id":9,"name":"下川恒男","sex":"男","email":"mwoznqasucwwhdtsuneo71862@lglm.mki","birthday":new Date("1972/12/29"),"age":40,"blood":"A","interest":[ "html5", "angularJS" ]},
		{"id":10,"name":"皆川伊代","sex":"女","email":"Iyo_Minagawa@ldygkgdgh.ppr","birthday":new Date("1992/03/11"),"age":21,"blood":"B","interest":[ "android" ]},
		{"id":11,"name":"小関若葉","sex":"女","email":"wakaba4358@unbkasn.txm","birthday":new Date("1970/02/11"),"age":43,"blood":"A","interest":[ "angularJS" ]},
		{"id":12,"name":"今陽菜子","sex":"女","email":"hinako_kon@szqvlnb.yeugh.rpe","birthday":new Date("1977/11/01"),"age":35,"blood":"AB","interest":[ "html5" ]},
		{"id":13,"name":"星年子","sex":"女","email":"toshikohoshi@jtppihoh.ofv","birthday":new Date("1985/11/05"),"age":27,"blood":"A","interest":[ "html5", "angularJS" ]},
		{"id":14,"name":"楠咲","sex":"女","email":"saki86722@bjlckwj.kxot.lcg","birthday":new Date("1981/12/20"),"age":31,"blood":"B","interest":[ "android" ]},
		{"id":15,"name":"高嶋七海","sex":"女","email":"nanamitakashima@olcw.ewy","birthday":new Date("1979/10/28"),"age":33,"blood":"AB","interest":[ "html5" ]},
		{"id":16,"name":"栗林来未","sex":"女","email":"kurumi8011@jeznuxpgj.gh","birthday":new Date("1987/10/01"),"age":25,"blood":"AB","interest":[ "html5", "angularJS", "android" ]},
		{"id":17,"name":"小口日向","sex":"女","email":"hinataoguchi@fsjgauv.nxn","birthday":new Date("1969/05/02"),"age":44,"blood":"O","interest":[ "angularJS" ]},
		{"id":18,"name":"高島春子","sex":"女","email":"Haruko_Takashima@jmzvanpbz.gw","birthday":new Date("1969/06/06"),"age":44,"blood":"O","interest":[ "angularJS", "android" ]},
		{"id":19,"name":"大崎清作","sex":"男","email":"seisaku_oosaki@sczbqgfz.xdj.mfw","birthday":new Date("1977/08/17"),"age":35,"blood":"B","interest":[ "html5", "android" ]},
		{"id":20,"name":"新谷花蓮","sex":"女","email":"karen5423@cjwqlbe.nnm","birthday":new Date("1987/07/27"),"age":25,"blood":"B","interest":[ "html5" ]}
	];

function buildRange(indexName) {

	var range = null;
	
	var elementOnly = document.querySelector('#range_only');
	var elementLower = document.querySelector('#range_lower');
	var elementUpper = document.querySelector('#range_upper');

	var only = null;
	var lower = null;
	var upper = null;

	//
	if (indexName === undefined || indexName == 'findByAge') {
		
		only = toNullOrInt(elementOnly.value);
		lower = toNullOrInt(elementLower.value);
		upper = toNullOrInt(elementUpper.value);

	} else if (indexName == 'findByBirthday') {
		
		only = toNullOrDate(elementOnly.value);
		lower = toNullOrDate(elementLower.value);
		upper = toNullOrDate(elementUpper.value);

	} else if (indexName == 'findByInterestSingle') {

		only = toNullOrArray(elementOnly.value);
		lower = toNullOrArray(elementLower.value);
		upper = toNullOrArray(elementUpper.value);

	} else {

		only = elementOnly.value;
		lower = elementLower.value;
		upper = elementUpper.value;

	}

	var lower_open = !document.querySelector('#range_lower_open').checked;
	var upper_open = !document.querySelector('#range_upper_open').checked;

	if (only) {
		
		range = IDBKeyRange.only(only);

	} else {
		if (lower && upper) {
			
			range = IDBKeyRange.bound(lower, upper, lower_open, upper_open);

		} else if (lower) {
			
			range = IDBKeyRange.lowerBound(lower, lower_open);

		} else if (upper) {

			range = IDBKeyRange.upperBound(upper, upper_open);

		}
	}

	return range;
}

function buildDirection() {

	var direction = null;

	if (document.querySelector('#direction').value) {
		direction = document.querySelector('#direction').value;
	}

	return direction;
}

function clearResult() {

	document.querySelector('#result_list').innerHTML = '<ul></ul>';
	document.querySelector('#result_count').innerHTML = '';

}

function formatData(data) {

	var dataStr = 
		data.id + ', ' + 
		data.name + ', ' + 
		data.sex + ', ' + 
		data.email + ', ' + 
		data.birthday.toLocaleString() + ', ' + 
		data.age + ', ' + 
		data.blood + ', ' + 
		data.interest;

	return dataStr;
}

function addResultList(dataStr) {

	var result = document.querySelector('#result_list ul');

	console.log(dataStr);

	var li = document.createElement('li');
	li.innerHTML = dataStr;

	result.appendChild(li);
}

function setResultCount(msg) {

	var result = document.querySelector('#result_count');

	console.log(msg);	

	result.innerHTML = msg;

}

function toNullOrInt(value) {

	if (value) {
		return parseInt(value);
	} else {
		return null;
	}

}

function toNullOrDate(value) {

	if (value) {
		return new Date(value);
	} else {
		return null;
	}

}

function toNullOrArray(value) {

	if (value) {
		return value.split(',');
	} else {
		return null;
	}

}

function convertIndexKey(indexName, value) {

	//
	if (!indexName || indexName == 'findByAge') {

		return toNullOrInt(value);

	} else if (indexName == 'findByBirthday') {
		
		return toNullOrDate(value);

	} else {

		return value;

	}

}
