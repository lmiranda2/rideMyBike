/**
 * Created by luiz on 11/24/2015.
 */
module.exports = function (router, entities, responseWrapper)
{
    /*
    new entities.BikeImage(
        {
            bikeImageDescription: 'Dirt',
            bikeImageData: '',
            bikeImageMain: 1,
            bikeId: 2
        }).save();
    */

    router.route('/bikes').get(function (req, res) {
        var Bike = entities.Bike;

        return Bike.fetchAll({withRelated: ['calendar', 'type', 'images']})
            .then(function (bikes) {
                var response = responseWrapper(true, '', '', bikes);

                res.json(response);
            });

    });

    router.route('/bikes/:bikeId/images/:imageId').get(function (req, res) {

        var fs = require('fs');

        var bikeimageId = req.param("imageId");
        var bikeId = req.param("bikeId");

        var BikeImage = new entities.BikeImage({ 'bikeImageId': bikeimageId }).fetch().then(function(image){
            console.log("Image", image);
            var filePath = 'images/' + bikeId + '/' + bikeimageId + '.' + image.get('bikeImageExtension');
            var img = fs.readFileSync(filePath);
            res.writeHead(200, {'Content-Type': 'image/' + image.bikeImageExtension });
            res.end(img, 'binary');
        });
    });
};
