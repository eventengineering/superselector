![Super Selector](http://eventengineering.github.io/superselector/images/title.jpg?i=1)

A JQuery UI enhancement of the standard HTML Select element

![Example Super Selector](http://eventengineering.github.io/superselector/images/example.jpg?)

Full documentation & demos can be found at: [http://eventengineering.github.io/superselector](http://eventengineering.github.io/superselector)


Features
================================
Super selector comes with a wide range of aditional feautres above the standard select element:
- Theming of list elements with CSS
- Grouping of list elements
- Headings for lists
- Disabling elements
- Works with jquery's standard .val() getter/setter and all the usual callbacks.
- Callbacks on select/click
- Easily change list elements

Setup
================================
Setting up superselector could not be simpler.

Include the css and the library
```html
<link rel="stylesheet" href="superselector.min.css">
<script type="text/javascript" src="superselector.js"></script>
```

Create an input element to be the SuperSelctor.
```html
<div id="example-selector"></div>
```

Turn the element into a superselector with some simple javascript
```js
$("#example-selector").superselector({
items:[ //array of items for the SuperSelector
{value:"first", title:"First Item"},
{value:"second", title:"Second Item"},
]
});
```