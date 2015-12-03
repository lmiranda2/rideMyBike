(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.user.name).factory(rmb.modules.user.collection.user,
        [ rmb.modules.core.models.collection,
            rmb.modules.user.model.user,
            function(Collectionrmb, UserModel){
                var result = Collectionrmb.extend({
                    Model: UserModel,
                    url: function()
                    {
                        return  rmb.modules.core.api + rmb.modules.user.api;
                    }()
                });

                return result;
            }
        ]);
})(angular, rmb);