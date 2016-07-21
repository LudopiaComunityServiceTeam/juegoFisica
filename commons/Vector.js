/**
* Funcion que crea la magnitud para el vector.
* el nivel.
*
* @param numero: valor de la magnitud
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param numeroMostrado: valor de la magnitud (redundante)
*
*/
function CrearNumeroParaVector(numero,x,y,numeroMostrado) {
    //Creamos un numero de prueba para poder probar
    //nuestra funcion de click and drag

    var numeroMag;
    //creamos un objeto con forma de número
    // numeroMag = game.add.sprite(x, y, 'numeros');
    numeroMag = AñadirTexto(x,y,numeroMostrado, colorMagnitud, 48);
    numeroMag.anchor.y = -0.4;
    //Permitimos que se le pueda poner input al objeto
    numeroMag.inputEnabled = true;

    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    numeroMag.input.enableDrag(true);

    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    numeroMag.events.onDragStop.add(checkMagnitudInVector);

    //Elegimos el numero que queremos que sea el objeto que creamos
    //Esto cambia la imagen que tenemos del spritesheet
    //el frame 0 seria 1, el 2 seria 3, el 3 seria el cuatro y asi.
    numeroMag.frame = numeroMostrado-1;

    numeroMag.numero = numero;

    return numeroMag;
}

/**
* Funcion que revisa si el objeto esta en el rango de la
* caja de magnitud del vector. Si es asi, ajusta el objeto
* para que quede justo en el centro de la caja y cambia
* el valor de magnitud al valor que cargaba el objeto.
* el nivel.
*
* @param item: valor de la magnitud
*
*/
function checkMagnitudInVector(item) {

    magnitudEnCuadro = false;
//Se revisan todos los cuadros para ver si el objeto cayó en alguno
    for (i = 0; i < listaDeCuadros.length; i++) {
        magnitudEnCuadro = false;
//Si se arrastra el objeto tipo velocidad a un cuadro, la velocidad del vector
//debe cambiar, y si el vector ya estaba encima del jugador la velocidad del
//jugador tambien debe cambiar
        if (ChequearOverlap(item,listaDeCuadros[i])) {
            magnitudEnCuadro = true;
            item.x = (listaDeCuadros[i].x+30);
            item.y = (listaDeCuadros[i].y+50);
            listaDeCuadros[i].vector.magnitud = item.numero;
            if (ChequearOverlap(listaDeCuadros[i].vector,player)){
                magnitudJugador = listaDeCuadros[i].vector.magnitud;
            }
        }

        else{
//Se revisan todos los numeros para ver si hay alguno ademas del que se
//arrastro dentro de la caja
            for (j = 0; j < listaDeNumeros.length; j++){
                if (ChequearOverlap(listaDeCuadros[i],listaDeNumeros[j])) {
                    magnitudEnCuadro = true;
                    listaDeCuadros[i].vector.magnitud = listaDeNumeros[j].numero;
//Si el vector de dicha caja esta en contacto con el jugador entonces el jugador recibe
//la velocidad del numero que estaba en esa caja
                    if (ChequearOverlap(listaDeCuadros[i].vector,player)){
                        magnitudJugador = listaDeCuadros[i].vector.magnitud;
                    }
                }
            }
            if (!magnitudEnCuadro){
                listaDeCuadros[i].vector.magnitud = 0;
//Si el cuadro no tiene nada adentro, pero su vector esta encima del jugador
//entonces la "velocidad" del jugador deberia ser 0 y la del vector tambien
                if (ChequearOverlap(listaDeCuadros[i].vector,player)){
                    magnitudJugador = listaDeCuadros[i].vector.magnitud;
                }
            }
        }

    }
}

/**
* Funcion que crea el angulo para el vector.
* el nivel.
*
* @param numero: valor de la magnitud
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param numeroMostrado: valor de la magnitud (redundante)
*
*/
function CrearAnguloParaVector(numero,x,y,numeroMostrado) {
    //Creamos un numero de prueba para poder probar
    //nuestra funcion de click and drag

    var numeroAngulo;
    //creamos un objeto con forma de número
    numeroAngulo = AñadirTexto(x,y,numeroMostrado, colorAngulo, 48);
    numeroAngulo.anchor.y = -0.4;
    numeroAngulo.anchor.x = -0.25;

    //Permitimos que se le pueda poner input al objeto
    numeroAngulo.inputEnabled = true;

    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    numeroAngulo.input.enableDrag(true);

    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    numeroAngulo.events.onDragStop.add(checkAnguloInVector);

    //Elegimos el numero que queremos que sea el objeto que creamos
    //Esto cambia la imagen que tenemos del spritesheet
    //el frame 0 seria 1, el 2 seria 3, el 3 seria el cuatro y asi.
    numeroAngulo.frame = numeroMostrado-1;

    numeroAngulo.numero = numero;

    return numeroAngulo;
}

/**
* Funcion que revisa si el objeto esta en el rango de la
* caja de angulo del vector. Si es asi, ajusta el objeto
* para que quede justo en el centro de la caja y cambia
* el valor de magnitud al valor que cargaba el objeto.
* el nivel.
*
* @param item: valor de la magnitud
*
*/
function checkAnguloInVector(item) {
    anguloEnCuadro = false;
//Se revisan todos los cuadros para ver si el objeto cayó en alguno
    for (i = 0; i < listaDeCuadros.length; i++) {
        anguloEnCuadro = false;
//Si se arrastra el objeto tipo angulo a un cuadro, el angulo del vector
//debe cambiar, y si el vector ya estaba encima del jugador el angulo del
//jugador tambien debe cambiar
        if (ChequearOverlap(item,listaDeCuadros[i])) {
            anguloEnCuadro = true;
            item.x = (listaDeCuadros[i].x+90);
            item.y = (listaDeCuadros[i].y+50);
            listaDeCuadros[i].vector.angulo = item.numero;
            listaDeCuadros[i].vector.angle = ConvertirAngulo(item.numero);
            if (ChequearOverlap(listaDeCuadros[i].vector,player)){
                angulo = listaDeCuadros[i].vector.angulo;
            }
        }

        else{
//Se revisan todos los numeros para ver si hay alguno ademas del que se
//arrastro dentro de la caja
            for (j = 0; j < listaDeAngulos.length; j++){
                if (ChequearOverlap(listaDeCuadros[i],listaDeAngulos[j])) {
                    anguloEnCuadro = true;
                    listaDeCuadros[i].vector.angulo = listaDeAngulos[j].numero;
                    listaDeCuadros[i].vector.angle = ConvertirAngulo(listaDeAngulos[j].numero);
//Si el vector de dicha caja esta en contacto con el jugador entonces el jugador recibe
//el angulo del numero que estaba en esa caja
                    if (ChequearOverlap(listaDeCuadros[i].vector,player)){
                        angulo = listaDeCuadros[i].vector.angulo;
                    }
                }
            }
            if (!anguloEnCuadro){
                listaDeCuadros[i].vector.angulo = 0;
                listaDeCuadros[i].vector.angle = ConvertirAngulo(0);
//Si el cuadro no tiene nada adentro, pero su vector esta encima del jugador
//entonces el "angulo" del jugador deberia ser 0 y el del vector tambien
                if (ChequearOverlap(listaDeCuadros[i].vector,player)){
                    angulo = listaDeCuadros[i].vector.angulo;
                }
            }
        }

    }
}

/**
* Funcion que crea un vector con las caracteristicas
* especificadas.
*
* @param numero: valor de la magnitud
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param numeroMostrado: valor de la magnitud (redundante)
*
* @return el vector con las caracteristicas especificadas.
*
*/
function CrearVector(x,y,magnitud,angulo) {
    //Creamos el vector
    var vector = game.add.sprite(x, y, 'vector');
    vector.magnitud = magnitud;
    vector.angulo = angulo;
    vector.cargado = false;
    vector.anchor.setTo(0.5, 0.5);
    vector.angle = ConvertirAngulo(angulo);
    if (magnitud != 0){
        vector.cargado = true;
    }
    //Permitimos que se le pueda poner input al objeto
    vector.inputEnabled = true;
    vector.input.useHandCursor = true;
    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    vector.input.enableDrag(true);

    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion pegarVector
    vector.events.onDragStop.add(pegarVector);

    return vector;

}

/**
* Funcion que convierte el angulo que ve el usuario
* a su equivalente segun las coordenas de phaser.
*
* @param angulo: angulo a convertir
*
*/

function ConvertirAngulo(angulo){
    if ((angulo < 180)&&(angulo >= 0)){
        return (-angulo);
    }
    else if ((angulo <= 359)&&(angulo >= 180)){
        return (360 - angulo);
    }
}

/**
* Funcion que agrega el vector al objeto especificado.
*
* @param item: objeto al cual se le colocara el vector
*
*/
function pegarVector(item) {
    //Chequea si el vector esta fuera de un rango y si no es asi,
    //lo lleva a dicho rango

    if (ChequearOverlap(player,item)) {
        item.x = (player.x+(player.width/2));
        item.y = (player.y+(player.height/2));
        magnitudJugador = item.magnitud;
        angulo = item.angulo;
    }
    else{
        magnitudJugador = 0;
        angulo = 0;
    }
}

/**
* Funcion que crea el cuadro con la magnitud y el
* angulo del vector.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param vector: vector al cual esta asociado el cuadro.
*
*/
function CrearCuadroVector(x,y,vector){
    cuadro = game.add.sprite(x, y, 'cuadroVector');
    cuadro.vector = vector;
    return cuadro;
}
