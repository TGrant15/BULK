Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");
var count = 0;
var foodNutritionArray=[];

$(".mealTypeRadio").on("change",function(){

  if ($("#addMealRadio").prop( "checked" ) == true) {
      $("#searchBoxContainer").css("display","block");
      $("#ingredientForm").css("display","none");

  }
  else if($("#addIngdtRadio").prop( "checked" ) == true)
  {
      $("#searchBoxContainer").css("display","block");
      $("#ingredientForm").css("display","block");
  }

});

$("#searchButton").click(function(){
var foodNutrCounter = 0;
var nxtCounter = 0;
var replaceCounter = 0;
var replaceArray = [];
replaceArray.length = 0;

$("#ingredientForm").css("display","none");

var  foodSearch = $("#searchBox").val().split(" ");
var Food = Parse.Object.extend("Food");
var query = new Parse.Query(Food);
query.contains("food_name" ,foodSearch[0]);
query.limit(1000);
query.find({

success: function(results) {
var tempArray = [];
var object;
var name;
var nutr;
var nutrDesc;
var calories, carbohyrates, lipids, proteins;


for(var i = 0; i < results.length; i++)
{
	object = results[i];
	name = object.get('food_name');
	nutr = object.get('food_nutr');
	nutrDesc = object.get('food_nutrDesc');
	nxtCounter++;
	tempArray[i] = name;

	if(nutrDesc=='Energy')
	{
		calories = nutr;
	}
	else if(nutrDesc=='Carbohydrate, by difference')
	{
		carbohydrates = nutr;
	}
	else if(nutrDesc=='Total lipid (fat)')
	{
		lipids = nutr;
	}
	else
	{
		proteins = nutr;
	}

	if(nxtCounter == 4)
	{
		foodNutritionArray.push({name:name, cal: calories, carbs:carbohydrates, fat:lipids, pro:proteins});
		foodNutrCounter++;
		nxtCounter = 0;
	}
}

  alert("Successfully retrieved " + results.length + " scores.");

  if(foodSearch.length > 1)
  {
	  for(var i = 0;  i < results.length; i++)
	  {
			for( var a = 1; a < foodSearch.length; a++)
			{
			   if(tempArray[i].indexOf(foodSearch[a]) == -1)
			   {

					tempArray[i] = null;

				}
				else
				{
					var dup = false;
					for(var z = 0; z < replaceArray.length; z++)
					{
						if(replaceArray[z] == tempArray[i])
						{
							dup = true;
						}

					}

					if(dup != true)
					{
						replaceArray[replaceCounter] = tempArray[i];
						replaceCounter++;
					}
				}

			 }
	  }

  	}
  	else
  	{
		for(var i = 0; i<results.length; i++)
		{
			var dup = false;
			for(var z = 0; z < replaceArray.length; z++)
			{
				if(replaceArray[z] == tempArray[i])
				{
					dup = true;
				}

			}

			if(dup != true)
			{
				replaceArray[replaceCounter] = tempArray[i];
				replaceCounter++;
			}
		}
  	}

  $("#resultsList").empty();

  	for(var index=0;index<replaceArray.length;index++)
  	{
  		$("#resultsList").append("<li class='resultItem' id='resultItem"+index+"'><label>"+replaceArray[index]+"</label>"+
  				"<label class='nutritionLbl' id='calorieLbl"+index+"' style='display:block !important'>calories: "+foodNutritionArray[index].cal+"</label>"+
  				"<label class='nutritionLbl' id='proteinLbl"+index+"'>protein: "+foodNutritionArray[index].pro+"</label>"+
  				"<label class='nutritionLbl' id='carbLbl"+index+"'>carbohydrates: "+foodNutritionArray[index].carbs+"</label>"+
  				"<label class='nutritionLbl' id='fatLbl"+index+"'>fat: "+foodNutritionArray[index].fat+"</label>"+
  				"<div class='selectFoodButton' id='selectFood"+index+"'>Select</div>"+
  				"</li>");
  	}

  	$(".resultItem").click(function(){
  		var ID = $(this).attr("id");
  		alert($("#"+ID).height());
  		alert(ID);
  		if(ID.length == 11)
  		{
        	var nutrIndex = ID.substring(10, 11);		//If the id number has just one digit at the end save it
        }
        else if(ID.length == 12)
        {
            var nutrIndex = ID.substring(10, 12);	//If the id has a two digit character at the end save both
        }
        else
        {
            var nutrIndex = ID.substring(10, 13);	//If the id has a two digit character at the end save both
        }

  		if($("#"+ID).height() != 85)
  		{
  			$("#"+ID).css("height","85px");
  			$("#proteinLbl"+nutrIndex).css("display","none");
            $("#carbLbl" + nutrIndex).css("display","none");
            $("#fatLbl"+ nutrIndex).css("display","none");
            $("#"+ID).css("background-color", "white");
  		}
  		else
  		{
  			$("#"+ID).css("height","200px");
  			$("#proteinLbl"+nutrIndex).css("display","block");
  			$("#carbLbl"+nutrIndex).css("display","block");
  			$("#fatLbl"+nutrIndex).css("display","block");
  			$("#"+ID).css("background-color", "#c3c3c3");
  			$("#selectFood"+nutrIndex).css("display","block");

  			$("#selectFood"+nutrIndex).click(function(){
  			  $("#foodNameTxtBx").val(replaceArray[nutrIndex]);
  			  $("#caloriesTxtBx").val(foodNutritionArray[nutrIndex].cal);
  			  $("#fatTxtBx").val(foodNutritionArray[nutrIndex].fat);
  			  $("#carboTxtBx").val(foodNutritionArray[nutrIndex].pro);
  			  $("#proteinTxtBx").val(foodNutritionArray[nutrIndex].carbs);

  			  clearSearch();

  			  $("#ingredientForm").css("display","block");



  			});



  		}
  	});

},
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }

});
});

$("#searchBox").keyup(function(){
  if($("#searchBox").val().length > 0)
  {
    $("#clearFoodSearch").css("display","block");
  }
  else
  {
    $("#clearFoodSearch").css("display","none");
  }
});




$("#clearFoodSearch").click(function(){
  clearSearch()
});

$("#addCustomMealButton").click(function(){
  var mealChoice = $("#mealOfDayFilter").val() + "List";
  alert(mealChoice);
  addMeal(mealChoice, $("#foodNameTxtBx").val());
});

/*
$("#submitButton").click(function(){


var Meals = Parse.Object.extend("Meals");
var meals = new Meals();
 var name = $("#ml_foodName").val();
 var cal = parseInt($("#ml_cal").val());
 var pro = parseInt($("#ml_pro").val());
 var carb = parseInt($("#ml_carb").val());
 var fat = parseInt($("#ml_fat").val());
 var serve = parseInt($("#ml_serve").val());
 var serveName = $("ml_serveName").val();
 var cat = $("#ml_cat").val();
 var method = $("#method").val();


meals.set("ml_foodName", name);
meals.set("ml_cal", cal);
meals.set("ml_pro", pro);
meals.set("ml_carb", carb);
meals.set("ml_fat", fat);
meals.set("ml_carb", carb);
meals.set("ml_serve", serve);
meals.set("ml_serveName", serveName);
meals.set("ml_cat", cat);
meals.set("ml_method",method);




meals.save(null, {
  success: function(meals) {
    // Execute any logic that should take place after the object is saved.
    alert('New meals object created with objectId: ' + meals.id);
  },
  error: function(meals, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and description.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});



var Grocery = Parse.Object.extend("Grocery");
var grocery = new Array()
for(var i = 0; i < count; i++)
{
grocery[i] = new Grocery();
var item = $("#Item" + i).text();
var num = $("#quant" + i).text();
grocery[i].set("gro_item", item);
grocery[i].set("gro_quant", num);
grocery[i].set("parent", meals);

grocery[i].save();


}

});
$("#groceryItem").change(function(){

//$("#predict").animate({"opacity":"1"});
var Food = Parse.Object.extend("Food");
var query = new Parse.Query(Food);

var wordVal = $("#groceryItem").val();
query.exists("food_Id");
//var tempVar = 0;

query.find({
  success: function(results) {
  }
});
 /* var foodArray = [];
	var foodName = [];
  	for(var i=0;i<results.length;i++)
  	{
  		foodName[i] = results[i].get("food_name");
  		if(i==0)
  		{
  			foodArray[0] = results[0].get("food_Id");
  			//alert(results[0].get("food_name"));
  			foodName[0] = results[0].get("food_name");
  			//alert(foodName[0]);

  		}
  		else
  		{
  			var count=0;
  			while(count<foodArray.length)
  			{
  			 	var foodID = foodArray[count];
  			 	var currentID = results[i].get("food_Id");
  			 	if(foodID != currentID)
  			 	{
  			 		count++;
  			 		if(count == foodArray.length)
  			 		{
  			 			foodArray[count]=results[i].get("food_Id");
  			 			foodName[count]=results[i].get("food_name");
  			 		}
  			 	}
  			 	else
  			 	{
					count++;
	  			}
  			}
  		}


  	}


  }
});*/
//});

function clearSearch()
{
    $("#resultsList").empty();
    $("#searchBox").val('');
    $("#clearFoodSearch").css("display","none");
}
function addMeal(mealList, foodName)
{
  var listLength = $("#"+mealList).length;
  var index;

  if(listLength == 0)
  {
    index = 0;
  }
  else
  {
    index = listLength+1
  }

  $("#"+mealList).append("<li class='workoutCards' id='meal"+index+"'><label id='meal-Lbl"+index+"' class='exName'>"+foodName+"</label></li>");

}
function warning(carbs, fat, protein, calories)
{
  if(carbs > 10)
  {
    alert("You cannot add this meal because Carbs are greater than 10g")
  }

  if(carbs > 10)
  {
    alert("You cannot add this meal because Carbs are greater than 10g")
  }

  if(carbs > 10)
  {
    alert("You cannot add this meal because Carbs are greater than 10g")
  }

}
