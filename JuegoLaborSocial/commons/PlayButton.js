function CrearPlay() {
    //  Crear el boton de play
    PlayButton = game.add.button(400, 550, 'PlayButton', clickPlay, this);
    PlayButton.frame = 0;
    PlayButton.onInputOver.add(overPlayButton, this);
    PlayButton.onInputOut.add(outPlayButton, this);
}

function clickPlay(){
    //Determina que pasa cuando se hace click en el boton de play

    if (!clicked){
        //Iniciamos el timer
        timer.start();
        //y apretamos el boton
        PlayButton.frame = 3;
        clicked = true;
    }
    else{
        //Detenemos el timer
        timer.stop(false);
        resetTimer();
        //y desapretamos el boton
        PlayButton.frame = 0;
        clicked = false;
        impulsado = false;
        game.add.tween(player.body).to( { x: posInicXPlayer , y:posInicYPlayer}, 1, Phaser.Easing.Linear.None, true);
        if (!player.alive){
            player.reset(posInicXPlayer,posInicYPlayer);
        }
        if (explosion){
            cabeza.destroy();
            explosion = false;
        }
    }
}

function overPlayButton(){
    if (!clicked){
        PlayButton.frame = 1;
    }
    else{
        PlayButton.frame = 2;
    }
}

function outPlayButton(){
    if (!clicked){
        PlayButton.frame = 0;
    }
    else{
        PlayButton.frame = 3;
    }
}
