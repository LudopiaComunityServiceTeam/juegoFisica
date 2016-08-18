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
    // var text = AñadirTexto(x,y,"Tiempo: ",colorTexto,35);
    // timerText = AñadirTexto(x+ 140,y-10,"0",colorTiempo,50);

}

/**
* Funcion que es activada cada segundo para actualizar
* el tiempo mostrado.
*
*/
function actualizarTimer() {

    if (tiempoStart){
        fpscont++;

        if (fpscont == 30) {
            tiempo++;
            if (tiempo % 2 != 0)
            {
                Tick.play();
            }
            else
            {
                Tock.play();
            }
            timerText.setText(tiempo);
            fpscont = 0;
        }
    }
}

/**
* Funcion para actualizar el tiempo sin
* mostrarlo en pantalla.
*
*/
function actualizarTimerSinTexto() {

    if (tiempoStart){
        fpscont++;

        if (fpscont == 30) {
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

/**
* Funcion que crea el timer y el tiempo de la puerta
*
*/
function CrearTimerPuerta() {
    fpscontR = 0;
    tiempoStartR = false;
}

/**
* Funcion que es activada cada segundo para actualizar
* el tiempo de las puertas.
*
*/
function actualizarTimerPuerta() {

    if (tiempoStartR){
        fpscontR++;

        if (fpscontR == 30) {
            var tiempoR;
            for (var i = 0; i < ListaDeDatos.length; i++) {
                if (ListaDeDatos[i].tipo == "tiempo"){
                    tiempoR = ListaDeDatos[i].fantasma.text;
                    tiempoR--;
                    if (tiempoR % 2 != 0)
                    {
                        Tick.play();
                    }
                    else
                    {
                        Tock.play();
                    }
                    ListaDeDatos[i].fantasma.setText(tiempoR);
                    if (ChequearOverlap(ListaDeDatos[i], ListaDeDatos[i].fantasma)){
                        ListaDeDatos[i].setText(tiempoR);
                    }
                }
            }
            fpscontR = 0;
        }
    }
}

/**
* Funcion que inicia el tiempo de las puertas.
*
*/
function startTimerPuerta() {
    tiempoStartR = true;
}

/**
* Funcion que reinicia el tiempo de las puertas.
*
*/
function resetTimerPuerta() {
    for (var i = 0; i < ListaDeDatos.length; i++) {
        if (ListaDeDatos[i].tipo == "tiempo"){
            var tiempoR = ListaDeDatos[i].valor;
            ListaDeDatos[i].fantasma.setText(tiempoR);
            if (ChequearOverlap(ListaDeDatos[i], ListaDeDatos[i].fantasma)){
                ListaDeDatos[i].setText(tiempoR);
            }
        }
    }
    fpscontR = 0;
}

/**
* Funcion que detiene el tiempo de las puertas.
*
*/
function stopTimerPuerta() {
    tiempoStartR = false;
}
