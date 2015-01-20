$(document).ready(function(){
	// HTML markup implementation, overlap mode
	$( '#menu' ).multilevelpushmenu({
		mode: 'cover',
		fullCollapse: true,
		overlapWidth: 0,
		collapsed: true
	});

 $('#btn').click(function(){
 	if ($(this).hasClass('active')) {
 		$('#menu').multilevelpushmenu('collapse');
 		$(this).toggleClass('active');
 	} else {
 		if ($(window).width() < 768) {
 			$('#menu').multilevelpushmenu('option', 'menuWidth', '100%');
 		}
 		$('#menu').multilevelpushmenu('expand');
 		$(this).toggleClass('active');
 	}
    
  });
});