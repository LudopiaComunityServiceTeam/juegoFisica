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

    if (!ChequearOverlap(player,vector)){
        if (!mano.alive){
            mano.reset(vector.x - 100, vector.y - 25)
        }
        var distanciaObjX = player.x - 50
        var distanciaObjY = player.y 

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
            console.log("X: " + proporcion)
            suma = proporcion + 1
            movEnX = (1/suma)*velocidad
            movEnY = (proporcion/suma)*velocidad
        }    
        else 
        {
            proporcion = (distanciaX)/(distanciaY)
            console.log("X: " + proporcion)
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
            mano.x = vector.x - 100;
            mano.y = vector.y - 25;
        }
    }
    else if ((mano.alive)&&(ChequearOverlap(player,vector))){
        mano.kill();
    }
}
