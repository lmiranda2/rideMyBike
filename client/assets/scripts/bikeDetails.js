$( document ).ready(function() {
 
 $('#testcomment').hide();
 
});

$('#next').click(function(){
	
	$('#originalDetails').hide();		
	$('#testdetails').show();
		$('#originalComments').hide();
			$('#testcomment').show();	
});

$('#previous').click(function(){		
	$('#originalDetails').show();	
	$('#testdetails').hide();
		$('#originalComments').show();
			$('#testcomment').hide();	
			
			$('.bxslider').bxSlider({
			  mode: 'fade',
			  captions: true
			});
});