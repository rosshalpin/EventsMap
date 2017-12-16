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
    console.log("send "+theuser.uid)

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
	var nameref = firebase.database().ref("/Users/"+uid+"/Full_Name").once("value").then(function(snapshot){
        var i = snapshot.val();
		document.getElementById("username").innerText=i;
        //console.log(i);
    });
	profile(uid);
}

function profile(uid){
	var storager=firebase.storage().ref(uid+'/profilepic/profilepicture.jpg');
    console.log(storager.location.u);
	if(storager.location.u!==null){
		storager.getDownloadURL().then(function(url){
		document.getElementById("pp").src=url;
		//console.log(url);
	}).catch(function(error){
        console.log("no error");
        var a= firebaseRef.child('Users').child(uid).child("Image_URL").on("value",function(snapshot){
            //everytime a value tha matchs the requirements are meet the ID is sent to the display people function.
            if(snapshot.val()!==null){
                document.getElementById("pp").src=snapshot;
            }else{
                console.log("no picture");
            }

            //console.log(p);
            });
        });
    }
}

function peepspic(u){
    console.log("hello");
	var storager=firebase.storage().ref(u+'/profilepic/profilepicture.jpg');
	if(storager!==null){
		storager.getDownloadURL().then(function(url){
		document.getElementById(u).src=url;
	});
	}
}
