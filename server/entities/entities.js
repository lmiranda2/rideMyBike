module.exports = function(database){

    var User = database.Model.extend({
        tableName: 'User',
        idAttribute: 'userId'
    });

    var Bike = database.Model.extend({
        tableName: 'Bike',
        idAttribute: 'bikeId',
        calendar: function(){
            return this.hasMany(BikeCalendar, 'bikeId');
        },
        type: function(){
            return this.belongsTo(BikeType, 'bikeTypeId');
        },
        images: function(){
            return this.hasMany(BikeImage, 'bikeId');
        }
    });

    var BikeType = database.Model.extend({
        tableName: 'BikeType',
        idAttribute: 'bikeTypeId'
    });

    var BikeImage = database.Model.extend({
        tableName: 'BikeImage',
        idAttribute: 'bikeImageId'
    });

    var BikeCalendar = database.Model.extend({
        tableName: 'BikeCalendar',
        idAttribute: 'bikeCalendarId'
    });

    return {
        User : User,
        Bike : Bike,
        BikeType : BikeType,
        BikeImage : BikeImage,
        BikeCalendar : BikeCalendar
    }
};
