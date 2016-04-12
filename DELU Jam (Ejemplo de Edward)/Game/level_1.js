var map;
var layer;
var level1_state = {
create: function() {

		this.game.world.setBounds(0, 0, 800, 800)
		
		//Se declara el jugador, el enemigo, el background y todo
        this.game.stage.backgroundColor = '#2d2d2d';
		//Sistema de física de phaser (arcade es el básico, p2 es mas avanzado y ninja es un toditomix. Creo que con arcade bastaría)
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// In case we need it
		this.game.physics.arcade.gravity.y = 250;

		map = game.add.tilemap('map');
		map.addTilesetImage('level1');
		layer = map.createLayer('Capa de Patrones 1'); //POrque mi tiled esta en español sino fuera Tile Layer 1
		// Set the collision range
		// Here, the range is from 1 (the first tile) to the fifth (last tile).
		layer.resizeWorld();
		map.setCollisionBetween(425, 450);		
		this.player = game.add.sprite(40, 400, 'player');		
		//El jugador usa arcade
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		
		// Contador de Vidas.
    	Clives = this.game.add.sprite(game.world.width - 90, 15,'live1');

        // 'Corazon:'
    	lives = this.game.add.sprite(game.world.width - 160, 15,'live');

		this.low=game.add.sprite(300,400,'low');
		this.low.animations.add('run');

    //  And this starts the animation playing by using its key ("run")
    //  15 is the frame rate (15fps)
    //  true means it will loop when it finishes
		this.low.animations.play('run', 5, true);

		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
},

update: function() {
	//updateloop
	this.game.physics.arcade.collide(this.player, layer);
	
	this.player.body.velocity.x=0;
	
	if(this.cursors.up.isDown&&this.player.body.onFloor()){
		this.player.body.velocity.y=-200;
	}
	if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
    }

    if ( this.jumpButton.isDown && this.player.body.onFloor() )
    {
    	this.player.body.velocity.y = -250;
    }
},



}