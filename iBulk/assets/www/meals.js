Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");

/*********Global Variables*********/
var current = Parse.User.current();
var mealPageFlag;
var checkFlag = false;
var mealID = [];
var groceryList=[];
localStorage["mealID"];
localStorage["groceryList"];
var breakfastReq= [];
var lunchReq = [];
var dinnerReq = [];
var snackReq = [];
var breakfastCalReq = 0;
var lunchCalReq;
var dinnerCalReq;
var snackCalReq;
var breakfastFlag = 1;

/************************/
getPhase(current);
getLevel(current);


$(document).ready(function() {

var cachedMealCheck = [];
var prefFood = [];
var storedPrefs = [];

if(localStorage["mealCache"]==undefined)
{

  getMeals();


}
else
{
  storedPrefs = storePref();
	//****Store Local Storage Data with cached workouts.
	cachedMealCheck = jQuery.parseJSON(localStorage["mealCache"]);
	//*Store the length of the obj in this variable.
	//cacheObjLength = cachedWorkoutCheck.length;
	prefFood = filterFood(cachedMealCheck, storedPrefs);
	generateMealPlan(prefFood);




}



$("#yellowMeal").click(function()
{
  $("#addMealPage").css("display","block")
	$("#addMealPage").animate({ left: 0 });
	$("#workoutOverviewTitle").text("Add a Meal");
	$("#menuIcon").animate({"height":"0px"},200);
    $("#arrowIcon").animate({"height":"25px"},200);
    mealPageFlag = "add";

});

//**This is the arrow icon used to take you back//**/
$(".arrowIcon").click(function()
{
    	//***If the user has hit the action button and started a workout.**//
    	if(mealPageFlag == "add")
    	{
    		$("#addMealPage").animate({ left: "392px" });
    		$("#menuIcon").animate({"height":"25px"},200);
            $("#arrowIcon").animate({"height":"0px"},200);
            mealPageFlag = "stop";
        setTimeout(function(){
           $("#addMealPage").css("display","none");
        },300);


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

$(".settingMenuDots").click(function()
		{
			$("#settingMenu").animate({"width":"100px"},200);
			$("#settingMenu").animate({"height":"55px"},200);

		});
$(".menu").click(function()
{
    $(".overlay").css("display","block");
    $("#panelScreen").animate({"left":"0%"},400);
    $("#menuIcon").animate({"height":"0px"},200);
    $("#arrowIcon").animate({"height":"25px"},200);
    $(".workoutHead").css("z-index","1054");

});


$("#lower").css("opacity","0");
$("#core").css("opacity","0");


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
		  $(".buttonGroup").animate({"opacity":"1"},300);
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
var mealObj = [];
function getMeals() {

	var Meals = Parse.Object.extend("Meals");
	var query = new Parse.Query(Meals);
	query.greaterThan("ml_cal", 1);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      var name = object.get('ml_foodName');
	      var category = object.get('ml_cat');
	      var description = object.get('ml_desc');
	      var calorie = object.get('ml_cal');
	      var ID = object.id;
	      var groceryListItems = object.get('ml_ingredients');
	      var dairy = object.get('ml_dairyRq');
	      var fruit = object.get('ml_fruitRq');
	      var veg = object.get('ml_vegRq');
	      var grain = object.get('ml_grainRq');
	      var protein = object.get('ml_proteinRq');
	      var type = object.get("ml_type");
	      mealID[i] = ID;


	      mealObj.push({ID:ID, name:name, category:category, type:type, desc:description, calorie:calorie, ingredients:groceryListItems, dairyBool:dairy, fruitBool:fruit, vegBool:veg, grainBool:grain, proteinBool:protein});

	    }

	      var jsonString = JSON.stringify(mealObj);
		    localStorage["mealCache"] = jsonString;

		    cachedMeals = [];
		    cachedMeals = jQuery.parseJSON(jsonString);

	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	}).then(function(){
	  var storedPrefs = storePref();
	  cachedMeals = jQuery.parseJSON(localStorage["mealCache"]);
	  prefFood = filterFood(cachedMeals, storedPrefs);
	  generateMealPlan(prefFood);
	});
}

function generateMealPlan(cachedMealObject)
{

  for(var i = 0; i < cachedMealObject.length; i++)
  {
        var random = Math.floor((Math.random() * (cachedMealObject.length - 1)) + 1);
	      var name = cachedMealObject[random].name;
	      var category = cachedMealObject[random].category;
	      var description = cachedMealObject[random].desc;
	      var calories = cachedMealObject[random].calorie;
	      var ID = cachedMealObject[random].ID;
	      var groceryListItems = cachedMealObject[random].ingredients;
	      var dairy = cachedMealObject[random].dairyBool;
	      var fruit = cachedMealObject[random].fruitBool;
	      var veg = cachedMealObject[random].vegBool;
	      var grain = cachedMealObject[random].grainBool;
	      var protein = cachedMealObject[random].proteinBool;
	      var type = cachedMealObject[random].type;
	      mealID[random] = ID;

	    if(type == 'main')
	    {
	      var iconSrc = 'img/mainmeal.png'
	    }
	    else if(type == 'sup')
	    {
	      var iconSrc = 'img/snack.png'
	    }
	    else if(type == 'shake')
	    {
	      var iconSrc = 'img/shake.png'
	    }


        var breakfastListCount = 0;
        var addAnotherMeal = [];
        if(category == "breakfast")
        {

          if(breakfastFlag == 1)
          {
            if(breakfastReq.length == 0)
            {
              if(type == 'main')
              {
                breakfastReq.push(dairy);
                breakfastReq.push(fruit);
                breakfastReq.push(veg);
                breakfastReq.push(grain);
                breakfastReq.push(protein);
                breakfastCalReq += calories;
                generateMealItem("breakfastList",i,name,description,calories,iconSrc);

                breakfastFlag = checkReq(breakfastReq);
              }
            }
            else
            {
                for(var z = 0; z < breakfastReq.length; z++)
                {
                  if(breakfastFlag == 1)
                  {

                    if(breakfastReq[z] == 0)
                    {
                      if(z==0)//In this case we are dealing with the dairy req
                      {
                          addAnotherMeal = fillVoidReq("dairy", cachedMealObject, "breakfast");
                          breakfastListCount++;
                          breakfastReq = addReq(addAnotherMeal, breakfastReq);
                          generateMealItem("breakfastList",breakfastListCount,addAnotherMeal.name,addAnotherMeal.desc,addAnotherMeal.calorie,iconSrc);
                          breakfastFlag = checkReq(breakfastReq);
                      }
                      else if(z==1)
                      {
                          addAnotherMeal =fillVoidReq("fruit", cachedMealObject, "breakfast");
                          breakfastListCount++;
                          generateMealItem("breakfastList",breakfastListCount,addAnotherMeal.name,addAnotherMeal.desc,addAnotherMeal.calorie,iconSrc);
                          breakfastReq = addReq(addAnotherMeal, breakfastReq);
                          breakfastFlag = checkReq(breakfastReq);
                      }
                      else if(z==2)
                      {
                          addAnotherMeal = fillVoidReq("veg", cachedMealObject, "breakfast");
                          breakfastListCount++;
                          generateMealItem("breakfastList",breakfastListCount,addAnotherMeal.name,addAnotherMeal.desc,addAnotherMeal.calorie,iconSrc);
                          breakfastReq = addReq(addAnotherMeal, breakfastReq);
                          breakfastFlag = checkReq(breakfastReq);
                      }
                      else if(z==3)
                      {
                          addAnotherMeal =fillVoidReq("grain", cachedMealObject, "breakfast");
                          breakfastListCount++;
                          generateMealItem("breakfastList",breakfastListCount,addAnotherMeal.name,addAnotherMeal.desc,addAnotherMeal.calorie,iconSrc);
                          breakfastReq = addReq(addAnotherMeal, breakfastReq);
                          breakfastFlag = checkReq(breakfastReq);
                      }
                      else if(z==4)
                      {
                          addAnotherMeal =fillVoidReq("protein", cachedMealObject, "breakfast");
                          breakfastListCount++;
                          generateMealItem("breakfastList",breakfastListCount,addAnotherMeal.name,addAnotherMeal.desc,addAnotherMeal.calorie,iconSrc);
                          breakfastReq = addReq(addAnotherMeal, breakfastReq);
                          breakfastFlag = checkReq(breakfastReq);
                      }
                    }
                }
              }
            }
          }
        }
	  		else if(category == "lunch")
	  		{
	    		generateMealItem("lunchList",i,name,description,calories,iconSrc);
	  		}
	  		else if(category == "dinner")
	  		{
	    		generateMealItem("dinnerList",i,name,description,calories,iconSrc);
	  		}
	  		else
	  		{
          generateMealItem("snackList",i,name,description,calories,iconSrc);
	  		}

	  		for(var index = 0; index < groceryListItems.length; index++)
	  		{
	  		  if(groceryList.length == 0)
	  		  {
	  		    groceryList[index] = groceryListItems[index];
	  		  }
	  		  else
	  		  {
	  		    for(var a = 0; a <= groceryList.length; a++)
	  		    {
	  		      if(groceryList[a] != groceryListItems[index])
	  		      {
	  		        if(a == (groceryList.length - 1) || a == groceryList.length)
	  		        {
	  		          groceryList[a+1] = groceryListItems[index];
	  		        }
	  		      }
	  		      else
	  		      {
	  		        a = groceryList.length;
	  		      }
	  		    }
	  		  }
	  		} // end the top level grocery for loop.

	 }// end of overall for loop.

	 for(var b = 0; b < groceryList.length; b++)
	 {
	    $("#groceryCheckList").append("<li class='groceryListLbl'><input type='checkbox' name='GroceryCheckBoxes' value='' class='groceryListCheckBox'><lable>"+groceryList[b]+"</label></li>");
	 }
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

$("#mySettings").click(function(){
  alert("hello");
  window.location = "editProfile.html";
});

$("#checkmark").click(function(){

  if(checkFlag == false)
  {
    $("#groceryListContainer").css("display","block");
    $("#groceryListContainer").animate({"top":"105px"});
    $("#kick").animate({"top": "3px"},100);
    $("#kick").animate({"width": "22px"},100);
    $("#stem").animate({"height": "22px"},100);
    $("#stem").animate({"top": "-6px"},100);
    checkFlag = true;
  }
  else
  {
    $("#groceryListContainer").animate({"top":"705px"});
    $("#kick").animate({"top": "12px"},100);
    $("#kick").animate({"width": "12px"},100);
    $("#stem").animate({"height": "18px"},100);
    $("#stem").animate({"top": "-5px"},100);
    setTimeout(function(){
      $("#groceryListContainer").css("display","none");
    },200);
    checkFlag = false;
  }

});

//------------------------------------------------------------//
//----------- Functions----------------------------------------//
//------------------------------------------------------------//

function generateMealItem(listName,index,name,descript,cals,icon)
{
  $("#" + listName).append('<li class="mealCards" id="meal'+index+'">\
	    			  <div class="workoutCardContainer" id="workoutCardContainerItem'+index+'">\
		    			  <div class="listItemText">\
		    			  <label id="meal-Lbl'+index+'" class="exName">'+name.toUpperCase()+'</label></br>\
		    			  <label id="mealDesc"'+index+'>'+descript+'</label></br>\
		    			  <label class="calorieDisplay">'+cals+' </label><label class="calorieFrontLbl">Calories</label>\
		    			  </div>\
		    			  <div class="listItemImg"><img class="listItemIcon" src="'+icon+'"></div>\
		    			  </div>\
		    			  </li>');
}

function storePref()
{
  var prefArray=[];
  var bigString;

  var proteinString = localStorage["protein"];
  var dairyString = localStorage["dairy"];
  var grainString = localStorage["grain"];
  var vegString = localStorage["veg"];
  var fruitString = localStorage["fruit"];

  bigString = proteinString + "," + dairyString + "," + grainString + "," + vegString + "," + fruitString;

  var s = bigString.split(",");

  return s;

}


function filterFood(cachedMeals, foodPrefArray)
{
  var flagArray = [];
  var prefPullArray = [];

  for(var i = 0; i < cachedMeals.length; i++)
  {
    mealItemIngredients = [];
    mealItemIngredients = cachedMeals[i].ingredients;

    for(var index = 0; index < mealItemIngredients.length; index++)
    {
      for(var a = 0; a < foodPrefArray.length; a++)
      {
        if(mealItemIngredients[index] == foodPrefArray[a])
        {
          a = foodPrefArray.length;
          flagArray.push(1);
        }

      }

    }
    if(flagArray.length == 0)
    {
      var foodItem = cachedMeals[i]
      prefPullArray.push(foodItem);
    }
    else
    {
      flagArray.length = 0;
    }

  }
  return prefPullArray;
}

function fillVoidReq(missingReq, cachedMeals, mealCategory)
{
  for(var i = 0; i < cachedMeals.length; i++)
  {
    if( cachedMeals[i].type == 'shake' || cachedMeals[i].type == 'sup')
    {
      if(cachedMeals[i].category == mealCategory)
      {
        if(missingReq == "dairy")
        {
           if(cachedMeals[i].dairyBool == 1 )
           {
              alert(cachedMeals[i].name);
              return cachedMeals[i];
           }
        }
        else if(missingReq == "fruit")
        {
           if(cachedMeals[i].fruitBool == 1 )
           {
                         alert(cachedMeals[i].name);

              return cachedMeals[i];
           }
        }
        else if(missingReq == "veg")
        {
           if(cachedMeals[i].vegBool == 1 )
           {
                         alert(cachedMeals[i].name);

              return cachedMeals[i];
           }
        }
        else if(missingReq == "grain")
        {
           if(cachedMeals[i].grainBool == 1 )
           {
                         alert(cachedMeals[i].name);

              return cachedMeals[i];
           }
        }
        else if(missingReq == "protein")
        {
           if(cachedMeals[i].proteinBool == 1 )
           {
                         alert(cachedMeals[i].name);

              return cachedMeals[i];
           }
        }
      }
    }
  }
}
function addReq(addedMeal, reqFlag)
{
  if(addedMeal.dairyBool == 1 || reqFlag[0] == 1)
  {
    reqFlag[0] = 1;
  }
  else if(addedMeal.dairyBool == 1 && reqFlag[0] == 1)
  {
    reqFlag[0] = 1;
  }
  else
  {
    reqFlag[0] = 0;
  }


  if(addedMeal.fruitBool == 1 || reqFlag[1] == 1)
  {
    reqFlag[1] = 1;
  }
  else if(addedMeal.fruitBool == 1 && reqFlag[1] == 1)
  {
    reqFlag[1] = 1;
  }
  else
  {
    reqFlag[1] = 0;
  }


  if(addedMeal.vegBool == 1 || reqFlag[2] == 1)
  {
    reqFlag[2] = 1;
  }
  else if(addedMeal.vegBool == 1 && reqFlag[2] == 1)
  {
    reqFlag[2] = 1;
  }
  else
  {
    reqFlag[2] = 0;
  }


  if(addedMeal.grainBool == 1 || reqFlag[3] == 1)
  {
    reqFlag[3] = 1;
  }
  else if(addedMeal.grainBool == 1 && reqFlag[3] == 1)
  {
    reqFlag[3] = 1;
  }
  else
  {
    reqFlag[3] = 0;
  }


  if(addedMeal.proteinBool == 1 || reqFlag[4] == 1)
  {
    reqFlag[4] = 1;
  }
  else if(addedMeal.proteinBool == 1 && reqFlag[4] == 1)
  {
    reqFlag[4] = 1;
  }
  else
  {
    reqFlag[4] = 0;
  }

  return reqFlag;

}
function checkReq(flagCheckArray)
{
  for(var i = 0; i < flagCheckArray.length; i++)
  {
    if(flagCheckArray[i] == 0)
    {
      return 1;
    }
  }

  return 0;
}

