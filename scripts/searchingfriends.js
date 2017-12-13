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

EvP = [];
function uploadE(x,y,name,r,g,b,time){
var bastards = x+"@"+y+"@"+name+"@"+r+"@"+g+"@"+b+"@"+time;
	var uid = firebase.auth().currentUser.uid;
	firebaseRef.child("Users").child(uid).child("bastards").set(bastards);
}

function downloadE(){
	var uid = firebase.auth().currentUser.uid;
	var a=firebase.database().ref("/Users/"+uid+"/bastards").on("value",function(shithead){
		var u = shithead;
		console.log(u.val());
		$.each(u.val().split(/\@/), function (i, val) {
    			 EvP.push(val);


		})
	});
console.log(EvP);

}
/*
function downloadE(){
	var uid = firebase.auth().currentUser.uid;
	var a= firebaseRef.child('Users').child(uid).child("Friends").orderByChild("status").equalTo("t")
       .on("value",function(snapshot){
	
	//firebaseRef.child("Users").child(snapshot.val());

	snapshot.forEach(function(data){

	/*firebaseRef.child('Users').child(data.key).child("Events").orderByChild("x").once("value",function(hey){
	console.log(hey.key);
});

	var myref=firebase.database().ref("Users");
	myref.once('value',function(snapshit){
	snapshit.forEach(function(EventsSnapshit){

	var ev = EventsSnapshit.val().Events;
if(ev !=null){
	console.log(ev);

}	
});	
});

//var myref=firebase.getInstance().getReference("/Users/"+data.key+"/Events/");
//console.log(myref);
//console.log(myref.key);
//console.log(myref.val());
	
	});
    });
}
*/
