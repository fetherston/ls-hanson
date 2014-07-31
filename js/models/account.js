define([
	'underscore',
	'backbone',
	'libs/util/util'
], function(_, Backbone, Utils) {
	var accountModel = Backbone.Model.extend({
		urlRoot: 'http://new.livestream.com/api/accounts/85/events',
		defaults: {},
		initialize: function() {},
		// override the sync method to support jsonp
		sync: function(method, model, options) {
			options.timeout = 10000;  
			options.dataType = 'jsonp';  
			return Backbone.sync(method, model, options);
		}
	});
	return new accountModel();
});