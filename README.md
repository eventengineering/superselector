
SuperSelector
================================

A JQuery UI enhancement of the standard HTML Select element

![Example Super Selector](/examples/example.jpg?raw=true")

Super selector comes with a wide range of aditional feautres above the standard select element:
- Theming of list elements with CSS
- Grouping of list elements
- Headings for lists
- Disabling elements
- Works with jquery's standard .val() getter/setter
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

###Live Demo

A live demo of SuperSelector in action can be found [here](http://htmlpreview.github.io/?https://github.com/eventengineering/supertoggle/blob/master/examples/examples.html).

###Examples
A selection of demo selctors can be found in the ***/examples/examples.html*** file.



Comming Soon
================================
Full setup and usage instructions comming in the next few days!