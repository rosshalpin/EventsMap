function searchbtn() {
	$('.search').show();
	$('#backb').show();
	$('#searchb').hide();
	$('#requestb').hide();
	$('#Events').hide();
}
function back() {
	$('.search').hide();
	$('#backb').hide();
	$('#searchb').show();
	$('#requesttable').hide();
	$('#requestb').show();
	$('#Events').show();
}
function requestbtn() {
	$('#requestb').hide();
	$('#backb').show();
	$('#requesttable').show();
	$('#searchb').hide();
	$('#Events').hide();
}
function eventsbtn() {
	$('#requestb').hide();
	$('#backb').show();
	$('#requesttable').hide();
	$('#searchb').hide();
	$('#Events').hide();
}

var mytable = "<table class='emails'>";
function emailpeep(u) {
	mytable += "<tr id='" + u + "' onclick=friendrequest('" + u + "')></tr>";
	document.getElementById("mytable").innerHTML = mytable;
	displayemail(u);
}

var requesttable = "<table class='request'>";
function requestfriend(u) {
	mytable += "<tr id='" + u + "' onclick=addfriend('" + u + "')></tr>";
	document.getElementById("requesttable").innerHTML = mytable;
	displayemail(u);
}

function friendrequest(u) {
	var uid = firebase.auth().currentUser.uid;
	console.log(u);
	firebase.database().ref("/Users/" + uid + "/Friends/" + u + "/status").once("value").then(function (snapshot) {
		if (snapshot.val() == "t") {
			alert("Your are already friends");
		} else {
			firebaseRef.child("Users").child(uid).child("Friends").child(u).child("status").set("f");
			firebaseRef.child("Users").child(u).child("Friends").child(uid).child("status").set("f");
			alert("friend request sent");
		}
	});
}

var firebaseRef = firebase.database().ref();

var reqs = [];

function requests() {
	var uid = firebase.auth().currentUser.uid;
	var a = firebaseRef.child('Users').child(uid).child("Friends").orderByChild("status").equalTo("f")
		.on("value", function (snapshot) {
			//everytime a value tha matchs the requirements are meet the ID is sent to the display people function.
			snapshot.forEach(function (data) {
				requestfriend(data.key);
				reqs.push(data.key);
			});
			//console.log(p);
		});
}

var areWeFriendsYet = setInterval(newFriendEvents, 30000);

function newFriendEvents() {
	var uid = firebase.auth().currentUser.uid;
	if (reqs != null) {
		for (i = 0; i < reqs; i++) {
			firebase.database().ref("/Users/" + uid + "/Friends/" + reqs[i] + "/status").once("value").then(function (snapshot) {
				if (snapshot.val() == "t") {
					//you are now friends
					events();
					//drawFriends();
				}
			});
		}
	}
}

function addfriend(u) {
	var uid = firebase.auth().currentUser.uid;
	firebaseRef.child("Users").child(uid).child("Friends").child(u).child("status").set("t");
	firebaseRef.child("Users").child(u).child("Friends").child(uid).child("status").set("t");
	alert("friend added");

}

$(document).ready(function () {

	$('.chat_head').click(function () {
		$('.chat_body').slideToggle('slow');
	});

});
