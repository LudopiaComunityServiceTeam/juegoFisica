/**
* Funcion que cierra la puerta de la salida despues de seg
* segundos.
*
* @param seg: segundos para cerrar la puerta
*
*/
function cierraSalida(seg){
    actualizarTimer();
    if (tiempo == (seg + 1)){
	if (salidaAbierta){
            salida.animations.play('cerrar',10,false);
            salidaAbierta = false;
            console.log("salidaAbierta = ",salidaAbierta);
	}
    }
}

/**
* Funcion que abre la puerta de la salida despues de seg
* segundos.
*
* @param seg: segundos para abr la puerta
*
*/
function abreSalida(){

    if (limiteDeTiempo == Infinity || (limiteDeTiempo) == tiempo) {
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
        console.log("WACHU")
    }else {
        if (tiempo == 1){ 
            game.state.start(niveles[nivelActual+1]);
            nivelActual = nivelActual + 1;
            resetVariables();
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
            resetTimerSinTexto();
            player.kill();

        }
    }
}

/**
* Funcion que en cada frame revisa si debe abrir o cerra la puerta
*
*/
function ManejarPuerta() {

    abreSalida();
    cierraSalida(limiteDeTiempo);
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
                gameOver();
            }
    
        }
    }

//Perder por No llegar en tiempo correspondiente
    if (limiteDeTiempo != Infinity){ 
        if (((limiteDeTiempo + 1) == tiempo)&&(!(ChequearOverlap(player,salida)))) {
	    player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 4;
            if (!explosion){
                gameOver();
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
    //actualizarColaVector();
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
