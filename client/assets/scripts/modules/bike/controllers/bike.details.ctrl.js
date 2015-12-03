(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).controller(rmb.modules.bike.controllers.details,
        ['$scope',
            '$location',
            '$routeParams',
            '$sce',
            rmb.modules.bike.model.bike,
            rmb.modules.bike.collection.bike,
            function ($scope, $location, $routeParams, $sce, BikeModel, BikeCollection) {

                $scope.bikeId = $routeParams.bikeId;
                $scope.currentImageIndex = 0;

                $scope.loadBike = function (bikeId) {
                    var bike = new BikeModel({id: bikeId});
                    bike.fetch().then(function (response) {

                        $scope.bike = response.data.data;
                        if($scope.bike.images.length > 0)
                            $scope.bike.images[0].active = true;
                    });
                };

                $scope.loadBike($scope.bikeId);

                $scope.returnImageUrl = function (image) {

                    return rmb.modules.core.api + 'bikes/' + image.bikeId + '/images/' + image.bikeImageId;
                }

                $scope.prev = function(e){
                    e.preventDefault();
                    $scope.bike.images.forEach(function(image) {
                        image.active = false; // make every image invisible
                    });
                    $scope.currentImageIndex--;

                    if($scope.currentImageIndex < 0)
                        $scope.currentImageIndex = $scope.bike.images.length - 1;

                    $scope.bike.images[$scope.currentImageIndex].active = true;
                }

                $scope.next = function(e){
                    e.preventDefault();
                    $scope.bike.images.forEach(function(image) {
                        image.active = false; // make every image invisible
                    });
                    $scope.currentImageIndex++;

                    $scope.bike.images[$scope.currentImageIndex % $scope.bike.images.length].active = true;
                }

                $scope.createRatingStars = function (rating) {

                    var div = '';
                    var fullStars = parseInt(rating);
                    var hasHalfStar = (rating % 1) > 0.25;

                    div += '<a >';

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

                $scope.modalContactShown = false;
                $scope.toggleModalContact = function(e) {
                    e.preventDefault();
                    $scope.modalContactShown = !$scope.modalContactShown;
                };
            }
        ]);
}(angular, rmb));
