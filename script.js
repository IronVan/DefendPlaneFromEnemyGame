window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeigth = 500;

var background = new Image();
background.src="game-background.jpg";
var tiles = new Image();
tiles.src="tiles.png";

var player;
var enemy;

var isPlaying;

var requestAnimFrame = window.requestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   window.oRequestAnimationFrame ||
					   window.msRequestAnimationFrame;

function init()
{
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl = document.getElementById("player");
	ctxPl = pl.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeigth;
	pl.width = gameWidth;
	pl.height = gameHeigth;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");
	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	player = new Player();
	enemy = new Enemy();

	drawBg();
	startLoop();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function loop()
{
	if (isPlaying) 
		{
			draw();
			update();
			requestAnimFrame(loop);
		};
}

function startLoop()
{
	isPlaying = true;
	loop();
}

function stopLoop()
{
	isPlaying = false;
}

function draw()
{
	player.draw();
	enemy.draw();
}

function update()
{
	player.update();
}

//Objects
function Player()
{
	this.scrX=0;
	this.scrY=0;
	this.drawX=0;
	this.drawY=0;
	this.width = 124;
	this.height = 70;
	this.speed = 5;

	//For keys
	this.isUp = false;
	this.isDown = false;
	this.isRigth = false;
	this.isLeft = false;
}
function Enemy()
{
	this.scrX=0;
	this.scrY=80;
	this.drawX=400;
	this.drawY=50;
	this.width = 60;
	this.height = 60;

	this.speed = 8;
}


Player.prototype.draw = function()
{
	clearCtxPlayer();
	ctxPl.drawImage(tiles, this.scrX , this.scrY , this.width, this.height, 
	this.drawX, this.drawY, this.width, this.height);
	}

Player.prototype.update = function()
{
	this.choseDir();
	}

Player.prototype.choseDir = function()
{
	if (this.isUp) this.drawY -= this.speed;
	if (this.isDown) this.drawY += this.speed;
	if (this.isRigth) this.drawX += this.speed;
	if (this.isLeft) this.drawX -= this.speed;
	}

function checkKeyDown(e)
{
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W") {
		player.isUp = true;
		e.preventDefault();
	};
	if (keyChar == "S") {
		player.isDown = true;
		e.preventDefault();
	};
	if (keyChar == "D") {
		player.isRigth = true;
		e.preventDefault();
	};
	if (keyChar == "A") {
		player.isLeft = true;
		e.preventDefault();
	};
}

function checkKeyUp(e)
{
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W") {
		player.isUp = false;
		e.preventDefault();
	};
	if (keyChar == "S") {
		player.isDown = false;
		e.preventDefault();
	};
	if (keyChar == "D") {
		player.isRigth = false;
		e.preventDefault();
	};
	if (keyChar == "A") {
		player.isLeft = false;
		e.preventDefault();
	};
}

Enemy.prototype.draw = function()
{
	ctxMap.drawImage(tiles, this.scrX , this.scrY , this.width, this.height, 
	this.drawX, this.drawY, this.width, this.height);
}

function drawRect()
{
	ctxMap.fillStyle = "#3d3d3d";
	ctxMap.fillRect(10, 10, 100, 100);
}

function clearCtxPlayer()
{
	ctxPl.clearRect(0, 0, gameWidth, gameHeigth);
}

function clearRect()
{
	ctxMap.clearRect(0, 0, 800, 500);
}

function drawBg()
{
	ctxMap.drawImage(background, 0 ,0 , 800, 500, 0, 0, gameWidth, gameHeigth);
}
