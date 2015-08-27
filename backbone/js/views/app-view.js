var app = app || {};
(function(){
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.todoapp',
		statsTemplate: _.template( $('#stats-template').html() ),
		events: {
			'keypress .new-todo': 'createOnEnter',

		},
		initialize: function(){
			this.listenTo(app.todos, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.listenTo(app.todos, 'all', _.debounce(this.render, 0));
			app.todos.fetch({reset: true});
		},
		render: function(){
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if (app.todos.length) {
				$('.main').show();
				$('.footer').show();

				$('.footer').html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				$('.filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				$('.main').hide();
				$('.footer').hide();
			}

			$('.toggle-all')[0].checked = !remaining;
		},
		newAttributes: function(){
			return {
				title: $('.new-todo').val().trim(),
				order: app.todos.nextOrder(),
				completed: false
			};
		},
		createOnEnter: function(e){

			if (e.which === ENTER_KEY && $('.new-todo').val().trim()) {
				app.todos.create(this.newAttributes());
				$('.new-todo').val('');
			}
		},
		addOne: function(todo){
			var view = new app.TodoView({ model: todo });
			$('.todo-list').append(view.render().el)
		},
		addAll: function(){
			app.todos.each(this.addOne,this)
		}
	});
})();