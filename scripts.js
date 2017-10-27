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


//firebase
 var config = {
    apiKey: "AIzaSyCmqTZqbiSVlnekcaHgf_o1VgpbVzoKzag",
    authDomain: "ev3ntmap-f8375.firebaseapp.com",
    databaseURL: "https://ev3ntmap-f8375.firebaseio.com",
    projectId: "ev3ntmap-f8375",
    storageBucket: "ev3ntmap-f8375.appspot.com",
    messagingSenderId: "640024775083"
  };
  firebase.initializeApp(config); 
  


function loguser(){
  alert("im IN");
  //Get email and pass
  const email = document.getElementById('logEmail').value;
  const pass = document.getElementById('logPassword').value;
  const auth = firebase.auth();
  //Sign in 
  firebase.auth().signInWithEmailAndPassword(email,pass).then(function() 
	{
		alert("Signed In");
	})
  .catch(function(error)		{
		  // Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
		});
  
}




function adduser(){

  const username = document.getElementById("txtName").value;
  const email = document.getElementById("txtEmail").value;
  const pass = document.getElementById('txtPassword').value;
  const pass2 = document.getElementById('txtPassword2').value;
  const auth = firebase.auth();
  
  //Sign updateCommands
     if(pass == pass2){
  firebase.auth().createUserWithEmailAndPassword(email,pass).then(function() 
	{
		alert("Account created");
	})
	.catch(function(error) 
		{
		  // Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
		});
    
    }
     else{
         alert("Passwords dont match!!   Please Retype password");
     }
 }
