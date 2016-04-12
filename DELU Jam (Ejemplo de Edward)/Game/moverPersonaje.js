
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('character', ''); // Aqui se carga el sprite del personaje

}

var sprite;
var cursors;

function create() {

	//	Enable p2 physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Add a sprite
	sprite = game.add.sprite(40, 40, 'character');

    //  Enable if for physics. This creates a default rectangular body.
	game.physics.p2.enable(sprite);

    //  Modify a few body properties
	sprite.body.setZeroDamping();
	sprite.body.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

	sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
    	sprite.body.moveLeft(50);
    }
    else if (cursors.right.isDown)
    {
    	sprite.body.moveRight(50);
    }

    if (cursors.up.isDown)
    {
    	sprite.body.moveUp(50);
    }
    else if (cursors.down.isDown)
    {
    	sprite.body.moveDown(50);
    }

}