function AnimarDivision(){
    if (!animacionDivisionCreada){
        console.log("WAZA");
        ImagenDivision = game.add.sprite(0,0, 'division');
        ImagenDivision.alpha = 1;
        ImagenDivision.anchor.setTo(0.5,0.5)
        ImagenDivision.x =  EcuacionVelocidad.x + 150;
        ImagenDivision.y =  EcuacionVelocidad.y + 75;
        //game.world.moveDown(ImagenDivision);
        animacionDivisionCreada = true;
    }
    else{
        var transparencia = ImagenDivision.alpha;
        ImagenDivision.alpha = transparencia - 0.02;
        if (ImagenDivision.alpha <= 0){
            console.log("WAZUZA");
            animacionDivisionCreada = false;
            animacionDivisionIniciada = false;
            ImagenDivision.destroy();
        }
    }
}
function AnimarDivision(){

}
