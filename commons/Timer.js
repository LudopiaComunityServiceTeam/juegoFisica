/**
* Funcion que crea el timer y el tiempo a mostrar
*
*/
function CrearTimer() {
    tiempo = 0;
    fpscont = 0;
    tiempoStart = false;
    var x = 560;
    var y = 20;
    var text = AñadirTexto(x,y,"Tiempo: ",colorTexto,35);
    timerText = AñadirTexto(x+ 140,y-10,"0",colorTiempo,50);

}

/**
* Funcion que es activada cada segundo para actualizar
* el tiempo mostrado.
*
*/
function actualizarTimer() {

    if (tiempoStart){
        fpscont++;

        if (fpscont == 40) {
            tiempo++;
            timerText.setText(tiempo);
            fpscont = 0;
        }
    }
}

/**
* Funcion para actualizar el tiempo sin
*mostrarlo en pantalla. 
*
*/
function actualizarTimerSinTexto() {

    if (tiempoStart){
        fpscont++;

        if (fpscont == 40) {
            tiempo++;
            fpscont = 0;
        }
    }
}


/**
* Funcion que inicia el tiempo mostrado.
*
*/
function startTimer() {
    tiempoStart = true;
}

/**
* Funcion que reinicia el tiempo mostrado.
*
*/
function resetTimer() {
    tiempo = 0;
    fpscont = 0;
    timerText.setText(tiempo);
}

/**
* Funcion que reinicia el tiempo sin  mostrarlo.
*
*/
function resetTimerSinTexto() {
    tiempo = 0;
    fpscont = 0;
}

/**
* Funcion que detiene el tiempo mostrado.
*
*/
function stopTimer() {
    tiempoStart = false;
}
