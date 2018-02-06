var shipImg = new Image();
shipImg.src = "images/badredship.png";
// var enemyShots = new Image();
// shipImg.src = "images/EnemyShots.png";

function ShipRow1() {
	this.x = 630;
	this.y = 10;
	this.sprite = shipImg;
	this.width = 50;
	this.height = 50;
	this.left   = function() { return this.x                 };
  this.right  = function() { return (this.x + this.width)  };
  this.top    = function() { return this.y                 };
  this.bottom = function() { return (this.y + this.height) };
	this.living = true;
	this.update = function(){
		this.x -= 2;
		if (this.x < -10) {
			this.y += 60;
			this.x = 630;
		}
	}
	this.draw=function(){
		ctx.drawImage(this.sprite, this.x ,this.y , this.width, this.height);
	}
}

// function EnemyShoot() {
// 	this.x = ShipRow1.x;
// 	this.y = ShipRow1.y;
// 	this.sprite = enemyShots;
// 	this.width = 5;
// 	this.height = 20;
// 	this.update = function() {
// 		this.y += 20;
// 	}
// 	this.draw = function() {
// 		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
// 	}
// 	this.randomShip = function() {
// 		randomShot =	Math.floor(Math.random() * shipsArr1.length);
// 	}
// }