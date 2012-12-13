
xtag.register('x-tabbox', {
	events: {
		'click:touch:delegate(x-tab)': function(event){
			this.selectTab();
		},
		'keydown:delegate(x-tab)': function(event){
			switch(event.keyCode) {
				case 13: this.selectTab(); break;
				case 37: this.parentNode.previousTab(); break;
				case 39: this.parentNode.nextTab(); break;
			}
		}
	}
});

xtag.register('x-tabs', {
	methods: {
		getSelectedIndex: function(){
			var tabs = xtag.query(this, 'x-tab');
			return tabs.indexOf(this.getSelectedTab());
		},
		getSelectedTab: function(){
			return xtag.query(this, 'x-tab[selected]')[0];
		},
		nextTab: function(){
			var tab = this.getSelectedTab();
			if (tab) (tab.nextElementSibling || this.firstElementChild).selectTab();
		},
		previousTab: function(){
			var tab = this.getSelectedTab();
			if (tab) (tab.previousElementSibling || this.lastElementChild).selectTab();
		}
	}
});


xtag.register('x-tab', {
	onCreate: function(){
		this.setAttribute('tabindex', 0);
	},
	methods: {
		selectTab: function(){
			this.focus();
			var tabs = xtag.query(this.parentNode, 'x-tab'),
				index = tabs.indexOf(this);
			tabs.forEach(function(el){
				el == this ? el.setAttribute('selected', null) : el.removeAttribute('selected');
			}, this);
			xtag.query(this.parentNode.parentNode, 'x-tabpanels > *').forEach(function(el, i, array){
				el == array[index] ? el.setAttribute('selected', null) : el.removeAttribute('selected');
			});
		}
	}
});
