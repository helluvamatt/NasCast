// Includes
var pg = require('pg');
var express = require('express');
var http = require('http');
var fs = require('fs');
var xbmc = require('xbmc-ws');
var socket = require('socket.io');

var PostgreStore = require('../Common/PostgreStore.js');
var PgConfig = require('../Common/PgConfig.js');
var MediaDatabase = require('../Common/MediaDatabase.js');

// load configuration
var config = require('./web.config.json');
config.xbmc = config.xbmc || {host: 'localhost', port: 9090};
config.secret = config.secret || process.env.SECRET;
config.database = new PgConfig(config.database || { "global": { url: process.env.DATABASE_URL } });
var sessionDatabase = config.database.get('sessions');

// media database
var mediaDatabase = new MediaDatabase(config.xbmc);

// Prepare application
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

// error handler
var error = function(res, err) {
	response(res, "ERROR", err);
};

var response = function(res, type, data) {
	res.end(JSON.stringify({"type": type, "data": data}));
};

// Configure Express application
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.cookieParser());
//app.use(express.session({
//	secret: config.secret,
//	store: new PostgreStore(sessionDatabase)
//}));

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/chromecast', express.static(__dirname + '/chromecast'));

app.get('/stream/:contentId', function(req, res) {
	// TODO Stream content
});

app.get('/movies', function(req, res) {
	mediaDatabase.getMovies(['title', 'year', 'thumbnail'], function(err, result) {
		if (err) { return error(res, err); }
		return response(res, "MOVIES_LIST", result);
	});
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + "/public/index.html");
});

// Configure Socket.io application
io.sockets.on('connection', function(socket) {
	socket.emit('connected');
});

// Away we go… 
server.listen(3000);
console.log('Server listening on port 3000.');

