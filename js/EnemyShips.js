var shipImg = new Image();
shipImg.src = "images/badredship.png";

function ShipRow1() {
	this.x = 630;
	this.y = 10;
	this.sprite = shipImg;
	this.width = 50;
	this.height = 50;
	this.hit = false;
	this.update = function(){
		this.x -= 80;
		if (this.x < -10) {
			this.x = 630;
		}
	}
	this.draw=function(){
		ctx.drawImage(this.sprite, this.x ,this.y , this.width, this.height);
	}
	this.didHit = function() {
		
	}
}

function ShipRow2() {
	this.x = -80;
	this.y = 70;
	this.sprite = shipImg;
	this.width = 50;
	this.height = 50;
	this.hit = false;
	this.update = function(){
		this.x += 80;
		if (this.x > 610) {
			this.x = 0;
		}
	}
	this.draw = function(){
		ctx.drawImage(this.sprite, this.x ,this.y , this.width, this.height);
	}
	this.didHit = function() {
		
	}
}

function ShipRow3() {
	this.x = 630;
	this.y = 130;
	this.sprite = shipImg;
	this.width = 50;
	this.height = 50;
	this.hit = false;
	this.update = function(){
		this.x -= 80;
		if (this.x < -10) {
			this.x = 630;
		}
	}
	this.draw=function(){
		ctx.drawImage(this.sprite, this.x ,this.y , this.width, this.height);
	}
	this.didHit = function() {
		
	}
}