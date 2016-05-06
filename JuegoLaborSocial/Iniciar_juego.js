var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add('Main_game', MainGame);
game.state.add('NivelUno', Nivel1);
game.state.start('NivelUno');
