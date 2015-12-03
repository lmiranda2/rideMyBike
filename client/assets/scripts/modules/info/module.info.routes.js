(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.info.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(rmb.modules.info.routes.info, {
                pageTitle: 'User',
                controller: rmb.modules.info.controllers.info,
                templateUrl: rmb.modules.info.templates.info,
                access: {
                    loginRequired: false//,
                    //permissions: ['Admin']
                }
            });
        }]);
}(angular, rmb));