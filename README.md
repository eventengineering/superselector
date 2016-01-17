
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

A live demo of SuperSelector in action can be found [here](http://htmlpreview.github.io/?https://github.com/eventengineering/superselector/blob/master/examples/examples.html).

###Examples
A selection of demo selctors can be found in the ***/examples/examples.html*** file.



Defining Items List
================================

When you create your SuperSelector, you can define the items to be chosen from the selection list us the ***items*** array.

```js
$("#example-selector").superselector({
	items:[
		{value:"first", title:"First Item"},
		{value:"second", title:"Second Item"},
		{type:"title", title:"Group Title"},
		{value:"third", title:"Third Item"},
		{value:"fourth", title:"Disabled Item", disabled:true},
		{value:"fifth", title:"Fifth Item"},
		{type:"seperator"},
		{value:"sixth", title:"Sixth Item"},
	],
})

```

Each item in the array is an object containing info for each line item.

### Types of item
There are three types of line item.

#### Standard Item
A standard item defines the ***value*** to be returned when the item is selected and the ***title*** to be displayed for that item.
```js
{value:"first", title:"First Item"},
```
There is an optional paramater to set the item to be ***disabled***. in this state it appears greyed out in the list and cannot be selected.
```js
{value:"fourth", title:"Disabled Item", disabled:true},
```

#### Title
A title item will show up in bold in the list with a darker background and a bigger font. a title item cannot be selected
```js
{type:"title", title:"Group Title"},
```

#### Seperator
A seperator item appears as a horizontal line in the list.
```js
{type:"seperator"},
```






Comming Soon
================================
Full setup and usage instructions comming in the next few days!