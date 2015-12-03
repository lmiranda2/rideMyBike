(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.user.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(rmb.modules.user.routes.user, {
                pageTitle: 'User',
                controller: rmb.modules.user.controllers.user,
                templateUrl: rmb.modules.user.templates.user,
                access: {
                    loginRequired: false//,
                    //permissions: ['Admin']
                }
            });
        }]);
}(angular, rmb));