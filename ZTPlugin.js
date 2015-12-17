GollumJS.NS(function() {

	this.ZTPlugin = new GollumJS.Class({
		
		Extends: Server.Plugin,

		enable: function (done) {
			console.log ('ZTPlugin enable');
			done();
		},

		disable: function (done) {
			console.log ('ZTPlugin disable');
			done();
		}

	});

});