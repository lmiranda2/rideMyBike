/**
 * Created by luiz on 11/24/2015.
 */
module.exports = function (router, entities, responseWrapper, bookshelf)
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
            var filePath = 'images/' + bikeId + '/' + bikeimageId + '.' + image.get('bikeImageExtension');
            var img = fs.readFileSync(filePath);
            res.writeHead(200, {'Content-Type': 'image/' + image.bikeImageExtension });
            res.end(img, 'binary');
        });
    });

    router.route('/bikes').post(function (req, res) {
        var filter = req.body;

        var startDate = filter.startDate;
        var endDate = filter.endDate;
        var location = filter.location;

        var raw = 'SELECT Bike.*, ( 6371 * acos( cos( radians( ' + location.lat + ' ) ) * cos( radians( bikeLat ) ) * cos( radians( bikeLong ) - radians( ' + location.lng + ' ) ) + sin( radians( ' + location.lat + ' ) ) * sin( radians( bikeLat ) ) ) ) AS distance ' +
            ' FROM Bike WHERE (SELECT COUNT(1) FROM BikeCalendar WHERE BikeCalendar.bikeId = Bike.bikeId AND (\'' + startDate + '\' BETWEEN BikeCalendar.bikeCalendarStart AND BikeCalendar.bikeCalendarEnd OR \'' + endDate + '\' BETWEEN BikeCalendar.bikeCalendarStart AND BikeCalendar.bikeCalendarEnd OR (\'' + startDate + '\' <= BikeCalendar.bikeCalendarStart AND \'' + endDate + '\' >= BikeCalendar.bikeCalendarEnd) ) ) = 0 HAVING distance < 15 ';

        console.log(raw);

        bookshelf.knex.raw(raw).then(function(bikes){
            var collection = entities.Bike.collection();
            collection.add(bikes[0]);
            collection.load('images').done(function(loaded){
                var response = responseWrapper(true, '', '', loaded);

                res.json(response);
            });

        });
    });
};
