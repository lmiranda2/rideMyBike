(function (angular, rmb) {
    'use strict';

    rmb.modules.auth = {
        name: 'auth',
        enums: {
            authorised: {
                authorised: 0,
                loginRequired: 1,
                notAuthorised: 2
            },
            permissionCheckType: {
                atLeastOne: 0,
                combinationRequired: 1
            }
        },
        events: {
          userLoggedIn: 'auth:user:loggedIn',
          userLoggedOut: 'auth:user:loggedOut',
		  userNotAuthorized: 'auth:user:notAuthorised'
        },
        controllers: {
            login: 'login.ctrl'
        },
        templates: {
            login: 'assets/scripts/modules/auth/html/login.tmpl.html',
            notAuthorized: 'assets/scripts/modules/auth/html/not-authorised.tmpl.html'
        },
        services: {
            authentication: 'authentication',
            authorization: 'authorization',
			sha256: 'SHA256',
			fingerprint: { 
				library: 'Fingerprint2',
				service: 'service'
			}
        },
        routes: {
            login: '/login',
            notAuthorised: '/not-authorised',
            default: '/bike'
        },
		model:
		{
			user: 'UserModel',
			collection: 'UserCollection'
		}
    };

    angular.module(rmb.modules.auth.name, [
        'ngRoute',
        rmb.modules.core.name
    ]);


}(angular, rmb));