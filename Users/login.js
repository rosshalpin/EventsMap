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
