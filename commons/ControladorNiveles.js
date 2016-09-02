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
    }else {
        if (tiempo == 1){
            if(!menuFinalNivelDesplegado){
                MenuFinalNivel();
                saveArchivoGuardado();
                menuFinalNivelDesplegado = true;
            }
        }
        else {
            actualizarTimerSinTexto();

            if (salida.animations.currentAnim.currentFrame.index == 2){
                player.kill();
            }

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
            //player.kill();
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
    if (nubeCreada){
	AnimarNube();
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
        if (ChequearOverlap(player,listaDeEspinas[i][0])) {
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 4;
            if (!explosion){
                gameOver("AUCH!");
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
                gameOver("TIEMPO!");
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
            ManejarObstaculos();
        }
        else{
            epilogoNivel();
        }
    }
}
function MenuFinalNivel() {

    inhabilitarJugar();
    var filtroBlanco = game.add.sprite(0,0,'fondoBlanco');
    filtroBlanco.alpha = 0.5;
    filtroBlanco.scale.setTo(5,2);
    cuadroVictoria.push(filtroBlanco);
    var hoja = game.add.sprite(100,50,'pedazoHoja');
    hoja.scale.setTo(0.6,0.6);
    cuadroVictoria.push(hoja);
    ponerPuntuacionEnCuadro(350, 305);
    // var sello = game.add.sprite(370,295, 'sello');
    // sello.scale.setTo(0.5, 0.5);
    // cuadroVictoria.push(sello);
    cuadroVictoria.push(CrearBotonContinuar());
    cuadroVictoria.push(CrearBotonRepetirNivel());
    var victoria = game.add.sprite(235,120,'victoria');
    victoria.scale.setTo(0.5,0.5)
    cuadroVictoria.push(victoria);

}

function ReiniciarNivel() {
    menuFinalNivelDesplegado = false;
    for (i = 0; i < cuadroVictoria.length; i++){
        cuadroVictoria[i].destroy();
    }
    resetGame();
}

/**
* Funcion que muestra el sprite de finalizar el juego
* y reproduce el sonido correspondiente.
*
*/
function gameOver(texto){

    Explotar();
    actualizarPuntuacion();
    inhabilitarJugar();
    var filtroBlanco = game.add.sprite(0,0,'fondoBlanco');
    filtroBlanco.alpha = 0.5;
    filtroBlanco.scale.setTo(5,2);
    cuadroVictoria.push(filtroBlanco);
    var hoja = game.add.sprite(100,50,'pedazoHoja');
    hoja.scale.setTo(0.6,0.6);
    cuadroVictoria.push(hoja);
    ponerPuntuacionEnCuadro(490, 225);
    cuadroVictoria.push(CrearBotonRepetirNivel());

    var gameOverText;
    if (texto == "AUCH!"){
        gameOverText = AñadirTextoStencil(320,130,texto,colorTiempo,60);
    }
    else{
        gameOverText = AñadirTextoStencil(280,130,texto,colorTiempo,60);
    }
    gameOverText.angle = -4;
    cuadroVictoria.push(gameOverText);
    stopTimerPuerta();
}

/**
* Funcion que reinicia el juego.
*
*/
function resetGame(){
    Reset.play();
    //Detenemos el timer
    stopTimer();
    resetTimerSinTexto();
    stopTimerPuerta();
    resetTimerPuerta();
    //y soltamos el boton
    RestaurarObstaculos();
    PlayButton.frame = 0;
    clicked = false;
    impulsado = false;
    salidaAbierta = false;
    epilogoCorriendo = false;
    game.add.tween(player.body).to( { x: posInicXPlayer , y:posInicYPlayer}, 1, Phaser.Easing.Linear.None, true);
    if (!player.alive){
        player.reset(posInicXPlayer,posInicYPlayer);
    }
    else{
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }
    salida.frame = 0;
    if (explosion){
        cabeza.destroy();
        cuerpo.destroy();
        brazoI.destroy();
        brazoD.destroy();
        piernaI.destroy();
        piernaD.destroy();
        explosion = false;
    }
    habilitarJugar();
}

/**
* Funcion reinicia todas la variables involucradas
* en el juego.
*
*/
function resetVariables(){
    //resetea las variables del nivel para que al iniciar el nuevo
    //nivel no se traigan variables del nivel anterior
    clicked = false;
    magnitudJugador = 0;
    direccion = 1;
    angulo = 0;
    impulsado = false;
    tieneDistancia = false;
    tieneTiempo = false;
    postIt = null;
    listaDeVectores = [];
    listaDeNumeros = [];
    listaDeEspinas = [];
    listaDeAngulos = [];
    ListaDeDatos = [];
    ListaDeCiclos = []
    cuadroVictoria = [];
    inicio = [];
    cuadroPista = [];
    resaltadores = [];
    indice = 0;
    menuFinalNivelDesplegado = false;

    salidaAbierta = false;
    epilogoCorriendo = false;
}

function TerminarNivel() {
    game.state.start(niveles[nivelActual+1]);
    nivelActual = nivelActual + 1;
    resetVariables();
}

/**
* Funcion que detecta si se gano un nivel
*
*/
function ManejarObstaculos() {

    //Detectar si el personaje toca la salida
    if (ListaDeCiclos.length != 0){
        for (i = 0; i < ListaDeCiclos.length; i++){
            var ciclo = ListaDeCiclos[i];
            var faseActual = ciclo.fase;
            var veloXActual = ciclo.velsX[faseActual]
            var veloYActual = ciclo.velsY[faseActual]
            var LimXActual =ciclo.limitesX[faseActual]
            var LimYActual = ciclo.limitesY[faseActual]
            if (CicloMovimientoSimple(ciclo.objeto[0],veloXActual,veloYActual,LimXActual,LimYActual)){
                if (faseActual + 1 >= ciclo.velsX.length){
                    ciclo.fase = 0;
                }
                else{
                    ciclo.fase = faseActual + 1;
                }
            }
        }
    }
}
