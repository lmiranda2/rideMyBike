(function (angular, rmb) {
    'use strict';

    rmb.modules.bike = {
        name: 'bike',
        controllers: {
            bike: 'bike.ctrl',
            details: 'bike.details.ctrl',
            contactOwner: 'bike.contact.owner.ctrl'
        },
        routes: {
            bike: '/bike',
            details: '/bike/:bikeId'
        },
        model: {
            bike: 'BikeModel'
        },
        collection: {
            bike: 'BikeCollection'
        },
        templates: {
            bike: 'assets/scripts/modules/bike/html/bike.tmpl.html',
            details: 'assets/scripts/modules/bike/html/bike.details.tmpl.html',
            contactOwner: 'assets/scripts/modules/bike/html/bike.contact.owner.tmpl.html'
        },
        api: 'bikes'
    };

    angular.module(rmb.modules.bike.name, [
        'ngRoute'
    ]);


}(angular, rmb));