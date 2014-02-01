/*
 *	MediaDatabase
 */
var _ = require('lodash');
var colors = require('colors');
var xbmc = require('xbmc-ws');

var MediaDatabase = module.exports = function MediaDatabase(options, logger) {

	if (typeof options !== 'object') {
		throw TypeError;
	}
	var self = this;

	self.logger = logger;
	
	self.queue = [];
	
	// define XBMC connection
	this.xbmc = xbmc(options.host || 'localhost', options.port || 9090);
	// TODO xbmc-ws needs better connection error handling
	//console.log(("Failed to connect to XBMC: " + e.message).red);
	
};

MediaDatabase.prototype.getMovies = function(args, fn) {
	if (this.xbmc) {
		this.xbmc.run('VideoLibrary.GetMovies')(args, fn);
	}
	else {
		// TODO enqueue
	}
};
