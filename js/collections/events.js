define([
	'jquery',
	'underscore',
	'backbone',
	'models/event'
], function($, _, Backbone, EventModel){
	var eventsCollection = Backbone.Collection.extend({
		model: EventModel,
		url: 'http://new.livestream.com/api/accounts/85/events/2160156/feed',
		// pagination options
		params: {
			newer: -1,
			older: 10,
			type: null,
			id: null
		},
		// override the sync method to support jsonp
		sync: function(method, model, options) {
			options.timeout = 10000;  
			options.dataType = 'jsonp';  
			return Backbone.sync(method, model, options);
		},
		// override parse method to set collection models from the data array
		parse: function(response) {
			// store the total event list length 
			//this._total = response.total;
			this._total = response.total;
			return response.data;
		},
		getNext: function(callback) {
			// fetch the next set of results into a temporary collection
			var tempCollection = this.clone().reset();
			// set ID and type params of the last item in collection as per LS API
			tempCollection.params.type = this.last().get('type');
			tempCollection.params.id = this.last().get('data').id;
			// create next pagination source URL
			tempCollection.url = this.url + '?' + $.param(tempCollection.params);

			if (this.length < this._total) {
				tempCollection.fetch({
					success: _.bind(function() {					
						// add the models or temp collection into the current collection
						tempCollection.each(function(model) { this.add(model); });
						// if there are as many models in the collection as 
						// the total from server, trigger collectionEnd event
						if (this.length >= this._total && !this._neverEnding) this.trigger('collectionEnd');
						if (typeof callback === 'function') callback.apply();
					}, this),
					error: function(response) {
						alert('Could not retrieve anymore events at this time. Error: ' + response.responseText);
					}
				});
			}
			else {
				var index = this.length - this._total;
				var models = this.slice(index,  index + 10);
				_.each(models, function(model) {
					tis.add(new this.model(model.toJSON()));
				}, this);
			}
		}

	});

	return eventsCollection;
});
