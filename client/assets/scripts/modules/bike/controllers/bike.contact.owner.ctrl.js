(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).controller(rmb.modules.bike.controllers.contactOwner,
        ['$scope',
            '$location',
            '$sce',
            rmb.modules.bike.model.bike,
            rmb.modules.bike.collection.bike,
            function ($scope, $location, $sce, BikeModel, BikeCollection) {
                $scope.contact = {};

                $scope.submit = function()
                {
                    if ($scope.contact.$valid) {
                    }
                    else {
                        //if form is not valid set $scope.addContact.submitted to true
                        $scope.contact.submitted = true;
                    }
                }

                $("#start-date,#end-date").datepicker();
            }

        ]);
}(angular, rmb));
