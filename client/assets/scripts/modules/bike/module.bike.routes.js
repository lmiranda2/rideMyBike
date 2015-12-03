(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when(rmb.modules.bike.routes.bike, {
                    pageTitle: 'Bike',
                    controller: rmb.modules.bike.controllers.bike,
                    templateUrl: rmb.modules.bike.templates.bike,
                    access: {
                        loginRequired: false//,
                        //permissions: ['Admin']
                    }
                })
                .when(rmb.modules.bike.routes.details, {
                    pageTitle: 'Bike Details',
                    controller: rmb.modules.bike.controllers.details,
                    templateUrl: rmb.modules.bike.templates.details,
                    access: {
                        loginRequired: false//,
                        //permissions: ['Admin']
                    }
                });
        }]);
}(angular, rmb));