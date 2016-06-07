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
