(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.auth.name).factory(rmb.modules.auth.services.authentication, [
        '$q',
        '$timeout',
		rmb.modules.core.services.storage,
        rmb.modules.core.services.eventbus,
		rmb.modules.core.services.sha256,
		rmb.modules.auth.model.user,
		rmb.modules.core.services.fingerprint.service,
        function ($q, $timeout, storage, eventbus, SHA256, User, fingerprint) {
            
			var currentUser,
               
                login = function (email, password) {
                    var defer = $q.defer();

					if(email != undefined && password != undefined)
					{
						var oldPassword = password;
						
						var shaObj = new SHA256("SHA-256", 'TEXT');
						shaObj.update(password);

						password = shaObj.getHash("HEX");
						fingerprint.get().then(function(fp)
						{
							var user = new User({userLogin: email, userPassword: password, fingerprint: fp});

							user.save().then(function (response){
								if(response.data.success){
									currentUser = response.data.data;
									storage.setObject('user', currentUser);
									storage.set('token', response.headers('x-access-token'));
                                    eventbus.broadcast(rmb.modules.auth.events.userLoggedIn, currentUser);
									defer.resolve(response.data);
								}
                                else{
									eventbus.broadcast(rmb.modules.auth.events.userNotAuthorized, 'Unknown Username / Password combination');
									defer.reject('Unknown Username / Password combination');
								}
							});
						});
					}  
					else
					{
						eventbus.broadcast(rmb.modules.auth.events.userNotAuthorized, 'Unknown Username / Password combination');
						defer.reject('Unknown Username / Password combination');
					}

                    return defer.promise;
                },
                logout = function () {
                    // we should only remove the current user.
                    // routing back to login login page is something we shouldn't
                    // do here as we are mixing responsibilities if we do.
					storage.remove('user');
					storage.remove('token');
                    currentUser = undefined;
                    eventbus.broadcast(rmb.modules.auth.events.userLoggedOut);
                },
                getCurrentLoginUser = function () {
                    return storage.getObject('user');
                };

            return {
                login: login,
                logout: logout,
                getCurrentLoginUser: getCurrentLoginUser
            };
        }
    ]);
}(angular, rmb));