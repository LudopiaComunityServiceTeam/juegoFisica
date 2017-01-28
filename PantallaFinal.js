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
    console.log(nivelActual);
    console.log(Nota[nivelActual-2]);
    if (Nota[nivelActual-2] >= 10){
        AñadirTexto(150,50,"¡Felicidades! ¡Acabaste el juego\n y pasaste!",colorTexto,40);
        AñadirTexto(300,150,"Tu puntuación es:",colorTexto,30);
        ponerPuntuacionFinal(350, 250);
    }
    else if (Nota[nivelActual-2] < 10){
        AñadirTexto(150,100,"Acabaste el juego, pero no pasaste.",colorTexto,40);
        AñadirTexto(300,150,"Tu puntuación es:",colorTexto,30);
        ponerPuntuacionFinal(350, 250);
    }

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
