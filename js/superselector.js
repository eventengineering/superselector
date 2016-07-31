//advanced select box

(function($) {
	$.widget("ui.superselector", {

		selected_item:null, //store selected item
		continuedFocus:false, //flag to show if item has just been selected

		options: {
			items:{}, //list of items to be included in list
		},

  		//object constructor
  		_create: function() {
  			var self = this;
  			var options = this.options;
  			var element = this.element;

  			if(element.prop("tagName") == "INPUT"){ //only create superselector if tag is an input element

  				element.addClass("superselector");

  				element.data("superselctor-value", ""); //define value data paremeter so jquery knows to use that for the  select boxes value

  				//build wrapper to hold caret, cannot put :after element on an input;
  				var wrapper = $("<span class='superselector-wrapper'></span>");

  				//transfer any margins to wrapper
  				var rightMargin = element.css("margin-right");

  				console.log("right", rightMargin);

  				element.css({"margin-right":"0"});
  				wrapper.css({"margin-right":rightMargin});
          wrapper.attr("data-listid", element.attr("id"));

  				element.wrap(wrapper);


  				//set default selected item if present
  				$.each(self.options.items, function(index, item) {
  					if(item.selected){
  						self._selectData(item);
  						return false;
  					}
  				});


  				element.on("keydown", function(e){
  					self._keydown(e);
  				});

  				//show list on focus
  				element.on("focus", function(e){

  					self.justFocused = true;

  					setTimeout(function(){
  						self.justFocused = false
  					},300);

  					if(!self.continuedFocus){
  						if(element.prop("readonly") || element.prop("disabled")){
  							element.blur();
  						}else{
  							self.render();
  							element.prop("readonly", true); //hide cursor by setting object to read only
  						}
  					}else{
  						element.prop("readonly", true); //hide cursor by setting object to read only
  						self.continuedFocus = false;
  					}

  				});

  				//toggle list display on click
  				element.on("click", function(e){

  					if(self.list.is(":visible")){
  						if(!self.justFocused){
  							self._restore();
  							self.list.remove();
  						}

  					}else{
  						self.render();
  					}

  				});

  				//handle value changed by jquery .val() method
  				element.on("valueSet", function(e){

  					var newData = element.data("superselctor-value");

  					if(newData == "" || newData == null){
  						self._clearData();
  					}else{
  						if(typeof(newData) == "object"){
  							self._selectData(newData, true);
  						}else{

  							var items = self.options.items;
  							var match = false;

  							$.each(items, function(index, item) {
  								if(item.value == newData){
  									match = item;
  									return false;
  								}
  							});

  							if(match){
  								self._selectData(match, true);
  							}else{
  								self._selectData({value:newData, title:newData}, true);
  							}

  						}
  					}

  				});
  			}

  		},

  		//publicly accessible functions

  		//set disabled status of item
  		disableItem:function(itemValue, disabled){
  			var self = this;
  			var items = self.options.items;

  			var varType = typeof(itemValue);

  			$.each(items, function(index, item) {
  				if(varType == "object"){
  					if(item.value === itemValue.value && item.title === itemValue.title && item.type === itemValue.type){
  						item.disabled = disabled === false ? false : true;
  					}
  				}else{
  					if(item.value == itemValue){
  						item.disabled = disabled === false ? false : true;
  					}
  				}
  			});
  		},

  		//remmove item by value
  		removeItem:function(itemValue){
  			var self = this;
  			var items = self.options.items;

  			var varType = typeof(itemValue);

  			$.each(items, function(index, item) {

  				if(item){
  					if(varType == "object"){
  						if(item.value === itemValue.value && item.title === itemValue.title && item.type === itemValue.type){
  							items.splice(index, 1);
  						}
  					}else{
  						if(item.value == itemValue){
  							items.splice(index, 1);
  						}
  					}
  				}

  			});
  		},

  		//replace item by value
  		replaceItem:function(itemValue, newItem){

  			var self = this;
  			var items = self.options.items;

  			var varType = typeof(itemValue);

  			$.each(items, function(index, item) {

  				if(item){
  					if(varType == "object"){
  						if(item.value === itemValue.value && item.title === itemValue.title && item.type === itemValue.type){
  							items[index] = newItem;
  						}
  					}else{
  						if(item.value == itemValue){
  							items[index] = newItem;
  						}
  					}
  				}

  			});
  		},

  		//add new item to end of list
  		addItem:function(newItem){
  			var self = this;
  			var items = self.options.items;

  			items.push(newItem);
  		},

  		//insert item by value
  		insertItem:function(itemValue, newItem, before){
  			var self = this;
  			var items = self.options.items.slice();

  			var varType = typeof(itemValue);

  			before = before ? 0 : 1;

  			$.each(items, function(index, item) {

  				if(item){
  					if(varType == "object"){
  						if(item.value === itemValue.value && item.title === itemValue.title && item.type === itemValue.type){
  							self.options.items.splice(index + before, 0, newItem)
  						}
  					}else{
  						if(item.value == itemValue){
  							self.options.items.splice(index + before, 0, newItem)
  						}
  					}
  				}

  			});
  		},

  		//get item from value
  		getItem:function(itemValue, selector){
  			var self = this;
  			var items = self.options.items;

  			var match = false;

  			selector = selector ? selector : "value";

  			$.each(items, function(index, item) {
  				if(item[selector] == itemValue){
  					match = item;
  					return false;
  				}
  			});

  			return match;
  		},

  		//get list of current items
  		getItems:function(){
  			return this.options.items;
  		},


  		//replace list of items
  		setItems:function(newItems){
  			var self = this;
        self.options.items = newItems;
      },


  		//on key down
  		_keydown:function(e){
  			var self = this;
  			var options = self.options;
  			var element = self.element;
  			switch(e.keyCode){
  				case 13: //enter
  				e.preventDefault();
  				self._nav_enter();
  				break;

  				case 38:// up arrow
  				e.preventDefault();
  				self._nav_up();
  				break;

  				case 40: //down arrow
  				e.preventDefault();
  				self._nav_down();
  				break;

  				case 9: //escape
  				case 27:
  				case 116:

  				self._restore();

  				self._removeList();

  				break;

  				default: //other

  				//if alphanumeric, search for matching character
  				if(e.keyCode >= 48 && e.keyCode <= 90){
  					if(!self.list.is(":visible")){
  						self.render();
  					}

  					self._search(String.fromCharCode(e.keyCode).toLowerCase());
  				}

  				e.preventDefault();
  			}
  		},

  		//remove options list and set focus back on element
  		_removeList:function(){
  			this.list.remove();
  			this.element.prop("readonly", false);
  			this.continuedFocus = true;
  			this.element.focus();
  		},

  		//resotre selected value to last know good state
  		_restore:function(){
  			var self  = this;

  			if (self.selected_item){
  				self._selectData(self.selected_item, true);
  			}else{
  				self._clearData();
  			}
  		},

  		//handle up arrow press
  		_nav_up:function(){
  			var self = this;

  			if(!self.list.is(":visible")){
  				self.render();
  			}

  			var active = $("li.active", self.list);

  			if(active.length){
  				var item = active.prevAll("li.choice:not(.disabled)").first();
  			}else{
  				var item = $("li.choice:not(.disabled)", self.list).last();
  			}



  			if(item.length){
  				self._setActive(item);
  			}
  		},

  		//handle down arrow press
  		_nav_down:function(){
  			var self = this;

  			if(!self.list.is(":visible")){
  				self.render();
  			}

  			var active = $("li.active", self.list);

  			if(active.length){
  				var item = active.nextAll("li.choice:not(.disabled)").first();
  			}else{
  				var item = $("li.choice:not(.disabled)", self.list).first();
  			}

  			if(item.length){
  				self._setActive(item);
  			}
  		},

  		//handle enter key press
  		_nav_enter:function(){
  			var self = this;

  			var item = $("li.active", self.list);

  			if(!self.list.is(":visible")){
  				self.render();
  			}else{
  				if(item.length == 1){
  					self._select(item);
  				}else{
  					self.list.close();
  				}
  			}

  		},

  		//search for an item with a first character that matches searchString
  		_search:function(searchString){

  			var self = this;

  			var item = null;

  			var active = $("li.active", self.list);

  			if(active.length){
  				//search after element
  				active.nextAll("li.choice:not(.disabled)").each(function(){
  					if($(this).text().toLowerCase().charAt(0) == searchString){
  						item = $(this);
  						return false;
  					}
  				});

  				if(!item){
  					$("li.choice:not(.disabled)", self.list).each(function(){
  						if($(this).text().toLowerCase().charAt(0) == searchString){
  							item = $(this);
  							return false;
  						}
  					});
  				}

  			}else{
  				$("li.choice:not(.disabled)", self.list).each(function(){
  					if($(this).text().toLowerCase().charAt(0) == searchString){
  						item = $(this);
  						return false;
  					}
  				});
  			}

  			if(item){
  				self._setActive(item);
  			}

  		},

  		//allow options to be changed after creation
  		_setOption: function(option, value) {
  			$.Widget.prototype._setOption.apply( this, arguments );
  		},


  		//set provided element to active state
  		_setActive:function(item){
  			var self = this;

  			$(".active", self.list).removeClass("active");
  			item.addClass("active");

        self.element[0].value = item.data("data").selectedTitle ? item.data("data").selectedTitle : item.data("data").title;
      },

      //position list on screen
      positionList: function(){
        var self = this;

        //position list on screen
        var position = self.element[0].getBoundingClientRect();

        self.list.css({top: (position.top + position.height - 1) + "px", left: position.left + "px"})

        self.list.css({"min-width": position.width + "px"});
      },

      //blur element
      blur:function(){
        var self = this;

        self.list.remove();
        self._restore();
        setTimeout(function(){
          self.element.prop("readonly", false);
        },10)
      },

  		//construct and display option list
  		render:function(){
  			var self = this;

  			$(".superselector-list").remove();

  			self.list = $("<div class='superselector-list'></div>");
        self.list.attr("data-listid", self.element.attr("id"));
  			self.list.append(self._renderList(self.options.items));

  			//position list on screen
  			self.positionList();

        //handle bluring from list
        var setBlur = function(e){
          if($(e.target).closest(".superselector-list").length != 1){
            $(document).off("mousedown", setBlur);
            self.blur();
          }
        }
        $(document).on("mousedown", setBlur);

        //handle window movement
        $(window).on("scroll", function(){
          self.positionList();
        });


  			//show list
  			$("body").append(self.list);

  			$("li.choice:not(.disabled)",self.list).on("mouseover", function(e){
  				self._setActive($(this));
  			});

  			$("li.choice:not(.disabled)",self.list).on("click", function(e){
  				self._select($(this));
  			});

  		},

  		//construct options list
  		_renderList:function(list){
  			var self = this;

  			var ul = $("<ul></ul>");

  			$.each(list, function(index, item) {

  				item.type = item.type ? item.type : "choice";

  				var line = null;

  				switch(item.type){
  					case "title":
  					line = $('<li class="title">' + item.title + '</li>');
  					break;

  					case "seperator":
  					line = $('<li class="seperator"></li>');

  					break;

  					case "choice":
            var title = item.title != "" ? item.title : "&nbsp;";
            line = $('<li class="choice">' + title + '</li>');

            if(self.selected_item){
              if(item.value == self.selected_item.value){
               line.addClass("active");
             }
           }
           break;
         }

         if(item.disabled){
           line.addClass("disabled");
         }

         line.data("data", item);

         ul.append(line);
       });

  			return ul;

  		},

  		//set selected option list element as current value
  		_select:function(item){
  			var self = this;
  			var element = self.element;

  			self._selectData(item.data("data"));
  			self._removeList();
  		},


  		//set provided data as current
  		_selectData:function(data, noEvent){
  			this.element.data("superselctor-value", data.value);
  			this.element[0].value = data.selectedTitle ? data.selectedTitle : data.title;

  			this.selected_item = data;

  			if(!noEvent){
  				this.element.trigger("change");
  			}

  		},

  		//clear currently selected data
  		_clearData:function(){
  			this.element.data("superselctor-value", "");
  			this.element[0].value = "";

  			this.selected_item = null;
  		},

  		//cleanup on element deletion
  		destroy: function() {

  		},

  	});
})(jQuery);

//Override jquery val() fucntion to allow superselector to function as standard input
$.fn.preSupSelVal = $.fn.val
$.fn.val = function(value){
  console.log("value", value)
  if(typeof(value) == "undefined"){
    return typeof($(this).data('superselctor-value')) != "undefined" ? $(this).data('superselctor-value') : $(this).preSupSelVal();
  }else{
    var result = typeof($(this).data('superselctor-value')) != "undefined" ? $(this).data('superselctor-value', value) : $(this).preSupSelVal(value);
    $(this).trigger("valueSet")
    return result;
  }
}
