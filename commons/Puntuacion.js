/**
* Funcion que crea la puntuacion inicial del nivel
*
*/
function crearPuntuacion() {
    var notaX = 50;
    var notaY = 10;
    AñadirTexto(notaX, notaY, 'Nota: ', colorTexto, 40);
    puntuacion = AñadirTexto(100 + notaX, notaY, '20', '#00cc00', 42);
}

function actualizarPuntuacion(){
    var nuevaPuntuacion = puntuacion.text - pierdePuntos;
    if (nuevaPuntuacion > 0){
        puntuacion.setText(nuevaPuntuacion);
    }
    else {
        puntuacion.setText(0);
    }
    colorearPuntuacion();
}

function colorearPuntuacion() {

    if (puntuacion.text > 15 && puntuacion.text <= 20){
        puntuacion.fill = '#00cc00'; // color verde
    }
    else if (puntuacion.text > 9 && puntuacion.text <= 15) {
        puntuacion.fill = '#ffcc00'; // color amarillo
    }
    else if (puntuacion.text > 4 && puntuacion.text <= 9) {
        puntuacion.fill = '#ff9900'; // color naranja
    }
    else if (puntuacion.text >= 0 && puntuacion.text <= 4) {
        puntuacion.fill = '#ff3333'; //color rojo
    }
}
