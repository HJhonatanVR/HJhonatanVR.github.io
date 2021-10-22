$(function() {		
	changeLanguage();
})

function changeLanguage(){
	$('div#lang a').click(function(){
		var lang = $(this).attr('rel'); 							  
		
		$.ajax({
			   type: "POST",
			   url: "../includes/proc/proc_session_lang.php",
			   dataType: 'json',
			   data: "lang="+lang+"&url="+currentUrl,
			   success: function(response){
					//alert(response.url)
					location.href = response.url;
				   //console.log(response);
				   //location.reload();
			   }
		});								  
	})
}	
