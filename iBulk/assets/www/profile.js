$(document).ready(function() {
	$("#profileTabSelect").click(function(){
		$("#profileTabSelect").css("background-color","white");
		$("#progressTabSelect").css("background-color","#0091ea");
		$("#favoriteTabSelect").css("background-color","#0091ea");
	});
	$("#progressTabSelect").click(function(){
		$("#profileTabSelect").css("background-color","#0091ea");
		$("#progressTabSelect").css("background-color","white");
		$("#favoriteTabSelect").css("background-color","#0091ea");

	});
	$("#favoriteTabSelect").click(function(){
		$("#profileTabSelect").css("background-color","#0091ea");
		$("#progressTabSelect").css("background-color","#0091ea");
		$("#favoriteTabSelect").css("background-color","white");

	});
	
	$("#profileBody").scroll(function(){
	});
});
