GollumJS.NS(ZTPlugin, function() {

	var Promise = require('rsvp').Promise;
	var JSDom   = require('jsdom');
	var FS      = require('fs-promise');
	var FSExtra = require('fs-extra-promise');

	var request   = new Server.Request();
	var scheduler = new Server.Scheduler();

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

		source: null,

		initialize: function (source) {
			this.source = source;

		},

		queryPage: function(page) {
			
			var _this = this;
			var url = _this.self.ZT_URL+page+_this.self.ZT_EXTENSION;

			return this._getUrlCached (url)
				.then(function (content) {
					if (content !== null) {
						return _this._html2Jquery(content);
					}
					return _this._requestPage(url);
				})
			;
		},

		_requestPage: function (url) {
			var _this = this;
			return scheduler.push(function (resolve, reject, next) {
				request.get(url, {
					resolveWithFullResponse: true
				})
					.then(resolve)
					.catch (reject)
					.finally(function() {
						next();
					})
				;
			})
				.then(function(resp) {
					if (resp.statusCode == 200) {
						return resp.body;
					}
					throw new Error("ZTCaller: Error statusCode "+resp.statusCode+" for page : "+url);
				})
				// .then(function (content) {
				// 	return _this._cacheUrl(url, content)
				// 		.then (function() { return content; })
				// 	;
				// })
				.then(function (content) { 
					console.log ("ZTCaller: Response page : "+url);
					return content;
				})
				.then(this._html2Jquery.bind(this))
			;
		},

		_html2Jquery: function (html) {
			return new Promise(function(resolve, reject) {
				JSDom.env({
					html: html, 
					done: function (errors, window) {
						if (errors) {
							reject(errors);
						}
						resolve(require('jquery')(window));
					}
				});
		 	});
		},

		_getCachePath: function (url) {
			var cacheKey = url.substr(this.self.ZT_URL.length).replace(new RegExp('[^a-zA-Z0-9]+', 'g'), '_');
			return  ZTPlugin.ZTCaller.cachePath+'/'+cacheKey;
		},

		_cacheUrl: function (url, content) {
			var cachePath = this._getCachePath(url);
			console.log ("ZTCaller: Write cache:", cachePath);
			return FS.writeFile(cachePath, content);
		},

		_getUrlCached: function (url) {
			var cachePath = this._getCachePath(url);

			return FS.exists(cachePath)
				.then(function (exist) {
					if (exist) {
						return FS.readFile(cachePath)
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