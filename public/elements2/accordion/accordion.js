
(function(){
	
	var hlevels = 'h1, h2, h3, h4, h5, h6',
		select = function(heading){
			xtag.query(heading.parentNode, hlevels).forEach(function(el, idx){
				if (el == heading) this.selectedIndex = idx;
			}, this);
		};

	xtag.register('x-accordion', {
		onCreate: function(){
			var idx = Number(this.getAttribute('selected-index'));
			if (idx){
				this.setSelectedIndex(idx);
			}
			else {
				var selected = xtag.queryChildren(this, '[selected]')[0];
				if (selected) select(selected);
			}
		},
		events: {
			'click:touch:delegate(h1, h2, h3, h4, h5, h6)': function(event, accordion){
				if (this.parentNode == accordion) select.call(event.customElement, this);
			},
			'keydown:delegate(h1, h2, h3, h4, h5, h6)': function(event, accordion){
				if (this.parentNode == accordion) switch(event.keyCode) {
					case 13: select.call(event.customElement, this); break;
					case 37: accordion.selectPrevious(); break;
					case 39: accordion.selectNext(); break;
				}
			}
		},
		setters:{
			'selectedIndex:attribute(selected-index)': function(value){
				xtag.query(this, hlevels).forEach(function(el, idx){
					if (value == idx) {
						el.setAttribute('selected', null);
						xtag.fireEvent(el, 'selected');
					}
					else el.removeAttribute('selected');
				}, this);
			}
		},
		getters: {
			selectedIndex: function(){
				return Number(this.getAttribute('selected-index')) || xtag.queryChildren(this, hlevels).indexOf(xtag.queryChildren(this, '[selected]')[0]);
			}
		},
		methods: {			
			getSelected: function(){
				return xtag.queryChildren(this, '[selected]')[0];
			},
			setSelected: select,
			selectNext: function(){
				var headings = xtag.query(this, hlevels);
				if (headings[0]) select.call(this, headings[this.selectedIndex + 1] || headings[0]);
			},
			selectPrevious: function(){
				var headings = xtag.query(this, hlevels);
				if (headings[0]) select.call(this, headings[this.selectedIndex - 1] || headings.pop());
			}
		}
	});
	
})();
