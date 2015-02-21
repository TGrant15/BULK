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
  	    			localStorage["currentID"] = user.id;
					localStorage["daysPerWeek"] = user.get("daysPerWeek");
					localStorage["level"] = user.get("level");
					localStorage["phase"] = user.get("phase");
					localStorage["mondayFlag"] = user.get("Monday");
					localStorage["tuesdayFlag"] = user.get("Tuesday");
					localStorage["wednesdayFlag"] = user.get("Wednesday");
					localStorage["thursdayFlag"] = user.get("Thursday");
					localStorage["fridayFlag"] = user.get("Friday");
					localStorage["saturdayFlag"] = user.get("Saturday");
					localStorage["sundayFlag"] = user.get("Saturday");
					localStorage["userInfoFlag"] = "yes";
					localStorage["weight"] = user.get("weight");
					localStorage["height"] = user.get("height");
					localStorage["idlWeight"] = user.get("idlWeight");
					localStorage["weight"] = user.get("weight");
					localStorage["focusArea"] = user.get("focusArea");
					localStorage["age"] = user.get("age");
					localStorage["calorieReq"] = user.get("calorieReq");
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
      var emailYes = 1;
      var passwordYes = 1;

    	if(email != confEmail){

    		// show error for mismatched emails
    		alert("email does not match");

    	}
    	else if(emailYes != 1)
    	{
        alert("email is not valid");
    	}
    	else if(passwordYes != 1)
    	{
        alert("password is not valid");
    	}
    	else if (password != confPassword){
    		// show error for mismatched passwords
    		alert("password does not match");
    	}
    	else if (!$("#termCheck").prop("checked")){
    		// show error for terms of conditions
    		alert("term is not checked");
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
    				  	alert("email is taken");
    				  }
    			  else
    				  {
    				    /*alert("try");
    				    var user = new Parse.User();
    				    user.set("username", email);
              	user.set("password", password);
              	user.set("email", email);
              	user.save().then(function(){*/
              	   //Common.loadPage('tutorial', 'none');
              	   window.location ="tutorial.html";
              	//});
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