(function (angular, rmb) {
    'use strict';

    rmb.modules.user = {
        name: 'user',
        controllers: {
            user: 'user.ctrl',
            signup: 'signup.ctrl'
        },
        routes: {
            user: '/user'
        },
        model: {
            user: 'UserModel'
        },
        collection: {
            user: 'UserCollection'
        },
        templates: {
            user: 'assets/scripts/modules/user/html/user.tmpl.html'
        },
        api: 'users'
    };

    angular.module(rmb.modules.user.name, [
        'ngRoute'
    ]);


}(angular, rmb));