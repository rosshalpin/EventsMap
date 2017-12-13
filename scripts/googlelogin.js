/*
Insert tags into html file:
<meta name="google-signin-client_id" content="640024775083-mn2gt40oe50gicmumf4aqnvbb98pkmsu.apps.googleusercontent.com"/>
<meta name="google-signin-scope" content="https://www.googleapis.com/auth/plus.login" />*/

//========================
//Google Sign in
//function checks the authentication token given by google once verified creates/logins in the user.
function GoogleSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  firebase.auth().signInWithCredential(credential).then(function(e){
      window.location= "http://localhost/EventsMap/sample.html";
  }).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
  console.log(errorMessage);
});
}
