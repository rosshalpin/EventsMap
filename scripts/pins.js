var toggle = false;
function cEvent() {
	toggle = true;
}
var getxa, getya, op = 0, PointE = [];;
$(document).mousedown(function (e) {

	if (e.which != 1 && toggle == true && op < 10) {
		context4.clearRect(0, 0, canvas4.width, canvas4.height);
		context5.clearRect(0, 0, canvas4.width, canvas4.height);

		var rect = canvas.getBoundingClientRect();
		var coords = getCanvasCoords(e.clientX - rect.left, e.clientY - rect.top);
		getxa = coords.x;
		getya = coords.y;

		document.getElementById("edial").style.visibility = "visible";
		$('.panzoom').panzoom('option', 'disableZoom', true);
		$('.panzoom').panzoom('option', 'disablePan', true);

		toggle = false;

	} else {
		toggle = false;
	}

});

function toasting(ly) {

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

document.getElementById("dynamic-list").addEventListener("click", function (e) {
	if (e.target && e.target.nodeName == "LI") {
		context4.clearRect(0, 0, canvas4.width, canvas4.height);
		context5.clearRect(0, 0, canvas4.width, canvas4.height);
		console.log(e.target.id + " was clicked");
		var strname = e.target.id;
		var idd = strname.replace(/[^0-9]/g, '');
		console.log(idd);
		drawRoute(Math.round((PointE[0].x) / 2), Math.round((PointE[0].y) / 2), Math.round((PointE[idd].x) / 2), Math.round((PointE[idd].y) / 2));

	}
});

var pixelData, val, r = 0, g = 255, b = 255;

function addItem() {
	$('.panzoom').panzoom('option', 'disableZoom', false);
	$('.panzoom').panzoom('option', 'disablePan', false);
	$('#friends').addClass('menu-open');
	$('.controls').addClass('menu-open');
	$('body').addClass('menu-open');
	document.getElementById("edial").style.visibility = "hidden";
	var rect2 = canvas.getBoundingClientRect();
	var coords2 = getCanvasCoords(event.clientX - rect2.left, event.clientY - rect2.top);
	var evName = document.getElementById("eventName");
	var ul = document.getElementById("dynamic-list");

	if (op < 11) {
		evName.focus();
		op++;
		var li = document.createElement("li");
		li.setAttribute('id', "event" + op);

		li.appendChild(document.createTextNode(evName.value + " (" + Math.round(coords2.x) + ", " + Math.round(coords2.y)
				 + ") rgb(" + r + ", " + g + ", " + b + ")"));
		//console.log(evName.value + " x: " + Math.round(coords2.x) + " y: " + Math.round(coords2.y)
		//+ " rgb(" + r +", " + g+", " + b +")" );

		ul.appendChild(li);
		PointE.push({
			x : getxa,
			y : getya,
			n : evName.value,
			r : r,
			g : g,
			b : b
		});
		context2.beginPath();
		context2.arc(getxa, getya, 12, 0, 2 * Math.PI, false);
		context2.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
		context2.fill();
		context2.lineWidth = 2;
		context2.strokeStyle = 'white';
		context2.stroke();
		context2.font = "11px Arial";
		context2.fillStyle = "white";
		context2.fillText("E", getxa - 4, getya + 4);
	}
	evName.value = "";
	evName.setAttribute("placeholder", "Enter Name...");
	var rng = document.getElementById("myRange");
	rng.value = 101;
	document.getElementById("edial").style.backgroundColor = 'rgb(' + 0 + ',' + 255 + ',' + 255 + ')';
	document.getElementById("subbut").style.color = 'rgb(' + 0 + ',' + 255 + ',' + 255 + ')';
	r = 0;
	g = 255;
	b = 255;
	console.log(PointE);
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

slider.oninput = function () {
	val = this.value;
	if (val > 197) {
		r = 255;
		g = 0;
		b = 0;
	} else {
		r = pixelData[(val * 4)];
		g = pixelData[(val * 4) + 1];
		b = pixelData[(val * 4) + 2];
	}
	//console.log("R: " + r + " G: " + g + " B: " + b);
	document.getElementById("edial").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	document.getElementById("subbut").style.color = 'rgb(' + r + ',' + g + ',' + b + ')';

}

function getClr() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var grd = ctx.createLinearGradient(0, 0, 202, 1);

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
	ctx.fillRect(0, 0, 202, 1);

	pixelData = ctx.getImageData(0, 0, 202, 1).data;
	//console.log(pixelData);
}

function removeItem() {
	var ul = document.getElementById("dynamic-list");
	var candidate = document.getElementById("candidate");
	var item = document.getElementById(candidate.value);
	ul.removeChild(item);
}
