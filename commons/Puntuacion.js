/**
* Funcion que crea la puntuacion inicial del nivel
*
*/
function crearPuntuacion() {
    var notaX = 350;
    var notaY = 10;
    AñadirTexto(notaX, notaY, 'Nota: ', colorTexto, 40);
    // Inicia con una puntuacion guardad para el nivel
    if (nivelActual == 1){
        puntuacion = AñadirTexto(100 + notaX, notaY, Nota[0], '#00cc00', 42);
    }
    else{
        puntuacion = AñadirTexto(100 + notaX, notaY, Nota[nivelActual-2], '#00cc00', 42);
    }
    colorearTexto(puntuacion);
}

/**
* Funcion que actualiza la puntuacion del nivel
*
*/
function actualizarPuntuacion(puntos){
    var nuevaPuntuacion = parseInt(puntuacion.text) + puntos;
    if (nuevaPuntuacion < 0 ){
        nuevaPuntuacion = 0;
    }
    else if (nuevaPuntuacion > 20) {
        nuevaPuntuacion = 20;
    }
    
    console.log("puntuacion:" + puntuacion);

    puntuacion.setText(nuevaPuntuacion);
    Nota[nivelActual - 1] = nuevaPuntuacion;
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
/**

* Funcion que pone la puntuacion en el menu final
*
*/
function ponerPuntuacionFinal(x, y) {
    var sello;

    if (Nota[nivelActual-2] == 20) {
        sello = AñadirTextoMarcador(x - 12, y, Nota[nivelActual-2], colorTiempo, 70);
    }
    else {
        sello = AñadirTextoMarcador(x, y, Nota[nivelActual-2], colorTiempo, 70);
    }
    colorearTexto(sello);
    sello.angle = -25;
    cuadroVictoria.push(sello);
    var subrayar = AñadirTextoMarcador(x - 5, y + 25, '_', sello.fill, 70);
    subrayar.scale.setTo(1.5, 1);
    subrayar.angle = -25;
    cuadroVictoria.push(subrayar);
}
