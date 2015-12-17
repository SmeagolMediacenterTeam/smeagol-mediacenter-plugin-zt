GollumJS.NS(function() {

	this.ZTPlugin = new GollumJS.Class({
		
		Extends: Server.Plugin,

		source: null,

		enable: function (done) {
			console.log ('ZTPlugin enable');

			this.source = new ZTPlugin.Source(this);
			this.server().mediasManager.registerSource(this.source);
			done();
		},

		disable: function (done) {
			this.server().mediasManager.unregisterSource(this.source);
			console.log ('ZTPlugin disable');
			done();
		}

	});

});