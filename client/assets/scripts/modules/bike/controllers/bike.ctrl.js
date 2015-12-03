(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).controller(rmb.modules.bike.controllers.bike,
        ['$scope',
            '$location',
            '$sce',
            rmb.modules.bike.model.bike,
            rmb.modules.bike.collection.bike,
            function ($scope, $location, $sce, BikeModel, BikeCollection) {

                $scope.bikeModel = {};
                $scope.data = {};

                $("#startDate").datepicker({minDate: new Date()});
                $("#endDate").datepicker({minDate: new Date()});
                $("#autocomplete").focus();

                $scope.search = function (e) {
                    if ($scope.bikeModel.$valid) {
                        performSearch();

                        $("#autocomplete").focus();
                    }
                    else {
                        //if form is not valid set $scope.addContact.submitted to true
                        $scope.bikeModel.submitted = true;
                    }
                };


                //handle user event for keyboard press
                $scope.locationKeyPress = function (e) {
                    //check code for keyboard press
                    if (e.keyCode === 13) {
                        $(this).next('input').focus();
                    }
                };

                function performSearch() {
                    var place = $scope.autocomplete.getPlace();
                    var location = place.geometry.location.toJSON();

                    var filter = {
                        startDate: new Date($('#startDate').datepicker("getDate")),
                        endDate: new Date($('#endDate').datepicker("getDate")),
                        location: location
                    };

                    if (checkFormFields(filter.location, filter.startDate, filter.endDate)) {
                        console.log('This info will be submitted to the server. The' +
                            ' server will response with a json object containing' +
                            ' all the available bicycles that match the criteria');

                        var bikes = new BikeModel(filter);
                        bikes.save().then(function (response) {

                            $scope.bikes = [].concat(response.data.data);
                            createBikes($scope.bikes);
                        });
                    }
                }

                $scope.returnImageUrl = function (bike) {

                    var mainImage = $.grep(bike.images, function (image) {
                        return image.bikeImageMain.data[0] === 1;
                    })[0];

                    return rmb.modules.core.api + 'bikes/' + bike.bikeId + '/images/' + mainImage.bikeImageId;
                }

                $scope.createRatingStars = function (bike) {

                    var rating = bike.bikeRating;
                    var div = '';
                    var fullStars = parseInt(rating);
                    var hasHalfStar = (rating % 1) > 0.25;

                    div += '<strong class="rating-bar-bike-nickname">'+ bike.bikeNickname + '</strong>';

                    div += '<a class="rating-bar">';

                    for (var i = 0; i < fullStars; i++) {
                        div += '<img class="rating-star" src="/assets/img/Star-Full.png" />';
                    }

                    var remainingStars = 5 - fullStars;

                    if (hasHalfStar) {
                        div += '<img class="rating-star" src="/assets/img/Star-Half-Full.png" />';
                        remainingStars--;
                    }

                    for (var i = 0; i < remainingStars; i++) {
                        div += '<img class="rating-star" src="/assets/img/Star-Empty.png" />';
                    }

                    div += '</a>';

                    return $sce.trustAsHtml(div);
                }

                $scope.initialRandomSearch = function () {
                    var bikes = new BikeCollection();
                    bikes.fetch().then(function (response) {
                        $scope.bikes = [].concat(response.data.data);
                    });
                };

                $scope.initialRandomSearch();

                /*

                 function createBikes(bicycles) {

                 $('#search-results > .div-img').remove();
                 for (var i = 0; i < bicycles.length; i++) {
                 var bicycle = bicycles[i];

                 var $bicycleDiv = $('<div/>');
                 $bicycleDiv.addClass('div-img col');

                 var mainImage = $.grep(bicycle.images, function (image) {
                 return image.bikeImageMain.data[0] === 1;
                 })[0];

                 // Bicycle picture begin
                 var $imgDiv = $('<div/>');
                 $imgDiv.addClass('picture-container');
                 var $img = $('<img class="thumb"/>');
                 $img.attr('src', $scope.returnImageUrl(bicycle.bikeId, mainImage.bikeImageId));
                 //$img.on('click', redirect('bicycle.id));
                 // Bicycle picture end

                 // Rating stars begin
                 var rating = Math.round((parseInt(bicycle.bikeRating) / 10) * 100);

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
                 return redirect('bike/' + id);
                 }

                 */

                function checkFormFields(location, startDate, endDate) {

                    if (location === undefined) {
                        alert("Please choose a location.");
                    } else if (startDate === "" || endDate === "") {
                        alert("Please verify pick up and drop off dates.");
                    } else {
                        var pickupDate = new Date(startDate).getTime();
                        var dropoffDate = new Date(endDate).getTime();
                        return pickupDate <= dropoffDate;
                    }
                    return false;
                }

                $scope.initAutocomplete = function () {
                    $scope.autocomplete = new google.maps.places.Autocomplete(
                        document.getElementById('autocomplete'),
                        {types: ['geocode']});
                };

                $scope.initAutocomplete();

                $scope.redirect = function (next) {
                    if (next) {
                        $location.path(next);
                    }
                };

                $scope.bikes = [];

                var bikes = new BikeCollection();
                bikes.fetch().then(function (response) {

                    $scope.bikes = [].concat(response.data.data);
                });
            }
        ]);
}(angular, rmb));
