GollumJS.NS(ZTPlugin, function() {

	var Promise = require('rsvp').Promise;
	var request = require('request-promise');
	var JSDom   = require('jsdom');
	var FS      = require('fs-promise');
	var FSExtra = require('fs-extra-promise');

	this.ZTCaller = new GollumJS.Class({

		Static: {
			ZT_URL         : 'http://www.zone-telechargement.com/',
			ZT_EXTENSION   : '.html',
			RANGE_CALL_TIME: 5000,

			cachePath: './',

			init: function () {
				this.cachePath = GollumJS.getParameter('node.tmp_path')+'/ZT';
				return this._initCacheDirectory();
			},

			_initCacheDirectory: function () {
				var _this = this;
				console.log ("Init ZT cache path:", this.cachePath);
				return FS.exists(this.cachePath)
					.then(function (exist) {
						if (!exist) {
							console.log ('ZTCaller: "'+_this.cachePath+'" not exist. Create directory.');
							return FSExtra.mkdirs(_this.cachePath);
						}
					})
				;

			}
		},

		plugin: null,

		initialize: function (plugin) {
			this.plugin = plugin;

		},

		queryPage: function(page) {
			
			var _this = this;
			var url = _this.self.ZT_URL+page+_this.self.ZT_EXTENSION;

			return this._getUrlCached (url)
				.then(function (content) {
					if (content !== null) {
						return content;
					}
					return _this._requestPage(url);
				})
			;
		},

		_requestPage: function (url) {
			return request({
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
			});
		},

		_getUrlCached: function (url) {
			var cacheKey = url.replace(new RegExp('[^a-zA-Z0-9]+', 'g'), '_');
			var cachePath = this.self.cachePath+'/'+cacheKey;

			return FS.exists(cachePath)
				.then(function (exist) {
					if (exist) {
						return fs.readFile(cachePath)
							.then(function(buffer) {
								var content = buffer.toString();
								console.log ("Response from cache: "+url+", cache:"+cachePath);
								return content;
							})
						;
					}
					return null;
				})
			;
		}
		
	});

});