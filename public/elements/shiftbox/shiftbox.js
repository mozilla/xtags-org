
(function(){
		
	var shiftMap = {
			'north': ['top'],
			'south': ['bottom'],
			'east': ['right'],
			'west': ['left'],
			'north-west': ['top', 'left'],
			'north-east': ['top', 'right'],
			'south-west': ['bottom', 'left'],
			'south-east': ['bottom', 'right']
		},
		setStyles = function(shiftbox, direction, value){
			var shift = xtag.queryChildren(shiftbox, 'x-shift')[0];
			if (typeof value == 'number') value = value + 'px';
			if (shift) (shiftMap[direction] || ['left']).forEach(function(side){
				shift.style[side] = value;
			});
		};
	
	xtag.register('x-shiftbox', {
		onCreate: function(){
			setStyles(this, this.direction, this.shift);
		},
		onInsert: function(){
			
		},		
		events:{
			'transitionend': function(e){
				if (e.target == xtag.queryChildren(this, 'x-shift')[0]){
					
				}
			}
		},
		getters: {
			'shift': function(){
				return this.getAttribute('data-shift') || '0px';
			},
			'direction': function(){
				var value = this.getAttribute('data-shift-direction');
				return shiftMap[value] ? value : 'west';
			}
		},
		setters: {
			'shift:attribute(data-shift)': function(shift){
				setStyles(this, this.direction, shift);
			},
			'direction:attribute(data-shift-direction)': function(direction){
				setStyles(this, direction, this.shift);
			}
		},
		methods: {
			
		}
	});
	
	xtag.register('x-shift', {
		onInsert: function(){
			var parent = this.parentNode;
			if (parent && parent.tagName == 'X-SHIFTBOX') setStyles(parent, parent.direction, parent.shift);
		}
	});
	
})();