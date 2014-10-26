/**  
  * @desc containts all animation functions for page transitions, input selections, etc.
  * @author Caleb Diaz caleb.diaz@gmail.com, Tremaine Grant tremaine.grant@gmail.com
  * @required [any files that mat be required]
  * @namespace Animation
*/ 
Animation = {
	/** 
	 * @desc attaches ripple selection effect when needed (attaches to input groups)
	 * @param none
	 * @return none
	*/ 
    inputGroup: function() {
    	var parent, ink, d, x, y;
    	$(".input-group input").click(function(e){
    		console.log('here');
    		$(this).parent().prepend("<div class='ripple-push'></div>");
    		parent = $(this).parent().find('.ripple-push');
    		parent.css({ 'height': $(this).outerHeight(), 'width': $(this).outerWidth(),'overflow':'hidden', 'position':'absolute', 'pointer-events':'none' });
    		//create .ink element if it doesn't exist
    		if(parent.find(".ripple").length == 0)
    			parent.append("<span class='ripple'></span>");
    		ink = parent.find(".ripple");
    		//incase of quick double clicks stop the previous animation
    		ink.removeClass("animate");
    		
    		//set size of .ink
    		if(!ink.height() && !ink.width())
    		{
    			//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
    			d = Math.max(parent.outerWidth(), parent.outerHeight());
    			ink.css({height: d, width: d});
    		}
    		
    		//get click coordinates
    		//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
    		x = e.pageX - parent.offset().left - ink.width()/2;
    		y = e.pageY - parent.offset().top - ink.height()/2;
    		
    		//set the position and add class .animate
    		ink.css({'top': y+'px', 'left': x+'px'}).addClass("animate");
    	});
    }
}

/** 
 * @desc function is ran at the beginning of the project on load
 * @param document
 * @return none
*/ 
$(document).ready(function() {
	var parent, ink, d, x, y;
	$(".input-group input").click(function(e){
		console.log('here');
		$(this).parent().prepend("<div class='ripple-push'></div>");
		parent = $(this).parent().find('.ripple-push');
		parent.css({ 'height': $(this).outerHeight(), 'width': $(this).outerWidth(),'overflow':'hidden', 'position':'absolute', 'pointer-events':'none' });
		//create .ink element if it doesn't exist
		if(parent.find(".ripple").length == 0)
			parent.append("<span class='ripple'></span>");
			
		ink = parent.find(".ripple");
		//incase of quick double clicks stop the previous animation
		ink.removeClass("animate");
		
		//set size of .ink
		if(!ink.height() && !ink.width())
		{
			//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}
		
		//get click coordinates
		//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;
		
		//set the position and add class .animate
		ink.css({'top': y+'px', 'left': x+'px'}).addClass("animate");
	});
}); // end of document ready function
