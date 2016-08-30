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
function CrearBasico(){
    ActivarFisica();
    CrearFondo();
    InicializarPlataformas();
    CrearPiso();
    CrearPlay();
    CrearBotonMenu();
    CrearTimer();
    CrearTimerPuerta();
    CrearSilenciarSonido();
}
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

    CrearPlataforma(400,400);

    CrearPlataforma(-150,200);
}

/**
* Funcion que crea dos plataformas flotantes.
*/

function CrearPlataforma(x,y,escalax,escalay) {

    var ledge = platforms.create(x, y, 'platform');
    ledge.body.immovable = true;
    ledge.scale.setTo(escalax, escalay);
    return ledge;
}

function MoverObjeto(plataforma,velocidadX,velocidadY) {

    var platX = plataforma.x;
    var platY = plataforma.y;
    plataforma.x = platX + velocidadX;
    plataforma.y = platY + velocidadY;
}
function RestaurarObstaculos(){
    if (listaDeEspinas.length != 0){
        for (i = 0; i < listaDeEspinas.length; i++){
            listaDeEspinas[i][0].x = listaDeEspinas[i][1];
            listaDeEspinas[i][0].y = listaDeEspinas[i][2];
        }
    }
    if (ListaDeCiclos.length != 0){
        for (i = 0; i < ListaDeCiclos.length; i++){
            ListaDeCiclos[i][1] = false;
            ListaDeCiclos[i][5] = 0;
        }
    }
}
function CicloMovimientoSimple(plataforma,regresando,velX,velY) {
    if (!regresando){
        MoverObjeto(plataforma,velX,velY)
    }
    else{
        MoverObjeto(plataforma,-(velX),-(velY))
    }
}

function CrearPared(x,y) {

    var pared = platforms.create(x, y, 'pared');
    pared.body.immovable = true;
    return pared
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
    salida.scale.setTo(1, 1.1);
    salida.animations.add('accionar',[1,2,3,4],10,false);
    salida.animations.add('cerrar',[3,2,1,0],10,false);

}


/**
* Funcion que crea el sprite del fondo.
*
*/
function CrearFondo(){
    game.add.sprite(0, 0, 'fondo');
}



function CrearEspinas(x,y){

    espinas = game.add.sprite(x,y,'Espinas');
    listaDeEspinas.push([espinas,x,y]);

}
function ActivarFisica(){
    //Se activa la fisica de tipo "Arcade Physics"
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

function InicializarPlataformas(){

    //Se crea un grupo, este grupo se utilizara luego para agregar propiedades
    //a las plataformas de un solo golpe
    platforms = game.add.group();
    //Hacemos que las plataformas esten incluidas en la fisica del juego
    platforms.enableBody = true;

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

function ResaltarDudas(){
    if (!clickedPista){
        ResaltadorPista = game.add.sprite(botonPistas.x+25, botonPistas.y+25, 'rectanguloPista');
        ResaltadorPista.anchor.setTo(0.5,0.5)
        dudas = true;
    }
}
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
function gameOver(texto){

    Explotar();
    if((postIt==null)||(gameOverText==null)){
        postIt = game.add.sprite(100,50,'pedazoHoja');
        postIt.inputEnabled = true;
        postIt.events.onInputDown.add(resetGame, this);
        if (texto == "Auch!"){
            gameOverText = AñadirTexto(365,280,texto,colorTexto,45);
        }
        else{
            gameOverText = AñadirTexto(340,280,texto,colorTexto,45);
        }
        reintentarText = AñadirTexto(345,340,"Haz click para\nreintentar",colorTexto,22);

    }
    else{

        postIt.reset(300,200);
        reintentarText.reset(340,340);
        if (texto == "Auch!"){
            gameOverText = AñadirTexto(365,280,texto,colorTexto,45);
        }
        else{
            gameOverText = AñadirTexto(340,280,texto,colorTexto,45);
        }
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
            reintentarText.kill();
            gameOverText.destroy();
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
    resetTimerSinTexto();
    stopTimerPuerta();
    resetTimerPuerta();
    //y soltamos el boton
    RestaurarObstaculos();
    PlayButton.frame = 0;
    clicked = false;
    impulsado = false;
    salidaAbierta = false;
    epilogoCorriendo = false;
    game.add.tween(player.body).to( { x: posInicXPlayer , y:posInicYPlayer}, 1, Phaser.Easing.Linear.None, true);
    if (!player.alive){
        player.reset(posInicXPlayer,posInicYPlayer);
    }
    else{
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }
    salida.frame = 0;
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
    listaDeVectores = [];
    listaDeNumeros = [];
    listaDeEspinas = [];
    listaDeAngulos = [];
    ListaDeDatos = [];
    ListaDeCiclos = []
    cuadroVictoria = [];
    inicio = [];
    cuadroPista = [];
    resaltadores = [];
    indice = 0;
    menuFinalNivelDesplegado = false;

    salidaAbierta = false;
    epilogoCorriendo = false;
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

    if((Objeto1.cola == null)) {
        var boundsA = Objeto1.getBounds();
        var boundsB = Objeto2.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
    else {
        var boundsA = Objeto1.getBounds();
        var boundsB = Objeto2.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB) == true){
            return true;
        }
        boundsA = Objeto1.cola.getBounds();
        if (Phaser.Rectangle.intersects(boundsA, boundsB) == true){
            return true;
        }
        return false;
    }
}
