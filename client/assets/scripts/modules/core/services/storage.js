(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.core.name)
        .factory(rmb.modules.core.services.storage,
        [
            '$q',
            '$cookies',
            function($q, $cookies) {
                function set(key, value) {
                    $cookies.put(key, value);
                }
                function setObject(key, value) {
                    $cookies.putObject(key, value);
                }
                function get(key) {
                    return $cookies.get(key);
                }
                function getObject(key) {
                    return $cookies.getObject(key);
                }
                function remove(key) {
                    return $cookies.remove(key);
                }
                return {
                    set: set,
                    setObject: setObject,
                    get: get,
                    getObject: getObject,
                    remove: remove
                }
            }]);

}(angular, rmb));