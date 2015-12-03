(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.user.name).factory(rmb.modules.user.model.user,
	[ rmb.modules.core.models.model,
		function(Modelrmb){
		  var result = Modelrmb.extend({
			urlRoot: function() 
				{ 
					return  rmb.modules.core.api + rmb.modules.user.api;
				}()
		  });
		
		  return result;
		}
	]);
})(angular, rmb);