(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.info.name).controller(rmb.modules.info.controllers.signup,
        ['$scope',
            '$location',
            rmb.modules.info.model.info,
            rmb.modules.info.collection.info,
            function ($scope, $location, UserModel, UserCollection) {

                $scope.infoModel = {};
                $scope.submit = function () {
                    if ($scope.infoModel.$valid) {
                        $scope.invalidLogin = false;
                        $scope.isBusy = true;
                    }
                    else {
                        //if form is not valid set $scope.addContact.submitted to true
                        $scope.infoModel.submitted = true;
                    }
                }
            }
        ]);
}(angular, rmb));
