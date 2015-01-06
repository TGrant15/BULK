$(document).ready(function() {
Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");

var profilePageFlag;
var bodyHeight = $("#proBody").height();
/*					localStorage["idlWeight"] = user.get("idlWeight");
					localStorage["focusArea"] = user.get("focusArea");

					localStorage["calorieReq"] = user.get("calorieReq");
*/
$("#profileAge").text(localStorage["age"]);
$("#profileWght").text(localStorage["weight"]);
$("#profileHgt").text(localStorage["height"]);
$("#profileBF").text();
$("#profileIdlWght").text(localStorage["idlWeight"] + " Lbl");
$("#profileFocusArea").text(localStorage["focusArea"]);
$("#profileCalorieReq").text(localStorage["calorieReq"]);


$(".profileTabsContainer").css("height",bodyHeight);

	$("#profileTabSelect").click(function(){
		$("#activityInfo").css("display","none");
		$("#profileInfo").css("display","block");
		$("#progressInfo").css("display","none");
		$("#profileUbar").animate({"margin-left":"0%"},100);

	});
	$("#activityTabSelect").click(function(){
		$("#activityInfo").css("display","block");
		$("#profileInfo").css("display","none");
		$("#progressInfo").css("display","none");
		$("#profileUbar").animate({"margin-left":"33%"}, 100);

	});
		$("#progressTabSelect").click(function(){
		$("#activityInfo").css("display","none");
		$("#profileInfo").css("display","none");
		$("#progressInfo").css("display","block");
		$("#profileUbar").animate({"margin-left":"66%"}, 100);

	});

$(".arrowIcon").click(function()
{
    	//***If the user has hit the action button and started a workout.**//
    	if(profilePageFlag == "add")
    	{
    		$("#addMealPage").animate({ left: "392px" });
    		$("#menuIcon").animate({"height":"25px"},200);
            $("#arrowIcon").animate({"height":"0px"},200);
            profilePageFlag = "stop";
    	}
    	else //**Hide the menu screen**//
    	{
    		$(".overlay").css("display","none");
    		$("#workoutOverviewTitle").text("Today's Workout");
    		$("#panelScreen").animate({"left":"-101%"},400);
    		$("#menuIcon").animate({"height":"25px"},200);
    		$("#arrowIcon").animate({"height":"0px"},200);
    		$(".workoutHead").css("z-index","1000");
    	}
});

	$(".menu").click(function(){
	  $(".overlay").css("display","block");
	  $("#panelScreen").animate({"left":"0%"},400);
	  $("#menuIcon").animate({"height":"0px"},200);
	  $("#arrowIcon").animate({"height":"25px"},200);
	  $(".workoutHead").css("z-index","1054");
	});

	//------------------------------------------------------------//
//----------- Menu------------------------------------------//
//------------------------------------------------------------//
$("#logout").click(function(){
	Parse.User.logOut();
	window.location = "index.html";
});
$("#logoutMenu").click(function(){
localStorage.removeItem("workoutCache");
localStorage.removeItem("phase");
localStorage.removeItem("level");
localStorage.clear();
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

	$("#yellowProfile").click(function(){
	  window.location = "editProfile.html";
	});

	$("#profileBody").scroll(function(){
	});
});
