(function (angular, rmb) {
    'use strict';

    rmb.modules.bike = {
        name: 'bike',
        controllers: {
            bike: 'bike.ctrl'
        },
        routes: {
            bike: '/bike'
        },
        model: {
            bike: 'BikeModel'
        },
        collection: {
            bike: 'BikeCollection'
        },
        templates: {
            bike: 'assets/scripts/modules/bike/html/bike.tmpl.html'
        },
        api: 'bikes'
    };

    angular.module(rmb.modules.bike.name, [
        'ngRoute'
    ]);


}(angular, rmb));