GollumJS.Utils.global().ZTPlugin = new GollumJS.Class({
	
	Extends: Server.Plugin,

	initialize: function (metaInfos) {
		console.debug ('Create instance '+metaInfos.id);
	},

	beforeLoad: function () {
		console.debug ('ZTPlugin beforeLoad');
	},

	load: function () {
		console.debug ('ZTPlugin load');
	},

	afterLoad: function () {
		console.debug ('ZTPlugin afterLoad');
	},

	beforeUnload: function () {
		console.debug ('ZTPlugin beforeUnload');
	},

	unLoad: function () {
		console.debug ('ZTPlugin unLoad');
	},

	afterUnload: function () {
		console.debug ('ZTPlugin afterUnload');
	}

});