
(function(){
	
	
	var onCommand = function(element){
		xtag.fireEvent(element, 'command', { command: element.getAttribute('command') });
	}

	xtag.addEvents(document, {
		'click:touch:delegate(x-action)': function(){
			onCommand(this);
		},
		'keyup:keypass(13):delegate(x-action)': function(){
			onCommand(this);
		}
	});

	xtag.register('x-actionbar', {
		setters:{
			'group:attribute(group)': function(group) {},
			'mode:attribute(mode)': function(mode) {}
		},
		getters: {
			'group': function(){
				return this.getAttribute('group');
			},
			'mode': function(){
				return this.getAttribute('mode');
			}
		}
	});

	xtag.register('x-action', {
		content: '<img />',
		onCreate: function(){
			this.setAttribute('tabindex', 0);
			this.label = this.getAttribute('label');
			this.icon = this.getAttribute('icon');
		},
		getters: {
			'icon': function(){
				return this.getAttribute('icon');
			},
			'label': function(){
				return this.getAttribute('label');
			},
			'group': function(){
				return this.getAttribute('group');
			},
		},
		setters: {
			'icon:attribute(icon)': function(url){
				this.firstElementChild.src = url;
			}, 
			'group:attribute(group)': function(group){},
			'lable:attribute(label)': function(label){}
		}
	});
	
})();