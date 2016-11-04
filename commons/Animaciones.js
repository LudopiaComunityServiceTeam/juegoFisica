function AnimarDivision(){
    if (!animacionDivisionCreada){
        ImagenDivision = game.add.sprite(0,0, 'division');
        ImagenDivision.alpha = 1;
        ImagenDivision.anchor.setTo(0.5,0.5);
        ImagenDivision.scale.setTo(2,2);
        ImagenDivision.x =  EcuacionVelocidad.x + 150;
        ImagenDivision.y =  EcuacionVelocidad.y + 75;
        //game.world.moveDown(ImagenDivision);
        animacionDivisionCreada = true;
    }
    else{
        var transparencia = ImagenDivision.alpha;
        var escalaDivisionx = ImagenDivision.scale.x;
        var escalaDivisiony = ImagenDivision.scale.y;
        ImagenDivision.scale.setTo(escalaDivisionx - 0.03,escalaDivisiony - 0.03);
        ImagenDivision.alpha = transparencia - 0.02;
        if (ImagenDivision.alpha <= 0){
            animacionDivisionCreada = false;
            animacionDivisionIniciada = false;
            ImagenDivision.destroy();
        }
    }
}
function AnimarCirculo(){
    if (!animacionCirculoCreada){
        ImagenCirculo = game.add.sprite(0,0, 'circulo');
        ImagenCirculo.alpha = 1;
        ImagenCirculo.anchor.setTo(0.5,0.5);
        ImagenCirculo.scale.setTo(0.1,0.1);
        ImagenCirculo.x =  salida.x + 10;
        ImagenCirculo.y =  salida.y + 25;
        //game.world.moveDown(ImagenDivision);
        animacionCirculoCreada = true;
    }
    else{
        var transparencia = ImagenCirculo.alpha;
        var escalaCirculox = ImagenCirculo.scale.x;
        var escalaCirculoy = ImagenCirculo.scale.y;
        ImagenCirculo.scale.setTo(escalaCirculox + 0.1,escalaCirculoy + 0.1);
        ImagenCirculo.alpha = transparencia - 0.02;
        if (ImagenCirculo.alpha <= 0){
            animacionCirculoCreada = false;
            animacionCirculoIniciada = false;
            ImagenCirculo.destroy();
        }
    }

}
function AnimarResaltador(){
    for (var i = 0; i <  resaltadores.length; i++){
        var transparencia = resaltadores[i].alpha;
        var Escalax = resaltadores[i].scale.x;
        var Escalay = resaltadores[i].scale.y;
        resaltadores[i].scale.setTo(Escalax + 0.01,Escalay + 0.01);
        resaltadores[i].alpha = transparencia - 0.01;
        if (resaltadores[i].alpha <= 0){
            console.log("quedan " + resaltadores.length);
            resaltadores[i].alpha = 1;
            resaltadores[i].scale.setTo( resaltadores[i].escalax, resaltadores[i].escalay);
        }
    }
}
function AnimarPista(){
        var transparencia = ResaltadorPista.alpha;
        var Escalax = ResaltadorPista.scale.x;
        var Escalay = ResaltadorPista.scale.y;
        ResaltadorPista.scale.setTo(Escalax + 0.02,Escalay + 0.02);
        ResaltadorPista.alpha = transparencia - 0.01;
        if (ResaltadorPista.alpha <= 0){
            console.log("quedan " + resaltadores.length);
            ResaltadorPista.alpha = 1;
            ResaltadorPista.scale.setTo(1,1);
        }

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
    var manoInnecesaria = false;
    for (var i = 0; i < inicio.length; i++){
        if (ChequearOverlap(inicio[i],objetivo)){
            manoInnecesaria = true;
        }
    }
    if ((!manoInnecesaria)&&(!clicked)){
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
    else if (((mano.alive)&&(manoInnecesaria))||clicked){

        mano.kill();

    }
}
/**
* Funcion que anima la nube de pensamiento para que flote suavemente
* Parámetros:
* x: posición original de la nube en x
* y: posición original de la nube en y
*/
function AnimarNube(){

        //Movimiento correspondiente al circulito arriba de la nube
	if ((!goleft) && (origen.x <= xorigen+6)){
	    origen.x = origen.x +0.03;
	}else if ((!goleft) && (origen.x > xorigen+6)){
	    goleft = true;
	}else if ((goleft) && (origen.x >= xorigen+4)){
	    origen.x = origen.x -0.03;
	}else if ((goleft) && (origen.x < xorigen+4)){
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
