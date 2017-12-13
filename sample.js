$(function(){
	$('.s1').on('click',function(){
		
	$('#extra').hide();
	$('.search').show();
	
	});
});
$(function(){
	$('.s2').on('click',function(){
		
	$('#extra').hide();
	$('.notif').show();
	
	});
});
$(function(){
	$('.s3').on('click',function(){
		
	$('#extra').hide();
	$('.list').show();
	
	});
});

$(function(){
	$('.s4').on('click',function(){
		
	$('#extra').hide();
	$('.group').show();
	
	});
});

$(function(){
	$('.s5').on('click',function(){
		
	$('#extra').hide();
	$('.rate').show();
	
	});
});

$(function(){
	$('.back').on('click',function(){
		
	$('#extra').show();
	$('.search').hide();
	$('.notif').hide();
	$('.list').hide();
	$('.group').hide();
	$('.rate').hide();
	
	});
});
