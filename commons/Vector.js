/**
* Funcion que crea un vector con las caracteristicas
* especificadas.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param magnitud: valor de la magnitud
* @param angulo: valor del angulo
* @param mostrarCuadro: booleano para controlar si se muestra el cuadro o no
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
    vector.posXInit = x;
    vector.posYInit = y;
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

    // Cuadro del vector
    vector.cuadro = CrearCuadroVector(x, y - 120, vector);
    vector.events.onDragUpdate.add(controlarCuadrosVectores);
    // Ocultar cuadro del vector cuando no se necesite
    if (mostrarCuadro){
        mostrarCuadroVector(vector, vector.cuadro);
        vector.events.onInputDown.add(function(vector){mostrarCuadroVector(vector, vector.cuadro);}, this);
    }

    var bounds = new Phaser.Rectangle(65, 0, 715, 535);
    vector.input.boundsRect = bounds;
    game.world.bringToTop(vector);

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
    numeroMag = AñadirTexto(x,y,numeroMostrado, colorTexto, 48);
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
    numeroMag.fill = colorMagnitud;
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
            // Centrar en el cuadro izquierdo al numero movido
            centrarValorCuadro(listaDeVectores[i].cuadro, item, "magnitud");
            // La magnitud del vector se convierte en la magnitud del numero
            listaDeVectores[i].magnitud = item.numero;
            // Se hace un sonido
            VectorFit.play();
            // Se cambia el tamaño del vector
            escalarVector(listaDeVectores[i], item.numero);
            RevisarContactoJugadorVector(i);
            if (item != listaDeVectores[i].cuadro.magnitudEnCuadro) {
            // Si la magnitud que colisiono es diferente a la que estaba en cuadro
            // devolver la magnitud que estaba en el cuadro a su posicion inicial

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
            centrarValorCuadro(listaDeVectores[i].cuadro, listaDeVectores[i].cuadro.magnitudInicial, "magnitud");
            listaDeVectores[i].cuadro.magnitudEnCuadro = listaDeVectores[i].cuadro.magnitudInicial;

            // Actualizar vector y jugador
            listaDeVectores[i].magnitud = listaDeVectores[i].cuadro.magnitudInicial.numero;
            escalarVector(listaDeVectores[i], listaDeVectores[i].magnitud);
            RevisarContactoJugadorVector(i);
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
    numeroAngulo = AñadirTexto(x,y,numeroMostrado, colorTexto, 48);
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
    numeroAngulo.fill = colorAngulo;
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

            centrarValorCuadro(listaDeVectores[i].cuadro, item, "angulo");

            // Actualizar vector y jugador
            listaDeVectores[i].angulo = item.numero;
            VectorFit.play();
            listaDeVectores[i].angle = ConvertirAngulo(item.numero);
            RevisarContactoJugadorVector(i);

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
            centrarValorCuadro(listaDeVectores[i].cuadro, listaDeVectores[i].cuadro.anguloInicial, "angulo");
            listaDeVectores[i].cuadro.anguloEnCuadro = listaDeVectores[i].cuadro.anguloInicial;

            // Actualizar vector y jugador
            listaDeVectores[i].angulo = listaDeVectores[i].cuadro.anguloInicial;
            listaDeVectores[i].angle = ConvertirAngulo(listaDeVectores[i].angulo);
            RevisarContactoJugadorVector(i);
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
        if (player.vectorEnPlayer !== undefined && player.vectorEnPlayer !== item){
            player.vectorEnPlayer.x = player.vectorEnPlayer.posXInit;
            player.vectorEnPlayer.y = player.vectorEnPlayer.posYInit;
            player.vectorEnPlayer.tint = 0xFFFFFF;
            player.vectorEnPlayer.cola.tint = 0xFFFFFF;
        }
        player.vectorEnPlayer = item; // el vector
        item.tint = 0xFF0050;
        item.cola.tint = 0xFF0050;
        // item.tint = 0xff80aa;
        // item.cola.tint = 0xff80aa;
        // item.tint = 0x66ff66;
        // item.cola.tint = 0x66ff66;
    }
    // el vector arrastrado era el que estaba encima del jugador y se quita del jugador
    else if (player.vectorEnPlayer == item) {
        magnitudJugador = 0;
        angulo = 0;
        player.vectorEnPlayer.tint = 0xFFFFFF;
        player.vectorEnPlayer.cola.tint = 0xFFFFFF;
        player.vectorEnPlayer = undefined;
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
    cuadro.anchor.setTo(0.5, 0.5);

    var cerrar = game.add.sprite(55, -60, 'BotonCerrar');
    cerrar.frame = 0;
    cerrar.i = 0;
    cerrar.scale.setTo(0.45, 0.45);
    cerrar.inputEnabled = true;
    cerrar.events.onInputOver.add(overButton, this);
    cerrar.events.onInputOut.add(outButton, this);
    cerrar.events.onInputDown.add(function(cerrar){ocultarCuadroVector(vector, cuadro);}, this);
    cuadro.addChild(cerrar);

    //inicializacion de la magnitud del vector
    var magnitud = CrearNumeroParaVector(vector.magnitud, 0, 0, Math.floor(vector.magnitud/100));
    centrarValorCuadro(cuadro, magnitud, "magnitud");
    cuadro.magnitudEnCuadro = magnitud;
    cuadro.magnitudInicial = magnitud;

    // inicializacion del angulo del vector
    var angulo = CrearAnguloParaVector(vector.angulo, 90, 50, vector.angulo);
    centrarValorCuadro(cuadro, angulo, "angulo");
    cuadro.anguloEnCuadro = angulo;
    cuadro.anguloInicial = angulo;
    ocultarCuadroVector(vector, cuadro);

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

    var rango = 160;
    var movimiento = 20;
    var distanciaX = vector.x - vector.cuadro.x;
    var distanciaY = vector.y - vector.cuadro.y;

    // El cuadro viene de la derecha
    if (distanciaX <= -rango) {
        vector.cuadro.x = vector.cuadro.x - movimiento;
    }
    else if (distanciaX >= rango) {
        vector.cuadro.x = vector.cuadro.x + movimiento;
    }

    // El cuadro viene de arriba
    if (distanciaY >= rango) {
        vector.cuadro.y = vector.cuadro.y + movimiento;
    }
    else if (distanciaY <= -rango) {
        vector.cuadro.y = vector.cuadro.y - movimiento;
    }

    // vector.cuadro.x = vector.x;
    // vector.cuadro.y = vector.y - 120;
    // No pasar el borde de la izquierda  del cuaderno
    if (vector.cuadro.x < 135) {
        vector.cuadro.x = 135;
    }

    // No pasar el borde de la derecha del cuaderno
    if (vector.cuadro.x > 600) {
        vector.cuadro.x = 600;
    }

    // No pasar el borde de arriba del cuaderno
    if (vector.cuadro.y < 70) {
        vector.cuadro.y = 70;
    }

    // No pasar el borde de abajo del cuaderno
    if (vector.cuadro.y > 500) {
        vector.cuadro.y = 500;
    }
    centrarValorCuadro(vector.cuadro, vector.cuadro.magnitudEnCuadro, "magnitud");
    centrarValorCuadro(vector.cuadro, vector.cuadro.anguloEnCuadro, "angulo");
}

function escalarVector(Vector, NuevoTamaño){
    var tamanoCalculado;
    var tamañoAnterior = Vector.width + Vector.cola.width;
    var tamañoNuevo;
    tamanoCalculado = 1 + ((NuevoTamaño/100)-1);
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

/**
* Funcion que centra en el cuadro un valor segun su tipo de dato
*
* @param cuadro: cuadro en el que se centrara
* @param valor: numero que sera centrado
* @param tipoDeDato: tipo de dato a ser centrado
*
*/
function centrarValorCuadro(cuadro, valor, tipoDeDato){

    switch (tipoDeDato) {
        case "magnitud":
                if (valor.text < 10){
                    valor.x = cuadro.x - 50;
                }
                else if (valor.text >= 10 && valor.text < 100){
                    valor.x = cuadro.x + 55;
                }
            break;
        case "angulo":
                if (valor.text < 10){
                    valor.x = cuadro.x + 20;
                }
                else if (valor.text >= 10 && valor.text < 100){
                    valor.x = cuadro.x + 10;
                }
                else {
                    valor.x = cuadro.x;
                }
            break;

    }
    valor.y = cuadro.y - 20;
}
/**
* Funcion regresa los vectores a su posicion inicial exceptuando
* el que esta sobre el jugador
*
*/
function regresarVectoresInicio(){
    for (i = 0; i < listaDeVectores.length; i++){
        if (player.vectorEnPlayer !== listaDeVectores[i]) {
            listaDeVectores[i].x = listaDeVectores[i].posXInit;
            listaDeVectores[i].y = listaDeVectores[i].posYInit;
        }
    }
}
function ble(){
    for (i = 0; i < listaDeVectores.length; i++){
        RevisarContactoJugadorVector(i);
    }
}
function RevisarContactoJugadorVector(i){
    if (ChequearOverlap(listaDeVectores[i],player)){
        //Si un vector toca a un jugador entonces
        //la magnitud del jugador se convierte en la del vector
        magnitudJugador = listaDeVectores[i].magnitud;
        angulo = listaDeVectores[i].angulo;
        vectorEnContacto = true;
    }
}
