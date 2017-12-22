var easystar = new EasyStar.js();
var canvas = document.getElementById("layer1");
var context = canvas.getContext("2d");
var canvas2 = document.getElementById("layer2");
var context2 = canvas2.getContext("2d");
var canvas3 = document.getElementById("pfcanvas");
var context3 = canvas3.getContext("2d");
var canvas4 = document.getElementById("layer3");
var context4 = canvas4.getContext("2d");
var canvas5 = document.getElementById("layer4");
var context5 = canvas5.getContext("2d");
var canvas6 = document.getElementById("layer5");
var context6 = canvas6.getContext("2d");
var canvas7 = document.getElementById("layer6");
var context7 = canvas7.getContext("2d");

var sourceXmax = -6.622480;
var sourceXmin = -6.569707;

var sourceYmax = 53.395644;
var sourceYmin = 53.364110;

var T1 = 2000;
var T2 = 0;

var xloc, yloc;

var imageObj = new Image();
imageObj.src = 'https://i.imgur.com/Wj6Mjx7.jpg';
var pixel = new Array();

PointH = [];

var img = new Image();
img.onload = function () {
	context3.drawImage(img, 0, 0, 1000, 1000);
	var imgData = context3.getImageData(0, 0, canvas3.height, canvas3.width);
	//converting rgb array to multivariable array representing the map
	for (i = 0; i < canvas3.height; i++) {
		pixel[i] = new Array();
		for (j = 0; j < canvas3.width; j++) {
			if (imgData.data[((i * canvas3.width) + j) * 4] == 255) {
				pixel[i][j] = 1;
			} else if (imgData.data[((i * canvas3.width) + j) * 4] == 150) {
				pixel[i][j] = 2;
			} else {
				pixel[i][j] = 0;
			}
		}
	}

	//initialising easystar
	easystar.setGrid(pixel);
	easystar.setAcceptableTiles([1, 0]);
	easystar.setTileCost(0, 30);
	easystar.enableDiagonals();
	easystar.enableCornerCutting();

	//hardcoded locations
	PointH.push({
		x : translateLocation(T1, T2, sourceXmin, sourceXmax, -6.590604),
		y : translateLocation(T1, T2, sourceYmin, sourceYmax, 53.381660),
		n : "Brady's"
	});
	PointH.push({
		x : translateLocation(T1, T2, sourceXmin, sourceXmax, -6.591477),
		y : translateLocation(T1, T2, sourceYmin, sourceYmax, 53.381304),
		n : "Mischief"
	});
	PointH.push({
		x : translateLocation(T1, T2, sourceXmin, sourceXmax, -6.592432),
		y : translateLocation(T1, T2, sourceYmin, sourceYmax, 53.381074),
		n : "The Roost"
	});
	PointH.push({
		x : translateLocation(T1, T2, sourceXmin, sourceXmax, -6.603633),
		y : translateLocation(T1, T2, sourceYmin, sourceYmax, 53.383013),
		n : "Student Union Bar"
	});
	var len = PointH.length;
	for (var f = 0; f < PointH.length; f++) { //drawing hardcoded positions
		context2.beginPath();
		context2.font = "12px Arial";
		context2.fillText("🍸", PointH[f].x - 7, PointH[f].y);
		context2.closePath();
		context2.beginPath();
		context2.font = "9px Arial";
		context2.fillStyle = "black";
		context2.fillText(PointH[f].n, PointH[f].x - (PointH[f].n.length * 2), PointH[f].y - 13);
		context2.closePath();
	}
}
img.src = 'images/map.png';

imageObj.onload = function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}

function centerOn() {
	zooming = 1;

	$('.panzoom').panzoom('zoom', 1, {
		animate : true
	});
	$('.panzoom').panzoom('pan', (1000 - xloc) + window.innerWidth / 2, (1000 - yloc) + window.innerHeight / 2, {
		animate : true
	});

}

var getX, getY;
var zooming = 1;

function init() {
	autoComplete();
	zoomFunc();
}
function showPosition(position) {
	events(); //download users events and friends events
	
	yloc = position.coords.latitude; //get lat
	xloc = position.coords.longitude; //get long
	
	getY = position.coords.latitude;
	getX = position.coords.longitude;

	if ((xloc < sourceXmax || xloc > sourceXmin) && (yloc > sourceYmax || yloc < sourceYmin)) {
		//alert("Spoofing coordinates");
		yloc = 53.383813;
		xloc = -6.597999;
	}

	var sourceX = xloc;
	var sourceY = yloc;

	xloc = translateLocation(T1, T2, sourceXmin, sourceXmax, sourceX); //convert long
	yloc = translateLocation(T1, T2, sourceYmin, sourceYmax, sourceY); //convert lat
	
	yourpos(xloc, yloc); //upload your position
	
	//console.log(xloc + " " + yloc);
	PointA.push({
		x : Math.round(xloc),
		y : Math.round(yloc),
		n : "",
		r : 0,
		g : 0,
		b : 0
	});

	var username = "User";
	var usrnm = username.replace(/(\B[a-z])|(\s)/g, '');

	context.imageSmoothingEnabled = false;
	context.drawImage(imageObj, 0, 0, 2000, 2000);
	context7.beginPath();
	context7.arc(xloc, yloc, 8, 0, 2 * Math.PI, false);
	context7.fillStyle = '#4286f4';
	context7.fill();
	context7.lineWidth = 2;
	context7.strokeStyle = 'white';
	context7.stroke();
	context7.font = "11px Arial";
	context7.fillStyle = "white";
	context7.fillText(usrnm[0], xloc - 4, yloc + 4);
	context7.closePath();

	$('.panzoom').panzoom('pan', (1000 - xloc) + window.innerWidth / 2, (1000 - yloc) + window.innerHeight / 2);
}

function zoomFunc() { //implementing panzoom
	var $panzoom = $('.panzoom').panzoom({});

	$('.panzoom').panzoom('zoom', 1);
	$('#resetButton').click(function (e) {
		if (zooming <= 0.21) {
			zooming = 0.2;
		} else {
			zooming = zooming - 0.2;
		}
		$('.panzoom').panzoom('zoom', zooming, {
			animate : true,
			focal : {
				clientX : window.innerWidth / 2,
				clientY : window.innerHeight / 2
			}
		});
	});

	$('#zoomButton').click(function (e) {
		if (zooming >= 1.999999999) {
			zooming = 1.999999999;
		} else {
			zooming = zooming + 0.2;
		}
		$('.panzoom').panzoom('zoom', zooming, {
			animate : true,
			focal : {
				clientX : window.innerWidth / 2,
				clientY : window.innerHeight / 2
			}
		});
	});
}

function autoComplete() { //setting autocomplete
	var options = {
		url : "data/addresses.js",
		list : {
			maxNumberOfElements : 10,
			match : {
				enabled : true
			}
		}
	};

	$("#txtin").easyAutocomplete(options);
}

function getCanvasCoords(x, y) { //converting transformed panzoom canvas coords 
	var matrix = $('.panzoom').panzoom("getMatrix");
	var calc_x = x * (1 / matrix[0]);
	var calc_y = y * (1 / matrix[3]);
	return {
		x : calc_x,
		y : calc_y
	};
}

var x1, y1, x2, y2;
var printx = false;
var sc = 2;

function Point1(fx, fy) { //drawing a marker at point1(x,y)
	x1 = Math.round((fx) / sc);
	y1 = Math.round((fy) / sc);

	context4.clearRect(0, 0, canvas4.width, canvas4.height);
	context5.clearRect(0, 0, canvas4.width, canvas4.height);
	context5.beginPath();
	context5.arc(Math.round((fx)), Math.round((fy)), 4, 0, 2 * Math.PI, false);
	context5.fillStyle = 'white';
	context5.fill();
	context5.lineWidth = 1;
	context5.strokeStyle = 'black';
	context5.stroke();
	context5.closePath();
	printx = true;
}

function Point2(fx, fy) { //drawing a marker at point2(x,y)
	x2 = Math.round(fx / sc);
	y2 = Math.round(fy / sc);

	context5.beginPath();
	context5.arc(Math.round(fx), Math.round(fy), 4, 0, 2 * Math.PI, false);
	context5.fillStyle = 'white';
	context5.fill();
	context5.lineWidth = 1;
	context5.strokeStyle = 'black';
	context5.stroke();
	context5.closePath();
	printx = false;
}

function drawRoute(x, y, xx, yy) { //implementation of easystars pathfinding

	easystar.findPath(x, y, xx, yy, function (path) {
		if (path != null) {
			for (i = 0; i < path.length - 1; i++) {
				context4.beginPath();
				context4.arc((path[i].x) * sc, (path[i].y) * sc, 2, 0, 2 * Math.PI, false);
				context4.fillStyle = '#4286f4';
				context4.fill();
				context4.closePath();
			}
			var dis = Math.round(path.length * 1.79 * 2);
			document.getElementById("dist").innerHTML = dis + " meters " + Math.round((dis / 1.38) / 60) + " min walk";
		}
	});
	easystar.calculate();
}

$(document).mouseup(function (e) {
	if (e.which != 1 && toggle == false && document.getElementById("edial").style.visibility != "visible") {
		var rect = canvas.getBoundingClientRect();
		var coords = getCanvasCoords(e.clientX - rect.left, e.clientY - rect.top);
		var incirc = false;
		for (var i = 0; i < PointE.length; i++) {
			if (inCircle(PointE[i].x, PointE[i].y, coords.x, coords.y, 8) && printx == false) {
				/*
				if the user right clicks within 8 pixel radius of an element in PointE
				draw route from the position to the users position
				and center on the PointE element
				*/
				incirc = true;
				context4.clearRect(0, 0, canvas4.width, canvas4.height);
				context5.clearRect(0, 0, canvas4.width, canvas4.height);
				drawRoute(Math.round((PointA[0].x) / 2), Math.round((PointA[0].y) / 2), Math.round((PointE[i].x) / 2), Math.round((PointE[i].y) / 2));
				centering(PointE[i].x, PointE[i].y);
			}
		}
		for (i = 0; i < EvP.length; i += 8) {
			if (inCircle(EvP[i], EvP[i + 1], coords.x, coords.y, 8) && printx == false) {
				/*
				if the user right clicks within 8 pixel radius of an element in EvP
				draw route from the position to the users position
				and center on the EvP element
				*/
				incirc = true;
				context4.clearRect(0, 0, canvas4.width, canvas4.height);
				context5.clearRect(0, 0, canvas4.width, canvas4.height);
				drawRoute(Math.round((PointA[0].x) / 2), Math.round((PointA[0].y) / 2), Math.round((EvP[i]) / 2), Math.round((EvP[i + 1]) / 2));
				centering(EvP[i], EvP[i + 1]);

			}
		}

		for (var i = 0; i < PointH.length; i++) {
			if (inCircle(PointH[i].x, PointH[i].y, coords.x, coords.y, 12) && printx == false) {
				/*
				if the user right clicks within 12 pixel radius of an element in PointH
				draw route from the position to the users position
				and center on the PointH element
				*/
				incirc = true;
				context4.clearRect(0, 0, canvas4.width, canvas4.height);
				context5.clearRect(0, 0, canvas4.width, canvas4.height);
				drawRoute(Math.round((PointA[0].x) / 2), Math.round((PointA[0].y) / 2), Math.round((PointH[i].x) / 2), Math.round((PointH[i].y) / 2));
				centering(PointH[i].x, PointH[i].y);

			}
		}

		if (incirc == false && printx == false) {
			Point1(coords.x, coords.y);
		} else if (printx == true) {
			Point2(coords.x, coords.y);
			drawRoute(x1, y1, x2, y2);

		}
	}
});

var checked = false;

$('input[name="direcCheck"]').on('click', function () { //check if get routes checkbox is checked
	if ($(this).is(':checked')) {
		checked = true;
		console.log("checked");
	} else {
		checked = false;
		console.log("un checked");
	}
});

function search(terms) {
	if (event.key === 'Enter') {
		var srch = terms.value;
		var num = srch.replace(/[^0-9]/g, ''); //separate out house number
		var adr = srch.replace(/[0-9]{1,} /g, ''); //seperate out street address
		
		
		$.getJSON("data/map.geojson", function (json) {
			for (var i = 0; i < 7271; i++) {
				try {
					if (json.features[i].properties.street === adr && json.features[i].properties.housenumber === num) { //check if address matches search terms
					
						var lo = json.features[i].geometry.coordinates[0][0]; 
						if (lo == null) { //if the feature does not have the above structure
							lo = json.features[i].geometry.coordinates; //use this one
						}
						//console.log(lo);
						if (lo != null) {
							var xa = translateLocation(T1, T2, sourceXmin, sourceXmax, lo[0]); //translate the features coords
							var ya = translateLocation(T1, T2, sourceYmin, sourceYmax, lo[1]);
							
							centering(xa, ya); //center the view on those coords

							if (checked == true) { //if get routes is checked

								Point1(xa, ya); //define our first point

								sY = getY; //get users location
								sX = getX;

								if ((sX < sourceXmax || sX > sourceXmin) && (sY > sourceYmax || sY < sourceYmin)) { //if outside maynooth pretend they are
									//alert("Spoofing coordinates");
									sY = 53.383813;
									sX = -6.597999;
								}

								var xc = translateLocation(T1, T2, sourceXmin, sourceXmax, sX); //translate users location
								var yc = translateLocation(T1, T2, sourceYmin, sourceYmax, sY);
								Point2(xc, yc); //set second point at users location
								
								drawRoute(Math.round(xc / 2), Math.round(yc / 2), Math.round(xa / 2), Math.round(ya / 2)); //drawRoute between both points
								
								if (adr != "Student Union Bar" && adr != "Mischief" && adr != "The Roost" && adr != "Brady's") { //if not theses addresses
									context5.beginPath(); //draw the address name above its marker
									context5.font = "11px Arial";
									context5.fillStyle = "black";
									context5.fillText(srch, xa - (srch.length * 2.5), ya - 10);
									context5.closePath();
								}
							} else { //if get routes is not checked
								Point1(xa, ya);
								Point2(xa, ya);  //draw both points in same place
								if (adr != "Student Union Bar" && adr != "Mischief" && adr != "The Roost" && adr != "Brady's") {
									context5.beginPath(); //draw the address name above its marker
									context5.font = "11px Arial";
									context5.fillStyle = "black";
									context5.fillText(srch, xa - (srch.length * 2.5), ya - 10);
									context5.closePath();
								}
							}
						}
					}

					if (num == "" && json.features[i].properties.name === adr) { //if it is an address without a number do the same as above but with different structure of json
						var lo = json.features[i].geometry.coordinates[0][0];
						if (lo == null) {
							lo = json.features[i].geometry.coordinates;
						}
						//console.log(lo);
						if (lo != null) {
							var xa = translateLocation(T1, T2, sourceXmin, sourceXmax, lo[0]);
							var ya = translateLocation(T1, T2, sourceYmin, sourceYmax, lo[1]);
							centering(xa, ya);

							if (checked == true) {

								Point1(xa, ya);

								sY = getY;
								sX = getX;

								if ((sX < sourceXmax || sX > sourceXmin) && (sY > sourceYmax || sY < sourceYmin)) {
									//alert("Spoofing coordinates");
									sY = 53.383813;
									sX = -6.597999;
								}

								var xc = translateLocation(T1, T2, sourceXmin, sourceXmax, sX);
								var yc = translateLocation(T1, T2, sourceYmin, sourceYmax, sY);
								Point2(xc, yc);
								drawRoute(Math.round(xc / 2), Math.round(yc / 2), Math.round(xa / 2), Math.round(ya / 2));
								if (adr != "Student Union Bar" && adr != "Mischief" && adr != "The Roost" && adr != "Brady's") {
									context5.beginPath();
									context5.font = "11px Arial";
									context5.fillStyle = "black";
									context5.fillText(srch, xa - (srch.length * 2.5), ya - 10);
									context5.closePath();
								}
							} else {
								Point1(xa, ya);
								Point2(xa, ya);
								if (adr != "Student Union Bar" && adr != "Mischief" && adr != "The Roost" && adr != "Brady's") {
									context5.beginPath();
									context5.font = "11px Arial";
									context5.fillStyle = "black";
									context5.fillText(srch, xa - (srch.length * 2.5), ya - 10);
									context5.closePath();
								}
							}
						}
					}
				} catch (e) {}
			}
		});
	}
}

function translateLocation(T1, T2, S1, S2, SourceCoordinate) { //translating lat,long to x,y
	var TranslateFactor = (T2 * S1 - T1 * S2) / (S1 - S2)
	var ScalingFactor = (T2 - T1) / (S2 - S1)
	var TargetCoordinate = TranslateFactor + ScalingFactor * SourceCoordinate;
	return TargetCoordinate;
}

$('body').on('contextmenu', 'div', function (e) {
	return false; //disable right click menu
});

$('#nav-toggle').click(function () {
	$('#friends').toggleClass('menu-open'); //animate side bar
	$('.controls').toggleClass('menu-open');
	$('body').toggleClass('menu-open');
});
