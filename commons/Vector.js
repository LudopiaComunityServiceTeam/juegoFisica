/**
* Funcion que crea un vector con las caracteristicas
* especificadas.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param magnitud: valor de la magnitud
* @param angulo: valor del angulo
*
* @return el vector con las caracteristicas especificadas.
*
*/
function CrearVector(x, y, magnitud, angulo, mostrarCuadro) {
    //Creamos el vector
    var vector = game.add.sprite(x, y, 'vector');
    listaDeVectores.push(vector);
    var cola = game.add.sprite(-36, -8.5, 'vector');
    vector.cola = cola;
    vector.addChild(cola);
    vector.frame = 3;
    vector.magnitud = magnitud;
    vector.angulo = angulo;
    vector.cargado = false;
    vector.anchor.setTo(0.5, 0.5);
    vector.angle = ConvertirAngulo(angulo);
    escalarVector(vector, magnitud);
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
    ;
    // Cuadro del vector
    vector.cuadro = CrearCuadroVector(x - 80, y - 180, vector);
    vector.events.onDragUpdate.add(controlarCuadrosVectores);
    // Ocultar cuadro del vector cuando no se necesite
    if (mostrarCuadro){
        mostrarCuadroVector(vector, vector.cuadro);
        vector.events.onInputDown.add(function(vector){mostrarCuadroVector(vector, vector.cuadro);}, this);
    }
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

    numeroMag.numero = numero;
    numeroMag.posXInit = x;
    numeroMag.posYInit = y;

    return numeroMag;
}

function CrearNumeroParaVectorControlable(numero,x,y,numeroMostrado) {
    var numeroMag = CrearNumeroParaVector(numero,x,y,numeroMostrado);

    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    numeroMag.input.enableDrag(true);
    numeroMag.input.useHandCursor = true;

    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    numeroMag.events.onDragStop.add(checkMagnitudInVector);
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

    for (var i = 0; i < listaDeVectores.length; i++) {
        // Si la magnitud esta en el cuadro del vector i
        if (ChequearOverlap(item,listaDeVectores[i].cuadro)) {
            // Ocultar la magnitud inicial
            listaDeVectores[i].cuadro.magnitudInicial.visible = false;

            item.x = listaDeVectores[i].cuadro.x + 30;
            item.y = listaDeVectores[i].cuadro.y + 50;

            // Actualizar vector y jugador
            listaDeVectores[i].magnitud = item.numero;
            VectorFit.play();
            escalarVector(listaDeVectores[i], item.numero);
            if (ChequearOverlap(listaDeVectores[i],player)||(ChequearOverlap(player,listaDeVectores[i].cola))){
                magnitudJugador = listaDeVectores[i].magnitud;
            }

            // Devolver la magnitud que estaba en el cuadro a su posicion inicial
            // si la magnitud que colisiono es diferente a la que estaba en cuadro
            if (item != listaDeVectores[i].cuadro.magnitudEnCuadro) {
                listaDeVectores[i].cuadro.magnitudEnCuadro.x = listaDeVectores[i].cuadro.magnitudEnCuadro.posXInit;
                listaDeVectores[i].cuadro.magnitudEnCuadro.y = listaDeVectores[i].cuadro.magnitudEnCuadro.posYInit;
                // La magnitud movida se encuentra en cuadro
                listaDeVectores[i].cuadro.magnitudEnCuadro = item;
            }
        }
        // Si la magnitud que se movio era la que estaba en el cuadro y se movio fuera de el
        else if (item == listaDeVectores[i].cuadro.magnitudEnCuadro) {
            // La magnitud es la inicial del vector
            listaDeVectores[i].cuadro.magnitudInicial.visible = true;
            listaDeVectores[i].cuadro.magnitudInicial.x = listaDeVectores[i].cuadro.x + 30;
            listaDeVectores[i].cuadro.magnitudInicial.y = listaDeVectores[i].cuadro.y + 50;
            listaDeVectores[i].cuadro.magnitudEnCuadro = listaDeVectores[i].cuadro.magnitudInicial;

            // Actualizar vector y jugador
            listaDeVectores[i].magnitud = listaDeVectores[i].cuadro.magnitudInicial.numero;
            escalarVector(listaDeVectores[i], listaDeVectores[i].magnitud);
            if (ChequearOverlap(listaDeVectores[i],player)||(ChequearOverlap(player,listaDeVectores[i].cola))){
                magnitudJugador = listaDeVectores[i].magnitud;
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

    numeroAngulo.numero = numero;
    numeroAngulo.posXInit = x;
    numeroAngulo.posYInit = y;

    return numeroAngulo;
}
function CrearAnguloParaVectorControlable(numero,x,y,numeroMostrado) {
    var numeroAngulo = CrearAnguloParaVector(numero,x,y,numeroMostrado);

    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    numeroAngulo.input.enableDrag(true);
    numeroAngulo.input.useHandCursor = true;

    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    numeroAngulo.events.onDragStop.add(checkAnguloInVector);
    listaDeAngulos.push(numeroAngulo);

    return numeroAngulo;
}

/**
* Funcion que revisa si el objeto esta en el rango de la
* caja de angulo del vector. Si es asi, ajusta el objeto
* para que quede justo en el centro de la caja y cambia
* el valor de angulo  al valor que cargaba el objeto.
* el nivel.
*
* @param item: valor de la angulo
*
*/
function checkAnguloInVector(item) {

    for (var i = 0; i < listaDeVectores.length; i++) {
        // Si el angulo  esta en el cuadro del vector i
        if (ChequearOverlap(item,listaDeVectores[i].cuadro)) {
            // Ocultar el angulo inicial
            listaDeVectores[i].cuadro.anguloInicial.visible = false;

            item.x = listaDeVectores[i].cuadro.x + 90;
            item.y = listaDeVectores[i].cuadro.y + 50;

            // Actualizar vector y jugador
            listaDeVectores[i].angulo = item.numero;
            VectorFit.play();
            listaDeVectores[i].angle = ConvertirAngulo(item.numero);
            if (ChequearOverlap(listaDeVectores[i],player)||(ChequearOverlap(player,listaDeVectores[i].cola))){
                angulo = listaDeVectores[i].angulo;
            }

            // Devolver el angulo que estaba en el cuadro a su posicion inicial
            // si el angulo que colisiono es diferente a la que estaba en cuadro
            if (item != listaDeVectores[i].cuadro.anguloEnCuadro) {
                listaDeVectores[i].cuadro.anguloEnCuadro.x = listaDeVectores[i].cuadro.anguloEnCuadro.posXInit;
                listaDeVectores[i].cuadro.anguloEnCuadro.y = listaDeVectores[i].cuadro.anguloEnCuadro.posYInit;
                // El angulo movida se encuentra en cuadro
                listaDeVectores[i].cuadro.anguloEnCuadro = item;
            }
        }
        // Si el angulo que se movio era la que estaba en el cuadro y se movio fuera de el
        else if (item == listaDeVectores[i].cuadro.anguloEnCuadro) {
            // El angulo es la inicial del vector
            listaDeVectores[i].cuadro.anguloInicial.visible = true;
            listaDeVectores[i].cuadro.anguloInicial.x = listaDeVectores[i].cuadro.x + 90;
            listaDeVectores[i].cuadro.anguloInicial.y = listaDeVectores[i].cuadro.y + 50;
            listaDeVectores[i].cuadro.anguloEnCuadro = listaDeVectores[i].cuadro.anguloInicial;

            // Actualizar vector y jugador
            listaDeVectores[i].angulo = listaDeVectores[i].cuadro.anguloInicial;
            listaDeVectores[i].angle = ConvertirAngulo(listaDeVectores[i].angulo);
            if (ChequearOverlap(listaDeVectores[i],player)||(ChequearOverlap(player,listaDeVectores[i].cola))){
                angulo = listaDeVectores[i].angulo;
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
        VectorFit.play();
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

    var cuadro = game.add.sprite(x, y, 'cuadroVector');

    var cerrar = game.add.sprite(140, 0, 'BotonCerrar');
    cerrar.scale.setTo(0.5, 0.5);
    cerrar.inputEnabled = true;
    cerrar.events.onInputDown.add(function(cerrar){ocultarCuadroVector(vector, cuadro);}, this);
    cuadro.addChild(cerrar);

    //inicializacion de la magnitud del vector
    var magnitud = CrearNumeroParaVector(vector.magnitud, x + 30, y + 50, Math.floor(vector.magnitud/100));
    cuadro.magnitudEnCuadro = magnitud;
    cuadro.magnitudInicial = magnitud;

    // inicializacion del angulo del vector
    var angulo = CrearAnguloParaVector(vector.angulo, x + 90, y + 50, vector.angulo);
    cuadro.anguloEnCuadro = angulo;
    cuadro.anguloInicial = angulo;
    ocultarCuadroVector(vector, cuadro);

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
    cuadro.magnitudEnCuadro.visible = false;
    cuadro.anguloEnCuadro.visible = false;
}

/**
* Funcion que muestra el cuadro de un vector
*
* @param cuadro: el cuadro a ocultar
*
*/
function mostrarCuadroVector(vector, cuadro){
    cuadro.visible = true;
    cuadro.magnitudEnCuadro.visible = true;
    cuadro.anguloEnCuadro.visible = true;
}

/**
* Funcion que controla el update de un vector que esta siendo
* arrastrado
*
* @param vector: vector que esta siendo arrastrado
*
*/
function controlarCuadrosVectores(vector) {
    vector.cuadro.x = vector.x - 80;
    vector.cuadro.y = vector.y - 180;
    vector.cuadro.magnitudEnCuadro.x = vector.cuadro.x + 30;
    vector.cuadro.magnitudEnCuadro.y = vector.cuadro.y + 50;
    vector.cuadro.anguloEnCuadro.x = vector.cuadro.x + 90;
    vector.cuadro.anguloEnCuadro.y = vector.cuadro.y + 50;
}

function escalarVector(Vector, NuevoTamaño){
    var tamanoCalculado;
    var tamañoAnterior = Vector.width + Vector.cola.width;
    var tamañoNuevo;
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
