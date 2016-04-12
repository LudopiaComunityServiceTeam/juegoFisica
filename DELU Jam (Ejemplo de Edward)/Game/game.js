// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');

//Pack as .exe https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps
//Game analitics http://support.gameanalytics.com/hc/en-us/articles/200841806-JavaScript


// Define all the states aka niveles
game.state.add('Preloader', BasicGame.Preloader);
game.state.add('Boot', BasicGame.Boot);       
game.state.add('level_1', level1_state); 


// Empieza con boot
game.state.start('Boot');  