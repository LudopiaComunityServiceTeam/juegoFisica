
var WebFontConfig = {

    google: {
        // Agregar la fuente de google que se quiere usar...
        families: ['Indie Flower', 'Permanent Marker', 'Stardos Stencil']
    }

};

var PantallaDeCargado = {
preload: function() {
    game.load.spritesheet('PlayButton','assets/play.png',50,50);
},
create: function()
{

    //	You can listen for each of these events from Phaser.Loader
    text = AñadirTexto(300,240,"Cargando...",'#FFFFFF',45);
    loadPantallaDeInicio();
    loadAll();
    PreCargarRepertorioMusica();
    button = game.add.button(game.world.centerX - 30, 400, 'PlayButton', terminarCargado, this, 2, 1, 0);
    button.frame = 0;
    button.i = 0;
    button.inputEnabled = true;
    button.events.onInputDown.add(TerminarNivel, this);
    button.events.onInputOver.add(overButton, this);
    button.events.onInputOut.add(outButton, this);
},

update: function()
{
}

};
function loadStart(){
    
}
function fileComplete(){
    contador = contador + 1
    text.setText(contador);
    
}
function loadComplete(){
    empezarJuego();
}
function terminarCargado(){
    game.state.start('PantallaDeInicio');
}
