(function (angular, rmb) {
    'use strict';
	
	angular.module(rmb.modules.shared.name).controller(rmb.modules.shared.controllers.notification, 
		['$scope', 
		'$element',
		'$interval',
		rmb.modules.core.services.eventbus,
		function($scope, $element, $interval, eventbus) {
			
			var timeoutId;
		
			function toggleNotification(cssClass, text, show)
			{
				$scope.notificationClass = cssClass;
				$scope.notificationText = text;
				$scope.show = show;
			}
			
			toggleNotification("", "", false);
		
			function showNotification(cssclass, text)
			{
				toggleNotification(cssclass, text, true);
				
				timeoutId = $interval(function() {
					
					toggleNotification("", "", false);
					$interval.cancel(timeoutId);
					
				}, rmb.modules.shared.notifications.duration);
			}	
			
			function showError(error)
			{
				showNotification(rmb.modules.shared.notifications.cssclass.error, error);
			}
			
			function showSuccess(success)
			{
				showNotification(rmb.modules.shared.notifications.cssclass.message, success);
			}
			
			function showProgressBar(show) 
			{
				$scope.showProgress = show;
			}
			
			function saveEndHandler(event, response)
			{
				if(response.data.success
				   && response.data.successMessage != null
				   && response.data.successMessage.length > 0)
				{
					showSuccess(response.data.successMessage);
				}
				
				if(!response.data.success
				   && response.data.errorMessage != null
				   && response.data.errorMessage.length > 0)
			    {
				    showError(response.data.errorMessage);
			    }
				
				showProgressBar(false);
			}
			 
			function saveStartHandler(event, model)
			{
				showProgressBar(true);
			}
			
			function locationChangeStart(event, model)
			{
				showProgressBar(true);
			}
			
			function locationChangeEnd(event, model)
			{
				showProgressBar(false);
			}
			
			function errorHandler(event, errorMessage)
			{
				var message = errorMessage || rmb.modules.shared.notifications.messages.notAuthorized;
				
				showError(message);
				showProgressBar(false);
			}
			
			function notAuthorizedHandler(event, reason)
			{
				showNotification(rmb.modules.shared.notifications.cssclass.error, reason || rmb.modules.shared.notifications.messages.notAuthorized);
			}
			 
			$element.on('$destroy', function() {
			   $interval.cancel(timeoutId);
			 });

			eventbus.subscribe(rmb.modules.core.events.model.saveStart, saveStartHandler);
			eventbus.subscribe(rmb.modules.core.events.model.saveEnd, saveEndHandler);
			eventbus.subscribe(rmb.modules.auth.events.userNotAuthorized, notAuthorizedHandler);
			
			eventbus.subscribe(rmb.modules.core.events.ajax.response, locationChangeEnd);
			eventbus.subscribe(rmb.modules.core.events.ajax.requestError, locationChangeEnd);
			eventbus.subscribe(rmb.modules.core.events.ajax.responseError, locationChangeEnd);
			
			
		 }
		]);

})(angular, rmb);