define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'text!templates/events/event.html',
	'models/event',
	'models/account',
	'handlebars',
	'libs/util/util',
	'libs/jquery-timeago/jquery.timeago'
], function($, _, Backbone, Vm, Template, EventModel, AccountModel, Handlebars){
	var eventView = Backbone.View.extend({
		model: EventModel,
		tagName: 'li',
		className: 'event',
		initialize: function () {
			this.render();
		},
		render: function () {
			// add the owner account model into template context
			var context = this.model.toJSON();
			context.account = AccountModel.toJSON();
			var template = Handlebars.compile(Template);
			
			this.$el.html(template(context));
			// formats times to 6 days ago, 2 seconds ago etc...
			this.$('time.timeago').timeago();			
		}
	});
	return eventView;
});