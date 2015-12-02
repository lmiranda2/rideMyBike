(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(rmb.modules.bike.routes.bike, {
                pageTitle: 'Bike',
                controller: rmb.modules.bike.controllers.bike,
                templateUrl: rmb.modules.bike.templates.bike,
                access: {
                    loginRequired: false//,
                    //permissions: ['Admin']
                }
            });
        }]);
}(angular, rmb));