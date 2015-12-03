module.exports = function(database){

    database.plugin('visibility');

    var User = database.Model.extend({
        tableName: 'User',
        idAttribute: 'userId',
        hidden: ['userPassword', 'userSalt', 'userIsActive']
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
        },
        reviews: function(){
            return this.hasMany(BikeReview, 'bikeId');
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

    var BikeReview = database.Model.extend({
        tableName: 'BikeReview',
        idAttribute: 'bikeReviewId',
        user: function(){
            return this.hasOne(User, 'userId');
        }
    });

    return {
        User : User,
        Bike : Bike,
        BikeType : BikeType,
        BikeImage : BikeImage,
        BikeCalendar : BikeCalendar,
        BikeReview: BikeReview
    }
};
