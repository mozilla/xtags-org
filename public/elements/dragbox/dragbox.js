
(function(){
	
	var originElement = null, dropElement = null;

	xtag.register('x-dragbox', {
		onCreate: function(){
			var self = this;
			xtag.toArray(this.children).forEach(function(item){
				item.setAttribute('draggable', true);
			});
			xtag.observe(this, function(element){
				if (element.parentNode == self) element.setAttribute('draggable', true);
			});
		},
		getters: {
		
		},
		setters: {
		
		},
		accessors: {
			'for': {
				get: function(){
					
				},
				set: function(){
					
				}
			}
		},
		events: {
			dragstart: function(event){
				if (event.target.parentNode == this){
					originElement = event.target;
					xtag.addClass(event.target, 'x-dragbox-drag-origin');
					event.dataTransfer.effectAllowed = 'move';
					event.dataTransfer.setData('text/html', this.innerHTML);
					this.droppables
				}
			},
			dragenter: function(event){
				var parent = event.target.parentNode;
				if (event.target.id = parent && parent.tagName.match(/x-dragbox/i)){
					console.log(event);
					dropElement = event.target;
					xtag.addClass(event.target, 'x-dragbox-drag-over');
				}
			},
			dragover: function(event){
				if (event.preventDefault) event.preventDefault();
				event.dataTransfer.dropEffect = 'move'; 
				return false;
			},
			dragleave: function(event){
				if (dropElement != event.relatedTarget) dropElement = null;
				xtag.removeClass(event.target, 'x-dragbox-drag-over');
			},
			dragdrop: function(event){
				if (event.stopPropagation) event.stopPropagation();
				console.log(dragElement, dropElement);
				if (dropElement && dragElement != this) {
					dropElement.parentNode.insertBefore(dragElement, dropElement);
				}
				xtag.removeClass(event.target, 'x-dragbox-drag-over');
				return false;
			},
			dragend: function(event){
				xtag.removeClass(event.target, 'x-dragbox-drag-origin');
			}
		}
	});

})();