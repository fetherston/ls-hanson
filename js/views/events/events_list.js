define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'collections/events',
	'text!templates/events/event_list.html',
	'views/events/event'
], function($, _, Backbone, Vm, EventsCollection, Template, EventView){
	var eventListView = Backbone.View.extend({
		el: '.events-container',
		collection: new EventsCollection(),
		initialize: function () {
			// returns back to start when out of new posts
			this.collection._neverEnding = true;
			this.render();
			// each time a model is added to collection, create a new event view
			this.listenTo(this.collection, 'add', this.addEvent);
			// listen to collection end event to update the view accordingly
			this.listenTo(this.collection, 'collectionEnd', this.onCollectionEnd);
			// infinite scroll handler
			$(window).on('scroll', _.bind(this.windowScrollHandler, this));
			this.collection.fetch({
				success: _.bind(function() {
					this.trigger('viewReady');
				}, this),
				error: function(response) {
					alert('Could not retrieve the events feed at this time. Error: ' + response.responseText);
				}
			});			
		},
		render: function () {
			this.$el.html(Template);
			this.$('.loader').show();
		},
		addEvent: function(eventModel) {
			/* Adds a new event view to the list
			 * @param eventModel: Backbone event model
			 */
			var view = EventView;
			var listItem = Vm.create(this, 'EventView_' + eventModel.get('data').id, view, {model: eventModel});
			this.$('.event-list').append(listItem.$el);
		},
		onCollectionEnd: function() {
			/* Updates the UI when user has reached end of the event list
			 * Unbinds the scroll handler and hides the ajax loader
			 */
			this.$('.loader').hide();
			$(window).unbind('scroll');
		},
		getNextEvents: function () {
			// fetches the next pagination set
			this.$('.loader').addClass('loading');
			this.collection.getNext(function() {
				this.$('.loader').removeClass('loading');
			});
		},
		windowScrollHandler: function() {
			var that = this;
			clearTimeout(this._timeout);
			this._timeout = setTimeout(function() {
				if (($(document).height() - $(window).height() - $(document).scrollTop()) < 70) {
					that.getNextEvents();
				}
			}, 200);
		}
	});
	return eventListView;
});
