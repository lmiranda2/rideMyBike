(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.shared.name).controller(rmb.modules.shared.controllers.footer,
        ['$scope',
            '$filter',
            '$location',
            '$route',
            function ($scope, $filter, $location, $route) {
                $scope.redirect = function (next) {
                    if (next) {
                        $location.path(next);
                    }
                }
            }
        ]);

})(angular, rmb);

