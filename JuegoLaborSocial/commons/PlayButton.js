/**
* Funcion que el comportamiento de boton de play
*
*/
function CrearPlay() {
    //  Crear el boton de play
    PlayButton = game.add.button(400, 550, 'PlayButton', clickPlay, this);
    PlayButton.frame = 0;
    PlayButton.onInputOver.add(overPlayButton, this);
    PlayButton.onInputOut.add(outPlayButton, this);
}

/**
* Funcion que crea el comportamiento de boton cuando esta
* presionado y cuando no.
*
*/
function clickPlay(){
    //Determina que pasa cuando se hace click en el boton de play

    if (!clicked){
        //Iniciamos el timer
        startTimer();
        //y apretamos el boton
        PlayButton.frame = 3;
        clicked = true;
        gameOverDestroy();
        // cierraSalida(limiteDeTiempo);
    }
    else{
        resetGame();
    }
}

/**
* Funcion que crea el comportamiento del boton cuando
* esta presionado.
*
*/
function overPlayButton(){
    if (!clicked){
        PlayButton.frame = 1;
    }
    else{
        PlayButton.frame = 2;
    }
}

/**
* Funcion que crea el comportamiento del boton cuando
* no esta presionado.
*
*/
function outPlayButton(){
    if (!clicked){
        PlayButton.frame = 0;
    }
    else{
        PlayButton.frame = 3;
    }
}
