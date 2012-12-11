(function(window, document, undefined) {
	var styleActiveAttr = 'data-active';

	/**
	 * Toggles the given dropdown menu.
	 */
	function toggleDropdownMenu(dropdownMenu) {
		if (dropdownMenu.getAttribute(styleActiveAttr)) {
			dropdownMenu.hide();
		} else {
			dropdownMenu.show();
		}
	}

	/**
	 * Hide all visible dropdown menus on the page except for the given one
	 * to exclude, if provided.
	 *
	 * @param excludeMenu - the dropdown menu element to exclude
	 */
	function hideVisibleDropdownMenus(excludeMenu) {
		xtag.query(document, 'x-dropdown-menu').forEach(function(dropdownMenu) {
			if (dropdownMenu === excludeMenu) {
				return;
			}

			if (dropdownMenu.getAttribute(styleActiveAttr)) {
				dropdownMenu.hide(null);
			}
		});
	}

	window.addEventListener('click', function(event) {
		// only hide when a normal left click occurs
		if (event.button === 0) {
			hideVisibleDropdownMenus();
		}
	});

	window.addEventListener('keyup', function(event) {
		// hide when escape key is pressed
		if (event.keyCode === 27) {
			hideVisibleDropdownMenus();
		}
	});

	xtag.register('x-dropdown-menu', {
		events: {
			click: function(event) {
				hideVisibleDropdownMenus(this);
				event.stopPropagation();
				this.isLabelClicked = false;
			},

			'click:delegate(label)': function(event, dropdownMenu) {
				dropdownMenu.isLabelClicked = true;
				event.preventDefault();

				// if the primary label was clicked, toggle the visibility of the
				// dropdown menu
				if (this.parentNode === dropdownMenu) {
					toggleDropdownMenu(dropdownMenu);
				}
			},

			'click:delegate(li)': function(event, dropdownMenu) {
				if (dropdownMenu.isLabelClicked) {
					return;
				}

				var li = this;
				if (event.target.tagName.toLowerCase() === 'li') {
					// get the most nested li that was clicked
					li = event.target;
				}

				// if there's a label in the targeted list item, this is a sub menu;
				// the user still has not selected an item
				if (xtag.query(li, 'label').length !== 0) {
					return;
				}

				event.preventDefault();
				xtag.fireEvent(li, 'select');
				dropdownMenu.hide(li);
			}
		},

		methods: {
			/**
			 * Shows this dropdown menu, triggering a show event.
			 */
			show: function() {
				if (!this.getAttribute(styleActiveAttr)) {
					this.setAttribute(styleActiveAttr, 'true');
					xtag.fireEvent(this, 'show');
				}
			},

			/**
			 * Hides this dropdown menu, triggering a hide event.
			 */
			hide: function(selectedItem) {
				if (this.getAttribute(styleActiveAttr)) {
					this.removeAttribute(styleActiveAttr);
					xtag.fireEvent(this, 'hide', { selectedItem: selectedItem });
				}
			}
		}
	});
})(this, this.document);
