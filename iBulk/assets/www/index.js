$(document).ready(function() {
	
var currentUser = Parse.User.current();
if(currentUser){
	window.location = "workout.html"; 
}
else	
{	
	
//----------------------------------------------------------//
	//---------------details page------------------------//
//----------------------------------------------------------//
	$("#detailsButton").click(function(){
		var height;
		var feetToInches;
		var feet;
		var inches;
		feet = parseInt($("#feet").val());
		
		inches = parseInt($("#inches").val());
	
		feetToInches = feet * 12;
		height = feet + feetToInches;
		$("#txtHeight").val(height);
		navigate("detailsPage", "healthPage");
	});

//----------------------------------------------------------//
	//---------------health page------------------------//
//----------------------------------------------------------//
	$("#healthButton").click(function(){
		if($("#heartYes").is(':checked'))
		{
			if(confirm("If you clicked yes to any of these options, it is strongly recommended that you speak to a doctore before proceeding.") == true)
				{
					navigate("healthPage", "goalsPage");
				}
		}
		else if($("#heartPainYes").is(':checked'))
		{
			if(confirm("If you clicked yes to any of these options, it is strongly recommended that you speak to a doctore before proceeding.") == true)
			{
				navigate("healthPage", "goalsPage");
			}
		}
		else if($("#dizzyYes").is(':checked'))
		{
			if(confirm("If you clicked yes to any of these options, it is strongly recommended that you speak to a doctore before proceeding.") == true)
			{
				navigate("healthPage", "goalsPage");
			}
		}
		else if($("#bloodYes").is(':checked'))
		{
			if(confirm("If you clicked yes to any of these options, it is strongly recommended that you speak to a doctore before proceeding.") == true)
			{
				navigate("healthPage", "goalsPage");
			}
		}
		else if($("#jointYes").is(':checked'))
		{
			if(confirm("If you clicked yes to any of these options, it is strongly recommended that you speak to a doctore before proceeding.") == true)
			{
				navigate("healthPage", "goalsPage");
			}
		}
		else
			{
				navigate("healthPage", "goalsPage");
			}
	});

	
//----------------------------------------------------------//
//-----------------------goals------------------------------//
//----------------------------------------------------------//

	$("#goalsButton").click(function(){
		navigate("goalsPage","activityLevelPage")
	})
	

//----------------------------------------------------------//
//-----------------------Activity Level ----------------//
//----------------------------------------------------------//
	$("#activityButton").click(function(){
		
		if($("#noActivity").is(':checked'))
		{
			$("#cardio").val('1');

		}
		else if($("#lightActivity").is(':checked'))
		{
			$("#cardio").val('2');

		}
		else if($("#moderateActivity").is(':checked'))
		{
			$("#cardio").val('3');

		}
		else if($("#highActivity").is(':checked'))
		{
			$("#cardio").val('4');

		}
		navigate("activityLevelPage","liftingLevelPage")
		
	});
	
//----------------------------------------------------------//
//-----------------------Lifting Level ----------------//
//----------------------------------------------------------//
	$("#levelButton").click(function(){
		
		if($("#level1").is(':checked'))
		{
			$("#level").val('1');

		}
		else if($("#level2").is(':checked'))
		{
			$("#level").val('2');

		}
		else if($("#level3").is(':checked'))
		{
			$("#level").val('3');

		}
		else if($("#level4").is(':checked'))
		{
			$("#level").val('4');

		}
	
				alert($("#txtPassword").val());
				alert($("#txtEmail").val());
				alert($("#ageDrop").val());
				alert($("#weightTxt").val());
				alert($("#txtHeight").val());
				alert($("#idlWeight").val());
				alert($("#focusArea").val());
				alert($("#level").val());
				alert($("#cardio").val());
		
		register($("#txtPassword").val(),
				 $("#txtEmail").val(),
				 $("#ageDrop").val(),
				 $("#weightTxt").val(),
				 $("#txtHeight").val(),
				 $("#idlWeight").val(),
				 $("#focusArea").val(),
				 $("#level").val(),
				 $("#cardio").val());
				
	});
	
	//----------------------------------------------------------//
	//-----------------------Tutorial page----------------//
	//----------------------------------------------------------//
	 $('#page1').attr('checked',true);
	 $("#page1").css("background-color","black");

	$("input[name=welcome]:radio").change(function () {
		alert($("#indicatorGroup input[name='welcome']:checked").val());
	if($("#indicatorGroup input[name='welcome']:checked").val() == '1')
	{
			$("#page1").css("background-color","black");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
		
			
		$("#page1").attr('checked', true);
		$("#page2").attr('checked', false);
		$("#page3").attr('checked', false);
		$("#page4").attr('checked', false);
		$("#page5").attr('checked', false);
		$("#page6").attr('checked', false);
		
		$("#screen1").css("display","inline");
		$("#screen2").css("display","none");
		$("#screen3").css("display","none");
		$("#screen4").css("display","none");
		$("#screen5").css("display","none");
		$("#screen6").css("display","none");
		
		
	}
	else if($("#indicatorGroup input[name='welcome']:checked").val() == '2')
	{
		$("#page1").css("background-color","white");
		$("#page2").css("background-color","black");
		$("#page3").css("background-color","white");
		$("#page4").css("background-color","white");
		$("#page5").css("background-color","white");
		$("#page6").css("background-color","white");
		
		$("#page1").attr('checked', false);
		$("#page2").attr('checked', true);
		$("#page3").attr('checked', false);
		$("#page4").attr('checked', false);
		$("#page5").attr('checked', false);
		$("#page6").attr('checked', false);
		
		$("#screen1").css("display","none");
		$("#screen2").css("display","inline");
		$("#screen3").css("display","none");
		$("#screen4").css("display","none");
		$("#screen5").css("display","none");
		$("#screen6").css("display","none");
	}
	else if($("#indicatorGroup input[name='welcome']:checked").val() == '3')
	{
		$("#page1").css("background-color","white");
		$("#page2").css("background-color","white");
		$("#page3").css("background-color","black");
		$("#page4").css("background-color","white");
		$("#page5").css("background-color","white");
		$("#page6").css("background-color","white");
		
		$("#page1").attr('checked', false);
		$("#page2").attr('checked', false);
		$("#page3").attr('checked', true);
		$("#page4").attr('checked', false);
		$("#page5").attr('checked', false);
		$("#page6").attr('checked', false);
		
		$("#screen1").css("display","none");
		$("#screen2").css("display","none");
		$("#screen3").css("display","inline");
		$("#screen4").css("display","none");
		$("#screen5").css("display","none");
		$("#screen6").css("display","none");
	}
	else if($("#indicatorGroup input[name='welcome']:checked").val() == '4')
	{
		$("#page1").css("background-color","white");
		$("#page2").css("background-color","white");
		$("#page3").css("background-color","white");
		$("#page4").css("background-color","black");
		$("#page5").css("background-color","white");
		$("#page6").css("background-color","white");
		
		$("#page1").attr('checked', false);
		$("#page2").attr('checked', false);
		$("#page3").attr('checked', false);
		$("#page4").attr('checked', true);
		$("#page5").attr('checked', false);
		$("#page6").attr('checked', false);
		
		$("#screen1").css("display","none");
		$("#screen2").css("display","none");
		$("#screen3").css("display","none");
		$("#screen4").css("display","inline");
		$("#screen5").css("display","none");
		$("#screen6").css("display","none");
		
	}
	else if($("#indicatorGroup input[name='welcome']:checked").val() == '5')
	{
		$("#page1").css("background-color","white");
		$("#page2").css("background-color","white");
		$("#page3").css("background-color","white");
		$("#page4").css("background-color","white");
		$("#page5").css("background-color","black");
		$("#page6").css("background-color","white");
		
		$("#page1").attr('checked', false);
		$("#page2").attr('checked', false);
		$("#page3").attr('checked', false);
		$("#page4").attr('checked', false);
		$("#page5").attr('checked', true);
		$("#page6").attr('checked', false);
		
		$("#screen1").css("display","none");
		$("#screen2").css("display","none");
		$("#screen3").css("display","none");
		$("#screen4").css("display","none");
		$("#screen5").css("display","inline");
		$("#screen6").css("display","none");
		
	}
	else
	{
		$("#page1").css("background-color","white");
		$("#page2").css("background-color","white");
		$("#page3").css("background-color","white");
		$("#page4").css("background-color","white");
		$("#page5").css("background-color","white");
		$("#page6").css("background-color","black");
			
		$("#page1").attr('checked', false);
		$("#page2").attr('checked', false);
		$("#page3").attr('checked', false);
		$("#page4").attr('checked', false);
		$("#page5").attr('checked', false);
		$("#page6").attr('checked', true);
		
		$("#screen1").css("display","none");
		$("#screen2").css("display","none");
		$("#screen3").css("display","none");
		$("#screen4").css("display","none");
		$("#screen5").css("display","none");
		$("#screen6").css("display","inline");
		
	}
	});
	
	$("#arrowRight").on('click', function(){
		alert($("#indicatorGroup input[name='welcome']:checked").val());
		if($("#page1").prop("checked", true))
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","black");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
			
			$("#screen1").css("display","none");
			$("#screen2").css("display","inline");
			$("#screen3").css("display","none");
			$("#screen4").css("display","none");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', true);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '2';

		}
		else if($("#page2").prop("checked", true))
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","black");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
			
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","inline");
			$("#screen4").css("display","none");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', true);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '3';

		}
		else if($("#page3").prop("checked", true))
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","black");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
				
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","none");
			$("#screen4").css("display","inline");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', true);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '4';

			
		}
		else if($("#page4").prop("checked", true))
		{
			
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","black");
			$("#page6").css("background-color","white");
				
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","none");
			$("#screen4").css("display","none");
			$("#screen5").css("display","inline");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', true);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '5';

			
		}
		else if($("#page5").prop("checked", true))
		{
		
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","black");
				
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","none");
			$("#screen4").css("display","none");
			$("#screen5").css("display","none");
			$("#screen6").css("display","inline");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', true);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '6';

			
		}
	});
	
	$("#arrowLeft").on('click', function(){
		alert($("#indicatorGroup input[name='welcome']:checked").val());
		if($("#indicatorGroup input[name='welcome']:checked").val() == '6')
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","black");
			$("#page6").css("background-color","white");
				
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","none");
			$("#screen4").css("display","none");
			$("#screen5").css("display","inline");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', true);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '5';

			
			
		
		}
		else if($("#indicatorGroup input[name='welcome']:checked").val() == '5')
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","black");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
				
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","none");
			$("#screen4").css("display","inline");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', true);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '4';

		}
		else if($("#indicatorGroup input[name='welcome']:checked").val() == '4')
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","black");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
			
			$("#screen1").css("display","none");
			$("#screen2").css("display","none");
			$("#screen3").css("display","inline");
			$("#screen4").css("display","none");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', true);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '3';

		}
		else if($("#indicatorGroup input[name='welcome']:checked").val() == '3')
		{
			$("#page1").css("background-color","white");
			$("#page2").css("background-color","black");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
			
			$("#screen1").css("display","none");
			$("#screen2").css("display","inline");
			$("#screen3").css("display","none");
			$("#screen4").css("display","none");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', false);
			$("#page2").attr('checked', true);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '2';

		}
		else if($("#indicatorGroup input[name='welcome']:checked").val() == '2')
		{
			$("#page1").css("background-color","black");
			$("#page2").css("background-color","white");
			$("#page3").css("background-color","white");
			$("#page4").css("background-color","white");
			$("#page5").css("background-color","white");
			$("#page6").css("background-color","white");
			
			$("#screen1").css("display","inline");
			$("#screen2").css("display","none");
			$("#screen3").css("display","none");
			$("#screen4").css("display","none");
			$("#screen5").css("display","none");
			$("#screen6").css("display","none");
			
			$("#page1").attr('checked', true);
			$("#page2").attr('checked', false);
			$("#page3").attr('checked', false);
			$("#page4").attr('checked', false);
			$("#page5").attr('checked', false);
			$("#page6").attr('checked', false);
			
			$("#indicatorGroup input[name='welcome']:checked").val() = '1';

		}
	});
	
	$("#getStarted").click(function(){
		alert("hi");
		alert(localStorage["loggedUser"]);
		localStorage["loggedUser"] = $("#txtEmail").val();
		window.location = "workout.html"; 
	});
	

	
//---------------Check if email is unique----------------///	
function getLevel(email) {

	var UserObj = Parse.Object.extend("User");
	var query = new Parse.Query(UserObj);
	var userLevel = UserObj.get("level");
	var userPhase = UserObj.get("phase");
	
	getExercise(userLevel,userPhase);
	
/*		$.ajax({
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

//------------Navigate to another Page------------///
function navigate(currentPage, pageDest)
{
	
	$("#" +  currentPage).hide();
	$("#" + pageDest).show(200);
	
}
//------------Navigate to another Page with circle animation------------///
function navigateColor(currentPage, pageDest)
{
	var circle = $("#circle");
	var w = window.innerWidth;
	var h = window.innerHeight;
	circle.animate({
	  "width":w+100+"px",
	  "height":h+100+"px",
	  "margin-left":-(w/2)-50+"px",
	  "margin-top":-(h/2)-50+"px"
	}, 450, function() {
	  circle.css({
	    "width":"100%",
	    "border-radius":"0px",
	    "margin":"0px",
	    "top":"0px",
	    "left":"0px",
	    
	  });
	});
	
	$("#circle").css('z-index','0');
	
	
	$("#" +  currentPage).hide();
	$("#" + pageDest).show(290);
	
}


//----------Register function ----------------------------///
function register(password,email,age,weight,height,idlWeight,focusArea,level,cardio) {
	
	var ageNumber = parseInt(age);
	var weightNumber = parseInt(weight);
	var heightNumber = parseInt(height);
	var idlWeightNumber = parseInt(idlWeight);
	var userLevel = level;
	var userCardio = cardio;

	var user = new Parse.User();
	user.set("username", email);
	user.set("password", password);
	user.set("email", email);
	user.set("age", ageNumber);
	user.set("weight", weightNumber);
	user.set("height", heightNumber);
	user.set("idlWeight", idlWeightNumber);
	user.set("focusArea", focusArea);
	user.set("level", userLevel);
	user.set("cardio", userCardio);
	user.set("phase", 1);
	  
	user.signUp(null, {
	  success: function(user) {
	    // Hooray! Let them use the app now.
	  },
	  error: function(user, error) {
	    // Show the error message somewhere and let the user try again.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

}
});
