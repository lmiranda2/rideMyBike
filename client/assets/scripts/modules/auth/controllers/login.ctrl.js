(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.auth.name).controller(rmb.modules.auth.controllers.login, [
        '$scope',
        '$location',
        rmb.modules.auth.services.authentication,
        function ($scope, $location, authentication) {

            $scope.loginModel = {};
            $scope.isBusy = false;
            $scope.invalidLogin = false;

            $scope.login = function () {
                if ($scope.loginModel.$valid) {
                    $scope.invalidLogin = false;
                    $scope.isBusy = true;
                    authentication.login($scope.loginModel.email, $scope.loginModel.password).then(function () {
                    }, function () {
                        $scope.invalidLogin = true;
                    })['finally'](function () {
                        $scope.isBusy = false;
                    });
                }
                else {
                    //if form is not valid set $scope.addContact.submitted to true
                    $scope.loginModel.submitted = true;
                }
            };
        }
    ]);
}(angular, rmb));