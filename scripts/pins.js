var toggle = false;
function cEvent() {
	if (document.getElementById("eventButton").value == "E") {
		toggle = true;
	}
}

var getxa, getya, op = 0, PointA = [], PointE = [], PointF = [];
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
		//console.log(e.target.id + " was clicked");
		var strname = e.target.id;
		var idd = strname.replace(/[^0-9]/g, '');
		op = op - 1;
		redraw(idd - 1);
		//console.log(idd);

		var thg = '#' + strname;
		$(thg).value = "";
		$('li:eq(' + (idd - 1) + ')').remove();

	}
});

function closing() {
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

function addItem() {
	var evName = document.getElementById("eventName");
	var evTime = document.getElementById("eventHr");
	if (evName.value == "" || evTime.value == "") {
		toasting("Please enter event name and time");
		$("#subbut").effect("shake");
	} else {
		$('.panzoom').panzoom('option', 'disableZoom', false);
		$('.panzoom').panzoom('option', 'disablePan', false);
		$('#friends').addClass('menu-open');
		$('.controls').addClass('menu-open');
		$('body').addClass('menu-open');
		document.getElementById("edial").style.visibility = "hidden";
		var rect2 = canvas.getBoundingClientRect();
		var coords2 = getCanvasCoords(event.clientX - rect2.left, event.clientY - rect2.top);

		var ul = document.getElementById("dynamic-list");

		if (op < 11) {
			evName.focus();
			op++;
			var li = document.createElement("li");
			li.setAttribute('id', "event" + op);
			li.setAttribute('title', "click to delete");
			//li.appendChild(document.createTextNode(evName.value + " (" + Math.round(coords2.x) + ", " + Math.round(coords2.y)+ ") rgb(" + r + ", " + g + ", " + b + ") " + evTime.value));
			li.appendChild(document.createTextNode(evName.value + " " + evTime.value));
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
			evCircle(context6, getxa, getya, evName.value, r, g, b);
			centering(getxa, getya, evName.value, );
			//console.log( Math.floor(getxa) + " " + Math.floor(getya) + " " + evName.value + " " + r + " " + g + " " + b + " " + evTime.value);
			uploadE(Math.floor(getxa), Math.floor(getya), evName.value, r, g, b, evTime.value);

		}
		evName.value = "";
		evTime.value = "";
		evName.setAttribute("placeholder", "Enter Name...");

		resetcol();
		r = 0;
		g = 255;
		b = 255;
	}
}

function redraw(x) {
	context4.clearRect(0, 0, canvas4.width, canvas4.height);
	context5.clearRect(0, 0, canvas4.width, canvas4.height);
	context6.clearRect(0, 0, canvas6.width, canvas6.height);
	PointE.splice(x, 1);

	for (var i = 0; i < PointE.length; i++) {
		evCircle(context6, PointE[i].x, PointE[i].y, PointE[i].r, PointE[i].g, PointE[i].b);
	}
}

function inCircle(x, y, mx, my, n) {
	if (Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my)) < n) {
		return true;
	} else {
		return false;
	}
}

evCircle = function (ctx, x, y, evName, r, g, b) {
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

var style = document.createElement("style");
document.head.appendChild(style);
var rule = ".slider::-webkit-slider-thumb { background: rgb(" + r + "," + g + "," + b + "); width:20px; height:20px; }";
style.sheet.insertRule(rule, 0);
var rules = style.sheet.cssRules;

$("#colorRange").mousedown(function () {
	rules[0].style.width = '25px';
	rules[0].style.height = '25px';
});

$("#colorRange").mouseup(function () {
	rules[0].style.width = '20px';
	rules[0].style.height = '20px';
});

slider.oninput = function () {
	val = this.value;
	r = pixelData[(val * 4)];
	g = pixelData[(val * 4) + 1];
	b = pixelData[(val * 4) + 2];
	document.getElementById("subbut").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	document.getElementById("canbut").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	rules[0].style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function getClr() {
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

function centering(x, y) {
	zooming = 1;
	$('.panzoom').panzoom('zoom', 1, {
		animate : true
	});
	$('.panzoom').panzoom('pan', (1000 - x) + window.innerWidth / 2, (1000 - y) + window.innerHeight / 2, {
		animate : true
	});
}
