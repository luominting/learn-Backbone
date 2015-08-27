var app = app || {};

(function(){
	'use strict';

	var TodoRouter = Backbone.Router.extend({
		routers: {
			'*filter': 'setFilter'
		},
		setFilter: function(param){
			app.TodoFilter = param || '';
			app.todos.trigger('filter');
		}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();