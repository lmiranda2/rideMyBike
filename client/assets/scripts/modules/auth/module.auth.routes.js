(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.auth.name).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when(rmb.modules.auth.routes.login, {
                pageTitle: 'Login',
                controller: rmb.modules.auth.controllers.login,
                templateUrl: rmb.modules.auth.templates.login
            });
            $routeProvider.when(rmb.modules.auth.routes.notAuthorised, {
                pageTitle: 'Not Authorized',
                controller: rmb.modules.auth.controllers.login,
                templateUrl: rmb.modules.auth.templates.notAuthorized
            });
            $routeProvider.otherwise({ redirectTo: rmb.modules.auth.routes.default });
        }]);


}(angular, rmb));