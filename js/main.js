require.config({
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone-amd',
		handlebars: 'libs/handlebars/handlebars',
		text: 'libs/require/text',
		templates: '../templates'
	},
	shim: {
		'handlebars': {
			exports: 'Handlebars'
		}
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

require([
	'views/app',
	'vm'
], function(AppView, Vm) {
	/*
	 * In a production example this Event ID would be
	 * optained in a neater way such as a URL or a controller method
	*/ 
	var appOptions = {
		eventId: 2160156 // Hanson
	};
	var appView = Vm.create({}, 'AppView', AppView, appOptions);
});
