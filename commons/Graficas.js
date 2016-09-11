/*Documento para manejar los elementos graficos*/


/**
* Funcion que crea el sprite de una mano para el tutorial
* del nivel 1.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
*
*/
function CrearMano(x,y){

    mano = game.add.sprite(x,y, 'mano');

}


/**
* Funcion que resalta las dudas
*/
function ResaltarDudas(){
    if (!clickedPista){
        ResaltadorPista = game.add.sprite(botonPistas.x+25, botonPistas.y+25, 'rectanguloPista');
        ResaltadorPista.anchor.setTo(0.5,0.5)
        dudas = true;
    }
}


/**
* Funcion que inicia la animacion del tutorial para un nivel.
*/
function tutorial(){
    resaltarVectores();
}

// Esta funcion busca a los vectores y les asigna un resaltador a cada uno, tambien
// les asigna un evento que les borra el resaltador cuando le hacen click

function resaltarVectores() {
    ResaltadoresParaVectores = [];
    for (var i = 0; i <  listaDeVectores.length; i++) {
        CrearResaltador(listaDeVectores[i].x,listaDeVectores[i].y, 1.6, 0.8, 'rectangulo');
        listaDeVectores[i].events.onInputDown.add(quitarResaltadorDeVectores, this);
    }
}

// funcion auxiliar del tutorial que remueve el resaltador y llama a la funcion que se lo pone al jugador
function quitarResaltadorDeVectores(objeto) {
    pararTitilar();
    resaltarJugador();
}

/**
* Funcion que detiene el titilar de un objeto
*
* @param objeto: objeto que dispara el evento de dejar titilar
*

*/
function pararTitilar() {
    for (var i = 0; i < resaltadores.length; i++){
        resaltadores[i].destroy();
    }
    resaltadores = [];
}

// Esta funcion le pone resaltador al jugador
function resaltarJugador() {
    overlap = false;
    titilarPlayer = CrearResaltador(posInicXPlayer+15, posInicYPlayer+23, 1.2, 1.2, 'rectangulo');
}

/**
* Funcion que crea un resaltador que titila en cierta posición y de cierto tamaño
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param scaleX: escala del objeto en coordenada x
* @param scaleY: escala del objeto en coordenada y
* @param sprite: clave del sprite
*
*/
function CrearResaltador(x, y, scaleX, scaleY, sprite) {
    var resaltador = game.add.sprite(x, y, sprite);
    resaltador.anchor.setTo(0.5, 0.5);
    resaltador.scale.setTo(scaleX,scaleY);
    resaltador.alpha = 0.8;
    resaltador.frame = 4;
    resaltador.escalax = scaleX;
    resaltador.escalay = scaleY;
    resaltadores.push(resaltador);
    return resaltador;
}

/*

* Si un vector esta encima del jugador, entonces se resalta al boton play
*/
function resaltarPlay(){
    //poner esta funcion en el update del nivel.
    if (!clicked){
        var overlapAlgunVector;
        for (var i = 0; i < listaDeVectores.length; i++) {
            if (ChequearOverlap(player,listaDeVectores[i])||ChequearOverlap(player,listaDeVectores[i].cola)){
                overlapAlgunVector = true;
            }
        }
        if (overlapAlgunVector){

            if (!overlap) {
                overlap = true;
                pararTitilar();
                titilarplay = CrearResaltador(400, 570, 1.1, 0.8, 'rectangulo');
                PlayButton.events.onInputDown.add(pararTitilar, this);
            }
        }
        else{
            if (overlap) {
                pararTitilar();
                resaltarJugador();
                overlap = false;
            }
        }
    }
}

/**
* Funcion que crea una nube de pensamiento
*
*/
function CrearNube(x,y,xo,yo){
    nube = game.add.sprite(x,y,'nube');
    if ((xo != null)&&(yo != null)){
        origen = game.add.sprite(xo,yo,'nubeOrigen');
    }
    else{
        origen = game.add.sprite(x+5,y-4,'nubeOrigen');
    }
    xnube = x;
    ynube = y;
    xorigen = xo;
    yorigen = yo;
    nubeCreada = true;

}


