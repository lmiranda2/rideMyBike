(function (angular, rmb) {
    'use strict';

    angular;

    angular.module(rmb.modules.app.name, [
        'ngRoute'
        , 'angular-models'
        , 'ngCookies'
        , rmb.modules.auth.name
        , rmb.modules.core.name
        , rmb.modules.shared.name
        , rmb.modules.bike.name
        , rmb.modules.user.name
        , rmb.modules.info.name
    ]).config(function ($locationProvider) {
        $locationProvider.html5Mode(false);
    }).run(function ($rootScope, $templateCache, $location) {

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.pageTitle = current.$$route !== undefined ? current.$$route.pageTitle || '' : '';
        });

        //This function is only used to disable template caching during development. We can probably disable or figure out
        //a way to turn this off when we go to production.

        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    });
}(angular, rmb));