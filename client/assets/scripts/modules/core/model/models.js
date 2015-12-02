(function (angular, rmb) {
    'use strict';

	angular.module(rmb.modules.core.name).factory(rmb.modules.core.models.model, [
		'Model',
		rmb.modules.core.services.eventbus,
		function (model, eventbus) {
			
			var save = model.prototype.save;
			var fetch = model.prototype.fetch;
			
			var dataProp = 'data';
			
			model.prototype.parse = function(response){
				return response[dataProp] || response;
			};
			
			model.prototype.save = function(options){
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
			
			model.prototype.fetch = function(options){
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
			
			return model;
		}
		]);
}(angular, rmb))