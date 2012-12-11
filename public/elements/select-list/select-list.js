(function(window, document, undefined) {
	var multiSelectAttr = 'data-multi-select';
	var okTextAttr = 'data-ok-text';
	var locationAttr = 'data-location';

	var styleActiveAttr = 'data-active';
	var styleSelectedAttr = 'selected';

	/**
	 * Hides all visible select lists on the page.
	 */
	function hideVisibleSelectLists() {
		xtag.query(document, 'x-select-list').forEach(function(selectList) {
			if (selectList.getAttribute(styleActiveAttr)) {
				selectList.hide();
			}
		});
	}

	window.addEventListener('click', function(event) {
		// only hide when a normal left click occurs
		if (event.button === 0) {
			hideVisibleSelectLists();
		}
	});

	var singleTouch = false;
	window.addEventListener('touchstart', function(event) {
		if (event.touches.length === 1) {
			singleTouch = true;
		} else {
			singleTouch = false;
		}
	});

	window.addEventListener('touchend', function(event) {
		// only hide when a single touch occurs
		if (singleTouch) {
			hideVisibleSelectLists();
		}
	});

	window.addEventListener('keyup', function(event) {
		// hide when escape key is pressed
		if (event.keyCode === 27) {
			hideVisibleSelectLists();
		}
	});

	xtag.register('x-select-list', {
		onInsert: function() {
			var self = this;
			var okSelector = '.x-select-ok';

			if (this.multiSelect && xtag.query(self, okSelector).length === 0) {
				var button = document.createElement('a');
				button.className = okSelector.substring(1);
				button.innerHTML = this.okText;
				button.href = '#hide';
				self.appendChild(button);

				button.addEventListener('click', function(event) {
					event.preventDefault();
					self.hide();
				});
			}

			self.show();
		},

		events: {
			'click:touch': function(event) {
				event.stopPropagation();
			},

			'click:delegate(li)': function(event, selectList) {
				if (selectList.multiSelect) {
					// toggle selection
					if (this.getAttribute(styleSelectedAttr)) {
						xtag.fireEvent(this, 'deselect');
						this.removeAttribute(styleSelectedAttr);
					} else {
						xtag.fireEvent(this, 'select');
						this.setAttribute(styleSelectedAttr, 'true');
					}
				} else {
					xtag.fireEvent(this, 'select');
					selectList.hide(this);
				}
			}
		},

		setters: {
			multiSelect: function(multiSelect) {
				if (this.multiSelect) {
					this.setAttribute(multiSelectAttr, multiSelect);
				} else {
					this.removeAttribute(multiSelectAttr);
				}
			},

			okText: function(okText) {
				this.setAttribute(okTextAttr, okText);
			},

			location: function(location) {
				this.setAttribute(locationAttr, location);
			}
		},

		getters: {
			multiSelect: function() {
				return !!this.getAttribute(multiSelectAttr);
			},

			okText: function() {
				return this.getAttribute(okTextAttr) || 'OK';
			},

			location: function() {
				var location = this.getAttribute(locationAttr);

				// default location is center
				if (location !== 'top' && location !== 'bottom') {
					location = 'center';
				}

				return location;
			}
		},

		methods: {
			/**
			 * Shows this select list, triggering a show event.
			 */
			show: function() {
				var self = this;

				// only show if not already shown
				if (!self.getAttribute(styleActiveAttr)) {
					self.setAttribute(styleActiveAttr, 'true');
					xtag.fireEvent(self, 'show');
				}
			},

			/**
			 * Hides this select list, triggering a hide event.
			 */
			hide: function(selectedItem) {
				var self = this;

				// only hide if not already hidden
				if (self.getAttribute(styleActiveAttr)) {
					self.removeAttribute(styleActiveAttr);
					if (self.multiSelect) {
						xtag.fireEvent(self, 'hide', { selectedItems: self.getSelected() });
					} else {
						xtag.fireEvent(self, 'hide', { selectedItem: selectedItem });
					}
				}
			},

			/**
			 * Returns the selected item(s) in this list assuming it is multi-select.
			 */
			getSelected: function() {
				return xtag.query(this, 'li[' + styleSelectedAttr + ']');
			}
		}
	});
})(this, this.document);
