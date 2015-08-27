var app = app || {};
(function(){
	'use strict';

	app.TodoView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#item-template').html()),
		events: {
			'click .toggle': 'toggleCompleted',
			'click .destroy': 'clear',
			'dblclick label': 'edit',
			'blur .edit': 'close',
			'keypress .edit': 'updateOnEnter',
			'keydown .edit': 'revertOnEscape'
		},
		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},
		render: function(){
			if (this.model.changed.id !== undefined){
				return;
			}
			this.$el.html(this.template( this.model.toJSON() ));
			this.$el.toggleClass('completed',this.model.get('completed'));
			this.toggleVisible();
			return this;
		},
		toggleCompleted: function(){
			this.model.toggle();
		},
		clear: function(){
			this.model.destroy();
		},
		edit: function(e){
			this.$el.addClass('editing');
			$('.edit').focus();
		},
		close: function(e){
			var target = e.target;
			var value =  $(target).val();
			var trimmedValue = value.trim();

			if(!this.$el.hasClass('editing')){
				return;
			}

			if(trimmedValue){
				this.model.save({ title: trimmedValue});

				if(value !== trimmedValue){
					this.model.trigger('change');
				}
			}else{
				this.clear();
			}

			this.$el.removeClass('editing');
		},
		updateOnEnter: function(e){
			if (e.which === ENTER_KEY) {
				this.close();
			}
		},
		revertOnEscape: function (e) {
			if (e.which === ESC_KEY) {
				this.$el.removeClass('editing');
				// Also reset the hidden input back to the original value.
				$('.edit').val(this.model.get('title'));
			}
		},
		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {
			return this.model.get('completed') ?
				app.TodoFilter === 'active' :
				app.TodoFilter === 'completed';
		}

	});
})();