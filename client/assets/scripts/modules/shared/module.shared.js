(function (angular, rmb) {
    'use strict';

    rmb.modules.shared = {
        name: 'shared',
        controllers: {
			header: 'header.ctrl',
			footer: 'footer.ctrl',
			notification: 'notification.ctrl'
        },
		directives: {
			header: 'header',
			footer: 'footer',
			notification: 'notification'
		},
		notifications: {
			cssclass: {
				message: 'message',
				warning: 'warning',
				error: 'error'
			},
			duration: 5000,  //miliseconds
			messages: {
				notAuthorized: 'Not authorized.',
				errorMessage: 'Ooops...'
			}
		},
		templates: {
			notification: 'assets/scripts/modules/shared/html/notification.tmpl.html',
			header: 'assets/scripts/modules/shared/html/header.tmpl.html',
			footer: 'assets/scripts/modules/shared/html/footer.tmpl.html'
		}
    };

    angular.module(rmb.modules.shared.name, [
        'ngRoute'
    ]);


}(angular, rmb));