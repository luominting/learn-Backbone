define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/todo'
],function (_, backbone, Store, Todo){
	'use strict';

	var TodosCollection = Backbone.Collection.extend({
		model: Todo,
		localstorage: new Store('todos-backbone'),
		completed: function (){
			return this.where({completed: true});
		},
		remaining: function (){
			return this.where({completed: false});
		},
		nextOrder: function (){
			return this.length ? this.last().get('order') + 1 : 1; 
		},
		comparator: 'order'
	});
	return new TodosCollection();
});