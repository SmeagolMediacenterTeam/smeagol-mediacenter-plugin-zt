GollumJS.NS(ZTPlugin, function() {

	var Promise = require('rsvp').Promise;

	this.Source = new GollumJS.Class({

		Extends: Server.Source,

		plugin: null,

		initialize: function (plugin) {
			this.plugin = plugin;
		},

		getMedias: function (group) {
			var _this = this;
			return new Promise(function(resolve, reject) {
				resolve([
					{	
						plugin: _this.plugin.id(),
						id: 1,
						name: "Game Of Thrones",
					},
					{	
						plugin: _this.plugin.id(),
						id: 2,
						name: "Star Trek",
					}
				]);
			});
		}

	});

});