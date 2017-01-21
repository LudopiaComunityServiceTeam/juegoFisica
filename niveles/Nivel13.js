var Nivel13 = {
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
    botonPistas = CrearBotonPista("La velocidad que tienes depende\nla distancia (y el tiempo) que elijas.\nEscoge sabiamente y llega a la puerta.");
    posicionPuertaRealX = 470;
    posicionPuertaRealY = 479;
    CrearSalida(posicionPuertaRealX, posicionPuertaRealY);
    CrearNube(posicionPuertaRealX-10,posicionPuertaRealY-50,posicionPuertaRealX+10,posicionPuertaRealY-10);
    salidaAbierta = false;
    // CrearPlataforma(0,300,1,1);
    CrearPlataforma(50,320,1,1);
    CrearPlataforma(150,320,1,1);
    limiteDeTiempo = 3;
    lineaizq = game.add.sprite(150, 430, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(250, 430, 'linea');
    lineader.scale.setTo(20, 1);

    lineaizq = game.add.sprite(150, 380, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(250, 380, 'linea');
    lineader.scale.setTo(35, 1);

    lineaizq = game.add.sprite(150, 480, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(250, 480, 'linea');
    lineader.scale.setTo(5, 1);

    CrearEspinas(600,437);
    CrearEspinas(350,537);
    listaDeEspinas[1][0].angle = 180;

    ecuacionVelocidad = CrearEcuacionVelocidad(100,50);
    vector = CrearVector(600,300,0,0, true);
    posInicXPlayer = 100;
    posInicYPlayer = 270;
    //monologo de Sam
    monologo = AñadirTexto(500,265,"Pero no fué mi decisión",colorTexto,20);
    monologo.alpha = 0.01;
    faseBorrado = 0;
    //
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearDato(6,215,380,6,"distancia");
    CrearDato(limiteDeTiempo,posicionPuertaRealX,posicionPuertaRealY-76,limiteDeTiempo,"tiempo");

    //Datos falsos
    CrearDato(3,215,430,3,"distancia");
    CrearDato(9,215,330,9,"distancia");
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
