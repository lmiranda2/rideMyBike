// In order to use this function we must start the python webserver as follow:
// 	python -m SimpleHTTPServer
var baseApi = 'http://localhost:8082/api/';


function retrieveBicycleData(handlerDone, handlerFail) {
	getData(baseApi + 'bikes')
		.done(handlerDone)
		.fail(handlerFail);
}

function filterBicycle(filter, handlerDone, handlerFail) {
	postData(baseApi + 'bikes', JSON.stringify(filter))
		.done(handlerDone)
		.fail(handlerFail);
}

// Base functions to communicate with the server.
function getData(api){
	showLoading();

	return $.ajax({
		type: 'GET',
		url: api,
		contentType: "application/json",
		dataType: 'json'
	}).always(function(){
		hideLoading();
		return arguments;
	});
}

function postData(api, data){
	showLoading();
	return $.ajax({
		type: 'POST',
		url: api,
		data: data,
		contentType: "application/json",
		dataType: 'json'
	}).always(function(){
		hideLoading();
		return arguments;
	});
}