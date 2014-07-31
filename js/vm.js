/*
View Manager - for a larger application this would be built out further
so that views don't cause memory leaks
*/

define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var views = {};
	var create = function (context, name, View, options) {
		// View clean up isn't actually implemented yet but will simply call .clean, .remove and .unbind
		if(typeof views[name] !== 'undefined') {
			views[name].undelegateEvents();
			if(typeof views[name].clean === 'function') {
				views[name].clean();
			}
		}
		var view = new View(options);
		views[name] = view;
		if(typeof context.children === 'undefined'){
			context.children = {};
			context.children[name] = view;
		} else {
			context.children[name] = view;
		}
		return view;
	};
	return {
		create: create
	};
});
