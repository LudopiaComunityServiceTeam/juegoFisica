function ControlJugador(){
    //Le da al muñequito de palitos un movimiento clasico de plataformero 2D
    //puede saltar, correr a la izq, der y viene con las animaciones.

    if ((clicked)&&(direccion == 1))
    {
        //Moverse a la derecha
        if (!impulsado){
            player.body.velocity.x = magnitudJugador*Math.cos(angulo*Math.PI / 180);
            player.body.velocity.y = -magnitudJugador*Math.sin(angulo*Math.PI / 180);
            impulsado = true;
        }
        if ((angulo<=90)||(angulo>270)){
            player.animations.play('right');
        }
        else{
            player.animations.play('left');
        }
//Detectar si el personaje toca la salida
        if (ChequearOverlap(player,salida)){

             game.state.start(niveles[nivelActual+1]);
             nivelActual = nivelActual + 1;
             resetVariables();
        }
//Detectar si el personaje toca una espina
        for (i = 0; i < listaDeEspinas.length; i++){
            if (ChequearOverlap(player,listaDeEspinas[i])) {
                player.body.velocity.x = 0;
                player.animations.stop();
                player.frame = 4;
                if (!explosion){
                    player.kill();
                    cabeza = game.add.sprite(player.x, player.y, 'cabeza');
                    game.physics.arcade.enable(cabeza);
                    cabeza.body.bounce.y = 0.2;
                    cabeza.body.gravity.y = 300;
                    cabeza.body.collideWorldBounds = true;
                    cabeza.body.velocity.y = -500;
                    explosion = true;
                }
            //matar
            }
        }

    }
    else
    {
        //Quedarse parado
        player.body.velocity.x = 0;
        player.animations.stop();
        player.frame = 4;
    }
}
function CrearPiso() {
    // Aqui creamos el piso.

    var piso = platforms.create(0, game.world.height - 64, 'piso');

    // Si fuera necesario cambiar el tamaño de la imagen original, se puede hacer
    // con esta funcion.
    piso.scale.setTo(1, 1);

    // Para que el piso no sea afectado por la gravedad le agregamos
    // esta propiedad
    piso.body.immovable = true;
}
function CrearPlataformas() {
    //  Creamos dos plataformas flotantes

    var ledge = platforms.create(400, 400, 'platform');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'platform');
    ledge.body.immovable = true;
}
function CrearTimer() {
    //  Creamos un timer

    timer = game.add.sprite(750,0, 'numeros');

    //  Le damos una animacion al timer
    timer.animations.add('contar', [0, 1, 2, 3, 4, 5, 6, 7, 8], 1, true);
}
function CrearPlay() {
    //  Crear el boton de play

    PlayButton = game.add.button(400, 550, 'PlayButton', clickPlay, this);
    PlayButton.frame = 0;
    PlayButton.onInputOver.add(overPlayButton, this);
    PlayButton.onInputOut.add(outPlayButton, this);
    //PlayButton.onInputUp.add(up, this);
}
function clickPlay(){
    //Determina que pasa cuando se hace click en el boton de play

    if (!clicked){
        //Iniciamos el timer
        //y apretamos el boton
        timer.animations.play('contar');
        PlayButton.frame = 3;
        clicked = true;
    }
    else{
        //Detenemos el timer
        //y desapretamos el boton
        timer.animations.stop();
        timer.frame = 0;
        PlayButton.frame = 0;
        clicked = false;
        impulsado = false;
        game.add.tween(player.body).to( { x: posInicXPlayer , y:posInicYPlayer}, 1, Phaser.Easing.Linear.None, true);
        if (!player.alive){
            player.reset(posInicXPlayer,posInicYPlayer)
        }
        if (explosion){
            cabeza.destroy();
            explosion = false;
        }
    }

}
function overPlayButton(){
    if (!clicked){
        PlayButton.frame = 1;
    }
    else{
        PlayButton.frame = 2;
    }

}
function outPlayButton(){
    if (!clicked){
        PlayButton.frame = 0;
    }
    else{
        PlayButton.frame = 3;
    }

}
function CrearNumeroParaVector(numero,x,y,numeroMostrado) {
    //Creamos un numero de prueba para poder probar
    //nuestra funcion de click and drag

    var numeroMag;
    //creamos un objeto con forma de número
    // numeroMag = game.add.sprite(x, y, 'numeros');
    var style = { font: "48px Gloria Hallelujah",  fill: "#1a1a1a", align: "center" };

    numeroMag = game.add.text(x, y, numeroMostrado, style);
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

function checkMagnitudInVector(item) {
    // Revisa si el objeto esta en el rango de la caja de magnitud del vector
    // Si es asi, ajusta el objeto para que quede justo en el centro de la caja
    // Y cambia el valor de magnitud al valor que cargaba el objeto.
    magnitudEnCuadro = false;
//Se revisan todos los cuadros para ver si el objeto cayó en alguno
    for (i = 0; i < listaDeCuadros.length; i++) {
        magnitudEnCuadro = false;
//Si se arrastra el objeto tipo velocidad a un cuadro, la velocidad del vector
//debe cambiar, y si el vector ya estaba encima del jugador la velocidad del
//jugador tambien debe cambiar
        if (ChequearOverlap(item,listaDeCuadros[i])) {
            magnitudEnCuadro = true;
            item.x = (listaDeCuadros[i].x+20);
            item.y = (listaDeCuadros[i].y+70);
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
function CrearAnguloParaVector(numero,x,y,numeroMostrado) {
    //Creamos un numero de prueba para poder probar
    //nuestra funcion de click and drag

    var numeroAngulo;
    //creamos un objeto con forma de número
    var style = { font: "48px Gloria Hallelujah",  fill: "#1a1a1a", align: "center" };

    numeroAngulo = game.add.text(x, y, numeroMostrado, style);


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
function checkAnguloInVector(item) {
    // Revisa si el objeto esta en el rango de la caja de angulo del vector
    // Si es asi, ajusta el objeto para que quede justo en el centro de la caja
    // Y cambia el valor de angulo al valor que cargaba el objeto.
    anguloEnCuadro = false;
//Se revisan todos los cuadros para ver si el objeto cayó en alguno
    for (i = 0; i < listaDeCuadros.length; i++) {
        anguloEnCuadro = false;
//Si se arrastra el objeto tipo angulo a un cuadro, el angulo del vector
//debe cambiar, y si el vector ya estaba encima del jugador el angulo del
//jugador tambien debe cambiar
        if (ChequearOverlap(item,listaDeCuadros[i])) {
            anguloEnCuadro = true;
            item.x = (listaDeCuadros[i].x+100);
            item.y = (listaDeCuadros[i].y+70);
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

/*
function CrearSimboloParaVector() {
    //Creamos un simbolo para representar la direccion del vector
    //Creamos un boton con forma de "+"
    simboloVector = game.add.button(662, 190, 'simbolos', clickSimboloVector, this);
    simboloVector.frame = 0;
}
function clickSimboloVector(){
   if (simboloVector.frame == 0){
       simboloVector.frame = 1;
       direccion = -1;
   }
   else{
       simboloVector.frame = 0;
       direccion = 1;
   }
}
*/
function CrearVector(x,y,magnitud,angulo) {
    //Creamos el vector
    var vector = game.add.sprite(x, y, 'vector');
    vector.magnitud = magnitud;
    vector.angulo = angulo;
    vector.cargado = false
    vector.anchor.setTo(0.5, 0.5);
    vector.angle = ConvertirAngulo(angulo);
    if (magnitud != 0){
        vector.cargado = true
    }
    //Permitimos que se le pueda poner input al objeto
    vector.inputEnabled = true;

    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    vector.input.enableDrag(true);

    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion pegarVector
    vector.events.onDragStop.add(pegarVector);

    return vector;

}
function ConvertirAngulo(angulo){
    if ((angulo < 180)&&(angulo => 0)){
        return (-angulo);
    }
    else if ((angulo <= 359)&&(angulo >= 180)){
        return (360 - angulo);
    }
}
function CrearJugador(x,y) {
    //Aqui creamos al jugador, representado en esta version por el
    //muñequito de palitos

    player = game.add.sprite(x,y, 'dude');
    //Permitimos que el muñeco sea afectado por la gravedad
    game.physics.arcade.enable(player);

    //Esto permite que el jugador rebote (vino con el ejemplo,
    //no lo he quitado porque quiza sea util)
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //Le creamos 2 animaciones
    //Las animaciones se crean con un nombre, la seleccion en orden
    //de los sprites que queremos mostrar, la velocidad a la que los
    //queremos mostrar y un booleano (que no se que hace)
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

}

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
function resetVariables(){
    //resetea las variables del nivel para que al iniciar el nuevo
    //nivel no se traigan variables del nivel anterior
    clicked = false;
    magnitudJugador = 0;
    direccion = 1;
    angulo = 0;
    impulsado = false;
    tieneDistancia = false;
    tieneTiempo = false;
    listaDeCuadros = [];
    listaDeNumeros = [];
    listaDeEspinas = [];
    listaDeAngulos = [];
    ListaDeDatos = [];
}
function CrearCuadroVector(x,y,vector){
    cuadro = game.add.sprite(x, y, 'cuadroVector');
    cuadro.vector = vector;
    return cuadro;
}
function ChequearOverlap(Objeto1,Objeto2){
    var boundsA = Objeto1.getBounds();
    var boundsB = Objeto2.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
/*


//Segmento para ecuaciones//


*/
function CrearEcuacionVelocidad(){
    EcuacionVelocidad = game.add.sprite(100, 100, 'EcuacionVelocidadCamuflada');
    return EcuacionVelocidad
}
function CrearDato(valor,x,y,numeroMostrado,tipoDeDato) {
    //Requiere una lista de Datos llamada "ListaDeDatos"
    //Creamos un numero que se usara para llenar la ecuacion
    var dato;
    //Creamos un objeto con forma de número
    var style = { font: "48px Gloria Hallelujah",  fill: "#1a1a1a", align: "center" };

    dato = game.add.text(x, y, numeroMostrado, style);
    //le ponemos el tipo al dato
    dato.tipo = tipoDeDato;
    //Permitimos que se le pueda poner input al objeto
    dato.inputEnabled = true;
    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    dato.input.enableDrag(true);
    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    dato.events.onDragStop.add(CheckEncimaEcuacion);

    //Elegimos el numero que queremos que sea el objeto que creamos
    //Esto cambia la imagen que tenemos del spritesheet
    //el frame 0 seria 1, el 2 seria 3, el 3 seria el cuatro y asi.
    dato.frame = numeroMostrado-1;

    dato.valor = valor;
    ListaDeDatos.push(dato);
}
function CheckEncimaEcuacion(item){
    if (item.tipo == "distancia"){
        CheckDistanciaOnVelocidad(item);
    }
    else if (item.tipo == "tiempo"){
        CheckTiempoOnVelocidad(item);
    }
}
function CheckDistanciaOnVelocidad(item){
//Requiere booleanos "tieneDistancia" y "tieneTiempo"

    if (ChequearOverlap(item,EcuacionVelocidad)){
        tieneDistancia = true;
        EcuacionVelocidad.distancia = item.valor;
        item.x = EcuacionVelocidad.x;
        item.y = EcuacionVelocidad.y;
    }
    if (tieneTiempo){
        CrearVelocidad();
    }
}
function CheckTiempoOnVelocidad(item){
//Requiere booleanos "tieneVelocidad" y "tieneTiempo"

    if (ChequearOverlap(item,EcuacionVelocidad)){
        tieneTiempo = true;
        EcuacionVelocidad.tiempo = item.valor;
        item.x = EcuacionVelocidad.x;
        item.y = (EcuacionVelocidad.y+50);

    }
    if (tieneDistancia){
        CrearVelocidad();
    }
}
function CrearVelocidad(){
    resultado = (EcuacionVelocidad.distancia/EcuacionVelocidad.tiempo);
    CrearNumeroParaVector((resultado*100),(EcuacionVelocidad.x+80),EcuacionVelocidad.y+25,resultado)
}
