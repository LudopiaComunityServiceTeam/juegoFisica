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

function AnimarMano(inicio,objetivo,offsets){

    if (!ChequearOverlap(inicio,objetivo)&&(!clicked)){
        if (!mano.alive){
            mano.reset(inicio.x + offsets[0], inicio.y + offsets[1])
        }
        var distanciaObjX = objetivo.x + offsets[2]
        var distanciaObjY = objetivo.y + offsets[3]

        var distanciaX = Math.abs(mano.x - distanciaObjX)
        var distanciaY = Math.abs(mano.y - distanciaObjY)

        var proporcion
        var velocidad = 3.5

        var movEnX
        var movEnY
        var suma

        if (Math.abs(distanciaX) < Math.abs(distanciaY))
        {
        
            proporcion = (distanciaY)/(distanciaX)
            suma = proporcion + 1
            movEnX = (1/suma)*velocidad
            movEnY = (proporcion/suma)*velocidad
        }    
        else 
        {
            proporcion = (distanciaX)/(distanciaY)
            suma = proporcion + 1
            movEnX = (proporcion/suma)*velocidad
            movEnY = (1/suma)*velocidad
        }
        if ((mano.x - distanciaObjX)<0){
            mano.x = mano.x + movEnX
        }
        else {
            mano.x = mano.x - movEnX
        }
        if ((mano.y - distanciaObjY)<0){
            mano.y = mano.y + movEnY
        }
        else {
            mano.y = mano.y - movEnY
        }

        if (((mano.x <= distanciaObjX + 10) && (mano.x >= distanciaObjX-10))&&((mano.y<=distanciaObjY + 10) && (mano.y >= distanciaObjY-10))){
    
            console.log(movEnY)
            mano.x = inicio.x + offsets[0];
            mano.y = inicio.y + offsets[1];
        }
    }
    else if (((mano.alive)&&(ChequearOverlap(inicio,objetivo)))||clicked){
        mano.kill();
    }
}
