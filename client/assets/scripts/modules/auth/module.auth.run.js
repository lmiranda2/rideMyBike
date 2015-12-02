(function (angular, rmb) {
    'use strict';

angular.module(rmb.modules.auth.name).run([
    '$rootScope',
    '$location',
	rmb.modules.core.services.eventbus,
    rmb.modules.auth.services.authorization,
    function ($rootScope, $location, eventbus, authorization) {
        var routeChangeRequiredAfterLogin = false,
            loginRedirectUrl;
        $rootScope.$on('$routeChangeStart', function (event, next, old) {
            var authorised;
			
            if (next.access !== undefined) {
				
                authorised = authorization.authorize(next.access.loginRequired,
                                                     next.access.permissions,
                                                     next.access.permissionCheckType);
				
                if (authorised === rmb.modules.auth.enums.authorised.loginRequired) {
                    routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = next.originalPath;
					debugger;
					if(old === undefined || old.originalPath != rmb.modules.auth.routes.login)
						$location.path(rmb.modules.auth.routes.login);
					else {
						eventbus.broadcast(rmb.modules.auth.events.userNotAuthorized);
						event.preventDefault();
					}
                    //
                } else if (authorised === rmb.modules.auth.enums.authorised.notAuthorised) {
                    $location.path(rmb.modules.auth.routes.notAuthorised).replace();
                }
				else if(routeChangeRequiredAfterLogin && next.originalPath !== rmb.modules.auth.routes.login){
					routeChangeRequiredAfterLogin = false;
					$location.path(loginRedirectUrl).replace();
				}
            }
			else if(next.originalPath !== rmb.modules.auth.routes.login)
			{ 
					routeChangeRequiredAfterLogin = true;
                    loginRedirectUrl = next.originalPath;
			}
        });
		
		eventbus.subscribe(rmb.modules.auth.events.userLoggedOut, function()
		{
			$location.path(rmb.modules.auth.routes.login).replace();
		});
		
    }]);
}(angular, rmb));