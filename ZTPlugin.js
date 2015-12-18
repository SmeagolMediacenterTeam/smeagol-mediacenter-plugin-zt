GollumJS.NS(function() {

	this.ZTPlugin = new GollumJS.Class({
		
		Extends: Server.Plugin,

		source: null,
		caller: {},

		enable: function (done) {
			console.log ('ZTPlugin enable');

			this.source = new ZTPlugin.Source(this);
			this.server().mediasManager.registerSource(this.source);
			
			this.caller = {
				serie       : new ZTPlugin.ZTCaller.Serie(this.source),
				serieDetails: new ZTPlugin.ZTCaller.SerieDetails(this.source)
			};

			ZTPlugin.ZTCaller.init().then(done);

		},

		disable: function (done) {
			this.server().mediasManager.unregisterSource(this.source);
			console.log ('ZTPlugin disable');
			done();
		}

	});

});