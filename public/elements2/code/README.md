x-code
======

Creates a highlighted code snippet using `highlight.js`.

__Usage__

```html
<x-code data-lang="javascript">function() {
    console.log('hi');
}
var foo=1, bar="baz";
</x-code>
```

Dynamically create an x-code tag:

```javascript
var code = document.createElement('x-code');
code.text = 'var foo = "bar";';
document.body.appendChild(code);
```

Be sure to include `code.css` somewhere in your stylesheets.

See [Highlight.js docs](http://softwaremaniacs.org/soft/highlight/en/description/) for more info.
