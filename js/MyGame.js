var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playerLaser = new Image ();
playerLaser.src = "images/Blue01png.png";
var shipsArr1 = [];
var shipsArr2 = [];
var shipsArr3 = [];
var firedArr = [];

var alien = {
	x: 270,
	y: 530,
	width: 60,
	height: 70,
	moveLeft:  function() { this.x -= 10 },
	moveRight: function() { this.x += 10 },
	moveUp: function() {this.y -= 10},
	moveDown: function() {this.y += 10}
}

function AlienShoot() {
	this.x = alien.x;
	this.y = alien.y;
	this.width = 9;
	this.height = 54;
	this.sprite = playerLaser;

	this.draw = function() {
		ctx.drawImage(this.sprite, this.x + (alien.width/2 - this.width/2), this.y, this. width, this.height)
	}
	this.update = function() {
		this.y -= 55; 
	}
}

window.onload = function() {
	drawBoard();
  drawAlien();
};

	//Board
	function drawBoard() {
		console.log("cat's meow.");

		// PlaceHolders
		// Movement Path
		ctx.fillStyle = "pink"
		ctx.fillRect(0, 450, 600, 150)

		// First Row of Ships
		ctx.fillStyle = "orange"
		ctx.fillRect(0, 10, 600, 50)
		// Second Row of Ships
		ctx.fillRect(0, 70, 600, 50)
		// Third Row of Ships
		ctx.fillRect(0, 130, 600, 50)

		// Center of game
		ctx.fillStyle = "white"
		ctx.fillRect(299, 0, 3, 600)
		// End of place holders
	};

	//Draw Player
	function drawAlien() {
		var img = new Image();
		img.onload = function () {
			ctx.drawImage(img, alien.x, alien.y, alien.width, alien.height);
		}
		img.src = 'images/alien.png';
	}
	
	//Movement of Player
	document.onkeydown = function(e) {
    switch (e.keyCode) {
			// ASDW Movement
			// A
			case 65: alien.moveLeft();
			if (alien.x < -60) {
				alien.x = 600;
			}
			break;
			// D
			case 68: alien.moveRight();
			if (alien.x > 600) {
				alien.x = -60;
			}
			break;
			// W
			case 87: alien.moveUp();
			if (alien.y < 450) {
				alien.y = 450;
			}
			break;
			// S
			case 83: alien.moveDown();
			if (alien.y > 530) {
				alien.y = 530;
			}
			break;

			// Arrow Keymovement
			// Arrow Left
			case 37: alien.moveLeft();
			if (alien.x < -60) {
				alien.x = 600;
			}
			break;
			// Arrow Right
			case 39: alien.moveRight();
			if (alien.x > 600) {
				alien.x = -60;
			}
			break;
			// Arrow Up
			case 38: alien.moveUp();
			if (alien.y < 450) {
				alien.y = 450;
			}
			break;
			// Arrow Down
			case 40: alien.moveDown();
			if (alien.y > 530) {
				alien.y = 530;
			}
			break;


			// Player Attack
			case 32:
			laserUpdate();
			console.log("me no shoot");
			break;
		}
    updateCanvas();
  }


	// Keep Drawing Enemy
	function pushShip() {
		if (shipsArr1.length <= 6) {
			shipsArr1.push(new ShipRow1());
		}
		if (shipsArr2.length <= 6) {
			shipsArr2.push(new ShipRow2());
		}
		if (shipsArr3.length <= 6) {
			shipsArr3.push(new ShipRow3());
		}
	}

	function shipsUpdate() {
		pushShip();
		console.log("shipsUpdate")
		shipsArr1.forEach(function(elm) {
			elm.update();
			elm.draw();			
		});
		shipsArr2.forEach(function(elm) {
			elm.update();
			elm.draw();
		});
		shipsArr3.forEach(function(elm) {
			elm.update();
			elm.draw();
		});
	}

	function pushLaser() { 
		firedArr.push(new AlienShoot());
	}

	function laserUpdate() {
		pushLaser();
		console.log("Shots Fired")
		firedArr.forEach(function(elm) {
			elm.update();
			elm.draw();
		})
	}





	// Update game
	function updateCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBoard();
		drawAlien();
		shipsUpdate();
		laserUpdate();
	}