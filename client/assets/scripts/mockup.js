// In order to use this function we must start the python webserver as follow:
// 	python -m SimpleHTTPServer
function retrieveBicycleData(handler) {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8000/bicycleResult.json',
		async: false,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			handler(json.bicycles);
		},
		error: function(e) {
			alert(e.message);
		}
	});
}