Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");

/*********Global Variables*********/
var current = Parse.User.current();


/************************/
getPhase(current);
getLevel(current);


$(document).ready(function() {
getMeals();
$(".menu").click(function()
{
	$("#menuScreen").animate({"top":"605px"},200);
	$("#menuIcon").animate({"height":"0px"},200);
	$("#arrowIcon").animate({"height":"25px"},200);
});
$(".settingMenuDots").click(function()
		{
			$("#settingMenu").animate({"width":"100px"},200);
			$("#settingMenu").animate({"height":"55px"},200);
			
		});
$(".arrowIcon").click(function()
		{
			$("#menuScreen").animate({"top":"709px"},200);
			$("#menuIcon").animate({"height":"25px"},200);
			$("#arrowIcon").animate({"height":"0px"},200);
		});
$("#lower").css("opacity","0");
$("#core").css("opacity","0");

$("#settingsIcon").click(function(){
	window.location = "settings.html"; 
});
//----------------------------------------------------------//
//----------------------- workout page  ----------------//
//----------------------------------------------------------//	
	$("#workoutContent").scroll(function(){
		$('.workoutTabs').css( "box-shadow", "0 0 6px 0" );
		
		var pos = $("#workoutContent").scrollTop();
		if(pos==0)
			{
				$('.workoutTabs').css("box-shadow","0 0 0px 0");
			}
		
		
	});
	$("#eatMenu").click(function(){
		alert("custom meal");
	});


	$("#blue").click(function(){
		alert("hi");
		//$("blue2").animate({"margin":"25em 19.56em"});
		//$("blue3").animate({"margin":"25em 19.56em"});
	});
	$("#blue2").click(function(){
		alert("yo");
	//	$("blue2").animate({"margin":"25em 19.56em"});
		//$("blue3").animate({"margin":"25em 19.56em"});
	});
	

	$("#breakfastTab").click(function(){
		$("#mealsUbar").animate({"left":"0"},50);
	});
	
	$("#lunchTab").click(function(){
		$("#mealsUbar").animate({"left":"27%"},50);
	});
	
	$("#dinnerTab").click(function(){
		$("#mealsUbar").animate({"left":"51%"},50);
	});
	
	$("#snackTab").click(function(){
		$("#mealsUbar").animate({"left":"75%"},50);
	});
	

    
		
	$("#back").click(function(){
		$(".workoutHead").animate({"opacity":"1"},300);
		  $("#workoutContent").animate({
			  "margin-top":"40px"
		  },300);
		  $("li").animate({"height":"121px"});
		  $("#buttonGroup").animate({"opacity":"1"},300);
		  $("#workoutContent").css("position","fixed");
		  $(".exName").animate({"opacity":"1"},300);
		  $(".workoutNav").css("display","inline");
		  $(".icon-arrow-left").animate({"opacity":"0"},300);
		  $("#workoutContent").animate({"height":"118% !important"}, 300);
		
	});
	
	$("#breakfastTab").click(function(){
		$("#breakfast").css("opacity","1");
		$("#lunch").css("opacity","0");
		$("#dinner").css("opacity","0");
		$("#snack").css("opacity","0");
	});
	$("#lunchTab").click(function(){
		$("#breakfast").css("opacity","0");
		$("#lunch").css("opacity","1");
		$("#dinner").css("opacity","0");
		$("#snack").css("opacity","0");
	});
	$("#dinnerTab").click(function(){
		$("#breakfast").css("opacity","0");
		$("#lunch").css("opacity","0");
		$("#dinner").css("opacity","1");
		$("#snack").css("opacity","0");
	});
	$("#snackTab").click(function(){
		$("#breakfast").css("opacity","0");
		$("#lunch").css("opacity","0");
		$("#dinner").css("opacity","0");
		$("#snack").css("opacity","1");
	});

	
});
function navigate(currentPage, pageDest)
{
	
	$("#" +  currentPage).hide();
	$("#" + pageDest).show(200);
	
}

function getMeals() {
	
	var Meals = Parse.Object.extend("Meals");
	var query = new Parse.Query(Meals);
	var recommendedCal = 3300-1000;
	var calMeals = recommendedCal/5;
	query.greaterThan("ml_cal", calMeals);
	query.find({
	  success: function(results) {
		  alert(results);
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      var name = object.get('ml_foodName');
	      var category = object.get('ml_cat');
	      if(category == "breakfast")
	  		{
	  			$("#breakfastList").append('<li class="workoutCards" id="meal'+i+'"><label id="meal-Lbl'+i+'" class="exName">'+name.toUpperCase()+'</label></li>');
	  		}
	  		else if(category == "lunch")
	  		{
	  			$("#lunchList").append('<li class="workoutCards" id="meal'+i+'"><label id="meal-Lbl'+i+'" class="exName">'+name.toUpperCase()+'</label></li>');
	  		}
	  		else if(category == "dinner")
	  		{
	  			$("#dinnerList").append('<li class="workoutCards" id="meal'+i+'"><label id="meal-Lbl'+i+'" class="exName">'+name.toUpperCase()+'</label></li>');
	  		}
	  		else
	  		{
	  			$("#snackList").append('<li class="workoutCards" id="meal'+i+'"><label id="meal-Lbl'+i+'" class="exName">'+name.toUpperCase()+'</label></li>');
	  		}
	      
	    }
	    $(".workoutCards").click(function(){
	    	currentDetailID = $(this).attr('id'); 
	    	alert("hi");
	    	$("#" + currentDetailID).animate({height:"1500px"});
	    	$(".exName").animate({"opacity":"0"});
	    	$(".recommendedLabel").animate({"opacity":"0"});
	    	$(".recNum").animate({"opacity":"0"});
	    	$(".workoutList").animate({"margin-top":"62px"});
	    	$(".workoutCards").animate({"border-bottom-width": "0px"});
			$("#buttonGroup").animate({"opacity":"0"},200);
	    	$(".workoutHead").animate({"opacity":"0"},200);
	    	$(".exitDetail").animate({"opacity":"1"});
	    });
	    $(".exitDetail").click(function(){
	    	$("#" + currentDetailID).animate({height:"120px"});
	    	$(".workoutCards").animate({"border-bottom-width": "1px"},0);
	    	$(".exName").animate({"opacity":"1"});
	    	$(".recommendedLabel").animate({"opacity":"1"});
	    	$(".recNum").animate({"opacity":"1"});
	    	$(".workoutList").animate({"margin-top":"205px"});
			$("#buttonGroup").animate({"opacity":"1"},200);
	    	$(".workoutHead").animate({"opacity":"1"},200);
	    	$(".exitDetail").animate({"opacity":"0"});

	    });
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
	/*
	
	$.ajax({
	    type: "Post",
	    datatype: "json",
	    url: "http://www.tremainegrant.com/iBulk/bulk.php",
	    data: {action: 'getExercise', $ex_level: level, $ex_phase:phase },
	    crossDomain: true,
	    success: function (response,status) {
	    	
	    	var stringVersion = JSON.stringify(response);  
	    	var dataString = '{"exercise":' + response + '}';
	    	var data = JSON.parse(dataString);
	    	for( var i = 0; i< data.exercise.length; i++)
	    	{
	    		if(data.exercise[i].ex_bodyZone == "upper")
	    		{
	    			$("#upperList").append('<li class="workoutCards"><label id="exLbl'+i+'" class="exName">'+data.exercise[i].ex_name.toUpperCase()+'</label></li>');
	    		}
	    		else if(data.exercise[i].ex_bodyZone == "lower")
	    		{
	    			$("#lowerList").append('<li class="workoutCards"><label id="exLbl'+i+'" class="exName">'+data.exercise[i].ex_name.toUpperCase()+'</label></li>');
	    		}
	    		else
	    		{
	    			$("#coreList").append('<li class="workoutCards"><label id="exLbl'+i+'" class="exName">'+data.exercise[i].ex_name.toUpperCase()+'</label></li>');
	    		}
	    	}
		      
	    },
	    error: function (response) {
	         alert("Error establishing a connection.");
	    }
    });*/
}

function getLevel(email) {
	

	
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", current);
	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      localStorage["level"] = object.get('level');
	      
	    }
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
	
	
	/*$.ajax({
	    type: "Post",
	    datatype: "json",
	    url: "http://www.tremainegrant.com/iBulk/bulk.php",
	    data: {action: 'getUserLevel', $email: email },
	    crossDomain: true,
	    success: function (response,status) {
	    	
	    	var obj = JSON.parse(response);
	    	getExercise(obj.level,obj.phase);
	    	
	    },
	    error: function (response) {
	         alert("Error establishing a connection.");
	    }
    });*/
}

function getPhase(email) {

	
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", current);
	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) { 
	    	var object = results[i];
		    localStorage["phase"] = object.get('phase');		    
	     /* var object = results[i];
	      phase = object.get('phase');
	      alert(phase);*/
	    }
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

//------------------------------------------------------------//
//----------- Menu------------------------------------------//
//------------------------------------------------------------//
$("#logout").click(function(){
	Parse.User.logOut();
	window.location = "index.html"; 
});

$("#myMeals").click(function(){
	window.location = "meals.html"; 
});

$("#myWorkouts").click(function(){
	window.location = "workout.html"; 
});

$("#myProfile").click(function(){
	window.location = "profile.html"; 
});
