//========================
//create connection to database.
var firebaseRef = firebase.database().ref();

//Email and password login
btnLogin.addEventListener('click', e => {
alert("hello");
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

console.log(firebase.auth().currentUser);


});

//This checks if the user is logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        //Checks if the user used Google to Sign in
        if(firebase.auth().currentUser.providerData[0].providerId==="google.com"
){
            auth2 = gapi.auth2.init({
            client_id: '640024775083-mn2gt40oe50gicmumf4aqnvbb98pkmsu.apps.googleusercontent.com',
            });
            if(auth2.isSignedIn.get()){
                //sends the Users profile to be saved in the database
                var UserProfile = auth2.currentUser.get().getBasicProfile();
                console.log(UserProfile);
                //Send the object to the save function to save User information to the database
                save(UserProfile,"google");
                //Prints to console log who has signed in and the method they used
                console.log(UserProfile.getName()+" has signed in with Google.");
				//window.location.href = "map.html";
		
				
            }else{
               // console.log(firebaseUser.email+" is logged in.");
            }

		
	   
        }else{
			console.log(firebaseUser.email+" is logged in.");
			//window.location.href = "map.html";

        }

    }else{
        //print to console when nobody is signed in
        console.log("Not logged in");
    }
});

btnLogout.addEventListener('click',e =>{
		firebase.auth().signOut();
});


var user = firebase.auth().currentUser;
btnSignUp.addEventListener('click',e =>{
    //Create the Signup constants
    const txtFirstName = document.getElementById('StxtFirstName');
    const txtLastName = document.getElementById('StxtLastName');
    const txtEmail = document.getElementById('StxtEmail');
    const txtPassword1 = document.getElementById('StxtPassword1');
    const txtPassword2 = document.getElementById('StxtPassword2');

    const firstname = txtFirstName.value;
    const lastname = txtLastName.value;
    const email = txtEmail.value;
    const pass1 = txtPassword1.value;
    const pass2 = txtPassword2.value;
    const auth = firebase.auth();
    //use function to sign in to firebase
    if(pass1==pass2){
        auth.createUserWithEmailAndPassword(email,pass1).then(function(user){
            var obj = {
                ig: firstname+" "+lastname,
                ofa: firstname,
                wea: lastname,
                U3: email
            };
            //Send object to function to save User information to the database
            save(obj,"email");
        }).catch(function(error){

            console.log(error.message);
        });
    }else{
    //if passwords don't match a message will be printed to console log
    console.log("Passwords don't match");
    }
});
//save function used to save information to database.
function save(profile,type){
    var uid = firebase.auth().currentUser.uid;
    /*Values will be save to database like
            -User:
                -ID:"f1s9df65s1df":
                    -Full_Name: "John Doe",
                    -First_Name: "John",
                    -Last_Name: "Doe",
                    -Image_URL: "https://example.com/etc",
                    -Email: "johndoe@gmail.com"
    */
    firebaseRef.child("Users").child(uid).child("Full_Name").set(profile.ig);
    firebaseRef.child("Users").child(uid).child("First_Name").set(profile.ofa);
    firebaseRef.child("Users").child(uid).child("Last_Name").set(profile.wea);
    firebaseRef.child("Users").child(uid).child("Email").set(profile.U3);
    //if the user signs up with google the profile picture will be added to the database too.
    if(type==="google"){
        firebaseRef.child("Users").child(uid).child("Image_URL").set(profile.Paa);
    }
}

