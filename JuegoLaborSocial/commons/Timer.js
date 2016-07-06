function CrearTimer() {
    //  Creamos un timer
    tiempo = 0;

    var x = 560;
    var y = 20;
    var text = AñadirTexto(x,y,"Tiempo: ",colorTexto,35)
    timerText = AñadirTexto(x+ 140,y-10,"0",colorTiempo,50)

    timer = game.time.create(false);
    timer.loop(1000, actualizarTimer, this);
}

function actualizarTimer() {
    // Actualizar el timer
    tiempo ++;
    timerText.setText(tiempo);
}

function resetTimer() {
    tiempo = 0
    timerText.setText(tiempo);
}
