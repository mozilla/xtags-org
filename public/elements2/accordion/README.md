
## Syntax

The accordion operates by using a pairing of html header tags ```h1-h6``` with an adjacent ```<section>``` tag.  The header tag acts as the toggler/click target.  To have a section open by default, set the ```selected``` attribute on the header or set the ```selected-index``` attribute on the accordion.

```
<x-accordion>
	<h2>Section 1</h2>
	<section>
		Hello testing section 1
	</section>
	<h2 selected>Section 2</h2>
	<section>
		Hello testing section 2
	</section>
</x-accordion>
```


### Live Example
<x-accordion>
	<h2>Section 1</h2>
	<section>
		Hello testing section 1
	</section>
	<h2 selected>Section 2</h2>
	<section>
		Hello testing section 2
	</section>
</x-accordion>

## Events
When the active section is changed x-accordion will fire a ```selected``` event.

```
	var accordion = document.getElementsByNames('x-accordion')[0];
	accordion.addEventListener('selected', function(e){
		// selected item changed
	});

```

## Usage

```
	var accordion = document.getElementsByNames('x-accordion')[0];
	
	// Switch to second section	
	accordion.selectedIndex = 1;
	// OR
	accordion.setAttribute('selected-index', 1);

	// Cycle to next section
	accordion.selectNext();
	accordion.selectPrevious();

	// Get the selected header
	var selectedHeader = accordion.getSelected();

	// Which index are we on?
	var idx = accordion.selectedIndex;

	// Adding a new section
	var header = document.createElement('h2');
	header.innerHTML = 'Next Section';
	var section = document.createElement('section');
	section.innerHTML = 'Some html rawrrr.';
	accordion.appendChild(header);
	accordion.appendChild(section);
	
	//select it
	accordion.setSelected(header);

```


