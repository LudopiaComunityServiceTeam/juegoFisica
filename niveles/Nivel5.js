var Nivel5 = {
preload: function() {


},
create: function() {

/********************************************************************************/
/*

Esta funcion dibuja objetos en pantalla en el orden en que se añadan

Si un objeto se dibuja primero, quedara como background

La funcion "create" se corre sola despues de preload, asi que no se
preocupen en llamarla

Cuando se crea un objeto se pide la ubicacion en x y y, y el nombre de la
imagen que tendra

En Phaser X y Y el 0,0 está en la esquina superior izquierda y "y" se cuenta
positivo hasta abajo.
*/
/********************************************************************************/


    CrearBasico();
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    botonPistas = CrearBotonPista("La puerta tiene un número ahora\ny es del mismo color que el tiempo,\n¿Qué podrá significar?.\nPiensa bien que velocidad usar o la\n puerta se cerrará...");
    var pared = CrearPared(150,290);
    pared.angle = 90;
    pared = CrearPared(250,290);
    pared.angle = 90;
    pared = CrearPared(350,290);
    pared.angle = 90;
    pared = CrearPared(450,290);
    pared.angle = 90;
    pared = CrearPared(550,290);
    pared.angle = 90;
    pared = CrearPared(650,290);
    pared.angle = 90;
    pared = CrearPared(750,290);
    pared.angle = 90;
    pared = CrearPared(750,340);
    pared = CrearPared(750,440);

    CrearSalida(610,479);
    CrearNube(600,435,618,475);
    limiteDeTiempo = 3;
    CrearEspinas(700,440);
    vector = CrearVector(625,250,0,0, true);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    //monologo de Sam
    monologo = AñadirTexto(530,380,"Y él estaba en peligro.",colorTexto,20);
    monologo.alpha = 0.01; 
    faseBorrado = 0;
    //
    CrearJugador(posInicXPlayer, posInicYPlayer);
    numeroMagnitud = CrearNumeroParaVectorControlable(600,160,125,6);
    numeroMagnitud = CrearNumeroParaVectorControlable(300,260,125,3);
    numeroMagnitud = CrearNumeroParaVectorControlable(200,360,125,2);
    CrearDato(3,615,405,3,"tiempo");
    DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    BorrarTexto();
}
};
