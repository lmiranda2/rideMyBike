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

var requestFilter = require('./modules/filters/request.filter');
var headerFilter = require('./modules/filters/header.filter');
var responseWrapper = require('./modules/core/response.wrapper');

/* MODULES */
var authenticationRouter = require('./modules/auth/router');
var bikeRouter = require('./modules/bikes/router');

// Add headers
app.use(cors());

headerFilter(router);

// load only the authentication module before the middleware.
authenticationRouter(router, entities, jwt, forge, fs, responseWrapper);

// route middleware to verify a token.
//requestFilter(router, fs, jwt, responseWrapper);

bikeRouter(router, entities, responseWrapper, bookshelf, fs);

app.use('/api', router);

app.listen(port);

console.log('Application running on port ' + port);



