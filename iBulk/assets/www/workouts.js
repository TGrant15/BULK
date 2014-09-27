Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");
/*********Global Variables*********/
var current = Parse.User.current();
var username = current.get("username");
var level;
var phase;
var started = "no";
var timerSwitch = "off";
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
var BicepFilterCounter;

var TricepObj = [];
var TricepFilterCounter;

var UpperBackObj = [];
var UpperBackFilterCounter;

var LowerBackObj = [];
var LowerBackFilterCounter;

var ShoulderObj = [];
var ShoulderFilterCounter;

var HamstringsObj = [];
var HamstringsFilterCounter;

var CalfObj = [];
var CalfFilterCounter;

var QuadsObj = [];
var QuadsFilterCounter;

var GlutesObj = [];
var GlutesFilterCounter;

var AbsObj = [];
var AbsFilterCounter;


/*************************************/
var workoutObj = [];
var nameCount = 0;
//var timer = 90;
var setCount = 1;
var Weight = Parse.Object.extend("Weight");	
var weightId;
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
		getLevel(current.get("username"));
}
else
{
	//****Store Local Storage Data with cached workouts.
	cachedWorkoutCheck = jQuery.parseJSON(localStorage["workoutCache"]);
	//*Store the length of the obj in this variable.
	cacheObjLength = cachedWorkoutCheck.length;
	

	//**if the length of the cached object is greater than 1, then this confirms that data has been cached.
	if(cachedWorkoutCheck.length > 1)
	{
		//* Generate the workouts using the cached objects.
		generateWorkout(cachedWorkoutCheck);
	}
	else//**If it is not cached get the level and phase of the user and generate the workout.
	{
		
		getLevel(username);

	}
}

BicepObj = filterForProgram(cachedWorkoutCheck,"Bicep");
TricepObj = filterForProgram(cachedWorkoutCheck,"Tricep");
UpperBackObj = filterForProgram(cachedWorkoutCheck,"Upper Back");
LowerBackObj = filterForProgram(cachedWorkoutCheck,"Lower Back");
HamstringsObj = filterForProgram(cachedWorkoutCheck,"Hamstrings");
QuadsObj = filterForProgram(cachedWorkoutCheck,"Quads");
ChestObj = filterForProgram(cachedWorkoutCheck,"Chest");
ShoulderObj = filterForProgram(cachedWorkoutCheck,"Shoulder");

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
Parse.User.logOut();
var emptyObj = [];
emptyObj.push({name:"empty"});
var empty = JSON.stringify(emptyObj);
localStorage["workoutCache"] = empty;
window.location = "index.html"; 
});

$("#settingsPageButton").click(function(){
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

//********This is where users can delete or archive exercises that they like***************//
$(".workoutCards").swipe( {
    //Generic swipe handler for all directions
	swipeStatus:function(event, phase, direction, distance, duration, fingers)
    {
		
		if(direction == "left")
		{
			var str = 0;
			var deleteStr = 0;
			
		    var removeID = $(this).attr('id');
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
					 if($("#deleteIcon" + deleteIndex).text().length == 0)
					{
						$(".favIcon").remove();

						$("#"+removeID).append('<div class="deleteIcon" id="deleteIcon'+deleteIndex+'"><img class="trashIcon" src="img/trash.png"/><label class="deleteLabel">Delete</label></div>');						 
					}

			         str-=distance;
			         deleteStr+=distance;
			         $("#deleteIcon" + deleteIndex).css("width",deleteStr + "px");
			         $("#workoutCardContainerItem" + deleteIndex).css("margin-left",str + "px");
			         
		         
			         if(distance > 175)
			         {
			        	 if(confirm("Are you sure you want to remove this exercise")==true)
			     		{
			        		 $("#" + removeID).css("display","none");
			        		 $("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"});
			             		$(".deleteIcon").animate({"width":"0px"},500,function(){
				             		$(".deleteIcon").empty();
						            $(".deleteIcon").remove();
			             		});
			        		 
			        		 var bodypart = $("#" + removeID).attr("bodypart");
			        		 
			        		/* if(bodypart == "Bicep")
			        		{
			        			 var replaceVar = document.getElementsByName(BicepObj[BicepFilterCounter].name);
			        			 $("#" + replaceVar[0].id).css("display","block"); 
			        		}*/
			        		 		        		 
			        		 switch (bodypart) {
			        		    case "Bicep":
			        		        
				        			 var replaceVar = document.getElementsByName(BicepObj[BicepFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 BicepFilterCounter++;

				        			 break;
			        		    case "Tricep":
				        			 var replaceVar = document.getElementsByName(TricepObj[TricepFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 TricepFilterCounter++;
				        			 
			        		        break;
			        		    case "Upper Back":
				        			 var replaceVar = document.getElementsByName(UpperBackObj[UpperBackFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 UpperBackFilterCounter++;

			        			 
			        		        break;
			        		    case "Shoulders":
				        			 var replaceVar = document.getElementsByName(ShoulderObj[ShoulderFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 ShoulderFilterCounter++;

			        		         break;
			        		    case "Chest":
				        			 var replaceVar = document.getElementsByName(ChestObj[ChestFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 ChestFilterCounter++;

			        		        break;
			        		        
			        		    case "Hamstrings":
				        			 var replaceVar = document.getElementsByName(HamstringObj[HamstringFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 HamstringsFilterCounter++;

			        		        break;
			        		        
			        		    case "Quads":
				        			 var replaceVar = document.getElementsByName(QuadObj[QuadFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block");
				        			 
				        			 QuadsFilterCounter++;
				        			 
			        		        break;	
			        		    case "Abs":
				        			 var replaceVar = document.getElementsByName(AbsObj[AbsFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 AbsFilterCounter++;

				        			 
			        		        break;
			        		}
			        		 
			        		 
			             	 $("#workoutBody").prepend("<div id='workoutToast'><label>Exercise Replaced With "+BicepObj[BicepFilterCounter].name+"</label></div>")
			             	 $("#workoutToast").animate({"width":"300px"},300);
			             	 
			             	setTimeout(function(){
				             	 $("#workoutToast").animate({"opacity":"0"},1000);
				             	 $(".deleteIcon").remove();
	
			             	}, 1000);
			             	
			             	$("#workoutBody").click(function(){
			             		$("#workoutToast").remove();
			             	});
			             	 
						      

			
			     		}
			        	else 
			            {
			             		$("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"});
			             		$(".deleteIcon").animate({"width":"0px"},500,function(){
				             		$(".deleteIcon").empty();
						            $(".deleteIcon").remove();
			             		});



	
			            }
			         }
				 }
     
         
			 }
			 else
			 {
				 $("#favIcon"+deleteIndex).css("width","0px");
				 $("#deleteIcon" + deleteIndex).animate({"width":"0px"}, 500, function(){
	             		$(".deleteIcon").empty();
			            $(".deleteIcon").remove();
				 });
				 $("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"},500);	
				 $(".favIcon").empty();
				 $(".favIcon").remove();

				 
			 }
		}
		else if(direction == "right")
		{
			var str = 0;
			var deleteStr = 0;
		    var removeID = $(this).attr('id');
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
			        	 if(confirm("Are you sure you want to save this exercise")==true)
			     		{
			       /* 		 switch (bodypart) {
			        		    case "Bicep":
			        		        
				        			 var replaceVar = document.getElementsByName(BicepObj[BicepFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 BicepFilterCounter--;

				        			 break;
			        		    case "Tricep":
				        			 var replaceVar = document.getElementsByName(TricepObj[TricepFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 TricepFilterCounter--;
				        			 
			        		        break;
			        		    case "Upper Back":
				        			 var replaceVar = document.getElementsByName(UpperBackObj[UpperBackFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 UpperBackFilterCounter--;

			        			 
			        		        break;
			        		    case "Shoulders":
				        			 var replaceVar = document.getElementsByName(ShoulderObj[ShoulderFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 ShoulderFilterCounter--;

			        		         break;
			        		    case "Chest":
				        			 var replaceVar = document.getElementsByName(ChestObj[ChestFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 ChestFilterCounter--;

			        		        break;
			        		        
			        		    case "Hamstrings":
				        			 var replaceVar = document.getElementsByName(HamstringObj[HamstringFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 HamstringsFilterCounter--;

			        		        break;
			        		        
			        		    case "Quads":
				        			 var replaceVar = document.getElementsByName(QuadObj[QuadFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block");
				        			 
				        			 QuadsFilterCounter--;
				        			 
			        		        break;	
			        		    case "Abs":
				        			 var replaceVar = document.getElementsByName(AbsObj[AbsFilterCounter].name);
				        			 $("#" + replaceVar[0].id).css("display","block"); 
				        			 
				        			 AbsFilterCounter--;

				        			 
			        		        break;
			        		}*/
			        		alert("saved!");
			        		$("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"});
		             		$(".favIcon").animate({"width":"0px"},500,function(){
								 $(".favIcon").empty();
								 $(".favIcon").remove();
		             		});

			
			     		}
			        	else
			        	{
			        		//$("#" + removeID).animation({"margin-left":"0px"});
		             		$("#workoutCardContainerItem" + deleteIndex).animate({"margin-left":"0px"}); 
		             		$("#favIcon"+deleteIndex).animate({"width":"0px"},500,function(){
								 $(".favIcon").empty();
								 $(".favIcon").remove();
		             		});

			        	}

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

/*$(".workoutCards").on( "swipeleft", function(){
	var removeID = $(this).attr('id');
	alert(removeID);
	//removeExercise(removeID);
});*/

//----------------------------------------------------------//
//----------------------- workout page  ----------------//
//----------------------------------------------------------//	
//*****This is the on scroll method****//
$("#workoutContent").scroll(function(){
	/*	$('.workoutTabs').css( "box-shadow", "0 0 6px 0" );
		
		var pos = $("#workoutContent").scrollTop();
		if(pos==0)
			{
				$('.workoutTabs').css("box-shadow","0 0 0px 0");
			}	*/
});
	
//*******This is the blue action button*****//	
$("#blue").click(function(){
		timerSwitch = "on"; //This indicates wether the timer has been started
		$("#timeLabel").text("Seconds"); //Set the time label to seconds
		$("#timeAnimation").text("90"); //set the time animation to 90
		timer=90;	//this is setting the actual timer to 90 seconds..

		//***This parse query will find the the workout that is equal the exercise, and the user
		//** and make udates to the workout log accordingly*****//
		var query = new Parse.Query(Weight);
		query.equalTo("wght_exercise", nameList[nameCount]); 
		query.equalTo("wght_user", username); 		
		query.find({
			  success: function(results) {
				var weightText, weightNum; 
				$("#rcmendWeight").text(rcmndedWeight[0]);
				if(rcmndedWeight[nameCount] == "Just the Bar")
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
				}
				
				if (results.length == 0)
				{
					weight.set("wght_user", username);
					weight.set("wght_exercise", nameList[nameCount]);
					weight.set("wght_recommended", weightNum);
					weight.save().then(function(weight){
						weightId=weight.id;
					});

						
					
				}
				else
				{			
					weightId=results[0].id;
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
		    	clearInterval(interval);
		    	$("#timeAnimation").text("");
		    	$("#timeLabel").css("margin-left", "-146px");
		    	$("#timeLabel").text("READY!");
		    }
		    
		}, 1000);
		//}
		started = "yes";
		
	});
	
//------------------------------------------------------------//
//----------- Workout start------------------------------------//
//------------------------------------------------------------//

$("#startButton").click(function(){
	if(timerSwitch == "on") 
		{
		startCounter++;


		$(".timer").css("display","none");
		$("#startButton").text("Submit");
		$("#weightPerformed").css("display","block");
		$("#set").text("Set ");
		$("#setNum").text(setCount + " of 3");
  	//$("#timeLabel").text(" Seconds");
  	
		
		
		// check the database to see if the workout already exists for the specific user.
		var ExerciseQuery = $("#workoutOverviewTitle").text();
		
		var query = new Parse.Query(Weight);
		
		query.equalTo("wght_exercise", ExerciseQuery); 
		query.equalTo("wght_user", username); 
		
		query.find({
			  success: function(results) {
				var weightText, weightNum; 
				  if(rcmndedWeight[nameCount] == "Just the Bar")
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
					}
				 // if it does not exist create it 
				if (results.length == 0)
				{
					alert("0 exist in database");
					var Weight = Parse.Object.extend("Weight");	
					var weight = new Weight();
					
					weight.set("wght_user", username);
					weight.set("wght_exercise", ExerciseQuery);
					weight.set("wght_recommended", weightNum);


					
					
					weight.save().then(function(weight) {
						weightId=weight.id;
						}, function(error) {
						  // the save failed.
						});
	

				}
				else //if it exists store the ID.
				{
					alert(weightNum);
					weight.set("wght_recommended", parseInt(weightNum));
					
					weight.save().then(function(weight) {
					weightId=weight[0].id;
					});

				}
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});

			timerSwitch ="off";
			
			

		}
	else if(timerSwitch == "off")
		{
			timerSwitch = "on";
			var setDatabaseCount = "wght_set" + setCount;
			var weightPerformed = parseInt($("#weightPerformed").val());
			var query = new Parse.Query(Weight);
			query.get(weightId, {
			  success: function(weight) {
				 weight.set(setDatabaseCount, weightPerformed);
				 weight.save();
			  },
			  error: function(weight, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			  }
			});
			
		
			$("#weightPerformed").val('');
			
			$("#startButton").text("Start");
			$("#weightPerformed").css("display","none");
			
			$("#timeAnimation").text("90");
			timer=90;
			$(".timer").css("display","block");
				
			if(setCount == 3)
			{
				$("#weightAdjForm").css("display","block");
				$(".overlay").css("display", "block");
				$("#weightAdjSbmt").click(function(){
					
					var query = new Parse.Query(Weight);
					query.get(weightId, {
					  success: function(weight) {
						  var increase = weightPerformed+5;
						  var decrease = weightPerformed-5;
						  
						  if($("#tooLight").is(':checked'))
							{
								$("#weightAdjForm").css("display","none");
								$(".overlay").css("display", "none");
								 weight.set("wght_recommended", increase);
								 weight.save().then(function(){
								 alert("New recommended Weight!");
								 });
							}
							else if($("#tooHeavy").is(':checked'))
							{
								$("#weightAdjForm").css("display","none");
								$(".overlay").css("display", "none");
								 weight.set("wght_recommended", decrease);
								 weight.save().then(function(){
								 alert("New recommended Weight!");
								 });
							}
							else if($("#Perfect").is(':checked'))
							{
								$("#weightAdjForm").css("display","none");
								$(".overlay").css("display", "none");
								 weight.set("wght_recommended", weightPerformed);
								 
								 weight.save().then(function(){
								 alert("New recommended Weight!");
								 });
							}
							else
							{
								alert("you must choose something");
							}
						  	weight.save();
					  },
					  error: function(weight, error) {
					    // The object was not retrieved successfully.
					    // error is a Parse.Error with an error code and description.
					  }
					});
						
					
				});
				
				nameCount++;
				setCount=1;
				$("#workoutOverviewTitle").text(nameList[nameCount]);
				$("#rcmendWeight").text(rcmndedWeight[nameCount]);
			

				if(nameList[nameCount] == undefined)
				{
					$(".startWorkoutImg").animate({"width":"0%"},300);
					$(".startWorkoutImg").empty();
					$("#set").animate({"margin-left":"-160px"},300);
					$("#setNum").animate({"margin-right":"0px"},300);
					$("#rcmendWeight").animate({"margin-left":"376px"},300);
					$("#timerContainer").animate({"margin-left":"-360px"},300);
					$(".workoutHead").animate({"margin-top": "-280px"},300);
					$("#startButton").text("Finished");
					$("#startButton").animate({"top": "-120px"});
					timerSwitch = "complete";
					
					setTimeout(function() {
						$("#completeMessage").css("display","block");
					}, 500);
					
					
				}
				
			}
			else
			{
				setCount++;
			}
			
			
			$("#setNum").text(setCount + " of 3");
			if(nameCount == (nameList.length*3))
			{
				alert("complete");
			}			
					
		}
		else if(timerSwitch == "complete")
		{
			window.location = "workout.html";
		}
	
	
	
});

});

function navigate(currentPage, pageDest)
{
	
	$("#" +  currentPage).hide();
	$("#" + pageDest).show(200);
	
}

function getLevel(email) {
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", current.get("username"));
	query.find().then(function(results) {
			    for (var i = 0; i < results.length; i++) { 
			      var object = results[i];
			      var pulledLevel = object.get('level');
			      level = parseInt(pulledLevel);
			      }
				 getPhase(pulledLevel);
				});
}
		
function getPhase(email) {

	
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", current.get("username"));
	query.find({
	  success: function(results) {
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) { 
	    	var object = results[i];
		    pulledPhase = object.get('phase');
		    phase = pulledPhase.toString();
	     /* var object = results[i];
	      phase = object.get('phase');
	      alert(phase);*/
	    }
	    getExercise();
	    
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function getExercise() {
	var Exercise = Parse.Object.extend("Exercise");
	
	// Find all workouts that are available for the user that is currently in this level and phase.
	var query = new Parse.Query(Exercise);
	query.equalTo("ex_level", level);
	query.equalTo("ex_phase", phase);
	query.find({
	  success: function(results) {
		  var workoutObj = [];
		    for (var i = 0; i < results.length; i++) {  
			      var object = results[i];
			      var name = object.get('ex_name');
			      var bodyZone = object.get('ex_bodyZone');
			      var type = object.get('ex_type');
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
			      
			      workoutObj.push({name: name, bodyZone: bodyZone, difficulty:difficultyTemp, type:type, primary:primaryTemp, description1:description1Temp, description2:description2Temp, description3:description3Temp, description4:description4Temp, description5:description5Temp, tip1:tip1Temp, tip2:tip2Temp, tip3:tip3Temp});
			      
			      
		    }
		    
		    var jsonString = JSON.stringify(workoutObj);
		    localStorage["workoutCache"] = jsonString;
	
		    cachedWorkouts = [];
		    cachedWorkouts = jQuery.parseJSON(jsonString);
		    
		    generateWorkout(cachedWorkouts);

		 
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function generateWorkout(cacheVar)
{

	var cachedWorkouts = [];
	var cachedWorkouts = cacheVar;
	var compoundCount = 0;
	var workoutCount = 0;
	var coreCount = 0;
	var coreWeight=[];
	
    
	
	// go through each workout that was pulled and get the name, bodyZone, and type of workout.  
    for (var i = 0; i < cachedWorkouts.length; i++) {     
    	var name = cachedWorkouts[i].name;
        var bodyZone = cachedWorkouts[i].bodyZone;
        var type = cachedWorkouts[i].type;
        var difficultyTemp = cachedWorkouts[i].difficulty;
        var primaryTemp = cachedWorkouts[i].primary;
        var description1Temp = cachedWorkouts[i].description1;
        var description2Temp = cachedWorkouts[i].description2;
        var description3Temp= cachedWorkouts[i].description3;
        var description4Temp = cachedWorkouts[i].description4;
        var description5Temp = cachedWorkouts[i].description5;
        var tip1Temp = cachedWorkouts[i].tip1;
        var tip2Temp = cachedWorkouts[i].tip2;
        var tip3Temp = cachedWorkouts[i].tip3;
    	  
      if(bodyZone == "upper")
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

		    	  
		    	
		    	  
		    	  if(level == 1)
		    	  {
		    		  if(phase == "1")
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
    		  if(level == 1)
		    	  {
		    		  if(phase == "1")
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
    		  if(level == 1)
		    	  {
		    		  if(phase == "1")
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
    		  if(level == 1)
	    	  {
	    		  if(phase == "1")
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
  		    	  
  		    	  if(level == 1)
  		    	  {
  		    		  if(phase == "1")
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
	    		  if(level == 1)
  		    	  {
  		    		  if(phase == "1")
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
	    		  if(level == 1)
  		    	  {
  		    		  if(phase == "1")
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
	    		  if(level == 1)
		    	  {
		    		  if(phase == "1")
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

			$("#coreList").append('<li class="workoutCards" id="item'+i+'" name="'+name+'" bodypart="'+primaryTemp+'"><div class="workoutCardContainer" id="workoutCardContainerItem'+i+'"><label id="exLbl'+i+'" class="exName">'+name.toUpperCase()+'</label><br><label class="recommendedLabel">Recommended Weight:</label><label class="recNum" id="upperWeight'+i+'">'+rcmndedWeight[workoutCount]+'</label></div></li>');
			coreCount++;

  		}
    }
    
    for(var i=0; i<=(workoutCount-coreCount); i++)
    {
    	//alert(nameList[i]);
    	//alert(difficulty[i]);
	      workoutObj.push({name: nameList[i], bodyZone: bodyZoneArray[i], difficulty:difficulty[i], type:typeArray[i], primary:primary[i], description1:description1[i], description2:description2[i], description3:description3[i], description4:description4[i], description5:description5[i],tip1:tip1[i],tip2:tip2[i],tip3:tip3[i]});
    
    }
    

    for(var index=0; index<coreCount; index++)
    {
	    workoutObj.push({name: coreList[index].name, bodyZone: coreList[index].bodyZone, difficulty:coreList[index].difficulty, primary:coreList[index].primary, description1:coreList[index].description1, description2:coreList[index].description2, description3:coreList[index].description3, description4:coreList[index].description4, description5:coreList[index].description5,tip1:coreList[index].tip1,tip2:coreList[index].tip2,tip3:coreList[index].tip3});

    }
   
    $(".workoutCards").click(function(){
    	currentDetailID = $(this).attr('id'); 

    	$("#" + currentDetailID).animate({height:"1500px"});
    	$(".exName").animate({"opacity":"0"});
    	$(".recommendedLabel").animate({"opacity":"0"});
    	$(".recNum").animate({"opacity":"0"});
    	$(".workoutList").animate({"margin-top":"62px"});
    	$(".workoutCards").animate({"border-bottom-width": "0px"});
		$("#buttonGroup").animate({"opacity":"0"},200);
    	//$(".workoutHead").hide();
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
    	//$(".workoutHead").show();
    	$(".exitDetail").animate({"opacity":"0"});

    });	
}


function removeExercise(itemId)
{
	var exerciseItemID = itemId; 
	alert(exerciseItemID);
}

function filterForProgram(cacheVar,bodyPartChoice)
{
	bodyPartArray = [];
//***********For Level 1 Phase 1 people ************//
	for(var i = 0; i<cacheVar.length; i++)
	{
		if(cacheVar[i].primary == bodyPartChoice)
		{
		      if(bodyPartArray.length > 0)
		      {
			      $("#item" + i).css("display","none");
		      }
		      else
		      {
		    	  BicepFilterCounter = 1;
		      }
		      
		      bodyPartArray.push({name: cacheVar[i].name, bodyZone: cacheVar[i].bodyZone, difficulty:cacheVar[i].difficulty, type:cacheVar[i].type, primary:cacheVar[i].primary, description1:cacheVar[i].description1, description2:cacheVar[i].description2, description3:cacheVar[i].description3, description4:cacheVar[i].description4, description5:cacheVar[i].description5, tip1:cacheVar[i].tip1, tip2:cacheVar[i].tip2, tip3:cacheVar[i].tip3});
		      

		}
		

	}
	return bodyPartArray;
}
