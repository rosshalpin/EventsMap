pp.addEventListener('click', e=>{
    document.getElementById('light').style.display='block';
    //document.getElementById('fade').style.display='block';
});
wc.addEventListener('click', e=>{
    document.getElementById('light').style.display='none';
    //document.getElementById('fade').style.display='none';
});

fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];
    console.log(file);

    var storageRef=firebase.storage().ref(theuser.uid+'/profilepic/profilepicture.jpg');

    var task = storageRef.put(file);

    task.on('state_changed',

    function progress(snapshot){
        var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        uploader.value=percentage;
    },

    function error(err){
    },

    function complete(){
		profile();
    },

    );
});
function profileinfo(uid){
    console.log(uid);
    var firebaseRef = firebase.database().ref();
    var nref = firebase.database().ref("/Users/"+uid+"/Email").once("value").then(function(snapshot){
        var u = snapshot.val();
        document.getElementById("email").innerHTML=u;
    });
	var nameref = firebase.database().ref("/Users/"+uid+"/Full_Name").once("value").then(function(snapshot){
        var i = snapshot.val();
		document.getElementById("name").innerText=i;
        //console.log(i);
    });
	profile(uid);
}

function profile(uid){
	var storager=firebase.storage().ref(uid+'/profilepic/profilepicture.jpg');
	if(storager){
        console.log("suh");
		storager.getDownloadURL().then(function(url){
		document.getElementById("pp").src=url;
		//console.log(url);
	});
}else{
    var a= firebaseRef.child('Users').child(uid).child("Image_URL").on("value",function(snapshot){
        console.log("works");
        //everytime a value tha matchs the requirements are meet the ID is sent to the display people function.
        console.log(snapshot);
        //console.log(p);
    });
}
}

function peepspic(u){
	var storager=firebase.storage().ref(u+'/profilepic/profilepicture.jpg');
	if(storager!=null){
		storager.getDownloadURL().then(function(url){
		document.getElementById(u).src=url;
	});
	}
}
