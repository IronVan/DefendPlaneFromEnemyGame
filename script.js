window.onload = init;

var map;
var ctxMap;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeigth = 500;

var background = new Image();
background.src="game-background.jpg";

function init()
{
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeigth;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");
	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	drawBg();
}

function drawRect()
{
	ctxMap.fillStyle = "#3d3d3d";
	ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect()
{
	ctxMap.clearRect(0, 0, 800, 500);
}

function drawBg()
{
	ctxMap.drawImage(background, 0 ,0 , 800, 500, 0, 0, gameWidth, gameHeigth);
}