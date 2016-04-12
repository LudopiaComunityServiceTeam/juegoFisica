
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//Aqui se asigna el background y la loading bar (imagen o color)
		this.game.stage.backgroundColor = '#2d2d2d';
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(200, 200, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Aqui se carga el resto de las imagenes
		this.game.load.image('player', 'images/placeholder_azul.png');		
		this.game.load.image('floor', 'images/placeholder_negro.png');		
		this.game.load.image('enemy', 'images/placeholder_rojo.png');	
		this.game.load.image('level1', 'images/level1.jpg');
		this.game.load.tilemap('map', 'images/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.spritesheet('low', 'images/low.png',96,124);

		// Sprites de las Vidas.
		this.game.load.image('live','images/corazonvida.png');
		this.game.load.image('live1', 'images/Numero1.png');
		
		// Animaciones.


		//Para cargar un sprite es asi
		//this.game.load.spritesheet('valencia', 'images/Valencia.png',40,21);
		

	},

	create: function () {

		//	Si estuvieramos con musica habria que descomentar esto
		//this.preloadBar.cropEnabled = false;
		this.game.state.start('level_1');

	},

	/*update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}*/

};
