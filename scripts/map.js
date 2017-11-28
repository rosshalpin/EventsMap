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

var sourceXmax = -6.622480;
var sourceXmin = -6.569707

var sourceYmax = 53.395644;
var sourceYmin = 53.364110;

var T1 = 2000;
var T2 = 0;

var xloc, yloc;

var imageObj = new Image();
imageObj.src = 'https://i.imgur.com/Wj6Mjx7.jpg';
var pixel = new Array();

var img = new Image();
img.onload = function () {
	context3.drawImage(img, 0, 0, 1000, 1000);
	var imgData = context3.getImageData(0, 0, canvas3.height, canvas3.width);

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

	easystar.setGrid(pixel);
	easystar.setAcceptableTiles([1, 0]);
	easystar.setTileCost(0, 30);
	easystar.enableDiagonals();
	easystar.enableCornerCutting();
}
img.src = 'images/mapnn.png';

imageObj.onload = function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
};

var getX, getY;

function showPosition(position) {
	yloc = position.coords.latitude;
	xloc = position.coords.longitude;
	getY = position.coords.latitude;
	getX = position.coords.longitude;

	if ((xloc < sourceXmax || xloc > sourceXmin) && (yloc > sourceYmax || yloc < sourceYmin)) {
		//alert("Spoofing coordinates");
		yloc = 53.383813;
		xloc = -6.597999;
	}

	var sourceX = xloc;
	var sourceY = yloc;

	xloc = translateLocation(T1, T2, sourceXmin, sourceXmax, sourceX);
	yloc = translateLocation(T1, T2, sourceYmin, sourceYmax, sourceY);

	PointE.push({
		x : Math.round(xloc),
		y : Math.round(yloc),
		n : "",
		r : 0,
		g : 0,
		b : 0
	});

	context.drawImage(imageObj, 0, 0, 2000, 2000);
	context2.beginPath();
	context2.arc(xloc, yloc, 12, 0, 2 * Math.PI, false);
	context2.fillStyle = '#4286f4';
	context2.fill();
	context2.lineWidth = 2;
	context2.strokeStyle = 'white';
	context2.stroke();
	context2.font = "11px Arial";
	context2.fillStyle = "white";
	context2.fillText("RH", xloc - 8, yloc + 4);

}

function getCanvasCoords(x, y) {
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

function Point1(fx, fy) {
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
	printx = true;
}

function Point2(fx, fy) {
	x2 = Math.round(fx / sc);
	y2 = Math.round(fy / sc);

	context5.beginPath();
	context5.arc(Math.round(fx), Math.round(fy), 4, 0, 2 * Math.PI, false);
	context5.fillStyle = 'white';
	context5.fill();
	context5.lineWidth = 1;
	context5.strokeStyle = 'black';
	context5.stroke();
	printx = false;
}

function drawRoute(x, y, xx, yy) {
	context4.clearRect(0, 0, canvas4.width, canvas4.height);
	easystar.findPath(x, y, xx, yy, function (path) {
		if (path != null) {
			for (i = 0; i < path.length - 1; i++) {
				context4.beginPath();
				context4.arc((path[i].x) * sc, (path[i].y) * sc, 2, 0, 2 * Math.PI, false);
				context4.fillStyle = '#4286f4';
				context4.fill();
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

		if (printx == false) {
			Point1(coords.x, coords.y);
		} else {
			Point2(coords.x, coords.y);
			drawRoute(x1, y1, x2, y2);
		}
	}
});

function search(ele) {
	if (event.key === 'Enter') {
		var srch = ele.value;
		var num = srch.replace(/[^0-9]/g, '');
		var adr = srch.replace(/[0-9]{1,} /g, '');
		console.log("num:" + num + "adr:" + adr);
		$.getJSON("data/map.geojson", function (json) {
			for (var i = 0; i < 7273; i++) {
				try {
					if (json.features[i].properties.street === adr && json.features[i].properties.housenumber === num) {
						//console.log(json.features[i].properties.housenumber);
						var lo = json.features[i].geometry.coordinates[0][0];
						if (lo == null) {
							lo = json.features[i].geometry.coordinates;
						}
						console.log(lo);
						if (lo != null) {
							var xa = translateLocation(T1, T2, sourceXmin, sourceXmax, lo[0]);
							var ya = translateLocation(T1, T2, sourceYmin, sourceYmax, lo[1]);

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
						}
					}

					if (num == "" && json.features[i].properties.name === adr) {
						var lo = json.features[i].geometry.coordinates[0][0];
						if (lo == null) {
							lo = json.features[i].geometry.coordinates;
						}
						console.log(lo);
						if (lo != null) {
							var xa = translateLocation(T1, T2, sourceXmin, sourceXmax, lo[0]);
							var ya = translateLocation(T1, T2, sourceYmin, sourceYmax, lo[1]);

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
						}
					}
				} catch (e) {}
			}
		});
	}
}

function translateLocation(T1, T2, S1, S2, SourceCoordinate) {
	var TranslateFactor = (T2 * S1 - T1 * S2) / (S1 - S2)
	var ScalingFactor = (T2 - T1) / (S2 - S1)
	var TargetCoordinate = TranslateFactor + ScalingFactor * SourceCoordinate;
	return TargetCoordinate;
}

$('body').on('contextmenu', 'div', function (e) {
	return false;
});

$('#nav-toggle').click(function () {
	$('#friends').toggleClass('menu-open');
	$('.controls').toggleClass('menu-open');
	$('body').toggleClass('menu-open');
});

$(function () {
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

	var scale1 = 15,
	scale2 = 2,
	scale3 = 8,
	scale4 = 4;
	var zooming = 1;
	var $panzoom = $('.panzoom').panzoom().panzoom('pan', -200, -400);

	$('#resetButton').click(function (e) {
		if (zooming <= 0.21) {
			zooming = 0.2;
		} else {
			zooming = zooming - 0.2;
		}
		$('.panzoom').panzoom('zoom', zooming, {
			animate : true,
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
		});
	});
});
