Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");
/*********Global Variables*********/
var current = Parse.User.current();
var username = current.get("username");
var started = "no";
var timerSwitch = "off";
var bodyHeight = $("#workoutPage").height();
$(".detailPage").css("height",bodyHeight);

/********Property Arrays***************/
var nameList = [];
var coreList = [];
var rcmndedWeight = [];
var bodyZoneArray = [];
var typeArray = [];
var difficulty = [];
var primary = [];
var description1 = [];
var description2 = [];
var description3 = [];
var description4 = [];
var description5 = [];
var tip1 = [];
var tip2 = [];
var tip3 = [];



/**********Filter Objects**************/
var BicepObj = [];
var Bicep= 0;

var TricepObj = [];
var Tricep= 0;

var UpperBackObj = [];
var UpperBack= 0;

var LowerBackObj = [];
var LowerBack= 0;

var ShoulderObj = [];
var Shoulders= 0;

var HamstringsObj = [];
var Hamstrings= 0;

var CalfObj = [];
var Calfs= 0;

var QuadsObj = [];
var Quads= 0;

var GlutesObj = [];
var Glute= 0;

var AbsObj = [];
var Abs= 0;


/*************************************/
var workoutObj = [];
var nameCount = 0;
//var timer = 90;
var setCount = 1;
var weightId;
var Weight = Parse.Object.extend("Weight");	
var weight = new Weight();
var startCounter;
var currentDetailID;
var cacheObjLength;
var dotMenuToggle = 0;


/*******global variables involving weight********/
var FirstTimeWeight;
var Max;
var actualWeight;
var recommendedWeight;
var recommentdedWeightStr;
var recommendedSets;


/************************/
$(document).ready(function() {
//****Create Array to check if the data is cached	
var cachedWorkoutCheck = [];	
if(localStorage["workoutCache"]==undefined)
{
	
fetchWorkout(username);
		
}
else
{
	//****Store Local Storage Data with cached workouts.
	cachedWorkoutCheck = jQuery.parseJSON(localStorage["workoutCache"]);
	//*Store the length of the obj in this variable.
	cacheObjLength = cachedWorkoutCheck.length;
	generateWorkout(cachedWorkoutCheck);
	

	//**if the length of the cached object is greater than 1, then this confirms that data has been cached.
/*	if(cachedWorkoutCheck.length > 1)
	{
		//* Generate the workouts using the cached objects.
		generateWorkout(cachedWorkoutCheck);
	/*}
	else//**If it is not cached get the level and phase of the user and generate the workout.
	{
		
		getLevel(username);

	}*/
}

//**This is where each exercise is sorted by the body part, into seperate arrays.


//*****This is the 3 dot menu***//
$("#dotMenuWorkout").click(function(){
	if(dotMenuToggle == 1)
	{	
		$(".settingsMenu").css("width","0px");
		$(".settingsMenu").css("height","0px");
		$(".settingMenuList").css("display","none");
		dotMenuToggle=0;	
	}
	else
	{
		$(".settingMenuList").css("display","block");
		$(".settingsMenu").animate({"width":"100px"},100);
		$(".settingsMenu").animate({"height":"40px"},100);
		dotMenuToggle++;	
	}			
});

$("#dotMenuWorkoutDetail").click(function(){
	if(dotMenuToggle == 1)
	{	
		$(".settingsMenu").css("width","0px");
		$(".settingsMenu").css("height","0px");
		$(".settingMenuList").css("display","none");
		dotMenuToggle=0;	
	}
	else
	{
		$(".settingMenuList").css("display","block");
		$(".settingsMenu").animate({"width":"100px"},100);
		$(".settingsMenu").animate({"height":"40px"},100);
		dotMenuToggle++;	
	}			
});

//**This is the 3 line menu**//
$(".menu").click(function()
{
	$("#menuScreen").animate({"top":"85%"},200);
	$("#menuIcon").animate({"height":"0px"},200);
	$("#arrowIcon").animate({"height":"25px"},200);
});

//**This is the arrow icon used to take you back//**/
$(".arrowIcon").click(function()
{
	//***If the user has hit the action button and started a workout.**//
	if(started == "yes")
	{
		
		if(confirm("are you sure you want to quit this workout?")==true)
		{
			window.location = "workout.html"; //Send them back to the workout overview page.

		}
	}
	else //**Hide the menu screen**//
	{
		$("#workoutOverviewTitle").text("Today's Workout");
		$("#menuScreen").animate({"top":"100%"},200);
		$("#menuIcon").animate({"height":"25px"},200);
		$("#arrowIcon").animate({"height":"0px"},200);
	}

			
});

//**Hide the lower Menu tab**//
$("#lower").css("opacity","0");

//**Hide the core menu tab**//
$("#core").css("opacity","0");

$("#firstTab").click(function(){
	$("#ubar").animate({"margin-left":"0px"},50);
});

$("#secondTab").click(function(){
	$("#ubar").animate({"margin-left":"85px"},50);
});

$("#thirdTab").click(function(){
	$("#ubar").animate({"margin-left":"180px"},50);
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

$("#firstTab").click(function(){
	$("#upper").css("opacity","1");
	$("#lower").css("opacity","0");
	$("#core").css("opacity","0");
});
$("#secondTab").click(function(){
	$("#upper").css("opacity","0");
	$("#lower").css("opacity","1");
	$("#core").css("opacity","0");
});
$("#thirdTab").click(function(){
	$("#upper").css("opacity","0");
	$("#lower").css("opacity","0");
	$("#core").css("opacity","1");
});


$("#logout").click(function(){
localStorage.removeItem("workoutCache");
localStorage.removeItem("phase");
localStorage.removeItem("level");
Parse.User.logOut();
window.location = "index.html"; 
});

$("#settingsPageButton").click(function(){
	window.location = "settings.html"; 
});

$("#logoutDetailPage").click(function(){
	localStorage.removeItem("workoutCache");
	localStorage.removeItem("phase");
	localStorage.removeItem("level");
	Parse.User.logOut();
	window.location = "index.html"; 
	});

$("#settingsPageButtonDetailPage").click(function(){
	window.location = "settings.html"; 
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

$(".workoutCards").click(function(){
	currentDetailID = $(this).attr('id'); 
	if(currentDetailID.length == 5){
		var detailIndex = currentDetailID.substring(4, 5);		//If the id number has just one digit at the end save it
	}
	else
	{
		var detailIndex = currentDetailID.substring(4, 6);	//If the id has a two digit character at the end save both
	}
	
	$(".detailPage").css("display","block");
	$(".workoutHead").animate({"opacity":"0"});
	$("#workoutTabs").css("display","none");
	$(".backToWorkout").css("display","block");
	$(".settingMenuDotsDetail").css("display","block");
	$("#ubar").css("display","none");
	$("#" + currentDetailID).animate({height:"1500px"});
	$(".exName").animate({"opacity":"0"});
	$(".exDifficultyLbl").animate({"opacity":"0"});
	$(".recNum").animate({"opacity":"0"});
	$(".workoutList").animate({"margin-top":"62px"});
	$(".workoutCards").animate({"border-bottom-width": "0px"});
	$("#buttonGroup").animate({"opacity":"0"},700);
	//$(".workoutHead").hide();
	$(".detailPage").animate({"opacity":"1"},700);
	$("#menuIcon").animate({"height":"0px"},700);
	$("#settingMenuDots").animate({"height":"0px"},700);

	$("#workoutOverviewTitle").css("color","black");
	$("#workoutOverviewTitle").text(cachedWorkoutCheck[detailIndex].name);
	$(".detailTitle").append(cachedWorkoutCheck[detailIndex].name)
	$("#detailDifficulty").append(cachedWorkoutCheck[detailIndex].difficulty);
	$("#detailSets").append("3");
	$("#detailReps").append("12");
	
	$("#detailDescription1").append(cachedWorkoutCheck[detailIndex].description1);
	$("#detailDescription2").append(cachedWorkoutCheck[detailIndex].description2);
	$("#detailDescription3").append(cachedWorkoutCheck[detailIndex].description3);
	$("#detailDescription4").append(cachedWorkoutCheck[detailIndex].description4);
	$("#detailDescription5").append(cachedWorkoutCheck[detailIndex].description5);
	$("#detailTip1").append(cachedWorkoutCheck[detailIndex].tip1);
	$("#detailTip2").append(cachedWorkoutCheck[detailIndex].tip2);
	$("#detailTip3").append(cachedWorkoutCheck[detailIndex].tip3);
	
	
	var listLength = $(".longDetailsList").height();
	var calc = listLength + 1400;
	$(".detailContent").css("height", calc + "px");


});

$(".backToWorkout").click(function(){
	$(".detailTitle").empty();
	$("#detailDifficulty").empty();
	$("#detailSets").empty();
	$("#detailReps").empty();
	$("#detailDescription1").empty();
	$("#detailDescription2").empty();
	$("#detailDescription3").empty();
	$("#detailDescription4").empty();
	$("#detailDescription5").empty();
	$("#detailTip1").empty();
	$("#detailTip2").empty();
	$("#detailTip3").empty();
	$(".detailPage").animate({"opacity":"0"},200);
	$(".detailPage").scrollTop(0);
	$(".detailPage").css("display","none");
	
	$("#workoutOverviewTitle").css("color","white");
	$("#workoutOverviewTitle").text("Today's Workout");
	$(".backToWorkout").css("display","none");
	$(".settingMenuDotsDetail").css("display","none");
	$("#" + currentDetailID).animate({height:"120px"});
	
	$("#workoutTabs").css("display","block");
	$(".workoutHead").animate({"margin-top":"-156px"},200);
	$(".workoutHead").animate({"opacity":"1"},200);
	$(".workoutOverviewTitle").text("Today's Workout");
	$("#menuIcon").animate({"height":"25px"},200);
	$("#settingMenuDots").animate({"height":"25px"},200);
	$("#ubar").css("display","block");
	$(".workoutCards").animate({"border-bottom-width": "1px"},0);
	$(".exName").animate({"opacity":"1"});
	$(".exDifficultyLbl").animate({"opacity":"1"});
	$(".recNum").animate({"opacity":"1"});
	$(".workoutList").animate({"margin-top":"205px"});
	$("#buttonGroup").animate({"opacity":"1"},200);
	
	

});	


$(".detailPage").scroll(function(){
	$(".workoutHead").margin({top:-12});
	

	var scrollDistance = $(".detailPage").scrollTop();
	var subtractString = 0.01 * scrollDistance;
	var subtractMargin = 200 - scrollDistance
	

	//var headerReposition = -76 + scrollDistance;
	
	
	$(".workoutHead").css("opacity",subtractString);
	
	if(scrollDistance >= 100)
	{
		$(".detailContent").margin({top:150});
	}
	else
	{
		$(".detailContent").margin({top:subtractMargin});

	}
	//$(".workoutHead").margin({top:headerReposition});
	
	if(scrollDistance >= 200)
	{
		$(".workoutHead").css("opacity","1");
		
		//$(".workoutHead").css("margin-top", "-12px");

	}
});

	

//********This is where users can replace exercises that they like***************//
$(".workoutCards").swipe( {
//Generic swipe handler for all directions
	swipeStatus:function(event, phase, direction, distance, duration, fingers)
	{
		
		if(direction == "left") //If the user swipes left
		{
			var str = 0;
			var deleteStr = 0;
	
			var removeID = $(this).attr('id'); //set the id of the item being replaced
			var bodypart = $("#" + removeID).attr("bodypart");//Save the body part of the item into variable.
			var removeName = $("#" + removeID).attr("name"); // save the name of the item being removed.
			if(removeID.length == 5){
				var deleteIndex = removeID.substring(4, 5);		//If the id number has just one digit at the end save it
			}
			else
			{
				var deleteIndex = removeID.substring(4, 6);	//If the id has a two digit character at the end save both
			}
			
			//While the item is in the process of being swiped
			if (phase!="cancel" && phase!="end") {
				/*if(distance>0)//Check what the distance of the swipe is(This will decrease the sensativity if needed)
				{*/
					if($("#deleteIcon" + deleteIndex).text().length == 0)//If the delete icon Does not exist, add it .
					{
						$(".favIcon").remove();//Remove the fav icon if its still on the screen.

						$("#"+removeID).append('<div class="deleteIcon" id="deleteIcon'+deleteIndex+'"><img class="trashIcon" src="img/trash.png"/><label class="deleteLabel">Delete</label></div>');						 
					}

					 str-=distance;
					 deleteStr+=distance; //Adds the distance amount to the delete str.
					 $("#deleteIcon" + deleteIndex).css("width",deleteStr + "px");//Change the width of the delete area based on the delete string
					 $("#workoutCardContainerItem" + deleteIndex).css("margin-left",str + "px");//Move the item left to display left swiping effect.
     
 
					 if(distance > 175)//If the user has swipped more than 175px distance
					 {
							 						 	        		 
								 //check the body part and go to the respective array in order to find alternative exercises.
								 switch (bodypart) {
								    case "Bicep":
								    	
								    	if(Bicep!=(BicepObj.length-1))//Check if this is the first exercise for the specific body part in the array.
								    	{
								    		Bicep++;
								    		replaceExercise("left",Bicep,BicepObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
											replaceAutomation(BicepObj,Bicep,nameList,removeName);
								    		notification(BicepObj[Bicep].name);																			
											
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
 					
										 break;
								    case "Tricep":
								    	if(Tricep!=(TricepObj.length-1))
								    	{
								    		Tricep++;
								    		replaceExercise("left",Tricep,TricepObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(TricepObj[Tricep].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
								        break;
								    case "UpperBack":
								    	if(UpperBack!=(UpperBackObj.length-1))
								    	{
								    		UpperBack++;
								    		replaceExercise("left",UpperBack,UpperBackObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(UpperBackObj[UpperBack].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
								        break;
								    case "Shoulders":
								    	if(Shoulders!=(ShouldersObj.length-1))
								    	{
								    		Shoulders++;
								    		replaceExercise("left",Shoulders,ShouldersObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(ShouldersObj[Shoulders].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
								         break;
								    case "Chest":
								    	if(Chest!=(ChestObj.length-1))
								    	{
								    		Chest++;
								    		replaceExercise("left",Chest,ChestObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(ChestObj[Chest].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
										 
								        break;
								        
								    case "Hamstrings":
								    	if(Hamstrings!=(HamstringsObj.length-1))
								    	{
								    		Hamstrings++;
								    		replaceExercise("left",Hamstrings,HamstringsObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(HamstringsObj[Hamstrings].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
										 
								        break;
								        
								    case "Quads":
								    	if(Quads!=(QuadsObj.length-1))
								    	{
								    		Quads++;
								    		replaceExercise("left",Quads,QuadsObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(QuadsObj[Quads].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
										 				        			 
								        break;	
								    case "Abs":
								    	if(Abs!=(AbsObj.length-1))
								    	{
								    		Abs++;
								    		replaceExercise("left",Abs,AbsObj)
											removeDeleteArea(deleteIndex);	
											removeExercise(removeID);
								    		notification(AbsObj[Abs].name);																																
								    	}
								    	else
								    	{
											 notification("Swipe Left for alternatives");
								    	}
							    		break;							    
					    			case "Calfs":
					    				if(Calfs!=(CalfsObj.length-1))
					    				{
					    					Calfs--;
					    					replaceExercise("left",Calfs,CalfsObj)
					    					removeDeleteArea(deleteIndex);	
					    					removeExercise(removeID);
					    					notification(CalfsObj[Calfs].name);																																
					    				}
					    				else
					    				{
					    					notification("Swipe Left for alternatives");
					    				}
					    				break;
				    				}
					 		}
					 else
					{
						 //do nothing
					}
						
				}
				else
				{
					removeDeleteArea(deleteIndex);
				}
			}
			else if(direction == "right")
			{
				var str = 0;
				var deleteStr = 0;
				var removeID = $(this).attr('id');
				var removeName = $("#" + removeID).attr("name");
				var bodypart = $("#" + removeID).attr("bodypart");
				if(removeID.length == 5){
					var deleteIndex = removeID.substring(4, 5);		
				}
				else
				{
					var deleteIndex = removeID.substring(4, 6);	
				}

				if (phase!="cancel" && phase!="end") {
					if(distance>0)
					{
	
						if($("#favIcon" + deleteIndex).text().length == 0)
						{
							$(".deleteIcon").remove();
							$("#" + removeID).prepend('<div class="favIcon" id="favIcon'+deleteIndex+'"><label class="deleteLabel">Save</label></div>');
						}
						str+=distance;
						deleteStr+=distance;
						$(".favIcon").css("width",deleteStr + "px");
						$("#workoutCardContainerItem" + deleteIndex).css("margin-left",str + "px");

						if(distance > 175)
						{
								 
								switch (bodypart) {
								case "Bicep":

									if(Bicep != 0)//Check if this is the first exercise for the specific body part in the array.
							    	{
							    		Bicep--;
							    		replaceExercise("right",Bicep,BicepObj)
							    		notification(BicepObj[Bicep].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
										replaceAutomation(BicepObj,Bicep,nameList,removeName);

							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}
	 
									break;
								case "Tricep":
									if(Tricep != 0)
							    	{
										Tricep--;
							    		replaceExercise("right",Tricep,TricepObj)
							    		notification(TricepObj[Tricep].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}
	 
	 
	 
									break;
								case "UpperBack":
									if(UpperBack != 0)
							    	{
										UpperBack--;
							    		replaceExercise("right",UpperBack,UpperBackObj)
							    		notification(UpperBackObj[UpperBack].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}
									break;
								case "Shoulders":

									if(Shoulders != 0)
							    	{
										Shoulders--;
							    		replaceExercise("right",Shoulders,ShouldersObj)
							    		notification(ShouldersObj[Shoulders].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}	 

									break;
								case "Chest":

									if(Chest != 0)
							    	{
										Chest--;
							    		replaceExercise("right",Chest,ChestObj)
							    		notification(ChestObj[Chest].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}	 
	 

									break;
    
								case "Hamstrings":

									if(Hamstrings != 0)
							    	{
										Hamstrings--;
							    		replaceExercise("right",Hamstrings,HamstringsObj)
							    		notification(HamstringsObj[Hamstrings].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}	 
									break;
    
								case "Quads":

									if(Quads != 0)
							    	{
										Quads--;
							    		replaceExercise("right",Quads,QuadsObj)
							    		notification(QuadsObj[Quads].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}		 
									break;	
									
								case "Abs":
									if(Abs != 0)
							    	{
										Abs--;
							    		replaceExercise("right",Abs,AbsObj)
							    		notification(AbsObj[Abs].name);											
										removeDeleteArea(deleteIndex);	
										removeExercise(removeID);
							    	}
							    	else
							    	{
										 notification("Swipe Left for alternatives");
							    	}		 		 
									break;
								case "Calfs":
				    				if(Calfs!=(CalfsObj.length+1))
				    				{
				    					Calfs--;
				    					replaceExercise("right",Calfs,CalfsObj)
				    					removeDeleteArea(deleteIndex);	
				    					removeExercise(removeID);
				    					notification(CalfsObj[Calfs].name);																																
				    				}
				    				else
				    				{
				    					notification("Swipe Left for alternatives");
				    				}
				    				break;
								}
								removeDeleteArea(deleteIndex);	

						}
					}
 
				}
				else
				{
					$("#favIcon"+deleteIndex).animate({"width":"0px"},500,function(){
						$(".deleteIcon").empty();
						$(".deleteIcon").remove();
						$(".favIcon").empty();
						$(".favIcon").remove();
					});
 $("#deleteIcon" + deleteIndex).css("width","0px");
 $("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"},500);

		

	 }
	 
}
	
  
},
//Default is 75px, set to 0 for demo so any distance triggers swipe
 threshold:75, allowPageScroll:"vertical"
});


//----------------------------------------------------------//
//----------------------- workout page  ----------------//
//----------------------------------------------------------//	
	
//*******This is the blue action button*****//	
$("#blue").click(function(){
		timerSwitch = "on"; //This indicates wether the timer has been started
		$("#timeLabel").text("Seconds"); //Set the time label to seconds
		$("#timeAnimation").text("90"); //set the time animation to 90
		timer=90;	//this is setting the actual timer to 90 seconds..

		var Weight = Parse.Object.extend("Weight");	//initialize the weight object
		//***This parse query will find the the workout that is equal the exercise, and the user
		//** and make udates to the workout log accordingly*****//
		var query = new Parse.Query(Weight);
		query.equalTo("wght_exercise", nameList[nameCount]); 
		query.equalTo("wght_user", username); 		
		query.find({
			  success: function(results) {			  
				var weightText, weightNum, routin
				if(rcmndedWeight[nameCount] == "Just the Bar")
				{
					weightNum = 45;
					weightText = "Just the Bar";					
				}
				else if(rcmndedWeight[nameCount] == "Body Weight")
				{
					weightNum = 0;
					weightText = "Body Weight";
				}
				else
				{
					weightNum = rcmndedWeight[nameCount];
					weightText = weightNum + "lbs";
				}
				$("#recommendedWeight").text(weightText);
			
				if (results.length == 0)
				{
					var weight = new Weight(); // create a new weight object
					weight.set("wght_user", username);
					weight.set("wght_exercise", nameList[nameCount]);
					weight.set("wght_recommended", weightNum);
					weight.save().then(function(weight){
						localStorage["routineSetId"]=weight.id;
					});

						
					
				}
				else
				{			
					localStorage["routineSetId"]=results[0].id;
					//weight.save();
				}	

			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		
		
		$("#start").animate({"left":"0px"},200);
		$("#menuIcon").animate({"height":"0px"},200);
		$("#arrowIcon").animate({"height":"25px"},200);
		$("#workoutOverviewTitle").text(nameList[0]);
		
		/*if (started == "no")
		{*/
		var interval = setInterval(function() {
		    timer--;
		    $('#timeAnimation').text(timer);
		    if (timer === 0){
		    	$("#timeAnimation").text("");
		    	$("#timeLabel").css("margin-left", "-146px");
		    	$("#timeLabel").text("READY!");
		    	timer=90;
		    	started = "no";
		    	clearInterval(interval);
		    }
		    
		}, 1000);
		//}
		started = "yes";
		
	});
	
//------------------------------------------------------------//
//----------- Workout start-----------------------------------//
//------------------------------------------------------------//

$("#startButton").click(function(){
	var weightText, weightNum; 	
	var ExerciseQuery = $("#workoutOverviewTitle").text(); // grab the exercise name, which is in the header of the page

	if(timerSwitch== "on") // If the timer is currently running
	{
		if(setCount == 1) // check if we are in the first set
		{

			var Weight = Parse.Object.extend("Weight");	//initialize the weight object
			var query = new Parse.Query(Weight);	//query the objects in the parse database

			query.equalTo("wght_exercise", ExerciseQuery);  // find a record in the parse database that matches the exercise name..
			query.equalTo("wght_user", username); 			// ..and the username(this will always only be 1 record).
			query.find(function(results){
				if(results.length == 0)				// if the record does not exist, then results will return 0.
				{
					
					var weight = new Weight(); // create a new weight object

					weight.set("wght_user", username);	// set the user name in the database
					weight.set("wght_exercise", ExerciseQuery); // set the exercise name in the database
					weight.set("wght_recommended", weightNum);	// set the recommended weight in the database.


					weight.save().then(function(result) {		// save the new object to the database
						localStorage["routineSetId"]=result.id;	// once saved get the Id, and store it in the local Storage.
					}, function(error) {
						// the save failed.
					});

					//startCounter++;

				}
				else
				{
					var weight = new Weight(); // create a new weight object
					localStorage["routineSetId"] = results[0].id; //store weight object into local storage
				}
				//startCounter++;
				$(".timer").css("display","none"); // Hide the timer
				$("#startButton").text("Submit"); // change the text from start to submit
				$("#weightPerformed").css("display","block"); // show the weight performed textbox
				$("#set").text("Set ");  // display set...
				$("#setNum").text(setCount + " of 3"); // ..number of the current set
				//$("#timeLabel").text(" Seconds");	
  
				timerSwitch ="off";	// set the timer to off.
			});
		}
		else // if its any other set other then set 1
		{

			var Weight = Parse.Object.extend("Weight");	//initialize the weight object
			var query = new Parse.Query(Weight);	//query the objects in the parse database

			query.equalTo("wght_exercise", ExerciseQuery);  // find a record in the parse database that matches the exercise name..
			query.equalTo("wght_user", username); 			// ..and the username(this will always only be 1 record).
			query.find(function(results){
				var weight = new Weight(); // create a new weight object
				localStorage["routineSetId"] = results[0].id; //store weight object into local storage
			});
			//startCounter++;
			$(".timer").css("display","none"); // Hide the timer
			$("#startButton").text("Submit"); // change the text from start to submit
			$("#weightPerformed").css("display","block"); // show the weight performed textbox
			$("#set").text("Set ");  // display set...
			$("#setNum").text(setCount + " of 3"); // ..number of the current set
			//$("#timeLabel").text(" Seconds");	

			timerSwitch ="off";	// set the timer to off.
		}
	}// close of if statment for timer switch set to on.	
	else if(timerSwitch== "off") // if the timer is not running.
	{
		timerSwitch = "on"; // switch timer on
		var Weight = Parse.Object.extend("Weight");	//initialize the weight object
		var query = new Parse.Query(Weight);	//query the objects in the parse database

		query.equalTo("wght_exercise", ExerciseQuery);  // find a record in the parse database that matches the exercise name..
		query.equalTo("wght_user", username); 			// ..and the username(this will always only be 1 record).
		query.find(function(results){			
			var setColumn = "wght_set" + setCount; // storing the column name into variable
			var weightPerformed = parseInt($("#weightPerformed").val()); // store the value the user performed and convert to Int
			results[0].set(setColumn, weightPerformed);		// set the user performance to object we pulled/found
			results[0].save().then(function(){			
				$("#weightPerformed").val('');	//clear the performance box
				$("#startButton").text("Start"); // change the submit button back to start
				$("#weightPerformed").css("display","none"); //hide the weight performed
				$("#timeLabel").text(" Seconds"); // change the label back to Seconds
				$("#timeAnimation").text("90 "); // show 90 seconds 
				timer=90;			 // set the timer to 90		
				$(".timer").css("display","block"); // display the timer.
											
				if(setCount == 3)//will be changed to variable that will represent the set amount that is pulled from the database.
				{

					$("#weightAdjForm").css("display","block"); // display the weight adjustment form
					$(".overlay").css("display", "block"); //show a black overlay over the app so put focus on the form
					$("#weightAdjSbmt").click(function(){ // on clicking the submit button on the form		
						$("#weightAdjSbmt").unbind("click");
						var increase = weightPerformed+5; // increase on the weight performed by 5 pounds(to be changed.)
						var decrease = weightPerformed-5; // decrease on the weight performed by 5 pounds(to be changed.)
				  
						if($("#tooLight").is(':checked')) //if the user selected that the weight was too light.
						{
							$("#weightAdjForm").css("display","none"); // hide the form
							$(".overlay").css("display", "none"); // hide the overlay
							results[0].set("wght_recommended", increase); // set the new recommended weight in the database.
							results[0].save().then(function(){ // save the record to the database
								// I feel like something should be done in here just dont know what.
							});
						}
						else if($("#tooHeavy").is(':checked')) //if the user selected that the weight was too heavy.
						{
							$("#weightAdjForm").css("display","none"); // hide the form
							$(".overlay").css("display", "none"); // hide the overlay
							results[0].set("wght_recommended", decrease); // set the new recommended weight in the database.
							results[0].save().then(function(){ // save the record to the database
								// I feel like something should be done in here just dont know what.
							});
						}
						else if($("#Perfect").is(':checked'))//if the user selected that the weight was perfect.
						{
							$("#weightAdjForm").css("display","none"); // hide the form
							$(".overlay").css("display", "none"); // hide the overlay
							results[0].set("wght_recommended", weightPerformed); // set the new recommended weight in the database.
							results[0].save().then(function(){ // save the record to the database
								// I feel like something should be done in here just dont know what.
							});
						}
						else
						{
							alert("you must choose something"); // this forces the user to choose something before closing.
						}		
						setCount=1; // the set will reset to 1

					}); // closes the onclick of the submit from button 
					nameCount++;  // since we are in the final set, we will increase the nameCount, moving onto the next workout
					$("#workoutOverviewTitle").text(nameList[nameCount]); // change the name in the header
					$("#rcmendWeight").text(rcmndedWeight[nameCount]); // change the recommended weight
					$("#set").text("Set ");  // display set...
					$("#setNum").text(setCount + " of 3"); // ..number of the current set
					
					
				}// closes if statement for if this is set 3
				else // if it is not the last set
				{
					setCount++; // increment setCount
					$("#set").text("Set ");  // display set...
					$("#setNum").text(setCount + " of 3"); // ..number of the current set
				}

			});//closes the save for the user performance box
		});// close the find for the record.(this find is used when the switch is off).
		

	}

});
		
/*		var interval = setInterval(function() {
		    timer--;x
		    $('#timeAnimation').text(timer);
		    
		    if (timer <= 0){
		    	$("#timeAnimation").text("");
		    	$("#timeLabel").css("margin-left", "-146px");
		    	$("#timeLabel").text("READY!");
		    	started = "no";
		    	clearInterval(interval);
		    }
		    
		}, 1000);*/
				 
		/*if(rcmndedWeight[nameCount] == "Just the Bar")
		{
			weightText = "Just the Bar";					
			weightNum = 45;
		}
		else if(rcmndedWeight[nameCount] == "Body Weight")
		{
			weightText = "Body Weight";
			weightNum = 0;
		}
		else
		{
			weightText = rcmndedWeight[nameCount] + "lbs";
			weightNum = rcmndedWeight[nameCount];
		}*/
	
//----End of Document Ready---//
});

function navigate(currentPage, pageDest)
{
	
	$("#" +  currentPage).hide();
	$("#" + pageDest).show(200);
	
}
function fetchWorkout(email)
{
	var pulledLevel;
	var pulledPhase;
	
	//get the level of the user
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", email);
	query.find().then(function(results){
			
				for(var i = 0; i < results.length; i++)
				{
					var pulledLevel = results[i].get('level');			 						
				}
				localStorage["level"] = pulledLevel;
	}).then(function(){
		//Get the phase of the user
		var User = Parse.Object.extend("User");
		var query = new Parse.Query(User);
		query.equalTo("username", email);
		query.find().then(function(results) {
			for(var i = 0; i < results.length; i++)
			{
				 pulledPhase = results[i].get('phase');	
				 
			}
			localStorage["phase"] = pulledPhase;
			getExercise(localStorage["level"],localStorage["phase"]);
		});
		
	});
}

		

function getExercise(level,phase) {
	var Exercise = Parse.Object.extend("Exercise");
	
	// Find all workouts that are available for the user that is currently in this level and phase.
	var query = new Parse.Query(Exercise);
	query.equalTo("ex_level", level );
	query.equalTo("ex_phase", phase );
	query.find().then(function(results){
		
		  var workoutObj = [];
		    for (var i = 0; i < results.length; i++) {  
			      var object = results[i];
			      var name = object.get('ex_name');
			      var bodyZone = object.get('ex_bodyZone');
			      var type = object.get('ex_type');
			      var priority = object.get('ex_priority');
			      var difficultyTemp = object.get('ex_difficulty');
			      var primaryTemp = object.get('ex_primary');
			      var description1Temp = object.get('ex_description1');
			      var description2Temp = object.get('ex_description2');
			      var description3Temp= object.get('ex_description3');
			      var description4Temp = object.get('ex_description4');
			      var description5Temp = object.get('ex_description5');
			      var tip1Temp = object.get('ex_tip1');
			      var tip2Temp = object.get('ex_tip2');
			      var tip3Temp = object.get('ex_tip3');
			      
			      workoutObj.push({name: name, bodyZone: bodyZone, difficulty:difficultyTemp, type:type, priority:priority, primary:primaryTemp, description1:description1Temp, description2:description2Temp, description3:description3Temp, description4:description4Temp, description5:description5Temp, tip1:tip1Temp, tip2:tip2Temp, tip3:tip3Temp});
			      
			      
		    }
		    
		    var jsonString = JSON.stringify(workoutObj);
		    localStorage["workoutCache"] = jsonString;
	
		    cachedWorkouts = [];
		    cachedWorkouts = jQuery.parseJSON(jsonString);
		    
		    
		    generateWorkout(cachedWorkouts);
		 
		});
	 
}

function generateWorkout(cacheVar)
{

	var cachedWorkouts = []; //Variable that the workouts will be chached in
	var cachedWorkouts = cacheVar; 
	var compoundCount = 0; //This counts how many of the exercises are compound lifts.
	var workoutCount = 0; //This counts the total amount of workouts
	var coreCount = 0; // this counts the amount of core workouts.
	var coreWeight=[]; // This is the weight that the core workouts should be performed with.
	
    
	
	// go through each workout that was pulled and all the properties and save them into individual variables. 
	for (var i = 0; i < cachedWorkouts.length; i++) {     
		var name = cachedWorkouts[i].name;
	    var bodyZone = cachedWorkouts[i].bodyZone;
	    var type = cachedWorkouts[i].type;
	    var priority = cachedWorkouts[i].priority;
	    var difficultyTemp = cachedWorkouts[i].difficulty;
	    var primaryTemp = cachedWorkouts[i].primary;
	    var description1Temp = cachedWorkouts[i].description1;
	    var description2Temp = cachedWorkouts[i].description2;
	    var description3Temp = cachedWorkouts[i].description3;
	    var description4Temp = cachedWorkouts[i].description4;
	    var description5Temp = cachedWorkouts[i].description5;
	    var tip1Temp = cachedWorkouts[i].tip1;
	    var tip2Temp = cachedWorkouts[i].tip2;
	    var tip3Temp = cachedWorkouts[i].tip3;
		  
	  if(bodyZone == "upper")
		{
		  //Based on the number of workout populate the property arrays with the respective properties
		  nameList[workoutCount] = name;
		  bodyZoneArray[workoutCount] = bodyZone;
		  typeArray[workoutCount] = type;
		  difficulty[workoutCount] = difficultyTemp;
		  primary[workoutCount] = primaryTemp;
	      description1[workoutCount] = description1Temp;
	      description2[workoutCount] = description2Temp;
	      description3[workoutCount] = description3Temp;
	      description4[workoutCount] = description4Temp;
	      description5[workoutCount] = description5Temp;
	      tip1[workoutCount] = tip1Temp;
	      tip2[workoutCount] = tip2Temp;
	      tip3[workoutCount] = tip3Temp;
		  
		  if(type=="Compound") // If the type of workout is a compund workout go through replacement algorithm so compound workouts will be completed first.
			{
		    	  nameList[workoutCount] = nameList[compoundCount];// Which ever place
		    	  nameList[compoundCount] = name;  		
		    	  
		    	  bodyZoneArray[workoutCount] = bodyZoneArray[compoundCount];
		    	  bodyZoneArray[compoundCount] = bodyZone;
		    	  
		    	  typeArray[workoutCount] = typeArray[compoundCount];
		    	  typeArray[compoundCount] = type;
		    	  
		    	  difficulty[workoutCount] =  difficulty[compoundCount];
		    	  difficulty[compoundCount] = difficultyTemp;
	
		    	  
		    	  primary[workoutCount] = primary[compoundCount];
		    	  primary[compoundCount] = primaryTemp;
	
		    	  
			      description1[workoutCount] = description1[compoundCount];
			      description1[compoundCount] = description1Temp;
	
			      
			      description2[workoutCount] = description2[compoundCount];
			      description2[compoundCount] = description2Temp;
	
			      
			      description3[workoutCount] = description3[compoundCount];
			      description3[compoundCount] = description3Temp;
	
			      
			      description4[workoutCount] = description4[compoundCount];
			      description4[compoundCount] = description4Temp;
	
			      
			      description5[workoutCount] = description5[compoundCount];
			      description5[compoundCount] = description5Temp;
	
			      
			      tip1[workoutCount] = tip1[compoundCount];
			      tip1[compoundCount] = tip1Temp;
	
			      
			      tip2[workoutCount] = tip2[compoundCount];
			      tip2[compoundCount] = tip2Temp;
	
			      
			      tip3[workoutCount] = tip3[compoundCount];
			      tip3[compoundCount] = tip3Temp;
	
		    	  
		    	
		    	  
		    	  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			rcmndedWeight[workoutCount] = "Just the Bar";
		    		  }
		    	  }
		    	  rcmndedWeight[workoutCount] = rcmndedWeight[compoundCount];
		    	  rcmndedWeight[compoundCount] = "Just the Bar";
		  		    	  $("#upperList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
		    	  compoundCount++;
			}
		  else if(type =="Dumbbell")
			{
			  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			rcmndedWeight[workoutCount] = 25;
		    		  }
		    	  }
		  		    	  $("#upperList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
		    	  
			}
		  else if(type == "Body")
	  		{
			  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			rcmndedWeight[workoutCount] = "Body Weight";
		    		  }
		    	  }
		  		    	  $("#upperList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
		    	  
	  		}
		  else if(type == "Machine")
	  		{
			  if(localStorage["level"] == 1)
	    	  {
	    		  if(localStorage["phase"] == "1")
	    		  {
	    			  rcmndedWeight[workoutCount] = 50;
	    		  }
	    	  }
		  		    	  $("#upperList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
	  		}    
	  		workoutCount++;
	
		}
		else if(bodyZone == "lower")
		{
	    	  nameList[workoutCount] = name;
	    	  bodyZoneArray[workoutCount] = bodyZone;
	    	  typeArray[workoutCount] = type;
	    	  difficulty[workoutCount] = difficultyTemp;
	    	  primary[workoutCount] = primaryTemp;
		      description1[workoutCount] = description1Temp;
		      description2[workoutCount] = description2Temp;
		      description3[workoutCount] = description3Temp;
		      description4[workoutCount] = description4Temp;
		      description5[workoutCount] = description5Temp;
		      tip1[workoutCount] = tip1Temp;
		      tip2[workoutCount] = tip2Temp;
		      tip3[workoutCount] = tip3Temp;
	    	  if(type=="Compound")
	    		{
		    	  nameList[workoutCount] = nameList[compoundCount];
		    	  nameList[compoundCount] = name;		    	 		
		    	  
		    	  bodyZoneArray[workoutCount] = bodyZoneArray[compoundCount];
		    	  bodyZoneArray[compoundCount] = bodyZone;
		    	  
		    	  typeArray[workoutCount] = typeArray[compoundCount];
		    	  typeArray[compoundCount] = type;
		    	  
		    	  difficulty[workoutCount] =  difficulty[compoundCount];
		    	  difficulty[compoundCount] = difficultyTemp;
	
		    	  
		    	  primary[workoutCount] = primary[compoundCount];
		    	  primary[compoundCount] = primaryTemp;
	
		    	  
			      description1[workoutCount] = description1[compoundCount];
			      description1[compoundCount] = description1Temp;
	
			      
			      description2[workoutCount] = description2[compoundCount];
			      description2[compoundCount] = description2Temp;
	
			      
			      description3[workoutCount] = description3[compoundCount];
			      description3[compoundCount] = description3Temp;
	
			      
			      description4[workoutCount] = description4[compoundCount];
			      description4[compoundCount] = description4Temp;
	
			      
			      description5[workoutCount] = description5[compoundCount];
			      description5[compoundCount] = description5Temp;
	
			      
			      tip1[workoutCount] = tip1[compoundCount];
			      tip1[compoundCount] = tip1Temp;
	
			      
			      tip2[workoutCount] = tip2[compoundCount];
			      tip2[compoundCount] = tip2Temp;
	
			      
			      tip3[workoutCount] = tip3[compoundCount];
			      tip3[compoundCount] = tip3Temp;
		    	  
		    	  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			rcmndedWeight[workoutCount] = "Just the Bar";
		    		  }
		    	  }
	  		   	  rcmndedWeight[workoutCount] = rcmndedWeight[compoundCount];
		    	  rcmndedWeight[compoundCount] = "Just the Bar";
		  		    	  $("#lowerList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
		    	  compoundCount++;
	    		}
	    	  else if(type =="Dumbbell")
	    		{
	    		  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			rcmndedWeight[workoutCount] = 25;
		    		  }
		    	  }
		  		    	  $("#lowerList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
	
	    		}
	    	  else if(type == "Body")
		  		{
	    		  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			rcmndedWeight[workoutCount] = "Body Weight";
		    		  }
		    	  }
		  		    	  $("#lowerList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
	
		  		}
	    	  else if(type == "Machine")
		  		{
	    		  if(localStorage["level"] == 1)
		    	  {
		    		  if(localStorage["phase"] == "1")
		    		  {
		    			  rcmndedWeight[workoutCount] = 50;
		    		  }
		    	  }
		  		    	  $("#lowerList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
		  		    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
		  		    			  <label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
		  		    			  <label class="exDifficultyLbl">Difficulty:</label>\
		  		    			  <label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
		  		    			  </div>\
		  		    			  </li>');
	
	
		  		}    
		  		workoutCount++;
		}
		else
		{
	  	   coreList.push({name: name, bodyZone: bodyZone, difficulty:difficultyTemp, primary:primaryTemp, description1:description1Temp, description2:description2Temp, description3:description3Temp, description4:description4Temp, description5:description5Temp,tip1:tip1Temp,tip2:tip2Temp,tip3:tip3Temp});
	  	    	  
			  if(type == "Body")
			  {
				  //coreList[coreCount].rmdWeight = "Body Weight";
				  rcmndedWeight[workoutCount] = "Body Weight";
			  }
	
			$("#coreList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'">\
										<div class="workoutCardContainer" id="workoutCardContainerItem'+i+'">\
										<label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br>\
										<label class="exDifficultyLbl">Difficulty:</label>\
				  		    			<label class="recNum" id="exDifficulty'+i+'">'+difficulty[compoundCount]+'</label>\
										</div>\
									</li>');
				coreCount++;
	
	  		}
	    }
	    
	    for(var i=0; i<=(workoutCount-coreCount); i++)
	    {
	
		      workoutObj.push({name: nameList[i], bodyZone: bodyZoneArray[i], difficulty:difficulty[i], type:typeArray[i], primary:primary[i], description1:description1[i], description2:description2[i], description3:description3[i], description4:description4[i], description5:description5[i],tip1:tip1[i],tip2:tip2[i],tip3:tip3[i]});
	    
	    }
	    
	
	    for(var index=0; index<coreCount; index++)
	    {
		    workoutObj.push({name: coreList[index].name, bodyZone: coreList[index].bodyZone, difficulty:coreList[index].difficulty, primary:coreList[index].primary, description1:coreList[index].description1, description2:coreList[index].description2, description3:coreList[index].description3, description4:coreList[index].description4, description5:coreList[index].description5,tip1:coreList[index].tip1,tip2:coreList[index].tip2,tip3:coreList[index].tip3});
	
	    }
	    
	
	BicepObj = filterForProgram(cacheVar,"Bicep");
	TricepObj = filterForProgram(cacheVar,"Tricep");
	UpperBackObj = filterForProgram(cacheVar,"UpperBack");
	LowerBackObj = filterForProgram(cacheVar,"Lower Back");
	HamstringsObj = filterForProgram(cacheVar,"Hamstrings");
	QuadsObj = filterForProgram(cacheVar,"Quads");
	ChestObj = filterForProgram(cacheVar,"Chest");
	ShoulderObj = filterForProgram(cacheVar,"Shoulder");
	CalfsObj = filterForProgram(cacheVar,"Calfs");   

}


function removeExercise(itemId)
{
	var exerciseItemID = itemId; 
	alert(exerciseItemID);
}

function filterForProgram(cacheVar,bodyPartChoice)
{
	var removedFromArray = 0;
	var bodyPartArray = [];
	var bodyPartIndex = 0;
//***********For Level 1 Phase 1 people ************//
	for(var i = 0; i<cacheVar.length; i++)
	{
		if(cacheVar[i].primary == bodyPartChoice)
		{
		      if(bodyPartArray.length > 0)
		      {
		    	  bodyPartArray.push({name: cacheVar[i].name, bodyZone: cacheVar[i].bodyZone, difficulty:cacheVar[i].difficulty, type:cacheVar[i].type, priority:cacheVar[i].priority, primary:cacheVar[i].primary, description1:cacheVar[i].description1, description2:cacheVar[i].description2, description3:cacheVar[i].description3, description4:cacheVar[i].description4, description5:cacheVar[i].description5, tip1:cacheVar[i].tip1, tip2:cacheVar[i].tip2, tip3:cacheVar[i].tip3});	      	
		    	  bodyPartIndex++;
		    	  
			      $("#item" + i).css("display","none");
			      for(var counter = 0; counter < nameList.length; counter++)
			      {
			    	  if($("#item" + i).attr("name") ==  nameList[counter])
			    	  {
			    		  removeFromArray = (counter + 1);
			    		  nameList[counter] == nameList[removedFromArray];
			    		  for(var index = removedFromArray; index< (cacheVar.length - removeFromArray); index++)
			    		  {
			    			  nameList[index] = nameList[index + 1];
			    		  }
			    		  nameList.pop();
			    		  
			    	  }
			    	  else
			    	  {
			    		  nameList[counter] = nameList[removedFromArray];
			    		  removedFromArray++;
			    	  }
			    	  
			      }
		      }	 
		      else
		      {		    	  		    	  
		    	  bodyPartArray.push({name: cacheVar[i].name, bodyZone: cacheVar[i].bodyZone, difficulty:cacheVar[i].difficulty, type:cacheVar[i].type, priority:cacheVar[i].priority, primary:cacheVar[i].primary, description1:cacheVar[i].description1, description2:cacheVar[i].description2, description3:cacheVar[i].description3, description4:cacheVar[i].description4, description5:cacheVar[i].description5, tip1:cacheVar[i].tip1, tip2:cacheVar[i].tip2, tip3:cacheVar[i].tip3});	      	
		      }
		}	
		
	}
	return bodyPartArray;
}

function replaceAutomation(bodyPartObj,bodyPartCounter,listName, removeVar)
{
	var replaceVar = document.getElementsByName(bodyPartObj[bodyPartCounter].name);

	for(var i = 0; i<listName.length; i++)
	{
		if(listName[i] == removeVar)
			{
				listName[i] = $("#" + replaceVar[0].id).attr("name");
			}

	}

}

function notification(message)
{
	if($(".workoutToast").text().length == 0)
	{
		if($(".toastMessage").text() != message)
		{
			$("#workoutBody").prepend("<div class='workoutToast'><label class='toastMessage'>Exercise Replaced With "+message+"</label></div>")
			$(".workoutToast").animate({"width":"300px"},300);
	 	 
			$(".workoutToast").animate({"opacity":"0"},1500).promise().then(function(){
				$(".workoutToast").remove();
			});
	
	 	
	 	
			$("#workoutBody").click(function(){
				$(".workoutToast").remove();
			});
			
		}
	}
	
}

function removeDeleteArea(deleteIndex)
{
	 $("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"});//Animate the delete area so that it returns to a 0 width
	 $(".deleteIcon").animate({"width":"0px"},500,function(){
		 $(".deleteIcon").empty();
		 $(".deleteIcon").remove();//remove it from the html.	
	 });
		 $("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"});
		 $(".favIcon").animate({"width":"0px"},500,function(){
			 $(".favIcon").empty();
			 $(".favIcon").remove();
		 });
}
function removeExercise(removeID)
{
	$("#" + removeID).css("display","none"); //Hide the item
}
function replaceExercise(direction,bodyPartCounter,BodyPartObj)
{
	if(direction == "left")
	{
		 
		 var replaceVar = document.getElementsByName(BodyPartObj[bodyPartCounter].name);
		 $("#" + replaceVar[0].id).css("display","block"); 
	}
	else if(direction == "right")
	{
		var replaceVar = document.getElementsByName(BodyPartObj[bodyPartCounter].name);
		$("#" + replaceVar[0].id).css("display","block"); 
	}
		
		
}
