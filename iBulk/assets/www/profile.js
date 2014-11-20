$(document).ready(function() {
var bodyHeight = $("#proBody").height();
$(".profileTabsContainer").css("height",bodyHeight);
	
	$("#profileTabSelect").click(function(){
		$("#profileTabSelect").css("background-color","white");
		$("#progressTabSelect").css("background-color","#0091ea");
		$("#favoriteTabSelect").css("background-color","#0091ea");
		$("#favoriteInfo").css("display","none");
		$("#profileInfo").css("display","block");
		$("#progressInfo").css("display","none");

	});
	$("#progressTabSelect").click(function(){
		$("#profileTabSelect").css("background-color","#0091ea");
		$("#progressTabSelect").css("background-color","white");
		$("#favoriteTabSelect").css("background-color","#0091ea");
		$("#favoriteInfo").css("display","none");
		$("#profileInfo").css("display","none");
		$("#progressInfo").css("display","block");

	});
	$("#favoriteTabSelect").click(function(){
		$("#profileTabSelect").css("background-color","#0091ea");
		$("#progressTabSelect").css("background-color","#0091ea");
		$("#favoriteTabSelect").css("background-color","white");
		$("#favoriteInfo").css("display","block");
		$("#profileInfo").css("display","none");
		$("#progressInfo").css("display","none");

	});
	
	$("#editProfileButton").click(function(){
		window.location = "editProfile.html";
	});
	
	$("#profileBody").scroll(function(){
	});
});
