/**
 * Created by luiz on 11/23/2015.
 */

//$sql = "SELECT *, ( 6371 * acos( cos( radians(" . $db->real_escape_string($lat) . ") ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(" . $db->real_escape_string($lng) . ") ) + sin( radians(" . $db->real_escape_string($lat) . ") ) * sin( radians( lat ) ) ) ) AS distance FROM your_table_name HAVING distance < 15";

/*
 * Get the packages we need.
 */

var express = require('express');
var app = express();

var properties = require('./properties');

var knex = require('knex')(properties.database);

var bookshelf = require('bookshelf')(knex);

var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var forge = require('node-forge');
var cors = require('cors');

var promise = require('promise');

var fs = require('fs');

var entities = require('./entities/entities')(bookshelf);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || properties.port;

// use morgan to log requests to the console
app.use(morgan('dev'));
var router = express.Router();

/* CORE */
//var requestFilter = require('./ArtistWagon/modules/filters/request.filter');
//var headerFilter = require('./ArtistWagon/modules/filters/header.filter');
var responseWrapper = require('./modules/core/response.wrapper');

/* MODULES */
var bikeRouter = require('./modules/bikes/router');

//var activitytRouter = require('./ArtistWagon/modules/activities/router');

//var transferRouter = require('./ArtistWagon/modules/transfers/router');

// Add headers
app.use(cors());

//headerFilter(router);

// load only the authentication module before the middleware.
bikeRouter(router, entities, responseWrapper);

// route middleware to verify a token.
//requestFilter(router, fs, jwt, responseWrapper);

// load all other modules.
//activitytRouter(router, entities, responseWrapper);

//transferRouter(router, entities, responseWrapper);

app.use('/api', router);

app.listen(port);

console.log('Application running on port ' + port);



