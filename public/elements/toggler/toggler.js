(function(){

	var attr = 'data-toggled';
	var toggleState = 'data-toggle-state';
	var initTargetState = 'data-initial-target-state';

	var getTargets = function(){
		var targetset = this.getAttribute('data-targetset');
		if (targetset) {
			var targets = [];
			targetset.split(' ').forEach(function(item, i){
				var element = document.getElementById(item);
				if (element) targets.push(element);
			});
		}
		return targets || [this.nextElementSibling];
	}

	var toggle = function(){
		getTargets.call(this).forEach(function(item){
			item[(item.attributes[attr] ? 'remove' : 'set') + 'Attribute'](attr, null);
		});
	}
	
	var flipState = function(){
		this.setAttribute(toggleState, this.attributes[toggleState] && this.getAttribute(toggleState) == 'open' ? 'close' : 'open');
	};

	xtag.addEvent(document, 'click:delegate(x-toggler)', function(e){
		toggle.call(this);
		flipState.call(this);
	});
	
	xtag.register('x-toggler', {
		onCreate: function(){
			this.setAttribute('tabindex', 0);
		},
		onInsert: function(){
			var force = this.attributes[initTargetState] ? this.getAttribute(initTargetState) : false;
			if (force){
				var targets = getTargets.call(this);
				targets.forEach(function(item){
					if (force == 'open'){
						item.removeAttribute(attr);
					} else if (force == 'close') { 
						item.setAttribute(attr, null);
					}
				});
			}
		},
		setters: {
			
		},
		getters: {
			'state': function(){
				return this.getAttribute(targetState);
			}
		},
		methods: {
			toggle: function(){
				toggle.call(this);
				flipState.call(this);
			}
		}
	});

})();