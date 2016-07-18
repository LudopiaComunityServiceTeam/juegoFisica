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

function AnimarMano(){

    var distanciaObjX = player.x - 50
    var distanciaObjY = player.y - 50

    var distanciaX = mano.x - distanciaObjX
    var distanciaY = mano.y - distanciaObjY

    var movEnX = 2
    var movEnY = movEnX*(mano.y - distanciaObjY)/(mano.x - distanciaObjX)
 
    if (mano.x > distanciaObjX){
    mano.x = mano.x-movEnX;
    }
    if (mano.y < distanciaObjY){
        mano.y = mano.y-movEnY;
    }
    if ((mano.x <= distanciaObjX)||(mano.y >= distanciaObjY)){
	if ((vector.x <= distanciaObjX)&&!(vector.y >= distanciaObjY)){
	    mano.y = mano.y-movEnY;
	} else if ((vector.y >= distanciaObjY)&&!(vector.x <= distanciaObjX)){
	    mano.x = mano.x-movEnX;
	} else if ((vector.y >= distanciaObjY)&&(vector.x <= distanciaObjX)){
	    mano.y = mano.y+movEnY;
	    mano.x = mano.x+movEnX;
	}else{
	console.log(movEnY)
        mano.x = vector.x - 100;
        mano.y = vector.y - 25;}
    }

}
