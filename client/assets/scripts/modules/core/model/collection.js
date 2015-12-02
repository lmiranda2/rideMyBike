(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.core.name).factory(rmb.modules.core.models.collection, [
        'Collection',
        rmb.modules.core.services.eventbus,
        function (collection, eventbus) {

            var save = collection.prototype.save;
            var fetch = collection.prototype.fetch;

            var dataProp = 'data';

            collection.prototype.parse = function(response){
                return response[dataProp] || response;
            };

            collection.prototype.save = function(options){
                if(options && !options.silent){
                    eventbus.broadcast(rmb.modules.core.events.model.saveStart, this);
                }
                var self = this;
                return save.call(self, options).then(
                    function(response){
                        if(options && !options.silent){
                            eventbus.broadcast(rmb.modules.core.events.model.saveEnd, response);
                        }
                        return response;
                    }
                );
            };

            collection.prototype.fetch = function(options){
                if(options && !options.silent){
                    eventbus.broadcast(rmb.modules.core.events.model.saveStart, this);
                }
                var self = this;
                return fetch.call(self, options).then(
                    function(response){
                        if(options && !options.silent){
                            eventbus.broadcast(rmb.modules.core.events.model.saveEnd, response);
                        }
                        return response;
                    }
                );
            };

            return collection;
        }
    ]);
}(angular, rmb))