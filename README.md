
SuperSelector
================================

A JQuery UI enhancement of the standard HTML Select element

![Example Super Selector](/examples/example.jpg?raw=true")

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
There are three types of line item available in the Superselector.

##### Standard Item
A standard item defines the ***value*** to be returned when the item is selected and the ***title*** to be displayed for that item.
```js
{value:"first", title:"First Item"},
```
There is an optional paramater to set the item to be ***disabled***. in this state it appears greyed out in the list and cannot be selected.
```js
{value:"fourth", title:"Disabled Item", disabled:true},
```

##### Title
A title item will show up in bold in the list with a darker background and a bigger font. a title item cannot be selected
```js
{type:"title", title:"Group Title"},
```

##### Seperator
A seperator item appears as a horizontal line in the list.
```js
{type:"seperator"},
```

Manipulating The Items List
================================
Once your super selector has been created it is possible to change the items in the list using a variety of functions.

### Disable/Enable Item
To enable or disable an item, use the ***disableItem*** function. The first argumnet should be the item to be changed, this should either be the value of the item, or an object of the items definition. The second argument is wheather the element is to be disabled *(true)* or enabled *(false)*.
```js
$("#example-selector").tabulator("disableItem","first", true); //Disable the first item in the list using the items value;
```
```js
var firstItem = {value:"first", title:"First Item"};

$("#example-selector").tabulator("disableItem",firstItem, false); //Enable the first item in the list using the items object;
```

### Remove Item
To remove an item from the list, use the ***removeItem*** function, passing either the items value or an object of the items definition.

```js
$("#example-selector").tabulator("removeItem","first"); //Remove the first item in the list using the items value;
```
```js
var firstItem = {value:"first", title:"First Item"};

$("#example-selector").tabulator("removeItem",firstItem); //Remove the first item in the list using the items object;
```

### Replace Item
To replace an item, use the ***replaceItem*** function. The first argumnet should be the item to be replaced, this should either be the value of the item, or an object of the items definition. The second should be an object representing the new value.

```js
var newItem = {value:"new", title:"New Item"};

$("#example-selector").tabulator("replaceItem","first", newItem); //Replace the first item in the list using the items value, with the newItem object;
```
```js
var firstItem = {value:"first", title:"First Item"};
var newItem = {value:"new", title:"New Item"};

$("#example-selector").tabulator("replaceItem",firstItem, newItem); //Replace the first item in the list using the items object, with the newItem object;
```


### Add Item
To and an item to the end of the list, use the ***addItem*** function. The first argument is the new items object.
```js
var newItem = {value:"new", title:"New Item"};

$("#example-selector").tabulator("addItem", newItem); //Add the new item to the end off the list;
```

### Insert Item
To replace an item, use the ***insertItem*** function. The first argumnet should be the item to be that you want to insert the item next to, this should either be the value of the item, or an object of the items definition. The second should be an object representing the new value. The third argument is a boolean value representing weather the new item is to be isnerted before *(true)* or after *(false)* the specified first item

```js
var newItem = {value:"new", title:"New Item"};

$("#example-selector").tabulator("replaceItem","first", newItem, true); //Insert the new item before the first item in the list;
```

### Get Item From value
To get the object of an item based on its value, use the ***getItem*** function. pass the value of the item to the function and it will return the object representing the item.
```js
$("#example-selector").tabulator("getItem","first"); //Return the object for the item with the value of "first";
```
The function will return false if no item with a matching value is found.


### Get All Items
To get the objects for all items in a SuperSelector, use the ***getItems*** function.
```js
$("#example-selector").tabulator("getItems"); //Returns and array of objets for all items in the list;
```

Example Returned List:
```js
[
	{value:"first", title:"First Item"},
	{value:"second", title:"Second Item"},
	{type:"title", title:"Group Title"},
	{value:"third", title:"Third Item"},
	{value:"fourth", title:"Disabled Item", disabled:true},
	{value:"fifth", title:"Fifth Item"},
	{type:"seperator"},
	{value:"sixth", title:"Sixth Item"},
]
```

### Set New Items List
To set a completly new list in the SuperSelector, use the ***setItems*** function, passing an array of new item objects.

```js
var newItems = items:[
{value:"newFirst, title:"1st Item"},
{value:"newSecond", title:"Second Item"},
{value:"newThird", title:"3rd Item"},
];

$("#example-selector").tabulator("setItems", newItems); //clear the old list and add a new list;
```

CSS Clases
================================
SuperSelector elements are assigned a range of CSS classes to make it easier for you to manipulate the look, feel and function of the selector.

Class | Element Description
---|---
superselector-wrapper | A wrapper round the input element to contain the carret icon
superselector | The input element that is the SuperSelector
superselector-list | The value lookup list
choice | A standard item in the lookup list
seperator | A seperator item in the lookup list
title | A title item in the lookup list