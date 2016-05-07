var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
game.state.add('NivelUno', Nivel1);
game.state.add('NivelDos', Nivel2);
game.state.add('Decision', Decision);
game.state.add('Main_game', MainGame);

game.state.start('NivelUno');
