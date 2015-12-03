(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.user.name).controller(rmb.modules.user.controllers.signup,
        ['$scope',
            '$location',
            rmb.modules.user.model.user,
            rmb.modules.user.collection.user,
            function ($scope, $location, UserModel, UserCollection) {

                $scope.userModel = {};
                $scope.submit = function () {
                    if ($scope.userModel.$valid) {
                        $scope.invalidLogin = false;
                        $scope.isBusy = true;
                    }
                    else {
                        //if form is not valid set $scope.addContact.submitted to true
                        $scope.userModel.submitted = true;
                    }
                }
            }
        ]);
}(angular, rmb));
