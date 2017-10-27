window.onload = function(){
$("#login-box").hide();
$("#login-box").removeClass("hidden");
$("#login-box").fadeIn(1300);
$(".or").fadeIn(1300);
}


$(function(){
	$('#L1').on('click',function(){



		$('#log').hide();
		$('#signup').addClass("hidden");
		$('#log').removeClass("hidden");
		$('#log').fadeIn(500);
		$('#L1').addClass('active2');
		$('#S1').removeClass('active2');

	});
});

$(function(){
	$('#S1').on('click',function(){
		$('#signup').hide();
		$('#log').addClass("hidden");
		$('#signup').removeClass("hidden");
		$('#signup').fadeIn(500);
		$('#S1').addClass('active2');
		$('#L1').removeClass('active2');

	});
});
