var WebFontConfig = {

    google: {
        // Agregar la fuente de google que se quiere usar...
        families: ['Indie Flower', 'Permanent Marker', 'Stardos Stencil']
    }

};

var PantallaFinal = {
preload: function() {

},
create: function() {
    CrearFondo();
    AñadirTexto(150,100,"¡Felicidades! ¡Acabaste el juego!",colorTexto,40);
    AñadirTexto(300,150,"Tu puntuación es:",colorTexto,30);
    ponerPuntuacionEnCuadro(350, 250);
    AñadirTexto(270,350,"¿Quieres jugar de nuevo?",colorTexto,30);
    botonMenu = game.add.sprite(350, 400, 'botonRepetirNivel');
    botonMenu.frame = 0;
    botonMenu.i = 0;
    botonMenu.inputEnabled = true;
    botonMenu.events.onInputDown.add(SeleccionarNivel, this);
    botonMenu.events.onInputOver.add(overButton, this);
    botonMenu.events.onInputOut.add(outButton, this);

},
update: function() {

}
};
