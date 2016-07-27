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
    listaDeVectores.push(vector);
    var cola = game.add.sprite(-36, -8.5, 'vector')
    vector.cola = cola;
    vector.addChild(cola);
    escalarVector(vector, magnitud)
    vector.frame = 3;
    vector.magnitud = magnitud;
    vector.angulo = angulo;
    vector.cargado = false;
    vector.anchor.setTo(0.5, 0.5);
    vector.angle = ConvertirAngulo(angulo);
    escalarVector(vector, magnitud)
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

    numeroMag.numero = numero;
    numeroMag.posXInit = x;
    numeroMag.posYInit = y;
    numeroMag.enCuadro = false;
    listaDeNumeros.push(numeroMag);

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

            for (j = 0; j < listaDeNumeros.length; j++){

                // Devolver la magnitud que estaba en el cuadro a su posicion inicial
                if (listaDeNumeros[j].enCuadro) {
                    listaDeNumeros[j].enCuadro = false;
                    listaDeNumeros[j].x = listaDeNumeros[j].posXInit;
                    listaDeNumeros[j].y = listaDeNumeros[j].posYInit;
                }
            }

            // Evitar que se muestre la magnitud inicial del vector.
            listaDeCuadros[i].magnitudInicial.visible = false;
            magnitudEnCuadro = true;
            item.x = listaDeCuadros[i].x + 30;
            item.y = listaDeCuadros[i].y + 50;
            listaDeCuadros[i].vector.magnitud = item.numero;
            escalarVector(listaDeCuadros[i].vector, item.numero);
            if (ChequearOverlap(listaDeCuadros[i].vector,player)||(ChequearOverlap(player,listaDeCuadros[i].vector.cola))){
                magnitudJugador = listaDeCuadros[i].vector.magnitud;
            }
            // Lq magnitud movida es la que se encuentra en el cuadro ahora
            item.enCuadro = true;
        }

        else {
            //Se revisan todas las magnitudes para ver si hay alguno ademas del que se
            //arrastro.
            item.enCuadro = false;
            for (j = 0; j < listaDeNumeros.length; j++){
                if (ChequearOverlap(listaDeCuadros[i],listaDeNumeros[j])) {
                    magnitudEnCuadro = true;
                    listaDeCuadros[i].vector.magnitud = listaDeNumeros[j].numero;
                    escalarVector(listaDeCuadros[i].vector, listaDeNumeros[j].numero);
                    // Si el vector de dicha caja esta en contacto con el jugador
                    // entonces el jugador recibe
                    // la velocidad del numero que estaba en esa caja
                    if (ChequearOverlap(listaDeCuadros[i].vector,player)||(ChequearOverlap(player,listaDeCuadros[i].vector.cola))){
                        magnitudJugador = listaDeCuadros[i].vector.magnitud;
                    }
                }
            }
            if (!magnitudEnCuadro){
                // El cuadro no tiene una magnitud de las dispoibles
                // asi que se coloca el inicial.
                listaDeCuadros[i].vector.magnitud = 0;
                escalarVector(listaDeCuadros[i].vector, 1);
                listaDeCuadros[i].magnitudInicial.visible = true;
                // Si el cuadro no tiene nada adentro, pero su
                // vector esta encima del jugador
                // entonces la "velocidad" del jugador deberia ser 0 y la del vector tambien
                if (ChequearOverlap(listaDeCuadros[i].vector,player)||(ChequearOverlap(player,listaDeCuadros[i].vector.cola))){
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

    numeroAngulo.numero = numero;
    numeroAngulo.posXInit = x;
    numeroAngulo.posYInit = y;
    numeroAngulo.enCuadro = false;
    listaDeAngulos.push(numeroAngulo);

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

            for (j = 0; j < listaDeAngulos.length; j++){
                // Devolver el angulo que estaba en el cuadro a su posicion inicial
                if (listaDeAngulos[j].enCuadro){
                    listaDeAngulos[j].enCuadro = false;
                    listaDeAngulos[j].x = listaDeAngulos[j].posXInit;
                    listaDeAngulos[j].y = listaDeAngulos[j].posYInit;
                }
            }
            // Evitar que se muestre el angulo inicial del vector.
            listaDeCuadros[i].anguloInicial.visible = false;
            anguloEnCuadro = true;
            item.x = listaDeCuadros[i].x + 90;
            item.y = listaDeCuadros[i].y + 50;
            listaDeCuadros[i].vector.angulo = item.numero;
            listaDeCuadros[i].vector.angle = ConvertirAngulo(item.numero);
            if (ChequearOverlap(listaDeCuadros[i].vector,player)||(ChequearOverlap(player,listaDeCuadros[i].vector.cola))){
                angulo = listaDeCuadros[i].vector.angulo;
            }
            // El angulo movido es el que se encuentra en el cuadro ahora
            item.enCuadro = true;
        }

        else {
            //Se revisan todos los numeros para ver si hay alguno ademas del que se
            //arrastro dentro de la caja
            item.enCuadro = false;
            for (j = 0; j < listaDeAngulos.length; j++){
                if (ChequearOverlap(listaDeCuadros[i],listaDeAngulos[j])) {
                    anguloEnCuadro = true;
                    listaDeCuadros[i].vector.angulo = listaDeAngulos[j].numero;
                    listaDeCuadros[i].vector.angle = ConvertirAngulo(listaDeAngulos[j].numero);
                    //Si el vector de dicha caja esta en contacto con el jugador
                    // entonces el jugador recibe
                    //el angulo del numero que estaba en esa caja
                    if (ChequearOverlap(listaDeCuadros[i].vector,player)||(ChequearOverlap(player,listaDeCuadros[i].vector.cola))){
                        angulo = listaDeCuadros[i].vector.angulo;
                    }
                }
            }
            if (!anguloEnCuadro){
                // El cuadro no tiene una magnitud de las dispoibles
                // asi que se coloca el inicial.
                listaDeCuadros[i].vector.angulo = 0;
                listaDeCuadros[i].vector.angle = ConvertirAngulo(0);
                listaDeCuadros[i].anguloInicial.visible = true;
                //Si el cuadro no tiene nada adentro, pero su vector esta encima del jugador
                //entonces el "angulo" del jugador deberia ser 0 y el del vector tambien
                if (ChequearOverlap(listaDeCuadros[i].vector,player)||(ChequearOverlap(player,listaDeCuadros[i].vector.cola))){
                    angulo = listaDeCuadros[i].vector.angulo;
                }
            }
        }

    }
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

    if (ChequearOverlap(player,item)||ChequearOverlap(player,item.cola)) {
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
* @return cuadro con las caracteristicas apropiadas
*
*/
function CrearCuadroVector(x,y,vector){
    cuadro = game.add.sprite(x, y, 'cuadroVector');
    cuadro.vector = vector;

    //inicializacion de la magnitud del vector
    magnitud = CrearNumeroParaVector(vector.magnitud, x + 30,y + 50, vector.magnitud);
    magnitud.input.draggable = false;
    magnitud.enCuadro = true;
    cuadro.magnitudInicial = magnitud;
    checkMagnitudInVector(magnitud);

    // inicializacion del angulo del vector
    angulo = CrearAnguloParaVector(vector.angulo, x + 105,y + 50, vector.angulo);
    angulo.input.draggable = false;
    angulo.enCuadro = true;
    cuadro.anguloInicial = angulo;
    checkAnguloInVector(angulo);

    // Ocultar cuadro del vector cuando no se necesite
    // descomentar y cambiar el tipo de evento que activa la funcion
    // vector.events.onInputDown.add(function(vector){ocultarCuadroVector(vector, cuadro);}, this);
    listaDeCuadros.push(cuadro);
    return cuadro;
}

/**
* Funcion que oculta el cuadro de un vector
*
* @param cuadro: el cuadro a ocultar
*
*/
function ocultarCuadroVector(vector, cuadro){
    cuadro.visible = false;

    for (j = 0; j < listaDeNumeros.length; j++){
        // Ocultar la magnitud del cuadro
        if (ChequearOverlap(cuadro,listaDeNumeros[j])) {
            listaDeNumeros[j].visible = false;
        }
    }
    // Evitar que se muestre la magnitud inicial del vector.
    cuadro.magnitudInicial.visible = false;

    for (j = 0; j < listaDeAngulos.length; j++){
        // Ocultar el angulo del cuadro
        if (ChequearOverlap(cuadro,listaDeAngulos[j])) {
            listaDeAngulos[j].visible = false;
        }
    }
    // Evitar que se muestre el angulo inicial del vector.
    cuadro.anguloInicial.visible = false;
}

/**
* Funcion que muestra el cuadro de un vector
*
* @param cuadro: el cuadro a ocultar
*
*/
function mostrarCuadroVector(vector, cuadro){
    cuadro.visible = true;

    // Mostrar la magnitud inicial del cuadro
    cuadro.magnitudInicial.visible = true;

    for (j = 0; j < listaDeNumeros.length; j++){
        // Mostrar la magnitud que estaba en el cuadro
        if (ChequearOverlap(cuadro,listaDeNumeros[j])) {
            listaDeNumeros[j].visible = true;
            // Evitar que se muestre el angulo inicial del vector.
            cuadro.magnitudInicial.visible = false;
        }
    }

    // Mostrar el angulo inicial del cuadro
    cuadro.anguloInicial.visible = true;

    for (j = 0; j < listaDeAngulos.length; j++){
        // Mostrar el angulo que estaba en el cuadro
        if (ChequearOverlap(cuadro,listaDeAngulos[j])) {
            listaDeAngulos[j].visible = true;
            // Evitar que se muestre el angulo inicial del vector.
            cuadro.anguloInicial.visible = false;
        }
    }
}
function escalarVector(Vector, NuevoTamaño){
    var tamanoCalculado
    var tamañoAnterior = Vector.width + Vector.cola.width
    var tamañoNuevo
    tamanoCalculado = 1 + ((NuevoTamaño/100)-1)
    if (tamanoCalculado == 0){
        Vector.cola.scale.x = 0.1;
        Vector.cola.x = 0;
    }
    else if (tamanoCalculado >= 7){    
        Vector.cola.scale.x = 7;        
        Vector.cola.x = -84;
    }
    else{
        Vector.cola.scale.x = tamanoCalculado;
        Vector.cola.x = -tamanoCalculado * 12;
    }
    if (Vector.cola.width == 0){
        Vector.pivot.x = 0.5;
    }
    else{
        Vector.pivot.x = -(Vector.cola.width)/2;
    }
}
/*function actualizarColaVector(){
    
    for (i = 0; i < listaDeVectores.length; i++){
        // Ocultar la magnitud del cuadro
            listaDeVectores[i].cola.x = listaDeVectores[i].x - 18;
            listaDeVectores[i].cola.y = listaDeVectores[i].y - 8.5;
    }

}*/
