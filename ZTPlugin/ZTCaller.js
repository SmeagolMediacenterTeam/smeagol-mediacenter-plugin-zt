GollumJS.NS(ZTPlugin, function() {

	var Promise = require('rsvp').Promise;
	var request = require('request-promise');
	var JSDom   = require('jsdom');

	this.ZTCaller = new GollumJS.Class({

		Static: {
			ZT_URL         : 'http://www.zone-telechargement.com/',
			ZT_EXTENSION   : '.html',
			RANGE_CALL_TIME: 5000
		},

		plugin: null,
		cache: null,

		initialize: function (plugin) {
			this.plugin = plugin;
			this.cache = GollumJS.get('cache');
		},

		queryPage: function(page) {
			
			var _this = this;

			return new Promise(function(resolve, reject) {

				var url = _this.self.ZT_URL+page+_this.self.ZT_EXTENSION;
				
				console.log ("ZTCaller: Call page : "+url);
				
				request({
					uri: url,
					transform: function (content) {

					 	return new Promise(function(resolve, reject) {

							console.log ("ZTCaller: Response page : "+url);

					 		JSDom.env({
								html: content, 
								done: function (errors, window) {
									if (errors) {
										reject(errors);
									}
									resolve(require('jquery')(window));
								}
							});
					 	});
					}
				}).then(resolve);
			});
		}
		
	});

});