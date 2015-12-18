GollumJS.NS(ZTPlugin.ZTCaller, function() {

	var Promise   = require('rsvp').Promise;
	var UniqMedia = Server.Media.Entity.UniqMedia;
	var Details   = Server.Media.Entity.Details;

	this.SerieDetails = new GollumJS.Class({

		Extends: ZTPlugin.ZTCaller,

		find: function(id) {
			var _this = this;
			var url = id+'-';
			return this.queryPage(url)
				.then(function ($) {
					return _this.domToData(id, $);
				})
			;
		},

		domToData: function (id, $) {
			
			var _this  = this;

			return new Promise(function(resolve, reject) {

				var name =  $('#dle-content .maincont .titrearticles h1').html();
				var uniq = new UniqMedia(
					_this.source,
					id,
					name
				);

				var subtitle = $($('#dle-content .maincont .corps img')[0]).parent().prev().prev().text();
				var picture  = $('#dle-content .maincont .corps img').attr('src');
				var synopsis = $('img[src="http://www.zone-telechargement.com/prez/style/v1/synopsis.png"]').parent().next().next().text();
				
				var details = new Details(
					uniq,
					subtitle,
					picture,
					synopsis
				);
				
				resolve(details);
			});
		}
		
	});

});