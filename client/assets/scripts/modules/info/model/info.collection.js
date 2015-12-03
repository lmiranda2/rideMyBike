(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.info.name).factory(rmb.modules.info.collection.info,
        [ rmb.modules.core.models.collection,
            rmb.modules.info.model.info,
            function(Collectionrmb, UserModel){
                var result = Collectionrmb.extend({
                    Model: UserModel,
                    url: function()
                    {
                        return  rmb.modules.core.api + rmb.modules.info.api;
                    }()
                });

                return result;
            }
        ]);
})(angular, rmb);