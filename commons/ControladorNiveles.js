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
        salida.animations.play('cerrar',10,false);
        stopTimer();
        resetTimer();
        //gameOver();
    }
}

function abreSalida(seg){

    if (limiteDeTiempo == Infinity || (limiteDeTiempo - 2) == tiempo) {
        salida.animations.play('accionar',10,false);
    }

}

function epilogoNivel(){
    epilogoCorriendo = true;
    //player.kill();
    resetTimer();

    if (!tiempoStart){
        startTimer();
        limiteDeTiempo = 1;
    }else {
        if (tiempo == limiteDeTiempo){ 
            game.state.start(niveles[nivelActual+1]);
            nivelActual = nivelActual + 1;
            resetVariables();
        }
        else {
            actualizarTimer();
	}
    }
    epilogoCorriendo = false;
}

function DetectarVictoria() {

    //Detectar si el personaje toca la salida
    if (ChequearOverlap(player,salida)){
        if (limiteDeTiempo == Infinity || limiteDeTiempo == tiempo) {
            CloseDoor.play();
            epilogoNivel();
        }
    }
}

function ManejarPuerta() {

    if (!(salidaAbierta)) {
        abreSalida(limiteDeTiempo);
        salidaAbierta = true;
    }
    cierraSalida(limiteDeTiempo);

}

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

function ControlarNivel() {

    if ((clicked)&&(direccion == 1)){
        if (!(epilogoCorriendo)){
            ManejarPuerta();
            DetectarPerdida();
            DetectarVictoria();
	}
    }
}
