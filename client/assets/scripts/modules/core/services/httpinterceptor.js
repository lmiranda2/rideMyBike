(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.core.name)
        .factory(rmb.modules.core.services.httpinterceptor,
        [
            '$q',
            rmb.modules.core.services.storage,
            rmb.modules.core.services.eventbus,
            function ($q, storage, eventbus) {
                return {
                    'request': function (config) {
                        config.timeout = 10000;
                        eventbus.broadcast(rmb.modules.core.events.ajax.request, config);

                        if(config.url.indexOf(rmb.modules.core.api) > -1) {
                            var token = storage.get('token');
                            if (token) {
                                config.headers['x-access-token'] = token;
                            }
                        }
                        return config || $q.when(config);
                    },

                    'requestError': function (rejection) {
                        eventbus.broadcast(rmb.modules.core.events.ajax.requestError, config);
                        return $q.reject(rejection);
                    },

                    'response': function (response) {
                        eventbus.broadcast(rmb.modules.core.events.ajax.response, response);
                        return response || $q.when(response);
                    },

                    'responseError': function (rejection) {
                        eventbus.broadcast(rmb.modules.core.events.ajax.responseError, rejection);
                        return $q.reject(rejection);
                    }
                }
            }])
        .config(['$httpProvider', function ($http) {
            $http.interceptors.push(rmb.modules.core.services.httpinterceptor);
        }]);

}(angular, rmb));