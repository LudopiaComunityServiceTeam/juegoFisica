
function DetectarVictoria() {

    //Detectar si el personaje toca la salida
    if (ChequearOverlap(player,salida)){
        if (limiteDeTiempo == Infinity || limiteDeTiempo == tiempo) {
            CloseDoor.play();
            game.state.start(niveles[nivelActual+1]);
            nivelActual = nivelActual + 1;
            resetVariables();
            }
        }
}

function ManejarPuerta() {

    abreSalida(limiteDeTiempo);
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
    if ((limiteDeTiempo == tiempo)&&(!(ChequearOverlap(player,salida)))) {
	player.body.velocity.x = 0;
        player.animations.stop();
        player.frame = 4;
        if (!explosion){
            gameOver();
            }
    }

} 

function ControlarNivel() {

    if ((clicked)&&(direccion == 1)){
        ManejarPuerta();
        DetectarPerdida();
        DetectarVictoria();
    }
}
