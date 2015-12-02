/**
 * Created by luiz on 12/1/2015.
 */
(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.core.name).directive(rmb.modules.core.directives.modal, function() {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            templateUrl: rmb.modules.core.templates.modal
        };
    });
})(angular, rmb);