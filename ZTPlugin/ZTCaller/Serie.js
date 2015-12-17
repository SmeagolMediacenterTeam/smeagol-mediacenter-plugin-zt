GollumJS.NS(ZTPlugin.ZTCaller, function() {

	var Promise = require('rsvp').Promise;

	this.Serie = new GollumJS.Class({

		Extends: ZTPlugin.ZTCaller,

		list: function() {
			return this.queryPage('liste-des-series')
				.then(this.domToData.bind(this))
			;
		},

		domToData: function ($) {
			
			var _this  = this;

			return new Promise(function(resolve, reject) {

				var list = [];
				var as = $('#dle-content .list_title a');
				
				for (var i = 0; i < as.length; i++) {
					var a = $(as[i]);
					list.push ({//new App.Entity.Serie(
						plugin: _this.plugin.id(),
						id: _this.href2Id(a.attr('href')),
						name: a.text(),
						href: a.attr('href'),
						canonical: _this.href2Canonical(a.attr('href'))
					});
				}
				resolve(list);
			});
		},

		href2Canonical: function(href) {
			return this.self.ZT_URL+"/series/"+this.href2Id(href)+"-.html";
		},

		href2Id: function(href) {
			href = href.replace(this.self.ZT_URL, '');
			href = href.replace('series/vf/', '');
			href = href.replace('series/vostfr/', '');
			href = href.replace('series/vf-hd/', '');
			href = href.replace('series/vostfr-hd/', '');
			href = href.replace('series/vf-1080p/', '');
			href = href.replace('series/vostfr-1080p/', '');
			href = href.substr(0, href.indexOf('-'));
			return href;
		}

	});

});