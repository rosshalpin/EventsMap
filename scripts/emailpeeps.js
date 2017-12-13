var mytable="<table class='emails'>";
function emailpeep(u){
    mytable+="<tr id='"+u+"' onclick=friendrequest('"+u+"')></tr>";
    document.getElementById("mytable").innerHTML =mytable;
    displayemail(u);
}

var requesttable="<table class='request'>";
function requestfriend(u){
    mytable+="<tr id='"+u+"' onclick=addfriend('"+u+"')></tr>";
    document.getElementById("requesttable").innerHTML =mytable;
    displayemail(u);
}

function friendrequest(u){
    var uid = firebase.auth().currentUser.uid;
    console.log(u);
    firebase.database().ref("/Users/"+uid+"/Friends/"+u+"/status").once("value").then(function(snapshot){
        if(snapshot.val()=="t"){
            console.log("Your are already friends");
        }else{
            firebaseRef.child("Users").child(uid).child("Friends").child(u).child("status").set("f");
            firebaseRef.child("Users").child(u).child("Friends").child(uid).child("status").set("f");
            alert("friend request sent");
        }
    })
}

var firebaseRef = firebase.database().ref();

function requests(){
    var uid = firebase.auth().currentUser.uid;
    var a= firebaseRef.child('Users').child(uid).child("Friends").orderByChild("status").equalTo("f")
    .on("value",function(snapshot){
        console.log("hello");
        //everytime a value tha matchs the requirements are meet the ID is sent to the display people function.
        snapshot.forEach(function(data) {
            console.log(data.ref);
        //displaypeople(data.key);
        //console.log(data.key);
        requestfriend(data.key);
        });
        //console.log(p);
    });
}

function addfriend(u){
    var uid = firebase.auth().currentUser.uid;
    firebaseRef.child("Users").child(uid).child("Friends").child(u).child("status").set("t");
    firebaseRef.child("Users").child(u).child("Friends").child(uid).child("status").set("t");
    alert("friend added");

}

$(document).ready(function(){

	$('.chat_head').click(function(){
		$('.chat_body').slideToggle('slow');
	});


});
