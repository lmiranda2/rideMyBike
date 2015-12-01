function rideMyBike() {
	"use strict";

	function performSearch() {
		if (checkFormFields()) {
			console.log('This info will be submitted to the server. The' +
						' server will response with a json object containing' +
						' all the available bicycles that match the criteria');
			var filter = {
				startDate: new Date($('#startDate').val()),
				endDate: new Date($('#endDate').val()),
				location: jsonPlace
			};


			filterBicycle(filter, createBikes);
		}
	}

	function returnImageUrl(bikeId, imageId){
		return baseApi + 'bikes/' + bikeId + '/images/' + imageId;
	}

	function createRatingStars(rating, div){
		var fullStars = parseInt(rating);
		var hasHalfStar = (rating % 1) > 0.25;

		for(var i = 0; i < fullStars; i++) {
				$(div).append('<img class="rating-star" src="/assets/img/Star-Full.png" />')
		}

		var remainingStars = 5 - fullStars;

		if(hasHalfStar) {
			$(div).append('<img class="rating-star" src="/assets/img/Star-Half-Full.png" />')
			remainingStars--;
		}

		for(var i = 0; i < remainingStars; i++) {
			$(div).append('<img class="rating-star" src="/assets/img/Star-Empty.png" />')
		}

	}

	function initialRandomSearch() {
		retrieveBicycleData(createBikes);
	}

	function createBikes(response) {
		var bicycles = response.data;
		$('#search-results').empty();
		for (var i=0; i<bicycles.length; i++) {
			var bicycle = bicycles[i];

			var $bicycleDiv = $('<div/>');
			$bicycleDiv.addClass('div-img col');

			var mainImage = $.grep(bicycle.images, function(image){ return image.bikeImageMain.data[0] === 1; })[0];

			// Bicycle picture begin
			var $imgDiv = $('<div/>');
			$imgDiv.addClass('picture-container');
			var $img = $('<img class="thumb"/>');
			$img.attr('src', returnImageUrl(bicycle.bikeId, mainImage.bikeImageId));
			$img.on('click', createClickHandler(bicycle.id));
			// Bicycle picture end

			// Rating stars begin
			var rating = Math.round((parseInt(bicycle.bikeRating)/10)*100);

			var $ratingBarDiv = $('<div/>');
			$ratingBarDiv.addClass('rating-bar');
			createRatingStars(bicycle.bikeRating, $ratingBarDiv);
			var $ratingDiv = $('<div/>');
			$ratingDiv.appendTo($ratingBarDiv);
			// Rating stars end

			$ratingBarDiv.appendTo($imgDiv);
			$img.appendTo($imgDiv);

			// Bicycle information begin
			var $nickname = $('<span></span>');
			$nickname.text(bicycle.nickname);

			var $type = $('<span></span>');
			$type.text(bicycle.type);

			var $model = $('<span></span>');
			$model.text(bicycle.model);

			var $frameSize = $('<span></span>');
			$frameSize.text(bicycle.frameSize);

			var $wheelSize = $('<span></span>');
			$wheelSize.text(bicycle.wheelSize);


			var $canDeliver = $('<span></span>');
			$canDeliver.text(bicycle.canDeliver);
			// Bicycle information end

			var $captionDiv = $('<div/>');
			// $nickname.appendTo($captionDiv);
			// $tanDeliver.appendTo($captionDiv);
			$imgDiv.appendTo($bicycleDiv);
			// $captionDiv.appendTo($bicycleDiv);

			$('#search-results').append($bicycleDiv);
		}
	}

	function createClickHandler(id) {
		return function() {
			location.href = 'bike-details.html?id=' + id;
		};
	}

	function checkFormFields() {
		var location = $('#autocomplete');
		var dates = $('.search-form input[type="date"]');
		var pickup = $(dates[0]).val();
		var dropoff = $(dates[1]).val();

		if (location.val() === "") {
			alert("Please choose a location.");
		} else if (pickup === "" || dropoff === "") {
			alert("Please verify pick up and drop off dates.");
		} else {
				var pickupDate = new Date(pickup).getTime();
				var dropoffDate = new Date(dropoff).getTime();
				return pickupDate <= dropoffDate;
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

	$("#autocomplete").focus();

	initialRandomSearch();

}

$(document).ready(rideMyBike);
