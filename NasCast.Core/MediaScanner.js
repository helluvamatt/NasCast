/*
 *	MediaScanner
 */

// --------
// includes
// --------
var fs = require('fs');
var path = require('path');
var Log = require('log');
var XRegExp = require('xregexp').XRegExp;
var walk = require('walk').walk;

var MediaDatabase = require('../Common/MediaDatabase.js');

// ----------------
// MediaScanner API
// ----------------
var MediaScanner = module.exports = function(options, logger, mediaDatabase) {

	if (typeof options !== 'object') {
		throw TypeError;
	}

	var self = this;
	
	this.logger = new Log((options.logging && options.logging.level) || 'WARNING', fs.createWriteStream((options.logging && options.logging.file) || 'scanner.log'));

	var _check = function(mediaDef, subPath) {
		self.logger.debug("Checking \"%s\" for \"%s\"...", subPath, mediaDef.name);
		for (var index in mediaDef.pathLayouts) {
			var regexp = XRegExp(mediaDef.pathLayouts[index]);
			if (regexp.test(subPath)) {
				var item = XRegExp.exec(subPath, regexp);
				self.logger.debug("   Success: %s", JSON.stringify(item));
				
				
			} else {
				self.logger.debug("   Failed.");
			}
		}
	};

	var _scan = function(mediaDef) {

		if (mediaDef.recursive) {
			var walkOpts = {
				followLinks: mediaDef.followLinks,
				filters: mediaDef.dirExcludes || []
			};
			var walker = walk(mediaDef.rootPath, walkOpts);
			walker.on("node", function (root, nodeStats, next) {
				if (nodeStats.type == 'file') {
					var subPath = path.relative(mediaDef.rootPath, root).replace(/\\/, '/');
					_check(mediaDef, subPath + "/" + nodeStats.name);
				}
				next();
			});
			walker.on("errors", function (root, nodeStatsArray, next) {
				next();
			});
			walker.on("end", function () {
				self.logger.info("Finished scanning directories for \"%s\"", mediaDef.name);
			});
		} else {
			try {
				fs.readdir(mediaDef.rootPath, function(err, files) {
					if (err) {
						self.logger.error("Processing failed for directory \"%s\": %s", mediaDef.rootPath, err);
						return;
					}
					for (var i in files) {
						_check(mediaDef, files[i]);
					}
					self.logger.info("Finished scanning directories for \"%s\"", mediaDef.name);
				});
			} catch (e) {
				self.logger.error("Processing failed for directory \"%s\": %s", mediaDef.rootPath, e.message);
				console.error(e.message, e.stack);
			}
		}
	};

	var _scanAll = function() {
		for (var i in self.mediaDefs) {
			self.logger.info("Starting scan for \"%s\"...", self.mediaDefs[i].name);
			_scan(self.mediaDefs[i]);
		}
	}

	this.mediaDatabase = mediaDatabase || new MediaDatabase(options);
	this.mediaDefs = options.media || [];

	if (options.startupScan) _scanAll();
};
