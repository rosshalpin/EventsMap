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

var xloc, yloc;

var imageObj = new Image();
imageObj.src = 'https://i.imgur.com/Wj6Mjx7.jpg';
var pixel = new Array();

var img = new Image();
img.onload = function(){
	context3.drawImage(img,0,0,2000,2000);
	var imgData = context3.getImageData(0, 0, canvas3.height, canvas3.width);
	
	for(i=0;i<canvas3.height;i++){
		pixel[i] = new Array();
		for(j=0;j<canvas3.width;j++){
			if(imgData.data[((i*canvas3.width)+j)*4] == 255){
				pixel[i][j] = 1;
			}else{
				pixel[i][j] = 0;
			}
		}
	} 
	
	easystar.setGrid(pixel);
	easystar.setAcceptableTiles([1]);
	easystar.enableDiagonals();
	easystar.enableCornerCutting();
}
img.src = 'images/map.jpg';

imageObj.onload = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
};

$('body').on('contextmenu', 'div', function(e){ return false; });

$('#nav-toggle').click(function(){
    $('#friends').toggleClass('menu-open');
	$('.controls').toggleClass('menu-open');
    $('body').toggleClass('menu-open');
});

function showPosition(position) {
	var sourceXmax = -6.622480;
	var sourceXmin = -6.569707

	var sourceYmax = 53.395644;
	var sourceYmin = 53.364110;

	yloc = position.coords.latitude;
	xloc = position.coords.longitude;

	if((xloc < sourceXmax || xloc > sourceXmin) && (yloc > sourceYmax || yloc < sourceYmin) ){
	alert("Spoofing coordinates");
		yloc = 53.383813;
		xloc = -6.597999;
	}
	var T1 = 2000;
	var T2 = 0;

	var sourceX = xloc;
	var sourceY = yloc;

	xloc = translateLocation(T1, T2, sourceXmin, sourceXmax, sourceX);
	yloc = translateLocation(T1, T2, sourceYmin, sourceYmax, sourceY);
	
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
    context2.fillText("RH",xloc-8,yloc+4);
	
}

var x1,y1,x2,y2;

var pospos = false;

function getCanvasCoords(x,y){

    var matrix = $('.panzoom').panzoom("getMatrix");
        
    var calc_x = x * (1 / matrix[0]);
    var calc_y = y * (1 / matrix[3]);

    return {x:calc_x,y:calc_y};   
}

var printx = false;
$(document).mouseup(function(e) {
	if(e.which!=1){
		var rect = canvas.getBoundingClientRect();
		var coords = getCanvasCoords(e.clientX - rect.left, e.clientY - rect.top);
		console.log(pixel[Math.round(coords.y)][Math.round(coords.x)]);
			if(printx == false){
				context4.clearRect(0, 0, canvas4.width, canvas4.height);
				context5.clearRect(0, 0, canvas4.width, canvas4.height);
				x1 = Math.round(coords.x);
				y1 = Math.round(coords.y);
				if(pixel[y1][x1] == 0){
					for (var dx = -10; dx <= 10; ++dx) {
						for (var dy = -10; dy <= 10; ++dy) {
							if (dx != 0 || dy != 0) {
								if(pixel[y1+dy][x1+dx] == 1){
									x1 = x1+dx;
									y1 = y1+dx;
									dx = 11;
									dy = 11;
								}
							}
						}
					}
				}
				context5.beginPath();
				context5.arc(x1,y1, 4, 0, 2 * Math.PI, false);
				context5.fillStyle = 'white';
				context5.fill();
				context5.lineWidth = 1;
				context5.strokeStyle = 'black';
				context5.stroke();
				printx = true;
	        }else{
				x2 = Math.round(coords.x);
				y2 = Math.round(coords.y);
			
				if(pixel[y2][x2] == 0){
					for (var dx = -10; dx <= 10; ++dx) {
						for (var dy = -10; dy <= 10; ++dy) {
							if (dx != 0 || dy != 0) {
								if(pixel[y2+dy][x2+dx] == 1){
									x2 = x2+dx;
									y2 = y2+dx;
									dx = 11;
									dy = 11;
								}
							}
						}
					}
				}

				easystar.findPath(x1, y1, x2, y2, function( path ) {
					if(path!=null){
						for(i=0; i<path.length-1;i++){
							context4.beginPath();
							context4.arc(path[i].x, path[i].y, 2, 0, 2 * Math.PI, false);
							context4.fillStyle = '#4286f4';
							context4.fill();
						}
						var dis =  Math.round(path.length * 1.79)
						document.getElementById("dist").innerHTML = dis + " meters " +  Math.round((dis/1.38)/60) + " min walk" ;
					}	
				});		
				easystar.calculate();
			
				context5.beginPath();
				context5.arc(x2,y2, 4, 0, 2 * Math.PI, false);
				context5.fillStyle = 'white';
				context5.fill();
				context5.lineWidth = 1;
				context5.strokeStyle = 'black';
				context5.stroke();
				printx = false;
		}
	}
});

function translateLocation(T1, T2, S1, S2, SourceCoordinate) {
	var TranslateFactor = (T2 * S1 - T1 * S2) / (S1 - S2)
	var ScalingFactor = (T2 - T1) / (S2 - S1)
	var TargetCoordinate = TranslateFactor + ScalingFactor * SourceCoordinate;
	return TargetCoordinate;
}

$(function() {
    var scale1 = 15,scale2 = 2,scale3 = 8, scale4 = 4;
	var zooming = 1;
	var $panzoom = $('.panzoom').panzoom().panzoom('pan', -200, -400);
	
	$('#resetButton').click(function(e) {
		if(zooming<=0.21){
			zooming = 0.2;
		}else{
			zooming = zooming - 0.2;
		}

		$('.panzoom').panzoom('zoom', zooming, {
			animate: true,
		});	
	});
	
	$('#zoomButton').click(function(e) {
		if(zooming>=1.999999999){
			zooming = 1.999999999;
		}else{
			zooming = zooming + 0.2;
		}
		$('.panzoom').panzoom('zoom', zooming, {
			animate: true,
		});
		
	});

});