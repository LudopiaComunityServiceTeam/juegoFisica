/**
* Funcion que crea el timer y el tiempo a mostrar
*
*/
function CrearTimer() {
    tiempo = 0;
    fpscont = 0;
    var x = 560;
    var y = 20;
    var text = AñadirTexto(x,y,"Tiempo: ",colorTexto,35);
    timerText = AñadirTexto(x+ 140,y-10,"0",colorTiempo,50);

    // timer = game.time.create(false);
    // game.time.advancedTiming = true;
    AñadirTexto(0,y,"game.time.fps: "+game.time.fps,colorTexto,35);
    // AñadirTexto(0,y+20,"SECOND: "+Phaser.Timer.SECOND,colorTexto,35);
    // var aSeg = Math.floor(game.time.fps/100); //redifinimos un segundo dependiendo del fps
    // if (aSeg == 0) {
    //     aSeg = 1;
    // }
    // timer.loop(1000/aSeg, actualizarTimer, this);
}

/**
* Funcion que es activada cada segundo para actualizar
* el tiempo mostrado.
*
*/
function actualizarTimer() {

    if (clicked){
        fpscont++;

        if (fpscont == 30) {
            tiempo++;
            timerText.setText(tiempo);
            fpscont = 0;
        }
    }
}

/**
* Funcion que reinicia el tiempo mostrado.
*
*/
function resetTimer() {
    tiempo = 0;
    timerText.setText(tiempo);
}
