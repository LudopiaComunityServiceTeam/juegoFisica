colorTexto = "#1a1a1a";
colorTiempo = "#ff1a1a";
colorDesplazamiento = "#ff8c1a";
colorVelocidad = "#ffff1a";
colorAceleracion = "#005ce6";
colorMagnitud = "#1e3bec";
colorAngulo = "#9900cc";

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

function CrearSalida(x,y) {

    salida = game.add.sprite(x,y,'salida');

}
function CrearFondo(){
    game.add.sprite(0, 0, 'fondo');
}

function CrearBotonDeNivel(x,y,nivel){

   button = game.add.sprite(x, y, 'PlayButton');
   button.i = nivel;
   button.inputEnabled = true;
   button.events.onInputDown.add(SeleccionarNivel, this);

}

function cierraSalida(seg){
    // cierra la puerta de la salida despues de seg segundos
    timer.loop(Phaser.Timer.SECOND * seg, gameOver, this);
}

function AñadirTexto(x,y,texto,color,tamanno){
    var text = game.add.text(x, y, texto);
    text.fill = color;
    text.font = 'Indie Flower';
    text.fontSize = tamanno;
    text.align = 'center';
    return text

}

function gameOver(){
    postIt = game.add.sprite(210, 200, 'post-it-verde');
    postIt.inputEnabled = true;
    postIt.events.onInputDown.add(gameOverDestroy, this);
    var perder = "Perdiste!\nHaz click para\nreintentar";
    gameOverText = AñadirTexto(230,230,perder,colorTexto,32);
    resetGame();
}

function gameOverDestroy(){
    postIt.destroy();
    gameOverText.destroy();
}

function resetGame(){
    //Detenemos el timer
    timer.stop(false);
    resetTimer();
    //y soltamos el boton
    PlayButton.frame = 0;
    clicked = false;
    impulsado = false;
    game.add.tween(player.body).to( { x: posInicXPlayer , y:posInicYPlayer}, 1, Phaser.Easing.Linear.None, true);
    if (!player.alive){
        player.reset(posInicXPlayer,posInicYPlayer);
    }
    if (explosion){
        cabeza.destroy();
        explosion = false;
    }
}


function SeleccionarNivel(item){
    //Determina que pasa cuando se hace click en el boton de play
    game.state.start(niveles[item.i]);
    nivelActual = item.i;
    resetVariables();
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

function ChequearOverlap(Objeto1,Objeto2){
    var boundsA = Objeto1.getBounds();
    var boundsB = Objeto2.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
