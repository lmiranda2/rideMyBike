(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.shared.name).controller(rmb.modules.shared.controllers.header,
        ['$scope',
            '$filter',
            '$location',
            '$route',
            rmb.modules.auth.services.authentication,
            rmb.modules.core.services.storage,
            rmb.modules.core.services.eventbus,
            function ($scope, $filter, $location, $route, authentication, storage, eventbus) {

                eventbus.subscribe(rmb.modules.auth.events.userLoggedIn, userLoggedIn);
                eventbus.subscribe(rmb.modules.auth.events.userLoggedOut, userLoggedOut);

                $scope.showUser = false;

                function userLoggedIn(){
                    $scope.showUser = true;
                    $scope.modalLoginShown = false;
                    var user = storage.getObject('user');
                    $scope.userName = user.userFirstName + ' ' + user.userLastName;
                }

                function userLoggedOut(){
                    $scope.showUser = false;
                }

                $scope.modalLoginShown = false;
                $scope.toggleModalLogin = function(e) {
                    e.preventDefault();
                    $scope.modalLoginShown = !$scope.modalLoginShown;
                };

                $scope.modalSignUpShown = false;
                $scope.toggleModalSignUp = function(e) {
                    e.preventDefault();
                    $scope.modalSignUpShown = !$scope.modalSignUpShown;
                };

                $scope.show = function () {
                    return true;// !$location.path().startsWith('/login');
                };

                $scope.toggleLeftMenu = function () {

                };

                $scope.logout = function () {
                    authentication.logout();
                };

                $scope.redirect = function (next) {
                    if (next) {
                        $location.path(next);
                    }
                }

            }
        ]);

})(angular, rmb);

