GollumJS.NS(function() {

	this.ZTPlugin = new GollumJS.Class({
		
		Extends: Server.Plugin,

		initialize: function (container) {
			this.parent(container);
			console.debug ('Create instance '+container.getMetaInfos.id);
		},

		initialize: function (metaInfos) {
			this.metaInfos = metaInfos;
		},

		beforeEnableProcess: function () {
			console.debug ('ZTPlugin beforeEnableProcess');
		},

		enable: function () {
			console.debug ('ZTPlugin enable');
		},

		afterEnableProcess: function () {
			console.debug ('ZTPlugin afterEnableProcess');
		},

		beforeDisableProcess: function () {
			console.debug ('ZTPlugin beforeDisableProcess');
		},

		disable: function () {
			console.debug ('ZTPlugin disable');
		},

		afterDisableProcess: function () {
			console.debug ('ZTPlugin afterDisableProcess');
		}

	});

});