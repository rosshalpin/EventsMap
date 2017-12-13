//Initialize the firebase reference
var firebaseRef = firebase.database().ref();
//Everytime a key is pressed the function is run
//When the user is typing the name of a user the function runs everytime they type in a letter
$(document).ready(function(){
   $('#typeahead').keyup(function(){
       //Gets value the user is entering
       var searching = document.getElementById("typeahead").value;
       console.log("---------------------------------");
       //Searches Firebase database of all values of Full_Name that match the requirements.
       var a= firebaseRef.child('Users').orderByChild("Full_Name").startAt(searching)
       .endAt(searching+"\uf8ff")
       .on("value",function(snapshot){
           //everytime a value tha matchs the requirements are meet the ID is sent to the display people function.
           snapshot.forEach(function(data) {
           //displaypeople(data.key);
           //console.log(data.key);
           displayname(data.key);
           });
           //console.log(p);
        });
    });
});

function displayname(uid){
    var nref = firebase.database().ref("/Users/"+uid+"/Full_Name").once("value").then(function(snapshot){
        var u = snapshot.val();
        emailpeep(uid);
    });
}

function displayemail(uid){
    var nref = firebase.database().ref("/Users/"+uid+"/Email").once("value").then(function(snapshot){
        var u = snapshot.val();
        document.getElementById(uid).innerHTML=u;
    });
}
