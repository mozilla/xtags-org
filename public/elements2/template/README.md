
## Syntax

 To use templates you must create another x-tag element that uses the ```template``` mixin.   Once your custom element includes the mixin, you can set template by using the setter.  eg ```elem.template = 'comment-block';``` 

 The following code block defines a comment template and creates a click handler for the Flag button.  There are also template setters that allow individual property updates.

```
	<x-template name="comment-block">
		<script type="template/script">
			this.addTemplateListeners({
				'click:delegate(.flag)':function(e){
					//flag the comment
				} 
			});

			this.addTemplateSetters({
				'date': function(value){
					this.querySelector('div span:last-child')
						.textContent = value.toISODateString();
				},
				'comment': function(value){
					this.querySelector('div:last-child')
						.textContent = value;
				}
				'first_name': function(value){
					this.querySelector('div span:first-child')
						.textContent = value;
				}
			});

		</script>
		<script type="template/content">
			<div>
				<span>{first_name}</span>
				<span>{date}</span>
			</div>
			<div>{comment}</div>
			<button class="flag">Flag</button>
		</script>
	</x-template>

	<div id="comments"></div>
```

Create a custom element using the template mixin.


```
	<script type="text/javascript">

		xtag.registry('x-comment', {
			mixin: ['template'], 
			onCreate: function(){
				// in this example we're keeping the 'truth' local to the object. aka model
				this.xtag.entityData = {
					"user": {
						"first_name":"Joe", 
						"last_name":"Burns"
					}, 
					"date": new Date(1283842093),
					"comment": "Hi"
				};
				// Assign template data for initial render
				this.templateData = {
					"first_name": this.xtag.entityData.first_name,
					"date": this.xtag.entityData.date,
					"comment": this.xtag.entityData.commet
				}
			},
			setter:{
				"user": function(user){
					this.xtag.entityData.user = user;
					this.first_name = user.first_name;
				}, 
				"comment": function(value){
					this.xtag.entityData.comment = value
				}
				"date": function(value){
					this.xtag.entityData.date = value;
				}
			}
		});

	</script>

```

## Usage

```

	var commentData = [
		{ 
			user: { first_name: 'Joe', last_name: 'Burns'}, 
			comment: 'Hey'
		},
		{ 
			user: { first_name: 'Bill', last_name: 'Burns'}, 
			comment: 'Hi' 
		},
		{ 
			user: { first_name: 'Bob', last_name: 'Burns'}, 
			comment: 'Aye!'
		}
	];

	var comments = document.getElementById('comments');

	foreach(var c in commentData){
		var comment = document.createElement('x-comment');

		// Set template to use
		comment.template = 'comment-block';

		// Set template data
		commment.templateData = c;

		comments.appendChild(comment);
	}

	comment1 = comments.Children[0];

	// Set to a different user
	// This runs the x-comment 'user' setter first 
	// then the template setter 'first_name'
	comment1.user = {first_name:'Johnny', 'last_name': 'Burns'};

	// OR
	// Set the first_name in the template only.
	comment1.first_name = 'Johnny';



```


