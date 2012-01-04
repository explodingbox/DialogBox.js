#DialogBox.js

A super simple mootools based dialogue box for web apps. Auto centres, but leaves all other display settings to css with lots of class hooks.

usage

	new DialogBox({
        message: "This is a <strong>Dialog Box</strong>",
        identifier: 'my_dialogue', //[optional] Adds a class to the dialogue box for styling
        primary: ['Ok'], //[optional] Adds a primary class to this button
        events: {
          'Ok': function(){
            alert('the ok button was clicked');
          }
        }
      });      