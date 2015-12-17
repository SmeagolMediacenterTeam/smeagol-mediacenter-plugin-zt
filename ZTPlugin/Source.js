GollumJS.NS(ZTPlugin, function() {

	var Promise = require('rsvp').Promise;

	this.Source = new GollumJS.Class({

		Extends: Server.Source,

		plugin: null,

		initialize: function (plugin) {
			this.plugin = plugin;
		},

		getMedias: function (group) {
			return this.plugin.caller.serie.list();
		}

	});

});