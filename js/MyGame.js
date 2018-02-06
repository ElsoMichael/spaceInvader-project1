var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var playerLaser = new Image ();
playerLaser.src = "images/Blue01png.png";
var background = new Image ();
background.src = "images/Backgrounds/purple.png";
var shipsArr1 = [];
var firedArr = [];
var frameNum = 0;

var intervalId = setInterval(updateCanvas, 20);

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
	this.living = true;
	this.sprite = playerLaser;
	this.live = true;

	this.draw = function() {
		ctx.drawImage(this.sprite, this.x + (alien.width/2 - this.width/2), this.y, this. width, this.height)
	}
	this.update = function() {
		this.y -= 5; 
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
		}
	}
}

window.onload = function() {
	drawBoard();
  // drawAlien();
};

	//Board
	function drawBoard() {
		// console.log("cat's meow.");
		// Background
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		
		// PlaceHolders
		// Movement Path
		ctx.fillStyle = "pink"
		ctx.fillRect(0, 450, 600, 150)

		// Center of game
		ctx.fillStyle = "white"
		ctx.fillRect(299, 0, 3, 600)
		// End of place holders
	};

	// Draw Player
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
			pushLaser();
			// console.log("me no shoot");
			break;
		}
    updateCanvas();
  }


	// Keep Drawing Enemy
	function pushShip() {
		var max = 10;
		var min = 0
		if (frameIntveral(1000)) {
			shipsArr1.push(new ShipRow1());
		}
		// if (shipsArr2.length <= 6) {
		// 	shipsArr2.push(new ShipRow2());
		// }
		// if (shipsArr3.length <= 6) {
		// 	shipsArr3.push(new ShipRow3());
		// }
	}

	function shipsUpdate() {
		pushShip();
		// console.log("shipsUpdate")
		shipsArr1.forEach(function(elm) {
			elm.update();
			elm.draw();
		});
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
		frameNum += 20;
<<<<<<< HEAD
=======


		// var crashed = false;

		// firedArr.forEach(function(fired) {
		// 	shipsArr1.forEach(function(ship) {
		// 		var crashed = fired.crashWith(ship);
		// 	});
		// });

    // if (crashed) {
		// 	// myGameArea.stop();
		// 	console.log("HIT");
    // }
>>>>>>> b6834bbaee607a49e526e661c080025a8a313368
	}

	function frameIntveral(n) {
		if ((frameNum / n) % 1 === 0) {
			return true;
		} else { return false; }
	}