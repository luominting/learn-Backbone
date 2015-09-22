define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/todos.html',
	'common'
],function ($, _, Backbone, todosTemplate, Common){
	'use strict';

	var TodoView = Backbone.View.extend({
		tagName: 'li',
		template: _.template(todosTemplate),
		events:{

		},
		initialize: function(){
			this.listenTo(this.model,'change',this.render);
			this.render;
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
		},
	});
	return TodoView;
});