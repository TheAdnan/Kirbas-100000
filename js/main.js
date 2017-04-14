function Kirba(game, x, y){
	//constructor for main character
	Phaser.Sprite.call(this, game, x, y, 'kirba');
	this.anchor.set(0.5, 0.5);
}

Kirba.prototype = Object.create(Phaser.Sprite.prototype);
Kirba.prototype.constructor = Kirba;
//move method
Kirba.prototype.move = function (direction) { //-1 will be left, +1 is right
    this.x += direction * 3; // move 3 pixels each frame
};
Kirba.prototype.jump = function (time) { 
    this.y -= 6;
    this.game.timeCheck = time + 100;
};
Kirba.prototype.floor_him = function (position) { 
    this.y = position;
    this.game.timeCheck = -1;
};

Kirba.prototype.getY = function () { 
    return this.y;
};

// Play state
State = {};

State.preload = function(){

	//background image
	this.game.load.image('background', 'images/background.png');
	
	//sprites
	this.game.load.image('ground', 'images/ground.png');
	this.game.load.image('grass:8x1', 'images/grass_8x1.png');
	this.game.load.image('grass:6x1', 'images/grass_6x1.png');
	this.game.load.image('grass:4x1', 'images/grass_4x1.png');
	this.game.load.image('grass:2x1', 'images/grass_2x1.png');
	this.game.load.image('grass:1x1', 'images/grass_1x1.png');
	this.game.load.image('kirba', 'images/kirba_init.png');

	//level
	this.game.load.json('level:1', 'data/level1.json');
}

State._loadLevel = function (data){
	data.platforms.forEach(this._spawnPlatform, this);
	this._spawnCharacters({kirba: data.kirba});
}

State._spawnPlatform = function(platform){
	this.game.add.sprite(platform.x, platform.y, platform.image);
}

State._spawnCharacters = function (data){
	//spawn kirba
	this.kirba = new Kirba(this.game, data.kirba.x, data.kirba.y);
	this.game.add.existing(this.kirba);
}

State.update = function () {
    this._handleInput();
    if((this.game.time.now - this.game.timeCheck) > 100 && this.game.timeCheck!=-1){
    	this.kirba.floor_him(525);
    }
};

State._handleInput = function () {
    if (this.keys.left.isDown) { // move kirba left
        this.kirba.move(-1);
    }
    else if (this.keys.right.isDown) { // move kirba right
        this.kirba.move(1);
    }
    else if(this.keys.up.isDown){
    	this.kirba.jump(this.game.time.now);
    }
};

State.create = function(){
	this.keys = this.game.input.keyboard.addKeys({
		left: Phaser.KeyCode.LEFT,
		right: Phaser.KeyCode.RIGHT,
		up: Phaser.KeyCode.UP
	});
	this.game.add.image(0,0, 'background');
	this._loadLevel(this.game.cache.getJSON('level:1'));
}





window.onload = function () {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', State);
    game.state.start('play');
    game.global = {
		timeCheck: 0,
		currentY : 0
	}
}
