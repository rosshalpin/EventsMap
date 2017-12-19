//Initialize the firebase reference
var firebaseRef = firebase.database().ref();
//Everytime a key is pressed the function is run
//When the user is typing the name of a user the function runs everytime they type in a letter
$(document).ready(function () {
	$('#typeahead').keyup(function () {
		//Gets value the user is entering
		var searching = document.getElementById("typeahead").value;
		console.log("---------------------------------");
		//Searches Firebase database of all values of Full_Name that match the requirements.
		var a = firebaseRef.child('Users').orderByChild("Full_Name").startAt(searching)
			.endAt(searching + "\uf8ff")
			.on("value", function (snapshot) {
				//everytime a value tha matchs the requirements are meet the ID is sent to the display people function.
				snapshot.forEach(function (data) {
					//displaypeople(data.key);
					console.log(data.key);
					displayname(data.key);
				});
				//console.log(p);
			});
	});
});

function displayname(uid) {
	var nref = firebase.database().ref("/Users/" + uid + "/Full_Name").once("value").then(function (snapshot) {
			var u = snapshot.val();
			emailpeep(uid);
		});
}

function displayemail(uid) {
	var me = firebase.auth().currentUser.uid;
	if (uid != me) {
		var nref = firebase.database().ref("/Users/" + uid + "/Email").once("value").then(function (snapshot) {
				var u = snapshot.val();
				document.getElementById(uid).innerHTML = u;
			});
	}
}

var EvP = [];
function uploadE(x, y, name, r, g, b, time) {
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref("/Users/" + uid + "/Full_Name").once("value").then(function (snapshot) {
		var u = snapshot.val();
		var party = uid + "@" + x + "@" + y + "@" + name + "@" + r + "@" + g + "@" + b + "@" + time + "@" + u;
		firebaseRef.child("Events").child(party).child("Admin").set(uid);
	});
}
function downloadE(uid) {

	var u = firebase.auth().currentUser.uid;
	var a = firebaseRef.child('Events').orderByChild("Admin").equalTo(uid).on("value", function (snapshot) {
			snapshot.forEach(function (data) {
				var c = data.key;

				if (!c.startsWith(u)) {

					$.each(c.split(/\@/), function (i, val) {
						if (uid !== val) {
							EvP.push(val);
						}
					});
				}

			});

		});
	var str = "ev";
	var a2 = firebaseRef.child('Events').orderByChild("Admin").equalTo(u).on("value", function (snapshot) {
			snapshot.forEach(function (data) {
				var c2 = data.key;

				if (c2.startsWith(u)) {

					$.each(c2.split(/\@/), function (i, val) {
						if (u != val) {

							EvP.push(val);

						}
					});

				}

			});

		});
}
function Ename(uid) {
	firebase.database().ref("/Users/" + uid + "/Full_Name").once("value").then(function (snapshot) {
		var u = snapshot.val();
		EvP.push(u);
	});
}
function events() {
	try {
		var uid = firebase.auth().currentUser.uid;

		var a = firebaseRef.child('Users').child(uid).child("Friends").orderByChild("status").equalTo("t")
			.on("value", function (snapshot) {
				snapshot.forEach(function (data) {
					var ref = firebase.database().ref("Users/" + data.key);
					ref.once("value").then(function (snapshit) {

						downloadE(data.key)

					});

				});

			});
	} catch (e) {
		location.reload();
	}
	setTimeout(function () {
		friendsEvents();
		friendspos();
		document.getElementById("bd").style.cursor = "auto"
	}, 2000);

}

function yourpos(x, y) {
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref("/Users/" + uid + "/Full_Name").once("value").then(function (snapshot) {
		var u = snapshot.val();
		firebaseRef.child("Users").child(uid).child("Position").set(x + "@" + y + "@" + u);
	});
}

function friendspos() {
	var uid = firebase.auth().currentUser.uid;
	firebaseRef.child('Users').child(uid).child("Friends").orderByChild("status").equalTo("t")
	.on("value", function (snapshot) {
		snapshot.forEach(function (data) {
			var ref = firebase.database().ref("Users/" + data.key);
			ref.once("value").then(function (snapshit) {
				var b = firebase.database().ref("/Users/" + data.key + "/Position").on("value", function (shothead) {
						var v = shothead.val();
						$.each(v.split(/\@/), function (i, val) {
							fLoc.push(val);
						});
					});
			});
		});
	});
	//console.log(fLoc);
	setTimeout(function () {
		drawFriends();
	}, 2000);
}
var fLoc = [];

function friendsEvents(){
for (var h = 0; h < EvP.length; h += 8) {
	if (EvP[h] == EvP[h + 8]) {
		EvP.splice(h, 8);
	}
}


for (var i = 0; i < EvP.length; i += 8) {
	//console.log("hello" + EvP[i + 1] + " " + EvP[i + 2] + " " + EvPEvP[i + 3] + " " + EvPEvP[i + 4] + " " + EvPEvP[i + 5] + " " + EvPEvP[i + 6]);
	evCircle(context7, EvP[i], EvP[i + 1], EvP[i + 2], EvP[i + 3], EvP[i + 4], EvP[i + 5]);
	var ul2 = document.getElementById("dynamic-list");
	var li2 = document.createElement("li");
	//li2.setAttribute('title', "click to delete");
	li2.appendChild(document.createTextNode(EvP[i + 2] + " " + EvP[i + 6] + " " + EvP[i + 7]));
	ul2.appendChild(li2);

}
}

function drawFriends() {

	for (var i = 0; i < fLoc.length; i += 3) {

		context2.beginPath();
		context2.arc(fLoc[i], fLoc[i + 1], 8, 0, 2 * Math.PI, false);
		context2.fillStyle = '#4286f4';
		context2.fill();
		context2.lineWidth = 2;
		context2.strokeStyle = 'white';
		context2.stroke();
		context2.font = "11px Arial";
		context2.fillStyle = "black";
		var rname = fLoc[i + 2];
		try {
			context2.fillText(rname, fLoc[i] - rname.length * 2.5, fLoc[i + 1] - 15);
		} catch (e) {}
		PointH.push({
			x : fLoc[i],
			y : fLoc[i + 1],
			n : rname
		});
	}
}
