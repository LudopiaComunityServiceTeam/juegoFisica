var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');

game.state.add('Nivel1', Nivel1);
game.state.add('Nivel2', Nivel2);
game.state.add('Nivel3', Nivel3);
game.state.add('Nivel4', Nivel4);
game.state.add('Nivel5', Nivel5);
game.state.add('Nivel6', Nivel6);
game.state.add('Nivel7', Nivel7);
game.state.add('Nivel8', Nivel8);
game.state.add('Main_game', MainGame);
game.state.add('SeleccionDeNivel', SeleccionDeNivel);

game.state.start('SeleccionDeNivel');
