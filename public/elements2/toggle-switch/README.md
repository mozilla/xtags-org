
## Syntax

```
<x-toggle-switch input-name="turbo"></x-toggle-switch>
```

## Live Example

<x-toggle-switch input-name="turbo"></x-toggle-switch>


## Events

```
	var switch = document.getElementsByNames('x-toggle-switch')[0];
	switch.addEventListener('on', function(e){
		
	});

```

## Usage

```

	
	var switch = document.createElement('x-toggle-switch');
	switch.inputName = "notifications";
	switch.onText = 'yes';
	switch.offText = 'no';
	switch.setOff();
	document.body.appendChild(switch);
	


```


