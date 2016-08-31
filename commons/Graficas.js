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
* Funcion que anima la mano, la mueve desde el inicio
* hasta el objetivo
*
* @param inicio: objeto de donde parte la animacion
* @param objetivo: objeto a donde llega la animacion
* @param offsets: lista con los offsets del inicio y el objetivo.
*
*/
function AnimarMano(inicio,objetivo,offsets){
    //Nota: esta funcion debe ir entre un if que asegure que los
    //objetos que seran verificados por colision estan definidos

    //indice sirve para cuando quieres que la mano salga de varios lugares en un ciclo

    if (!ChequearOverlap(inicio[indice],objetivo)&&(!clicked)){
        if (!mano.alive){
            mano.reset(inicio[indice].x + offsets[0], inicio[indice].y + offsets[1]);
        }
        var distanciaObjX = objetivo.x + offsets[2];
        var distanciaObjY = objetivo.y + offsets[3];

        var distanciaX = Math.abs(mano.x - distanciaObjX);
        var distanciaY = Math.abs(mano.y - distanciaObjY);

        var proporcion;
        var velocidad = 3.5;

        var movEnX;
        var movEnY;
        var suma;

        if (Math.abs(distanciaX) < Math.abs(distanciaY))
        {

            proporcion = (distanciaY)/(distanciaX);
            suma = proporcion + 1;
            movEnX = (1/suma)*velocidad;
            movEnY = (proporcion/suma)*velocidad;
        }
        else
        {
            proporcion = (distanciaX)/(distanciaY);
            suma = proporcion + 1;
            movEnX = (proporcion/suma)*velocidad;
            movEnY = (1/suma)*velocidad;
        }
        if ((mano.x - distanciaObjX)<0){
            mano.x = mano.x + movEnX;
        }
        else {
            mano.x = mano.x - movEnX;
        }
        if ((mano.y - distanciaObjY)<0){
            mano.y = mano.y + movEnY;
        }
        else {
            mano.y = mano.y - movEnY;
        }

        if (((mano.x <= distanciaObjX + 10) && (mano.x >= distanciaObjX-10))&&((mano.y<=distanciaObjY + 10) && (mano.y >= distanciaObjY-10))){
            indice = indice + 1;
            if (indice == inicio.length){
               indice = 0;
            }
            mano.x = inicio[indice].x + offsets[0];
            mano.y = inicio[indice].y + offsets[1];
        }
    }
    else if (((mano.alive)&&(ChequearOverlap(inicio[indice],objetivo)))||clicked){

        mano.kill();
    }
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
function CrearNube(x,y){
    nube = game.add.sprite(x,y,'nube');
    origen = game.add.sprite(x+5,y-4,'nubeOrigen');
    xnube = x;
    ynube = y;
    nubeCreada = true;

}

/**
* Funcion que anima la nube de pensamiento para que flote suavemente
* Parámetros:
* x: posición original de la nube en x
* y: posición original de la nube en y
*/
function AnimarNube(){

        //Movimiento correspondiente al circulito arriba de la nube
	if ((!goleft) && (origen.x <= xnube+6)){
	    origen.x = origen.x +0.03;
	}else if ((!goleft) && (origen.x > xnube+6)){
	    goleft = true;
	}else if ((goleft) && (origen.x >= xnube+4)){
	    origen.x = origen.x -0.03;
	}else if ((goleft) && (origen.x < xnube+4)){
	    goleft = false;
	}

	//Movimiento de la nube
	if ((goright) && (nube.x <= xnube+3)){
	    nube.x = nube.x +0.03;
	}else if ((goright) && (nube.x > xnube+3)){
	    goright = false;
	}else if ((!goright) && (nube.x >= xnube-3)){
	    nube.x = nube.x -0.03;
	}else if ((!goright) && (nube.x < xnube-3)){
	    goright = true;
	}

	if ((godown) && (nube.y <= ynube+1)){
	    nube.y = nube.y +0.03;
	}else if ((godown) && (nube.y > ynube+1)){
	    godown = false;
	}else if ((!godown) && (nube.y >= ynube-1)){
	    nube.y = nube.y -0.03;
	}else if ((!godown) && (nube.y < ynube-1)){
	    godown = true;
	}
}
