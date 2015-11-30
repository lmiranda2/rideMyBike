$( document ).ready(function() {
	
 $('#testcomment').hide();
 
 $(function() {
   $( "#start-date,#end-date" ).datepicker();
 });
 
 
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

});