(function (angular, rmb) {
    'use strict';
	
    angular.module(rmb.modules.shared.name).directive(rmb.modules.shared.directives.notification, [
			'$interval',
			rmb.modules.core.services.eventbus,
			function($interval, eventbus) {
				return {
					restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
					replace: false,
					scope: {user: '='},
					templateUrl: rmb.modules.shared.templates.notification,
					controller: rmb.modules.shared.controllers.notification
				};
			}
			]);
})(angular, rmb);