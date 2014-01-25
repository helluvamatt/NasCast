// usings
var fs = require('fs');
var express = require('express');

var PgConfig = require('../Common/PgConfig.js');
var MediaDatabase = require('../Common/MediaDatabase.js');
var MediaScanner = require('./MediaScanner.js');

// load configuration
var config = require('./core.config.json');
config.database = new PgConfig(config.database || { "global": { url: process.env.DATABASE_URL } });

// setup the media database
var mediaDatabase = new MediaDatabase(config);
var mediaScanner = new MediaScanner(config.mediaScanner, mediaDatabase);

// Query API is an express application
var app = express();
app.use(express.json());
app.use(express.urlencoded());

// TODO Query API

app.get('/stream/:contentId', function(req, res) {
	// TODO Stream content
});

app.listen(3000);
console.log('Server listening on port 3000.');