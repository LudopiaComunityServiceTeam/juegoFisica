/**
* Funcion que crea el timer y el tiempo a mostrar
*
*/
function CrearTimer() {
    tiempo = 0;

    var x = 560;
    var y = 20;
    var text = AñadirTexto(x,y,"Tiempo: ",colorTexto,35)
    timerText = AñadirTexto(x+ 140,y-10,"0",colorTiempo,50)

    timer = game.time.create(false);
    timer.loop(1000, actualizarTimer, this);
}

/**
* Funcion que es activada cada segundo para actualizar
* el tiempo mostrado.
*
*/
function actualizarTimer() {
    tiempo ++;
    timerText.setText(tiempo);
}

/**
* Funcion que reinicia el tiempo mostrado.
*
*/
function resetTimer() {
    tiempo = 0
    timerText.setText(tiempo);
}
