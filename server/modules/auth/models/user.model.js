module.exports = function(database)
{
	return database.Model.extend({
	  tableName: 'user',
	  idAttribute: 'userId'
	});
}
