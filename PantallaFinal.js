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
    perro = game.add.sprite(500,508,'perrito');
    perro.animations.add('perrito',[0,1,2,3,4],10,true);

},
update: function() {
    game.physics.arcade.collide(player, platforms);
    if ((tiemposEscena >= 0)&&(tiemposEscena < 200)){
        MoverseALaDer(100);
        if (tiemposEscena == 50){
            textoSam = AñadirTexto(240,450,"Perrito!",colorTexto,20);
            textoSam.alpha = 0.01; 
            faseDialogo1 = 0;
        }
        if (tiemposEscena > 50){
            faseDialogo1 = BorrarTextoEscenaFinal(textoSam,2,faseDialogo1);
        }
    }
    if ((tiemposEscena >= 200)&&(tiemposEscena < 400)){
        if (tiemposEscena == 200){
            Detenerse();
            textoPerro = AñadirTexto(500,450,"woof!",colorTexto,20);
            textoPerro.alpha = 0.01; 
            faseDialogo2  = 0;
        }
        if (tiemposEscena > 200){
            console.log(faseDialogo1);
            faseDialogo1 = BorrarTextoEscenaFinal(textoSam,2,faseDialogo1);
            faseDialogo2 = BorrarTextoEscenaFinal(textoPerro,2,faseDialogo2);
        }
    }
    if ((tiemposEscena >= 400)&&(tiemposEscena < 600)){
        if (tiemposEscena == 400){
            camion = game.add.sprite(450,212,'camion');
            camion.alpha = 0.01;
        }
        if (camion.alpha < 1){
            camion.alpha = camion.alpha + 0.01;
        }
        else{
            camion.alpha = 1; 
        }
    }
    if (tiemposEscena == 600){
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
function BorrarTextoEscenaFinal(linea,velocidad,fase){
    if (fase == 0){
        faseNueva = 0;
        if (linea.alpha < 0.8){
            linea.alpha = linea.alpha + 0.01*velocidad;
        }
        if ((linea.alpha >= 0.8)&&(linea.alpha < 1)){
            linea.alpha = linea.alpha + 0.002*velocidad;
        }
        if (linea.alpha >= 1){
            linea.alpha = 1;
            faseNueva = 1;
        }
    }else{
        faseNueva = 1;
        if (linea.alpha > 0){
            if (linea.alpha > 0.8){
                linea.alpha = linea.alpha - 0.002*velocidad;
            }
            if ((linea.alpha <= 0.8)&&(linea.alpha > 0)){
                linea.alpha = linea.alpha - 0.01*velocidad;
            }
            if (linea.alpha <= 0){
                linea.alpha = 0;
                linea.destroy();
            }  
        }
    } 
    return faseNueva; 
}
