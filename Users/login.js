/*<script src="https://apis.google.com/js/platform.js" async defer></script>
<meta name="google-signin-client_id" content="client id">
both lines must be added to html file for google sign in to work.*/

//========================
//Email and password login
//Create the login constants
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');

btnLogin.addEventListener('click', e => {
    //gets the values from constants
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //use function to sign in to firebase
    const promise = auth.signInWithEmailAndPassword(email,pass);
    //if unsuccessful print error to console log
    promise.catch(e => console.log(e.message));
});

//This checks if the user is logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser.email);
    }else{
        console.log("Not logged in");
    }
})

//This will log the user out
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});


//========================
//Google Sign in
//function checks the authentication token given by google once verified creates/logins in the user.
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var credential =firebase.auth.GoogleAuthProvider.credential(id_token);

  firebase.auth().signInWithCredential(credential).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
});
}
