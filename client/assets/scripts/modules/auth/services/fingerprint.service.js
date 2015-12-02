(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.core.name)
	.factory(rmb.modules.auth.services.fingerprint.service,
		[
		 '$q',
		 rmb.modules.auth.services.fingerprint.library,
		 rmb.modules.core.services.eventbus,
		function($q, fingerprint, eventbus) {
			
			var fp;
			var promise = $q(function(resolve, reject) {
				new fingerprint().get(function(result){
				  fp = result;
				  resolve(fp);
				});
			  });
			
			return {
				get: function()
				{
					return promise;
				}
			}
		}]);
   
}(angular, rmb));