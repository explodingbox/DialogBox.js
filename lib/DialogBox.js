DialogBox = new Class({
  Implements: [Options,Events],
  initialize: function(options){
    this.setOptions(options);
    this.container = new Element('div.dialog_box_container').inject(document.body);
    this.dialog_element = new Element('div.dialog_box').inject(this.container);
    this.dialog_element.addClass(this.options.identifier);
    this.message = new Element('div.dialog_box_message',{
      html: this.options.message
    }).inject(this.dialog_element);
	this.dialog_actions = new Element('div.dialog_actions').inject(this.dialog_element);	
	Object.each(this.options.events,function(f,event_name){
		var button = new Element('button',{
			text: event_name,
			events: {
				click: function(){
					this.fireEvent(event_name);
					this.dismiss();
				}.bind(this),
				mousedown: function(){
					button.addClass('mousedown');
				}.bind(this),
				mouseup: function(){
					button.removeClass('mousedown');
				}.bind(this),
				mouseover: function(){
					button.addClass('mouseover');
				}.bind(this),
				mouseleave: function(){
					button.removeClass('mouseover');
					button.removeClass('mousedown');
				}.bind(this)
			}
		})
		if (event_name == this.options.primary) {
		 button.addClass('primary'); 
		 this.firePrimaryOnKey = function(e){
       if(e.key == 'enter') this.fireEvent(event_name);
		   this.dismiss();
		 }.bind(this);
   	 window.addEvent('keydown', this.firePrimaryOnKey);
		}
		button.inject(this.dialog_actions);
		this.addEvent(event_name,f);
	}.bind(this));
	this.position();
	window.addEvent('resize', this.position.bind(this));
  },
  position: function(){
	  var coords = this.dialog_element.getCoordinates();
	  var container_coords = this.container.getCoordinates();
	  var y = (container_coords.height/2)-(coords.height/2);
	  var x = (container_coords.width/2)-(coords.width/2);
	  this.dialog_element.setPosition({x:x,y:y});
  },
  dismiss: function(){
	  this.dialog_element.addClass('dismissed');
	  var dispose = function(){
		  this.container.dispose();
	  }.bind(this)
	  dispose.delay(500);
  	window.removeEvent('resize', this.position.bind(this));
   	window.removeEvent('keydown', this.firePrimaryOnKey);
  }
});