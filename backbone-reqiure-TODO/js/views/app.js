define([
	'jquery',
	'underscore',
	'backbone',
	'collections/todos',
	'views/todos',
	'text!templates/stats.html',
	'common'
], function ($, _, Backbone, Todos, TodoView, statsTemplate, Common){
	'use strict';
	el: '#todoapp',
	template:_.template(statsTemplate),
	events:{

	},
	initialize: function(){

	},
	render: function(){
		
	}
});