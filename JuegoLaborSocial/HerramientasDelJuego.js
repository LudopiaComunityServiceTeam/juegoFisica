function ControlJugador(){
    //Le da al muñequito de palitos un movimiento clasico de plataformero 2D
    //puede saltar, correr a la izq, der y viene con las animaciones.

    if ((clicked)&&(direccion == -1))
    {
        //Moverse a la izquierda
        //los cosenos deberian calcularse solo una vez
        if (!impulsado){
            //console.log('Subir'); 
            player.body.velocity.x = -magnitud*Math.cos(angulo);
            player.body.velocity.y = -magnitud*Math.sin(angulo);
            impulsado = true;
        }
        player.animations.play('left');
        if ((salida.x-10 < player.x)&&(player.x < salida.x+10)){
            game.state.start('Main_game');
        }
    }
    else if ((clicked)&&(direccion == 1))
    {
        //Moverse a la derecha
        //console.log(Math.sin(angulo));
        if (!impulsado){
            //console.log('Subir'); 
            //console.log(magnitud);
            player.body.velocity.x = magnitud*Math.cos(angulo);
            player.body.velocity.y = -magnitud*Math.sin(angulo);
            impulsado = true;
        }
        player.animations.play('right');
        if ((salida.x-10 < player.x)&&(player.x < salida.x+10)){
            game.state.start('Main_game');
        }

    }
    else
    {
        //Quedarse parado
        player.body.velocity.x = 0;
        player.animations.stop();
        player.frame = 4;
    }
    
    //Permite al jugador saltar si esta tocando piso.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
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
        console.log('apretado');
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
        game.add.tween(player.body).to( { x: 35 , y:game.world.height - 110}, 1, Phaser.Easing.Linear.None, true);
        //player.y = game.world.height - 150;
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
    numeroMag = game.add.sprite(x, y, 'numeros');

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

    if (((item.x < 620)&&(item.x > 550))&&((item.y < 210)&&(item.y > 130))) {
        item.x = 580;
        item.y = 170;
        magnitud = item.numero;
    }
}

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
function CrearVector(x,y,potencia) {
    //Creamos el vector
    var vector = game.add.sprite(x, y, 'vector');
    vector.potencia = potencia;
    vector.cargado = false
    if (potencia != 0){
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
    //console.log(potencia);

}
function CrearJugador() {
    //Aqui creamos al jugador, representado en esta version por el
    //muñequito de palitos

    player = game.add.sprite(35, game.world.height - 110, 'dude');
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

    //En una variable metemos los posibles inputs con el teclado
    //para hacerles referencia luego cuando queramos.
    cursors = game.input.keyboard.createCursorKeys();

}

function pegarVector(item) {
    //Chequea si el vector esta fuera de un rango y si no es asi,
    //lo lleva a dicho rango
 
    if ((item.x < 150)&&(item.x > 0)&&(item.y < 600)&&(item.y > 400)) {
        item.x = 50;
        item.y = 500;
        magnitud = item.potencia
        //console.log(magnitud);
    }

}



