(function (angular, rmb) {
    'use strict';

    rmb.modules.info = {
        name: 'info',
        controllers: {
            info: 'info.ctrl'
        },
        routes: {
            info: '/info'
        },
        model: {
            info: 'InfoModel'
        },
        collection: {
            info: 'InfoCollection'
        },
        templates: {
            info: 'assets/scripts/modules/info/html/info.tmpl.html'
        },
        api: 'infos'
    };

    angular.module(rmb.modules.info.name, [
        'ngRoute'
    ]);


}(angular, rmb));