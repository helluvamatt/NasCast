/*
 *	MediaDatabase
 */
var Bookshelf = require('bookshelf');
var Knex = require('knex');
var _ = require('lodash');

var MediaDatabase = module.exports = function MediaDatabase(options) {

	if (typeof options !== 'object') {
		throw TypeError;
	}

	var self = this;

	var dbConfig = options.database.get("global");
	this.DB = Bookshelf.initialize({
		client: dbConfig.type,
		connection: _.omit(dbConfig, 'type')
	});
	
	this.Item = this.DB.Model.extend({
		tableName: 'nascast_media_items',
		parent: function() {
			this.belongsTo(self.Container);
		}
	});
	
	this.Container = this.DB.Model.extend({
		tableName: 'nascast_media_containers',
		parent: function() {
			return this.belongsTo(self.Container);
		},
		items: function() {
			return this.hasMany(self.Item);
		},
		children: function() {
			return this.hasMany(self.Container);
		}
	});
};

MediaDatabase.prototype.getItem = function(id) {

};

MediaDatabase.prototype.getItemByPath = function(path) {

};

MediaDatabase.prototype.getItems = function(parent) {

};

MediaDatabase.prototype.storeItem = function(mediaItem) {

};

MediaDatabase.prototype.getContainers = function(parent) {

};

MediaDatabase.prototype.storeContainer = function(container) {

};
