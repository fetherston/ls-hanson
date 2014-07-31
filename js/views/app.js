define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'models/account',
	'views/events/events_list',
	'text!templates/layout.html',
	'handlebars',
	'libs/util/util'
], function($, _, Backbone, Vm, AccountModel, EventListView, Template, Handlebars){
	var AppView = Backbone.View.extend({
		el: '.wrapper',
		model: AccountModel,
		initialize: function () {
			this.model.id = this.options.eventId;
			this.model.fetch({
				success: _.bind(this.render, this)
			});
		},
		render: function () {
			var template = Handlebars.compile(Template);
			this.$el.html(template(this.model.toJSON()));
			this.eventList = Vm.create(this, 'EventListView', EventListView); 

			this.listenToOnce(this.eventList, 'viewReady', function() {
				this.$('.content-cover').fadeOut('slow', function() {
					$(this).remove();
				});
			});
		}
	});
	return AppView;
});
