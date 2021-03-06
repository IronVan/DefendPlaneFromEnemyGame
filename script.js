window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var enemyCvs;
var ctxEnemy;

var stats;
var ctxStats;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeigth = 500;

var background = new Image();
background.src="img/game-background.jpg";
var background1 = new Image();
background1.src="img/game-background.jpg";

var tiles = new Image();
tiles.src="img/tiles.png";

var player;
var enemies = [];

var isPlaying;
var health;

var mapX = 0;
var map1X = gameWidth;

var mouseX;
var mouseY;

//For creating enemies
var spawnInterval;
var spawnTime = 6000;
var spawnAmount = 5;

var mouseControl = true;

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
	
	enemyCvs = document.getElementById("enemy");
	ctxEnemy = enemyCvs.getContext("2d");

	stats = document.getElementById("stats");
	ctxStats = stats.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeigth;
	pl.width = gameWidth;
	pl.height = gameHeigth;
	enemyCvs.width = gameWidth;
	enemyCvs.height = gameHeigth;
	stats.width = gameWidth;
	stats.height = gameHeigth;

	ctxStats.fillStyle = "red";
	ctxStats.font = "bold 15pt Arial";

	// drawBtn = document.getElementById("drawBtn");
	// clearBtn = document.getElementById("clearBtn");
	// drawBtn.addEventListener("click", drawRect, false);
	// clearBtn.addEventListener("click", clearRect, false);

	player = new Player();
	//enemy = new Enemy();
	resetHealth();
	startLoop();

	document.addEventListener("mousemove", mouseMove, false);
	document.addEventListener("click", mouseClick, false);
	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function mouseMove(e)
{
	if (!mouseControl) return;
	mouseX = e.pageX - map.offsetLeft;
	mouseY = e.pageY - map.offsetTop;
	player.drawX = mouseX - player.width/2;
	player.drawY = mouseY - player.height/2;

	document.getElementById("gameName").innerHTML = "X:" + mouseX + " Y:" + mouseY;
}

function mouseClick(e)
{
	if (!mouseControl) return;
	/*player.drawX = mouseX - player.width/2;
	player.drawY = mouseY - player.height/2;*/
	document.getElementById("gameName").innerHTML = "Clicked";
}

function resetHealth()
{
	health = 20;
}

function spawnEnemy(count)
{
	for (var i = 0; i < count; i++) {
		enemies[i] = new Enemy();
	};
}

function startCreatingEnemies()
{
	stopCreatingEnemies();
	spawnInterval = setInterval(function(){spawnEnemy(spawnAmount);}, spawnTime);
}

function stopCreatingEnemies()
{
	clearInterval(spawnInterval);
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
	startCreatingEnemies();
}

function stopLoop()
{
	isPlaying = false;
}

function draw()
{
	player.draw();
	clearCtxEnemy();
	//enemy.draw();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();
	};
}

function moveBg()
{
	var vel = 3;
	mapX -= 3;
	map1X -= 3;
	if (mapX + gameWidth < 0) mapX = gameWidth - 8;
	if (map1X + gameWidth < 0) map1X = gameWidth - 8;
}

function update()
{
	moveBg();
	drawBg();
	updateStats();
	player.update();
	//enemy.update();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update();
	};
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
	this.scrX = 0;
	this.scrY = 80;
	this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
	this.drawY = Math.floor(Math.random() * gameHeigth);
	if (this.drawY>400) this.drawY -= 100;
	this.width = 60;
	this.height = 60;

	this.speed = 7;
}


Player.prototype.draw = function()
{
	clearCtxPlayer();
	ctxPl.drawImage(tiles, this.scrX , this.scrY , this.width, this.height, 
	this.drawX, this.drawY, this.width, this.height);
	}

Player.prototype.update = function()
{
	if (health < 0) resetHealth();

	if (this.drawX < 0) this.drawX=0;
	if (this.drawY < 0) this.drawY=0;
	if (this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
	if (this.drawY > gameHeigth - this.height - 100) this.drawY = gameHeigth - this.height -100;
	
	for (var i = 0; i < enemies.length; i++) {
		if (this.drawX >= enemies[i].drawX &&
			this.drawY >= enemies[i].drawY &&
			this.drawX <= enemies[i].drawX + enemies[i].width &&
			this.drawY <= enemies[i].drawY + enemies[i].height) 
			{
				health--;
			};
	};

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
	ctxEnemy.drawImage(tiles, this.scrX , this.scrY , this.width, this.height, 
	this.drawX, this.drawY, this.width, this.height);
}

Enemy.prototype.update = function()
{
	this.drawX -= 7;
	if (this.drawX + this.width < 0) 
		{
		/*this.drawX = Math.floor(Math.random() * gameWidth) + gameWidth;
		this.drawY = Math.floor(Math.random() * gameHeigth);
		if (this.drawY>400) this.drawY -= 100;*/
		this.destroy();
		};
}

Enemy.prototype.destroy = function()
{
	enemies.splice(enemies.indexOf(this), 1);
}

/*function drawRect()
{
	ctxMap.fillStyle = "#FF0000";
	ctxMap.fillRect(10, 10, 100, 100);
}*/

function clearCtxPlayer()
{
	ctxPl.clearRect(0, 0, gameWidth, gameHeigth);
}

function clearCtxEnemy()
{
	ctxEnemy.clearRect(0, 0, gameWidth, gameHeigth);
}

function updateStats()
{
	ctxStats.clearRect(0, 0, gameWidth, gameHeigth);
	ctxStats.fillText("Health: " + health, 20, 20);
}

/*function clearRect()
{
	ctxMap.clearRect(0, 0, 800, 500);
}*/

function drawBg()
{
	ctxMap.clearRect(0, 0, gameWidth, gameHeigth);
	ctxMap.drawImage(background, 0 ,0 , 800, 500, mapX, 0, gameWidth, gameHeigth);
	ctxMap.drawImage(background1, 0 ,0 , 800, 500, map1X, 0, gameWidth, gameHeigth);
}
