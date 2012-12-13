
(function(){

/* 	xtag.register('x-growbox', {
		onCreate: function(){
			var first = document.createElement('div');
				second = document.createElement('div');
				
			while (this.firstChild) second.appendChild(this.removeChild(this.firstChild));
			
			xtag.addEvent(first, 'overflow', function(e){
				this.parentNode.adjustDimensions(e);
			});
			xtag.addEvent(second, 'underflow', function(e){
				this.parentNode.parentNode.adjustDimensions(e);
			});
			
			first.appendChild(second);
			this.appendChild(first, true);
			this.adjustDimensions({});
		},
		setters: {
			'innerHTML': function(html) {
				return this.firstChild.innerHTML = html;
			}, 
			'textContent': function(text) {
				return this.firstChild.textContent = text;
			},
			scrollHeight: function(){
				console.log('scrollHeight');
			}
		},
		getters:{
			'innerHTML': function() {
				return this.firstChild.innerHTML;
			}, 
			'textContent': function() {
				return this.firstChild.textContent;
			}
		},
		methods: {
			appendChild: function(child, top){
				top ? HTMLElement.prototype.appendChild.call(this, child) : this.firstChild.appendChild(child);
			},
			adjustDimensions: function(e){
				console.log(e, e.target);
				var first = this.firstChild,
					second = first.firstChild;
				second.style.height = second.scrollHeight + 1 + 'px';
				second.style.width = second.scrollWidth + 1 +  'px';
				first.style.height = first.scrollHeight - 1 + 'px';
				first.style.width = first.scrollWidth - 1 +  'px';
			}
		},
		events:{
			'overflow': function(e){
				this.adjustDimensions(e);
			},
			'underflow': function(e){
				this.adjustDimensions(e);
			},
			'transitionend': function(e){			
				second.style.height = 'auto';
				second.style.width = 'auto';
			}
		}
	}); */

})();