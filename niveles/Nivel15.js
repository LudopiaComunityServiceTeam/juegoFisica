var Nivel15 = {
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
<<<<<<< HEAD
    CrearCabezeraNivel(15);
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    botonPistas = CrearBotonPista("¡Magnitudes y ángulos! Calcula la\ncombinación correcta de ellos para\nllegar a tiempo a la puerta;\nel monigote lo agradecerá.");
    lineaizq = game.add.sprite(170, 475, 'linea');
    lineaizq.scale.setTo(7, 1);
    lineader = game.add.sprite(300, 475, 'linea');
    lineader.scale.setTo(7, 1);
    lineaizq2 = game.add.sprite(430, 475, 'linea');
    lineaizq2.scale.setTo(7, 1);
    lineader2 = game.add.sprite(550, 475, 'linea');
    lineader2.scale.setTo(7, 1);
    var posicionPuertaRealX = 512;
    var posicionPuertaRealY = 384;
    CrearSalida(posicionPuertaRealX,posicionPuertaRealY);


    limiteDeTiempo = 1;
    // Puerta falsa
    var posicionPuertaFalsa1X = 612;
    var posicionPuertaFalsa1Y = 484;
    salidaFalsa1 = game.add.sprite(posicionPuertaFalsa1X,posicionPuertaFalsa1Y, 'salida');
    // Puerta falsa
    var posicionPuertaFalsa2X = 262;
    var posicionPuertaFalsa2Y = 384;
    salidaFalsa2 = game.add.sprite(posicionPuertaFalsa2X,posicionPuertaFalsa2Y, 'salida');
    // Puerta falsa
    var posicionPuertaFalsa3X = 162;
    var posicionPuertaFalsa3Y = 484;
    salidaFalsa3 = game.add.sprite(posicionPuertaFalsa3X,posicionPuertaFalsa3Y, 'salida');


//pared izq

    CrearEspinas(150,240);
    CrearEspinas(150,340);
    CrearEspinas(150,440);
    CrearEspinas(150,540);

    listaDeEspinas[0][0].angle = 180;
    listaDeEspinas[1][0].angle = 180;
    listaDeEspinas[2][0].angle = 180;
    listaDeEspinas[3][0].angle = 180;

    pared = CrearPared(50,140);
    pared = CrearPared(50,240);
    pared = CrearPared(50,340);
    pared = CrearPared(50,440);

//techo

    CrearEspinas(150,190);
    CrearEspinas(250,190);
    CrearEspinas(350,190);
    CrearEspinas(450,190);
    CrearEspinas(550,190);

    listaDeEspinas[4][0].angle = 270;
    listaDeEspinas[5][0].angle = 270;
    listaDeEspinas[6][0].angle = 270;
    listaDeEspinas[7][0].angle = 270;
    listaDeEspinas[8][0].angle = 270;

    techo = CrearPared(150,90);
    techo.angle = 90;

    techo = CrearPared(250,90);
    techo.angle = 90;

    techo = CrearPared(350,90);
    techo.angle = 90;

    techo = CrearPared(450,90);
    techo.angle = 90;

    techo = CrearPared(550,90);
    techo.angle = 90;

    techo = CrearPared(650,90);
    techo.angle = 90;

    techo = CrearPared(750,90);
    techo.angle = 90;

//pared der

    CrearEspinas(650,436);
    CrearEspinas(650,336);
    CrearEspinas(650,236);
    CrearEspinas(650,136);

    pared = CrearPared(700,436);
    pared = CrearPared(700,336);
    pared = CrearPared(700,236);
    pared = CrearPared(700,136);

    vector = CrearVector(400,200,0,0, true);

    numeroAngulo = CrearAnguloParaVectorControlable(45,200,200,45);
    numeroAngulo = CrearAnguloParaVectorControlable(180,350,200,180);
    numeroAngulo = CrearAnguloParaVectorControlable(135,500,200,135);
    numeroMagnitud = CrearNumeroParaVectorControlable(400,400,300,4);

    CrearNube(posicionPuertaRealX-10,posicionPuertaRealY-50,posicionPuertaRealX+10,posicionPuertaRealY-10);
    CrearNube(posicionPuertaFalsa1X-10,posicionPuertaFalsa1Y-50,posicionPuertaFalsa1X+10,posicionPuertaFalsa1Y-10);
    CrearNube(posicionPuertaFalsa2X-10,posicionPuertaFalsa2Y-50,posicionPuertaFalsa2X+10,posicionPuertaFalsa2Y-10);
    CrearNube(posicionPuertaFalsa3X-10,posicionPuertaFalsa3Y-50,posicionPuertaFalsa3X+10,posicionPuertaFalsa3Y-10);
    CrearDato(1,posicionPuertaRealX,posicionPuertaRealY-76,1,"tiempo");
    CrearDato(3,posicionPuertaFalsa1X,posicionPuertaFalsa1Y-76,3,"tiempo");
    CrearDato(2,posicionPuertaFalsa2X,posicionPuertaFalsa2Y-76,2,"tiempo");
    CrearDato(4,posicionPuertaFalsa3X,posicionPuertaFalsa3Y-76,4,"tiempo");
    CrearDato(4,260,430,4,"distancia");
    CrearDato(4,515,430,4,"distancia");
    posInicXPlayer = 388;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
	DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
=======
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    botonPistas = CrearBotonPista("¡Magnitudes y ángulos! Calcula la\ncombinación correcta de ellos para\nllegar a tiempo a la puerta;\nel monigote lo agradecerá.");
    CrearSalida(660,479);
    salidaAbierta = false;
    limiteDeTiempo = Infinity;
    CrearEspinas(450,440);
    CrearEspinas(450,340);
    CrearEspinas(450,240);
    CrearEspinas(450,140);
    plataforma = CrearPared(700,37);
    plataforma = CrearPared(700,137);
    plataforma = CrearPared(700,237);
    plataforma = CrearPared(700,337);
    plataforma = CrearPared(700,437);
    vector = CrearVector(320,350,0,0, true);

    numeroAngulo = CrearAnguloParaVectorControlable(80,150,140,80);
    numeroAngulo = CrearAnguloParaVectorControlable(60,150,240,70);
    numeroMagnitud = CrearNumeroParaVectorControlable(400,100,140,4);
    numeroMagnitud = CrearNumeroParaVectorControlable(500,100,240,5);
    numeroMagnitud = CrearNumeroParaVectorControlable(600,100,340,6);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);

>>>>>>> a264ae0a1072e17e5b858f8ef7ee85ed2d149691
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    game.debug.bodyInfo(player);
}
};
<<<<<<< HEAD
=======

>>>>>>> a264ae0a1072e17e5b858f8ef7ee85ed2d149691
