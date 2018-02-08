var shipImg = new Image();
shipImg.src = "images/playerShip1_green.png";
var enemyShots = new Image();
enemyShots.src = "images/laserGreen05.png";
var destroyed = new Image();
destroyed.src = "images/laserGreen16.png";
var enemyFiredArr = [];

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
		ctx.drawImage(shipImg, this.x ,this.y , this.width, this.height);
	}
}

function poof(x, y) {
	ctx.drawImage(destroyed, x, y, 50, 50);
}

function EnemyShoot() {	
	
	var that = this;
	
	this.randomShip = function() {
		var randomShot =	Math.floor(Math.random() * shipsArr1.length);
		//loop where randomShot is the shipsArray1[randomShot]
		for (var i = 1; i < shipsArr1.length; i++) {
			that.shipX = shipsArr1[randomShot].x;
			that.shipY = shipsArr1[randomShot].y;
		}
	}
	this.random = this.randomShip();
	this.x = this.shipX;
	this.y = this.shipY + 50;
	// 
	this.sprite = enemyShots;
	this.width = 10;
	this.height = 20;
	this.alive = true;
	this.update = function() {
		this.y += 2;
	}
	this.draw = function() {
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
	}
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
			// otherobj.life = false;
			this.alive = false;
		}
		return hit;
	}
}