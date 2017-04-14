function Kirba(game, x, y){
	//constructor
	Phaser.Sprite.call(this, game, x, y, 'kirba');
	this.anchor.set(0.5, 0.5);
}

Kirba.prototype = Object.create(Phaser.Sprite.prototype);
Kirba.prototype.constructor = Kirba;



State = {};

State.preload = function(){
	this.game.load.image('background', 'images/background.png');
	
	//sprites
	this.game.load.image('ground', 'images/ground.png');
	this.game.load.image('grass:8x1', 'images/grass_8x1.png');
	this.game.load.image('grass:6x1', 'images/grass_6x1.png');
	this.game.load.image('grass:4x1', 'images/grass_4x1.png');
	this.game.load.image('grass:2x1', 'images/grass_2x1.png');
	this.game.load.image('grass:1x1', 'images/grass_1x1.png');
	this.game.load.image('kirba', 'images/hero_stopped.png');
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

State.create = function(){
	this.game.add.image(0,0, 'background');
	this._loadLevel(this.game.cache.getJSON('level:1'));
}

/*
State.init = function(){
	this.keys = this.game.input.keyboard.addKeys({
		left: Phaser.KeyCode.LEFT;
		right: Phaser.KeyCode.RIGHT;
	});
}
*/



window.onload = function () {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', State);
    game.state.start('play');
}
