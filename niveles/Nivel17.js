var Nivel17 = {
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
    limiteDeTiempo = 4;
    
    
    botonPistas = CrearBotonPista("¡Magnitudes y ángulos! Calcula la\ncombinación correcta de ellos para\nllegar a tiempo a la puerta;\nel monigote lo agradecerá.");
    /* Dato Distancia */
    lineaizq = game.add.sprite(70, 465, 'linea');
    lineaizq.scale.setTo(30, 1);
    lineader = game.add.sprite(420, 465, 'linea');
    lineader.scale.setTo(35, 1);
    CrearDato(10,380,430,10,"distancia");
    
    
    var posicionPuertaRealX = 750
    var posicionPuertaRealY = 240
    
    CrearSalida(posicionPuertaRealX,posicionPuertaRealY);


    
    // Puerta falsa

    pierdePuntos = 2;

    // pared izq

    //CrearPlataforma(300,300,1,1);
    CrearPlataforma(700,300,1,1);
    
    
    // techo
    techo = CrearPared(150,50);
    techo.angle = 90;

    techo = CrearPared(250,50);
    techo.angle = 90;

    techo = CrearPared(350,50);
    techo.angle = 90;

    techo = CrearPared(450,50);
    techo.angle = 90;

    techo = CrearPared(550,50);
    techo.angle = 90;

    techo = CrearPared(650,50);
    techo.angle = 90;

    techo = CrearPared(750,50);
    techo.angle = 90;

//pared der
    CrearEspinas(750,340);
    CrearEspinas(750,440);
    listaDeEspinas[0][0].angle = 0;
    listaDeEspinas[1][0].angle = 0;
    
    vector = CrearVector(400,200,0,0, true);

    numeroMagnitud = CrearNumeroParaVectorControlable(600,400,300,6);
    numeroMagnitud = CrearNumeroParaVectorControlable(100,300,300,1);
    numeroMagnitud = CrearNumeroParaVectorControlable(200,200,300,2);
    
    numeroAngulo = CrearAnguloParaVectorControlable(45,50,350,45);
    numeroAngulo = CrearAnguloParaVectorControlable(60,50,250,60);
    numeroAngulo = CrearAnguloParaVectorControlable(25,50,150,25);

    CrearNube(posicionPuertaRealX-10,posicionPuertaRealY-50,posicionPuertaRealX+10,posicionPuertaRealY-10);
    CrearDato(limiteDeTiempo,posicionPuertaRealX,posicionPuertaRealY-76,limiteDeTiempo,"tiempo");
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
	DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
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
