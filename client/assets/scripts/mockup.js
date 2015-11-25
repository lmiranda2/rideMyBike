// In order to use this function we must start the python webserver as follow:
// 	python -m SimpleHTTPServer
function retrieveBicycleData(handler) {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8082/api/bikes',
		contentType: "application/json",
		dataType: 'json',
		success: function(json) {
			handler(json.data);
		},
		error: function(e) {
			alert(e.message);
		}
	});
}