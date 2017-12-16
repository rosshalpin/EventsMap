//========================
//create connection to database.
var theuser;
var loggedin;
var firebaseRef = firebase.database().ref();
var login = document.getElementById('btnLogin');
//Email and password login
//if statement checks if the element exists
if(login){
	login.addEventListener('click', e => {
    //Create the login constants
    const txtEmail = document.getElementById('LtxtEmail');
    const txtPassword = document.getElementById('LtxtPassword');
    //gets the values from constants
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //use function to sign in to firebase
    const promise = auth.signInWithEmailAndPassword(email,pass);
    //if successful then relocate to new html page
    promise.then(function(){
		window.location= "http://localhost/EventsMap/map.html";
		//if unsuccessful print error to console log
	}).catch(e => console.log(e.message));
});
}

//This checks if the user is logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        //Checks if the user used Google to Sign in
        if(firebase.auth().currentUser.providerData[0].providerId==="google.com"){
			if(login){

            auth2 = gapi.auth2.init({
            client_id: '640024775083-mn2gt40oe50gicmumf4aqnvbb98pkmsu.apps.googleusercontent.com',
            })
            if(auth2.isSignedIn.get()){
                //sends the Users profile to be saved in the database
                var UserProfile = auth2.currentUser.get().getBasicProfile();
                console.log(UserProfile);
                //Send the object to the save function to save User information to the database
                save(UserProfile,"google");
				window.location="http://localhost/EventsMap/map.html";
                //Prints to console log who has signed in and the method they used
                console.log(UserProfile.getName()+" has signed in with Google.");
            }else{
                console.log(firebaseUser.email+" is logged in.");
            }
		}
			loggedin=false;
        }else{
			theuser=firebaseUser;
			console.log(firebaseUser.uid+" is logged in.");
        }
		if(typeof profileinfo=='function'){
			profileinfo(firebaseUser.uid);
		}
    }else{
        //print to console when nobody is signed in
        console.log("Not logged in");
    }
})

//This will log the user out
var logout = document.getElementById('btnLogout');
if(logout){
	btnLogout.addEventListener('click', e => {
	    firebase.auth().signOut();
		window.location="http://localhost/EventsMap/signup.html";
	});
}
var user = firebase.auth().currentUser;

var signup = document.getElementById('btnSignUp');
//if statement checks if the element exists
if(signup){
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
	var pass1 = txtPassword1.value;
    var pass2 = txtPassword2.value;
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
			window.location= "http://localhost/EventsMap/map.html";
        }).catch(function(error){

            console.log(error.message);
        });
    }else{
		if(pass1.length<6){
			console.log("Password must be at least 6 length")
		}else{
			//if passwords don't match a message will be printed to console log
			console.log("Passwords don't match");
		}
    }
});
}
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
	firebaseRef.child("Users").child(uid).child("X").set(0);
	firebaseRef.child("Users").child(uid).child("Y").set(0);
    //if the user signs up with google the profile picture will be added to the database too.
    if(type==="google"){
        firebaseRef.child("Users").child(uid).child("Image_URL").set(profile.Paa);
    }
}
