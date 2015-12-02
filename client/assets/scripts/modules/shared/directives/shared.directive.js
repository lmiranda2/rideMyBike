(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.shared.name).directive(rmb.modules.shared.directives.header, function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: false,
            scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: rmb.modules.shared.templates.header,
            controller: rmb.modules.shared.controllers.header
        };
    });

    angular.module(rmb.modules.shared.name).directive(rmb.modules.shared.directives.footer, function () {
        return {
            restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
            replace: false,
            scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
            templateUrl: rmb.modules.shared.templates.footer,
            controller: rmb.modules.shared.controllers.footer
        };
    });
})(angular, rmb);