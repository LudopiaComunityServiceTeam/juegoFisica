var WebFontConfig = {

    google: {
        // Agregar la fuente de google que se quiere usar...
        families: ['Indie Flower', 'Permanent Marker', 'Stardos Stencil']
    }

};
var tiemposEscena = 0;
var corriendo = false;

var PantallaFinal = {
preload: function() {

},
create: function() {
    DetenerCancion();
    ActivarFisica();
    CrearFondo();
    InicializarPlataformas();
    CrearPiso();
    posInicXPlayer = 75;
    posInicYPlayer = game.world.height - 125;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    tiemposEscena = 0;
    corriendo = false;

},
update: function() {
    game.physics.arcade.collide(player, platforms);
    
    if ((tiemposEscena >= 0)&&(tiemposEscena < 400)){
        MoverseALaDer(50);
        //monologo de Sam
        if (tiemposEscena == 50){
            monologo = AñadirTexto(270,450,"Perrito!",colorTexto,20);
            monologo.alpha = 0.01; 
            faseBorrado = 0;
        }
        if (tiemposEscena > 50){
            BorrarTexto();
        }
    }
    if ((tiemposEscena >= 400)&&(tiemposEscena < 800)){
        BorrarTexto();
        if (tiemposEscena == 400){
            Detenerse();
        }
    }
    if (tiemposEscena == 800){
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
    }
    tiemposEscena = tiemposEscena + 1;
}
};
function MoverseALaDer(velo) {
    if (!corriendo)
    {
        player.animations.play('right');
        corriendo = true;
    }
    player.body.velocity.x = velo;
}
function Detenerse() {
    corriendo = false
    player.body.velocity.x = 0;
    player.animations.stop();
    player.frame = 4;
}
