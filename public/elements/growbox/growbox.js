
(function(){
	
	var flowEvent = function(){
			var growbox = this.parentNode.parentNode;
			if (growbox.tagName == 'X-GROWBOX') growbox.matchDimensions();
		},
		createFlowElements = function(wrap){
			['overflow', 'underflow'].forEach(function(type){
				if (!wrap.xtag[type + 'Element']) {
					var element = document.createElement('div');
						element.className = 'x-grow-' + type;
						element.innerHTML = '<div></div>';
						xtag.addEvent(element, type, flowEvent);
					wrap.xtag[type + 'Element'] = element;
					wrap.appendChild(element);
				}
			});
		};
	
 	xtag.register('x-growbox', {
		methods: {
			matchDimensions: function(){
				var wrap = this.firstElementChild;
				if (wrap.tagName == 'X-GROW-WRAP') createFlowElements(wrap);
				else return false;
				this.style.height = wrap.scrollHeight + 'px';
				wrap.xtag.overflowElement.firstChild.style.height = wrap.scrollHeight - 1 + 'px';
				wrap.xtag.underflowElement.firstChild.style.height = wrap.scrollHeight + 1 + 'px';
			}
		},
		events:{
			'resize': function(e){
				console.log(e);
			},
			'overflow': function(){
				this.matchDimensions();
			},
			'underflow': function(){
				this.matchDimensions();
			}
		}
	});
	
	xtag.register('x-grow-wrap', {
		onUpgrade: function(){
			console.log('upgrade');
			createFlowElements(this);
			if (this.parentNode.tagName == 'X-GROWBOX') this.parentNode.matchDimensions();
		}
	});
	
})();