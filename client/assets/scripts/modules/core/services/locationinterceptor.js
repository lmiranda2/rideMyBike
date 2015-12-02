(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.core.name).run(
		[
		'$rootScope',
		rmb.modules.core.services.eventbus,
		function($rootScope, eventbus) {
			//Do your $on in here, like this:
			$rootScope.$on("$locationChangeStart",function(event, next, current){
				eventbus.broadcast(rmb.modules.core.events.location.changeStart, next);
			});
			
			$rootScope.$on("$locationChangeEnd",function(event, next, current){
				eventbus.broadcast(rmb.modules.core.events.location.changeEnd, next);
			});
		}]);
 
}(angular, rmb));

 