(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.auth.name).factory(rmb.modules.auth.model.user,
	[ rmb.modules.core.models.model,
		function(Modelrmb){
		  var result = Modelrmb.extend({
			urlRoot: function() 
				{ 
					return  rmb.modules.core.api + 'authenticate'; 
				}
		  });
		
		  return result;
		}
	]);

	angular.module(rmb.modules.auth.name).factory(rmb.modules.auth.model.collection, function(UserModel, Collection){
		return Collection.extend({
			url: '/api/mymodel',
			model: MyModel
		});
	})
})(angular, rmb);