/**  
  * @desc login.js encompasses all login and registration functions
  * @author Caleb Diaz caleb.diaz@gmail.com, Tremaine Grant tremaine.grant@gmail.com
  * @required login.html, register.html
  * @namespace Login
*/ 
Login = {
	/** 
	 * @desc check the user credentials and login if necessary
	 * @param string email - email provided by user, string password - password provided by user
	 * @return none
	*/ 
    login: function(email, password) {
    	Parse.User.logIn(email, password, {
  		  success: function(user) {
  			  localStorage["loggedUser"] = $('#logUsername').val();
  	    		window.location = "workout.html"; 
  		  },
  		  error: function(user, error) {
  		    // The login failed. Check error to see why.
  		  }
  		});
    },
    
    /** 
	 * @desc validate the new registered user information
	 * @param string email - email provided by user, string password - password provided by user
	 * @return none
	*/ 
    validate: function(email, confEmail, password, confPassword) {
    	if(email != confEmail){
    		// show error for mismatched emails
    	}
    	else if (password != confPassword){
    		// show error for mismatched passwords
    	}
    	else if (!$("#termCheck").prop("checked")){
    		// show error for terms of conditions
    	}
    	else {
    		var EmailQuery = Parse.Object.extend("User");
    		var query = new Parse.Query(EmailQuery);
    		query.equalTo("email", email);
    		query.find({
    		  success: function(results) {
    			  if(results.length > 0)
    				  {
    				  	// show error for taken email
    				  }
    			  else
    				  {
    				  	Common.loadPage('detailsPage', 'none');
    				  }
    		  },
    		  error: function(error) {
    		    // log this error
    			  
    		  }
    		});
    	}
    }
}


/** 
 * @desc function is ran at the beginning of the project on load
 * @param document
 * @return none
*/ 
$(document).ready(function() {
	
}); // end of document ready function