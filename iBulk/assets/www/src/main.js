define(function(require, exports, module) {
    // import dependencies
	var Engine        = require('famous/core/Engine');
	var Surface       = require('famous/core/Surface');
	var Transform     = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Easing        = require('famous/transitions/Easing');
	var Lightbox      = require('famous/views/Lightbox');
	var ImageSurface  = require('famous/surfaces/ImageSurface');
	var DeviceView    = require('./DeviceView');

	var mainContext = Engine.createContext();

	var background = new Surface({
	    properties: {
	      backgroundColor: '#FA5C4F'
	    }
	  });
	  
	  var loginBox = new Surface({
	    size:[450,450],
	    properties:{
	      borderBottom:'2px solid grey',
	      backgroundColor: 'White',
	    }
	  })
	  
	  var submitButton = new Surface({
	    size: [150,50],
	    content: 'submit',
	    properties:{
	      paddingTop:'10px',
	      textAlign:'center',
	      color: 'white',
	      backgroundColor: '#FA5C4F'
	    }
	  })
	  
	  var loginBoxMod = new StateModifier();
	   
	   
	  var submitButtonModifier = new StateModifier({
	     origin: [0.5,0.7]
	  });
	  
	  var login = new InputSurface({
	    size: [200, 50],
	    name: 'inputSurface',
	    placeholder: 'username',
	    value: '',
	    type: 'text',
	    properties:{
	    border:'1px solid red',
	    paddingLeft:'65px'
	    }
	});
	 var loginModifier = new StateModifier({
	     origin: [0.5,0.35]
	  });
	  
	    var pass = new InputSurface({
	    size: [200, 50],
	    name: 'inputSurface',
	    placeholder: 'password',
	    value: '',
	    type: 'text',
	    properties:{
	    border:'1px solid red',
	    paddingLeft:'65px'
	    }
	});
	 var passModifier = new StateModifier({
	     origin: [0.5,0.5]
	  });
	  
	  var inputModifiers = new StateModifier({
	     origin: [0.5,0.5]
	  });


	  mainContext.add(background);
	  mainContext.add(loginBoxMod).add(loginBox);
	  mainContext.add(submitButtonModifier).add(submitButton);
	  mainContext.add(loginModifier).add(login); 
	  mainContext.add(passModifier).add(pass);
	  
	  loginBoxMod.setTransform(
	  Transform.translate(12, 200, 0),
	  { duration : 1000, curve: Easing.outElastic }
	);
	  


});
