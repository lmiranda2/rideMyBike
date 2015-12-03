(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.info.name).factory(rmb.modules.info.model.info,
	[ rmb.modules.core.models.model,
		function(Modelrmb){
		  var result = Modelrmb.extend({
			urlRoot: function() 
				{ 
					return  rmb.modules.core.api + rmb.modules.info.api;
				}()
		  });
		
		  return result;
		}
	]);
})(angular, rmb);