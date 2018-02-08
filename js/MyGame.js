// Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Sounds
var backgroundSound = new Audio("Sound/8-Bit_Retro_Video_Game_Sound_Effects_1[Mp3Converter.net] (2)-[AudioTrimmer.com].mp3");
// var alienBlaster = new Audio("Sound/8bit_Gun_Shots_Sound_Effect_Retro_Games_Soundholder[Mp3Converter.net]-[AudioTrimmer.com].mp3");
var alienDestroyer = new Audio("Sound/Ultimate_Retro_Sound_Effect[Mp3Converter.net]-[AudioTrimmer.com].mp3");

// Player 
var img = new Image();
img.src = 'images/alien.png';

// Player Laser
var playerLaser = new Image ();
playerLaser.src = "images/Blue01png.png";

// Background
var background = new Image ();
background.src = "images/Backgrounds/purple.png";

// Score
var score = 0;

// Arrays
var shipsArr1 = [];
var firedArr = [];
var enemyFiredArr = [];

// Frames
var frameNum = 0;

// Updates
var gameOver = false;

// Alien Object
var alien = {
	x: 270,
	y: 530,
	speedX: 0,
	speedY: 0,
	width: 60,
	height: 70,
	lifes: 4,
	life: true,
	moveLeft:  function() { this.x -= this.speedX },
	moveRight: function() { this.x += this.speedX },
	moveUp: function() {this.y -= this.speedY },
	moveDown: function() {this.y += this.speedY },
	left: function() { return this.x },
  right: function() { return (this.x + this.width) },
  top: function() { return this.y },
  bottom: function() { return (this.y + this.height) },
}

// Alien Shoot
function AlienShoot() {
	this.x = alien.x;
	this.y = alien.y;
	this.width = 9;
	this.height = 25;
	this.sprite = playerLaser;
	this.live = true;

	this.draw = function() {
		ctx.drawImage(this.sprite, this.x + (alien.width/2 - this.width/2), this.y, this. width, this.height)
	}
	this.update = function() {
		this.y -= 4; 
	}
	// Code to handle collision
	this.didHit = (otherobj) => {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var otherbottom = otherobj.y + (otherobj.height);
		var othertop = otherobj.y;
		var hit = true;
		if (
			(mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)
		) {
			hit = false;
		} else {
			otherobj.living = false;
			this.live = false;
			score += 10
		}
		return hit;
	}
}

function onloadPlaceholder() {
	ctx.drawImage(background, 0, 0, 600, 650);
	ctx.drawImage(img, 240, 525, 100, 110);
	ctx.drawImage(playerLaser, 280, 450, 20, 70);
	ctx.drawImage(shipImg, 300, 10, 80, 90);
	ctx.drawImage(shipImg, 100, 220, 80, 90);
	ctx.drawImage(enemyShots, 340, 150, 15, 50);
	ctx.drawImage(enemyShots, 150, 370, 15, 50);
}

// Restart
function restart() {
	console.log('restart');
	window.location.reload();
	document.getElementById("button").disabled = false;
	document.getElementById("instructions").disabled = false;
	document.getElementById("aboutGame").disabled = false;
	gameOver = false;
}

// OnLoad
window.onload = function() {
	onloadPlaceholder();
	document.getElementById("button").onclick = function() {
		startGame();
	}
};

// Start of Game
function startGame() {
	this.intervalId = setInterval(updateCanvas, 20);
	document.getElementById("button").disabled = true;
	document.getElementById("instructions").disabled = true;
	document.getElementById("aboutGame").disabled = true;
	backgroundSound.play();
	console.log("start")
}


	//Board
	function drawBoard() {
		// console.log("cat's meow.");
		// Background
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		
		// PlaceHolders
		// Movement Path
		ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
		ctx.fillRect(0, 450, 600, 150)
		// Score area
		ctx.fillStyle = "black";
		ctx.fillRect(0, 600, 600, 50)
		// End of place holders
	};

	// Draw Player
	function drawAlien() {
		ctx.drawImage(img, alien.x, alien.y, alien.width, alien.height);
	}
	
	// Draw Score
	function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 20, 635);
}

	// Draw Life
	function drawLife() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
		ctx.fillText("Lives: ", 380, 635);
		if (alien.lifes === 3) {
			ctx.drawImage(img, 520, 610, 30, 30);
			ctx.drawImage(img, 485, 610, 30, 30);
			ctx.drawImage(img, 450, 610, 30, 30);
		} else if (alien.lifes === 2) {
				ctx.drawImage(img, 485, 610, 30, 30);
				ctx.drawImage(img, 450, 610, 30, 30);
		} else if (alien.lifes === 1) {
				ctx.drawImage(img, 450, 610, 30, 30);
		} else if (alien.lifes === -1) {
				clearInterval(intervalId);
				ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
				ctx.fillRect(0, 0, 600, 600);
				ctx.font = "50px Arial";
    		ctx.fillStyle = "white";
				ctx.fillText("Game Over!", 175, 300);
				ctx.font = "20px Arial";
    		ctx.fillStyle = "white";
				ctx.fillText("Click to Restart!", 245, 350);
				gameOver = true;
				console.log("game over")
		}
}

// Draw Laser Counter
function drawLaserCounter() {
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Shots Left:", 140, 635);
	if (firedArr.length === 0) {
		ctx.drawImage(playerLaser, 250, 610, 9, 30);
		ctx.drawImage(playerLaser, 270, 610, 9, 30);
		ctx.drawImage(playerLaser, 290, 610, 9, 30);
		ctx.drawImage(playerLaser, 310, 610, 9, 30);
		ctx.drawImage(playerLaser, 330, 610, 9, 30);
	} else if (firedArr.length === 1) {
			ctx.drawImage(playerLaser, 250, 610, 9, 30);
			ctx.drawImage(playerLaser, 270, 610, 9, 30);
			ctx.drawImage(playerLaser, 290, 610, 9, 30);
			ctx.drawImage(playerLaser, 310, 610, 9, 30);
	} else if (firedArr.length === 2) {
			ctx.drawImage(playerLaser, 250, 610, 9, 30);
			ctx.drawImage(playerLaser, 270, 610, 9, 30);
			ctx.drawImage(playerLaser, 290, 610, 9, 30);
	} else if (firedArr.length === 3) {
			ctx.drawImage(playerLaser, 250, 610, 9, 30);
			ctx.drawImage(playerLaser, 270, 610, 9, 30);
	} else if (firedArr.length === 4) {
			ctx.drawImage(playerLaser, 250, 610, 9, 30);
	}
}

// Click Event to Restart
window.addEventListener('click', (e) =>{
	if (gameOver === true) {
		restart();
	}
})
	
	//Movement of Player
	document.onkeyup = function(e) {
    switch (e.keyCode) {
			// ASDW Movement
			// A
			case 65: 
			alien.speedX = 10;
			alien.moveLeft();
			if (alien.x < 0) {
				alien.x = 0;
			}
			break;
			// D
			case 68:
			alien.speedX = 10;
			alien.moveRight();
			if (alien.x > 540) {
				alien.x = 540;
			}
			break;
			// W
			case 87:
			alien.speedY = 10;
			alien.moveUp();
			if (alien.y < 450) {
				alien.y = 450;
			}
			break;
			// S
			case 83:
			alien.speedY = 10;
			alien.moveDown();
			if (alien.y > 530) {
				alien.y = 530;
			}
			break;

			// Arrow Keymovement
			// Arrow Left
			case 37:
			alien.speedX = 10;
			alien.moveLeft();
			if (alien.x < 0) {
				alien.x = 0;
			}
			break;
			// Arrow Right
			case 39: 
			alien.speedX = 10;
			alien.moveRight();
			if (alien.x > 540) {
				alien.x = 540;
			}
			break;
			// Arrow Up
			case 38:
			alien.speedY = 10;
			alien.moveUp();
			if (alien.y < 450) {
				alien.y = 450;
			}
			break;
			// Arrow Down
			case 40:
			alien.speedY = 10;
			alien.moveDown();
			if (alien.y > 530) {
				alien.y = 530;
			}
			break;


			// Player Attack
			case 32:
			pushLaser();
			// alienBlaster.play();
			break;
		}
  }


	// Keep Drawing Enemy
	function pushShip() {
		if (frameIntveral(1000)) {
			shipsArr1.push(new ShipRow1());
		}
	}

	function shipsUpdate() {
		pushShip();
		// console.log("shipsUpdate")
		shipsArr1.forEach(function(elm) {
			elm.update();
			elm.draw();
		});
	}


	// Draw enemy fire
	function pushEnemyFire() {
		if (frameIntveral(500)) {
			enemyFiredArr.push(new EnemyShoot());
		}
	}

	function updateEnemyFire() {
		if (frameNum <= 500) {
			enemyFiredArr = [];
		}
		enemyFiredArr.forEach(function(elm) {
			elm.randomShip()
			elm.update();
			elm.draw();
			if(elm.didHit(alien)){
				console.log(enemyFiredArr.length)
				alien.lifes -= 1;
			}
		});
		var result = enemyFiredArr.filter((elem) => {
			return elem.alive === true
		})
		enemyFiredArr = result;
	}

	// Draw and push Lasers
	function pushLaser() {
		if (firedArr.length < 5) {
		firedArr.push(new AlienShoot());
		}
	}

	function laserUpdate() {
		// console.log("Shots Fired")
		firedArr.forEach(function(elm) {
			if (elm.y < 0) {
				elm.live = false;
			}
			elm.update();
			elm.draw();
			shipsArr1.forEach((elem) => {
				elm.didHit(elem);
				if (elm.didHit(elem)) {
					poof(elem.x, elem.y)
					alienDestroyer.play();
				}
			})
		})
		var result1 = shipsArr1.filter((elem) => {
			return elem.living !== false;
		});
		shipsArr1 = result1;
		var result2 = firedArr.filter((elem) => {
			return elem.live !== false;
		});
		firedArr = result2;

	}

	// Update game
	function updateCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBoard();
		shipsUpdate();
		laserUpdate();
		drawAlien();
		updateEnemyFire();
		pushEnemyFire();
		drawScore();
		drawLife();
		drawLaserCounter();
		frameNum += 20;
	}

	function frameIntveral(n) {
		if ((frameNum / n) % 1 === 0) {
			return true;
		} else { return false; }
	}