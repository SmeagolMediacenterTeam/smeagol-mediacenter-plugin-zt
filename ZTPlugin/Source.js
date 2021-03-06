GollumJS.NS(ZTPlugin, function() {

	var Promise = GollumJS.Promise;

	this.Source = new GollumJS.Class({

		Extends: Server.Source,

		getGroups: function (name) {
			return Promise.resolve([
				'serie'
			]);
		},

		getMedias: function (group) {
			switch (group) { 
				case 'serie':
					return this.plugin.caller.serie.list();
				default:
					break;
			}
			return this.parent().getMedias(group);
		},

		getDetails: function (group, id) {
			switch (group) { 
				case 'serie':
					return this.plugin.caller.serieDetails.find(id);
				default:
					break;
			}
			return this.parent().getDetails(group, id);
		}
		
	});

});