(function (angular, rmb) {
    'use strict';

    rmb.modules.core = {
        name: 'rmb-core',
        services: {
            eventbus: 'eventbus',
			httpinterceptor: 'httpinterceptor',
			sha256: 'SHA256',
			fingerprint: { 
				library: 'fingerprint2',
				service: 'service'
			},
			storage: 'storage'
        },
		events: {
			ajax: {
				request: 'ajax:request',
				requestError: 'ajax:requestError',
				response: 'ajax:response',
				responseError: 'ajax:responseError'
			},
			model:{
				saveStart: 'model:save:start',
				saveEnd: 'model:save:end',
				fetchStart: 'model:fetch:start',
				fetchEnd: 'model:fetch:end',
			},
			location: {
				changeStart: 'location:change:start',
				changeEnd: 'location:change:end'
			},
		},
		controllers: {
			modal: 'modal'
		},
		directives: {
			modal: 'modalDialog'
		},
		templates: {
			modal: 'assets/scripts/modules/core/html/modal.tmpl.html'
		},
		models: {
			model: 'Modelrmb',
			collection: 'Collectionrmb'
		},
		api: '//localhost:8082/api/'
    };

    angular.module(rmb.modules.core.name, []);
}(angular, rmb));