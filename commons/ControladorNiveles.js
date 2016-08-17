/**
* Funcion que cierra la puerta de la salida despues de seg
* segundos.
*
* @param seg: segundos para cerrar la puerta
*
*/
function cierraSalida(){

    if (tiempo == (limiteDeTiempo + 1) && salidaAbierta){
        salida.animations.play('cerrar',10,false);
        salidaAbierta = false;
    }
}

/**
* Funcion que abre la puerta de la salida despues de seg
* segundos.
*
*/
function abreSalida(){

    actualizarTimerSinTexto();
    actualizarTimerPuerta();
    if (limiteDeTiempo == Infinity || limiteDeTiempo == tiempo) {
        if (!(salidaAbierta)) {
            OpenDoor.play();
            salida.animations.play('accionar',10,false);
            salidaAbierta = true;
        }
    }
}

/**
* Funcion que maneja el tiempo para permitirle al nivel
* terminar despues de que se haya cerrado la puerta
*
*/
function epilogoNivel(){
    if (!tiempoStart){
        startTimer();
        startTimerPuerta();
        console.log("WACHU");
    }else {
        if (tiempo == 1){
            if(!menuFinalNivelDesplegado){
                MenuFinalNivel();
                menuFinalNivelDesplegado = true;
            }
        }
        else {
            actualizarTimerSinTexto();
	}
    }
}

/**
* Funcion que detecta si se gano un nivel
*
*/
function DetectarVictoria() {

    //Detectar si el personaje toca la salida
    if (ChequearOverlap(player,salida)){
        if (limiteDeTiempo == Infinity || limiteDeTiempo == tiempo) {
            CloseDoor.play();
            if (salidaAbierta){
                salida.animations.play('cerrar',10,false);
                salidaAbierta = false;
            }
            epilogoCorriendo = true;
            stopTimer();
            stopTimerPuerta();
            resetTimerSinTexto();
            player.kill();
        }
    }
}

/**
* Funcion que detecta si se gano un nivel
*
*/
function DetectarAnimaciones() {

    //Detectar si el personaje toca la salida
    if (animacionDivisionIniciada){
        AnimarDivision();
    }
    if (animacionCirculoIniciada){
        AnimarCirculo();
    }
    if (!(resaltadores == [])){
        AnimarResaltador();
    }
    if (dudas){
        AnimarPista();
    }
}

/**
* Funcion que en cada frame revisa si debe abrir o cerra la puerta
*
*/
function ManejarPuerta() {

    abreSalida();
    cierraSalida();
}


/**
* Funcion que detecta si se perdio el juego
*
*/
function DetectarPerdida() {

//Perder por tocar una espina
    for (i = 0; i < listaDeEspinas.length; i++){
        if (ChequearOverlap(player,listaDeEspinas[i])) {
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 4;
            if (!explosion){
                gameOver("Auch!");
            }
        }
    }

//Perder por No llegar en tiempo correspondiente
    if (limiteDeTiempo != Infinity){
        if (((limiteDeTiempo + 1) == tiempo)&&(!(ChequearOverlap(player,salida)))) {
	    player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 4;
            animacionCirculoIniciada = true;
            if (!explosion){
                gameOver("Tiempo!");
            }
        }
    }
}

/**
* Funcion que se llama en el update, y se encarga de manejar
* lo relacionado a ganar, perder, pasar de nivel y la puerta.
*
*/
function ControlarNivel() {
    DetectarAnimaciones();
    if ((clicked)&&(direccion == 1)){
        if (!(epilogoCorriendo)){
            ManejarPuerta();
            DetectarPerdida();
            DetectarVictoria();
        }
        else{
            epilogoNivel();
        }
    }
}
function MenuFinalNivel() {
    hoja = game.add.sprite(200,100,'pedazoHoja');
    hoja.scale.setTo(0.6,0.6);
    cuadroVictoria.push(hoja);
    sello = game.add.sprite(300,150, 'sello');
    sello.scale.setTo(0.5, 0.5);
    cuadroVictoria.push(sello);
    cuadroVictoria.push(CrearBotonContinuar());


}
function ReiniciarNivel() {
    menuFinalNivelDesplegado = false;
    for (i = 0; i < cuadroVictoria.length; i++){
        cuadroVictoria[i].destroy();
    }
    resetGame();
}

function TerminarNivel() {
    game.state.start(niveles[nivelActual+1]);
    nivelActual = nivelActual + 1;
    resetVariables();
}
