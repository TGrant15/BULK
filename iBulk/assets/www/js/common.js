/**  
  * @desc this file will hold all scripts that are not specific to pages and
  * can be reused throughout the project. 
  * @author Caleb Diaz caleb.diaz@gmail.com, Tremaine Grant tremaine.grant@gmail.com
  * @required [any files that mat be required]
  * @namespace Common
*/ 
Common = {
	/** 
	 * @desc used to load a new page into the document
	 * @param string id - the page to be loaded, string transition - type of animation
	 * @return none
	*/ 
    loadPage: function(id, transition) {
    	var newPage = $('#' + id);
    	var dir = newPage.attr('data-dir');
    	$('[data-role="page"]').hide();
    	
    	if (newPage.children().length == 0) {
    		newPage.load(dir + id + '.html');
    	}
    	newPage.show(200);
    }
}


/** 
 * @desc function is ran at the beginning of the project on load
 * @param document
 * @return none
*/ 
$(document).ready(function() {
	Parse.initialize("AXss0hVCmQ3tmDsGCV0KD3Xn9yUL39BPJcGQGV7P", "IddscOVmXbWcUGqZCJWXj1bM8SXp2iJS2sA7Lz9b");
	$('[data-role="page"]').hide();
	Common.loadPage('login', 'none');
	
}); // end of document ready function