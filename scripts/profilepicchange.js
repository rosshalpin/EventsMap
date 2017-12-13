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
function profileinfo(){
	document.getElementById("email").innerText=theuser.email;
	var nameref = firebase.database().ref("/Users/"+theuser.uid+"/Full_Name").once("value").then(function(snapshot){
        var i = snapshot.val();
		document.getElementById("name").innerText=i;
        //console.log(i);
    });
	profile();
}

function profile(){
	var storager=firebase.storage().ref(theuser.uid+'/profilepic/profilepicture.jpg');
	if(storager!=null){
		storager.getDownloadURL().then(function(url){
		document.getElementById("pp").src=url;
		//console.log(url);
	});
	}
}

function peepspic(u){
	var storager=firebase.storage().ref(u+'/profilepic/profilepicture.jpg');
	if(storager!=null){
		storager.getDownloadURL().then(function(url){
            console.log("das nice "+url);
		document.getElementById(u).src=url;
		console.log("peeps"+url);
	});
	}
}
