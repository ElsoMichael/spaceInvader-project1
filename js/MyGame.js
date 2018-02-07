var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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
var intervalId = setInterval(updateCanvas, 20);
var gameOver = false;
var alien = {
	x: 270,
	y: 530,
	speedX: 0,
	speedY: 0,
	width: 60,
	height: 70,
	lifes: 3,
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

function AlienShoot() {
	this.x = alien.x;
	this.y = alien.y;
	this.width = 9;
	this.height = 54;
	this.sprite = playerLaser;
	this.live = true;

	this.draw = function() {
		ctx.drawImage(this.sprite, this.x + (alien.width/2 - this.width/2), this.y, this. width, this.height)
	}
	this.update = function() {
		this.y -= 2; 
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
	}
}

function restart() {
	console.log('restart');
	window.location.reload();
	gameOver = false;
}

window.onload = function() {
	drawBoard();
};

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
		ctx.fillText("Lives: "+ alien.lifes, 500, 635);
		if (alien.lifes === 3) {
			ctx.drawImage(img, 450, 610, 30, 30);
			ctx.drawImage(img, 415, 610, 30, 30);
			ctx.drawImage(img, 380, 610, 30, 30);
		} else if (alien.lifes === 2) {
				ctx.drawImage(img, 415, 610, 30, 30);
				ctx.drawImage(img, 380, 610, 30, 30);
		} else if (alien.lifes === 1) {
				ctx.drawImage(img, 380, 610, 30, 30);
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
			if (alien.x < -60) {
				alien.x = 600;
			}
			break;
			// D
			case 68:
			alien.speedX = 10;
			alien.moveRight();
			if (alien.x > 600) {
				alien.x = -60;
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
			if (alien.x < -60) {
				alien.x = 600;
			}
			break;
			// Arrow Right
			case 39: 
			alien.speedX = 10;
			alien.moveRight();
			if (alien.x > 600) {
				alien.x = -60;
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
		if (frameIntveral(1000)) {
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
		firedArr.push(new AlienShoot());
	}

	function laserUpdate() {
		// console.log("Shots Fired")
		firedArr.forEach(function(elm) {
			elm.update();
			elm.draw();
			shipsArr1.forEach((elem) => {
				elm.didHit(elem);
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
		frameNum += 20;
	}

	function frameIntveral(n) {
		if ((frameNum / n) % 1 === 0) {
			return true;
		} else { return false; }
	}