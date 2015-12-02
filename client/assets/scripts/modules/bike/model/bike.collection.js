(function (angular, rmb) {
    'use strict';

    angular.module(rmb.modules.bike.name).factory(rmb.modules.bike.collection.bike,
        [ rmb.modules.core.models.collection,
            rmb.modules.bike.model.bike,
            function(Collectionrmb, BikeModel){
                var result = Collectionrmb.extend({
                    Model: BikeModel,
                    url: function()
                    {
                        return  rmb.modules.core.api + rmb.modules.bike.api;
                    }()
                });

                return result;
            }
        ]);
})(angular, rmb);