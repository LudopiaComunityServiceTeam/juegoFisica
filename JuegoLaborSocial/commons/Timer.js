function CrearTimer() {
    //  Creamos un timer
    tiempo = 0;

    var x = 560;
    var y = 10;
    var text = game.add.text(x, y, "Tiempo: ", { font: "35px Gloria Hallelujah",  fill: colorTexto});
    var estilo = { font: "35px Gloria Hallelujah",  fill: colorTiempo, align: "center" };
    timerText = game.add.text(x + 140, y, "0", estilo);

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
