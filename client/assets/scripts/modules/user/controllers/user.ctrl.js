(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.user.name).controller(rmb.modules.user.controllers.user,
        ['$scope',
            '$location',
            rmb.modules.user.model.user,
            rmb.modules.user.collection.user,
            function ($scope, $location, BikeModel, BikeCollection) {

            }
        ]);
}(angular, rmb));
