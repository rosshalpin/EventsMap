//========================
//Email and password login
btnLogin.addEventListener('click', e => {
    //Create the login constants
    const txtEmail = document.getElementById('LtxtEmail');
    const txtPassword = document.getElementById('LtxtPassword');
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
        auth2 = gapi.auth2.init({
        client_id: '640024775083-mn2gt40oe50gicmumf4aqnvbb98pkmsu.apps.googleusercontent.com',
        });
        if(auth2.isSignedIn.get()){
            var profile = auth2.currentUser.get().getBasicProfile();
            save(profile);
            console.log(profile.getName()+" logged in");
        }else{
            console.log("GoogleUser not sign in.")
            console.log(firebaseUser.email);
        }
    }else{
        console.log("Not logged in");
    }
})

//This will log the user out
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

var user = firebase.auth().currentUser;
btnSignUp.addEventListener('click',e =>{
    //Create the Signup constants
    const txtEmail = document.getElementById('StxtEmail');
    const txtPassword1 = document.getElementById('StxtPassword1');
    const txtPassword2 = document.getElementById('StxtPassword2');

    const email = txtEmail.value;
    const pass1 = txtPassword1.value;
    const pass2 = txtPassword2.value;
    const auth = firebase.auth();

    //use function to sign in to firebase
    if(pass1==pass2){
        //if passwords match then account will be created
        const promise = auth.createUserWithEmailAndPassword(email,pass1);
    //if unsuccessful print error to console log
    promise.catch(e => console.log(e.message));
}else{
    //if passwords don't match a message will be printed to console log
    console.log("Passwords don't match");
}
});

function save(profile){
    var firebaseRef = firebase.database().ref();
    firebaseRef.child("Users").child(profile.getId()).child("Full_Name").set(profile.getName());
    firebaseRef.child("Users").child(profile.getId()).child("First_Name").set(profile.getGivenName());
    firebaseRef.child("Users").child(profile.getId()).child("Last_Name").set(profile.getFamilyName());
    firebaseRef.child("Users").child(profile.getId()).child("Image_URL").set(profile.getImageUrl());
    firebaseRef.child("Users").child(profile.getId()).child("Email").set(profile.getEmail());

}
