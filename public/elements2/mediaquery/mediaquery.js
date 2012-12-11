
(function(){
	
	var delayedEvents = [],
		fireMatches = function(element, mql, attr, skipFire){
			var state = (mql.matches) ? ['active', 'set', 'add'] : ['inactive', 'remove', 'remove'],
				eventType = 'mediaquery' + state[0],
				eventData = { 'query': mql };
			element[state[1] + 'Attribute']('matches', null);			
			if (!skipFire) xtag.fireEvent(element, eventType, eventData);
			(attr || (element.getAttribute('for') || '').split(' ')).forEach(function(id){
				var node = document.getElementById(id);
				if (node) {
					xtag[state[2] + 'Class'](node, element.id);
					if (!skipFire) xtag.fireEvent(node, eventType, eventData, { bubbles: false });
				}
			});
		},
		attachQuery = function(element, query, attr, skipFire){
			if (!xtag.domready){
				skipFire = true;
				delayedEvents.push(element);
			}
			query = query || element.getAttribute('media');
			if (query){
				if (element.xtag.query) element.xtag.query.removeListener(element.xtag.listener);
				query = element.xtag.query = window.matchMedia(query);
				var listener = element.xtag.listener = function(mql){
					fireMatches(element, mql);
				};
				fireMatches(element, query, attr, skipFire);
				query.addListener(listener);
			}
		},
		delayedListener = function(){
			delayedEvents = delayedEvents.map(function(element){
				return attachQuery(element);
			});
			document.removeEventListener(delayedListener);
		};
		
	document.addEventListener('__DOMComponentsLoaded__', delayedListener);
	
	xtag.register('x-mediaquery', {
		onCreate: function(){
			attachQuery(this);
		},
		getters: {
			'for': function(){
				return this.getAttribute('for');
			},
			'media': function(){
				return this.getAttribute('media');
			},
			'id': function(){
				return this.getAttribute('id');
			},
		},
		setters: {
			'media:attribute(media)': function(query){
				attachQuery(this, query);
			},
			'id:attribute(id)': function(id){
				var current = this.getAttribute('id');
				xtag.query(document, '.' + current).forEach(function(node){
					xtag.removeClass(node, current);
					xtag.addClass(node, id);
				});
			},
			'for:attribute(for)': function(value){
				var next = (value || '').split(' ');
				(this.getAttribute('for') || '').split(' ').map(function(id){
					var index = next.indexOf(id);
					if (index == -1){
						var element = document.getElementById(id);
						if (element){
							xtag.removeClass(element, this.id);
							xtag.fireEvent(element, 'mediaqueryremoved');
						}
					}
					else next.splice(index, 1);
				}, this);
				attachQuery(this, null, next);
			}
		}
	});
	
})();