var toggle = false;
function cEvent() {
	if (document.getElementById("eventButton").value == "E") {
		toggle = true;
	}
}

var getxa, getya, op = 0, PointA = [], PointE = [], PointF = [];
$(document).mousedown(function (e) { 

	if (e.which != 1 && toggle == true && op < 10) { //if the users clicks to create a new event
		context4.clearRect(0, 0, canvas4.width, canvas4.height); //clear the canvas
		context5.clearRect(0, 0, canvas4.width, canvas4.height);

		var rect = canvas.getBoundingClientRect();
		var coords = getCanvasCoords(e.clientX - rect.left, e.clientY - rect.top);
		getxa = coords.x;
		getya = coords.y;

		document.getElementById("edial").style.visibility = "visible"; //show event dialog
		$('.panzoom').panzoom('option', 'disableZoom', true);
		$('.panzoom').panzoom('option', 'disablePan', true);

		toggle = false;

	}

});

function toasting(ly) { //implementation of w3schools toasting

	var par = document.getElementById("snackdiv");
	var x = document.createElement("div");
	par.appendChild(x);
	x.setAttribute('id', "snackbar");
	x.innerHTML = ly;
	x.className = "show";
	setTimeout(function () {
		x.className = x.className.replace("show", "");
	}, 3000);

}

function closing() { //xancelling event dialogue and resetting values, along with renabling panzoom
	document.getElementById("edial").style.visibility = "hidden";
	var evNam = document.getElementById("eventName");
	var evTim = document.getElementById("eventHr");
	evNam.value = "";
	evTim.value = "";
	$('.panzoom').panzoom('option', 'disableZoom', false);
	$('.panzoom').panzoom('option', 'disablePan', false);
	resetcol();
}

var pixelData, val, r = 0, g = 255, b = 255;

function addItem() { //adding an event
	var evName = document.getElementById("eventName");
	var evTime = document.getElementById("eventHr");
	if (evName.value == "" || evTime.value == "") { //prevent user from adding event without a name or time
		toasting("Please enter event name and time");
		$("#subbut").effect("shake");
	} else {
		$('.panzoom').panzoom('option', 'disableZoom', false); //renable panzoom
		$('.panzoom').panzoom('option', 'disablePan', false);
		
		document.getElementById("edial").style.visibility = "hidden"; //hide the event dialoge
		var rect2 = canvas.getBoundingClientRect();
		var coords2 = getCanvasCoords(event.clientX - rect2.left, event.clientY - rect2.top);  //get coordinates relevant to canvas on zoom

		var ul = document.getElementById("dynamic-list");

		if (op < 11) {
			evName.focus();
			op++;
			var li = document.createElement("li");
			li.setAttribute('id', "event" + op);
			li.setAttribute('title', "click to delete");
			li.appendChild(document.createTextNode(evName.value + " " + evTime.value));
			ul.appendChild(li);
			//add event to dynamic list
			
			PointE.push({
				x : getxa,
				y : getya,
				n : evName.value,
				r : r,
				g : g,
				b : b
			});
			
			evCircle(context6, getxa, getya, evName.value, r, g, b); //draw event
			centering(getxa, getya, evName.value, ); //center on event
			uploadE(Math.floor(getxa), Math.floor(getya), evName.value, r, g, b, evTime.value); //upload event

		}
		evName.value = "";
		evTime.value = "";
		evName.setAttribute("placeholder", "Enter Name...");
		//reset event dialogue attributes
		resetcol();
		r = 0;
		g = 255;
		b = 255;
	}
}

function inCircle(x, y, mx, my, n) { //check if point is within radius of a point
	if (Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my)) < n) {
		return true;
	} else {
		return false;
	}
}

evCircle = function (ctx, x, y, evName, r, g, b) { //draw event
	ctx.beginPath();
	ctx.arc(x, y, 8, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'white';
	ctx.stroke();
	ctx.font = "11px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(evName, x - evName.length * 2.5, y - 15);
	ctx.closePath;

};

function resetcol() {
	document.getElementById("subbut").style.backgroundColor = 'rgb(' + 0 + ',' + 255 + ',' + 255 + ')';
	document.getElementById("canbut").style.backgroundColor = 'rgb(' + 0 + ',' + 255 + ',' + 255 + ')';
	rules[0].style.background = 'rgb(' + 0 + ',' + 255 + ',' + 255 + ')';
	document.getElementById("colorRange").value = 100;
}

var slider = document.getElementById("colorRange");
var output = document.getElementById("demo");

/*
creating custom rule for slider thumb and overwriting the position in the rules
*/
var style = document.createElement("style");
document.head.appendChild(style);
var rule = ".slider::-webkit-slider-thumb { background: rgb(" + r + "," + g + "," + b + "); width:20px; height:20px; }";
style.sheet.insertRule(rule, 0);
var rules = style.sheet.cssRules;

$("#colorRange").mousedown(function () { //change slider thumb size
	rules[0].style.width = '25px'; 
	rules[0].style.height = '25px';
});

$("#colorRange").mouseup(function () { //change slider thumb size
	rules[0].style.width = '20px';
	rules[0].style.height = '20px'; 
});

slider.oninput = function () { //on slider input, loop through gradient data to get accurate color
	val = this.value;
	r = pixelData[(val * 4)];
	g = pixelData[(val * 4) + 1];
	b = pixelData[(val * 4) + 2];
	document.getElementById("subbut").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	document.getElementById("canbut").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	rules[0].style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function getClr() { //this creates the gradient and then converts it to an rgb array
	var c = document.getElementById("gradient");
	var ctx = c.getContext("2d");

	var grd = ctx.createLinearGradient(0, 0, 200, 10);

	grd.addColorStop(0, "red");
	grd.addColorStop(1 / 9, "purple");
	grd.addColorStop(2 / 9, "purple");
	grd.addColorStop(3 / 9, "blue");
	grd.addColorStop(4 / 9, "aqua");
	grd.addColorStop(5 / 9, "aqua");
	grd.addColorStop(6 / 9, "lime");
	grd.addColorStop(7 / 9, "yellow");
	grd.addColorStop(8 / 9, "yellow");
	grd.addColorStop(9 / 9, "red");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 200, 10);

	pixelData = ctx.getImageData(0, 0, 200, 1).data;
}

function centering(x, y) { //center panzoom on point
	zooming = 1;
	$('.panzoom').panzoom('zoom', 1, {
		animate : true
	});
	$('.panzoom').panzoom('pan', (1000 - x) + window.innerWidth / 2, (1000 - y) + window.innerHeight / 2, {
		animate : true
	});
}
