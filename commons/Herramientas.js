colorTexto = "#1a1a1a";
colorTiempo = "#ff1a1a";
colorDesplazamiento = "#ff8c1a";
colorVelocidad = "#ffff1a";
colorAceleracion = "#005ce6";
colorMagnitud = "#1e3bec";
colorAngulo = "#9900cc";

/**
* Funcion que crea todo el piso del juego.
*/
function CrearPiso() {

    var piso = platforms.create(0, game.world.height - 64, 'piso');

    // Si fuera necesario cambiar el tamaño de la imagen original, se puede hacer
    // con esta funcion.
    piso.scale.setTo(1, 1);

    // Para que el piso no sea afectado por la gravedad le agregamos
    // esta propiedad
    piso.body.immovable = true;
}

/**
* Funcion que crea dos plataformas flotantes.
*/

function CrearPlataformas() {

    var ledge = platforms.create(400, 400, 'platform');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'platform');
    ledge.body.immovable = true;
}

/**
* Funcion que crea el sprite de la salida en la posicion
* indicada.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
*
*/

function CrearSalida(x,y) {

    salida = game.add.sprite(x,y,'salida');

}


/**
* Funcion que crea el sprite del fondo.
*
*/
function CrearFondo(){
    game.add.sprite(0, 0, 'fondo');
}

/**
* Funcion que crea el sprite del boton para inicial
* el nivel.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param nivel: nivel al que pertenece el boton
*
*/
function CrearBotonDeNivel(x,y,nivel){

   button = game.add.sprite(x, y, 'PlayButton');
   button.i = nivel;
   button.inputEnabled = true;
   button.events.onInputDown.add(SeleccionarNivel, this);

}


/**
* Funcion que cierra la puerta de la salida despues de seg
* segundos.
*
* @param seg: segundos para cerrar la puerta
*
*/
function cierraSalida(seg){
    actualizarTimer();
    if (tiempo == (seg + 1)){
        stopTimer();
        resetTimer();
        gameOver();
    }
}

/**
* Funcion que agrega un texto en el juego.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje x
* @param texto: texto a escribir en pantalla
* @param color: color del texto
* @param tamanno: tamaño de la fuente del texto
*
* @return text: el texto con las características de los
* argumentos.
*
*/
function AñadirTexto(x,y,texto,color,tamanno){
    var text = game.add.text(x, y, texto);
    text.fill = color;
    text.font = 'Indie Flower';
    text.fontSize = tamanno;
    text.align = 'center';
    return text;

}

/**
* Funcion que muestra el sprite de finalizar el juego
* y reproduce el sonido correspondiente.
*
*/
function gameOver(){

    Explotar();
    if((postIt==null)||(gameOverText==null)){
        postIt = game.add.sprite(300, 200, 'post-it-verde');
        postIt.inputEnabled = true;
        postIt.events.onInputDown.add(resetGame, this);
        var perder = "Perdiste!\nHaz click para\nreintentar";
        gameOverText = AñadirTexto(320,230,perder,colorTexto,32);

    }
    else{
        postIt.reset(300,200);
        gameOverText.reset(320,230);
    }
}

/**
* Funcion que quita el fin de juego de la pantalla
*
*/
function gameOverDestroy(){
    if (!(postIt==null)&&!(gameOverText==null)){
        if((postIt.alive)||(gameOverText.alive)){
            postIt.kill();
            gameOverText.kill();
        }
    }
}

/**
* Funcion que reinicia el juego.
*
*/
function resetGame(){
    Reset.play();
    //Detenemos el timer
    stopTimer();
    resetTimer();
    //y soltamos el boton
    PlayButton.frame = 0;
    clicked = false;
    impulsado = false;
    game.add.tween(player.body).to( { x: posInicXPlayer , y:posInicYPlayer}, 1, Phaser.Easing.Linear.None, true);
    if (!player.alive){
        player.reset(posInicXPlayer,posInicYPlayer);
    }
    gameOverDestroy();
    if (explosion){
        cabeza.destroy();
        cuerpo.destroy();
        brazoI.destroy();
        brazoD.destroy();
        piernaI.destroy();
        piernaD.destroy();
        explosion = false;
    }
}

/**
* Funcion que inicia el nivel escogido.
*
* @param item: nivel seleccionado
*
*/

function SeleccionarNivel(item){
    //Determina que pasa cuando se hace click en el boton de play
    game.state.start(niveles[item.i]);
    nivelActual = item.i;
    resetVariables();
}

/**
* Funcion reinicia todas la variables involucradas
* en el juego.
*
*/
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
    postIt = null;
    gameOverText = null;
    listaDeCuadros = [];
    listaDeNumeros = [];
    listaDeEspinas = [];
    listaDeAngulos = [];
    ListaDeDatos = [];
}

/**
* Funcion que determina si dos objetos colisionaron
*
* @param Objeto1: objeto con el que se chequeara la colision
* @param Objeto2: objeto con el que se chequeara la colision
* del objeto 1.
*
*/
function ChequearOverlap(Objeto1,Objeto2){
    var boundsA = Objeto1.getBounds();
    var boundsB = Objeto2.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

/**
* Funcion que hace titilar un nuevo objeto
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param scaleX: escala del objeto en coordenada x
* @param scaleY: escala del objeto en coordenada y
* @param sprite: clave del sprite
*
*/
function resaltarSprite(x, y, scaleX, scaleY, sprite) {
    objetoTitila = game.add.sprite(x, y, sprite);
    objetoTitila.anchor.setTo(0.5, 0.5);
    objetoTitila.scale.setTo(scaleX,scaleY);
    objetoTitila.alpha = 0.8;
    objetoTitila.frame = 4;
    evento = game.time.events.loop(1000, titilar, this, objetoTitila);
    return objetoTitila;
}

/**
* Funcion que hace titilar un objeto
*
* @param objeto: objeto a hacer titilar
*
*/
function titilar(objeto) {
    if (objeto.visible) {
        objeto.visible = false;
    }
    else {
        objeto.visible = true;
    }
}

/**
* Funcion que detiene el titilar de un objeto
*
* @param objeto: objeto que dispara el evento de dejar titilar
*
*/
function pararTitilar(objeto) {
    game.time.events.remove(this.evento);
    this.objeto2.destroy();
}
