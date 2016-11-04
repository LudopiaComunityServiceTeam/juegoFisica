/**
* Funcion que crea la puntuacion inicial del nivel
*
*/
function crearPuntuacion() {
    var notaX = 350;
    var notaY = 10;
    AñadirTexto(notaX, notaY, 'Nota: ', colorTexto, 40);
    puntuacion = AñadirTexto(100 + notaX, notaY, Nota, '#00cc00', 42);
    colorearTexto(puntuacion);
}

/**
* Funcion que actualiza la puntuacion del nivel
*
*/
function actualizarPuntuacion(puntos){
    var nuevaPuntuacion = parseInt(puntuacion.text) + puntos;
    if (nuevaPuntuacion >= 0 && nuevaPuntuacion < 21){
        puntuacion.setText(nuevaPuntuacion);
        Nota = nuevaPuntuacion;
    }
    colorearTexto(puntuacion);
}

/**
* Funcion que pone la puntuacion en el menu final
*
*/
function ponerPuntuacionEnCuadro(x, y) {
    var sello;

    if (puntuacion.text == 20) {
        sello = AñadirTextoMarcador(x - 12, y, puntuacion.text, colorTiempo, 70);
    }
    else {
        sello = AñadirTextoMarcador(x, y, puntuacion.text, colorTiempo, 70);
    }
    colorearTexto(sello);
    sello.angle = -25;
    cuadroVictoria.push(sello);
    var subrayar = AñadirTextoMarcador(x - 5, y + 25, '_', sello.fill, 70);
    subrayar.scale.setTo(1.5, 1);
    subrayar.angle = -25;
    cuadroVictoria.push(subrayar);
}
