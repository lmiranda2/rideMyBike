function rideMyBike() {
	"use strict";

	function performSearch() {
		if (checkFormFields()) {
			console.log('This info will be submitted to the server. The' +
						' server will response with a json object containing' +
						' all the available bicycles that match the criteria');
			console.log(jsonPlace);
			performAjaxSearch(jsonPlace);
		}
	}

	function performAjaxSearch(place) {

	}

	function initialRandomSearch() {
		retrieveBicycleData(function(bicycles) {
			for (var i=0; i<bicycles.length; i++) {
				var bicycle = bicycles[i];

				var $bicycleDiv = $('<div/>');
				$bicycleDiv.addClass('div-img');

				var $blurryDiv = $('<div/>');
				$blurryDiv.addClass('blurry');

				$blurryDiv.css('background', 'url(' + bicycle.pictureUrl + ')');
				
				var $img = $('<img/>');
				$img.attr('src', bicycle.pictureUrl);

				var $pNicknameCanDeliver = $('<p></p>');
				$pNicknameCanDeliver.text(bicycle.nickname);

				$blurryDiv.appendTo($bicycleDiv);
				$img.appendTo($bicycleDiv);
				$pNicknameCanDeliver.appendTo($bicycleDiv);

				$('#search-results').append($bicycleDiv);
			}
		});
	}

	function checkFormFields(location, dates) {
		var location = $('#autocomplete');
		var dates = $('.search-form input[type="date"]');
		var pickup = $(dates[0]).val();
		var dropoff = $(dates[1]).val();

		if (location.val() == "") {
			alert("Please choose a location.");
		} else if (pickup == "" || dropoff == "") {
			alert("Please verify pick up and drop off dates.");
		} else {
			if (jsonPlace.country != 'United States') {
				alert("In this initial phase the system is only handling deals inside US.");
			} else {
				var pickupDate = new Date(pickup).getTime();
				var dropoffDate = new Date(dropoff).getTime();
				return pickupDate <= dropoffDate;
			}
		}
		return false;
	}


	$(".search-form button").on("click", function(e) {
		performSearch();
    	$("#autocomplete").focus();
  	});

	//handle user event for keyboard press
	$("#autocomplete").on("keypress", function(e){
		//check code for keyboard press
		if (e.keyCode === 13) {
			console.log($(this));
			console.log($(this).next('input'));
			$(this).next('input').focus();
		}
	});

	initialRandomSearch();

	$("#autocomplete").focus();

}

$(document).ready(rideMyBike);
