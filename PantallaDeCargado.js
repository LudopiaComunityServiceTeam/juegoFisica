
var WebFontConfig = {

    google: {
        // Agregar la fuente de google que se quiere usar...
        families: ['Indie Flower', 'Permanent Marker', 'Stardos Stencil']
    }

};

var PantallaDeCargado = {
	
preload: function() {
	text = AñadirTexto(300,240,"",'#FFFFFF',45);
	progress_text = AñadirTexto(250,350,"",'#FFFFFF',20);
	
	//	You can listen for each of these events from Phaser.Loader
	game.load.onLoadStart.add(loadStart, this);
	game.load.onFileComplete.add(fileComplete, this);
	game.load.onLoadComplete.add(loadComplete, this);
	
    
    loadAll();
    
    game.load.start();
},
create: function()
{   
	
},


};
function loadStart(){
    text.setText("Cargando"); 
    
    
}
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles){
	progress_text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}
function loadComplete(){
    text.position.x = text.position.x-60;    // up 1 pixel            
    text.setText("Carga Terminada");
    button = game.add.button(game.world.centerX - 30, 400, 'PlayButton', terminarCargado, this, 2, 1, 0);
    button.frame = 0;
    button.i = 0;
    button.inputEnabled = true;
    button.events.onInputDown.add(TerminarNivel, this);
    button.events.onInputOver.add(overButton, this);
    button.events.onInputOut.add(outButton, this);
}
function terminarCargado(){
    game.state.start('PantallaDeInicio');
}


