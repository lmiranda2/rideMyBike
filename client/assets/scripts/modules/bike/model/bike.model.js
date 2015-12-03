(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).factory(rmb.modules.bike.model.bike,
	[ rmb.modules.core.models.model,
		function(Modelrmb){
		  var result = Modelrmb.extend({
			urlRoot:  rmb.modules.core.api + rmb.modules.bike.api
		  });
		
		  return result;
		}
	]);
})(angular, rmb);