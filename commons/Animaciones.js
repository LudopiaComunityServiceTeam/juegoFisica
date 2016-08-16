function AnimarDivision(){
    if (!animacionDivisionCreada){
        ImagenDivision = game.add.sprite(0,0, 'division');
        ImagenDivision.alpha = 1;
        ImagenDivision.anchor.setTo(0.5,0.5)
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
        ImagenCirculo.anchor.setTo(0.5,0.5)
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
            console.log("quedan " + resaltadores.length)
            resaltadores[i].alpha = 1;
            resaltadores[i].scale.setTo( resaltadores[i].escalax, resaltadores[i].escalay);
        }
    }
}
