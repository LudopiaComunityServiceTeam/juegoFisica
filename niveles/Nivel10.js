var Nivel10 = {
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
    CrearBotonPista("La velocidad que tienes depende\nla distancia (y el tiempo) que elijas.\nEscoge sabiamente y llega a la puerta.");
    CrearSalida(470,483);
    salidaAbierta = false;
    // CrearPlataforma(0,300,1,1);
    CrearPlataforma(50,320,1,1);
    CrearPlataforma(150,320,1,1);
    limiteDeTiempo = 3;

    lineaizq = game.add.sprite(150, 380, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(250, 380, 'linea');
    lineader.scale.setTo(5, 1);

    lineaizq = game.add.sprite(150, 430, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(250, 430, 'linea');
    lineader.scale.setTo(2.5, 1);
    lineader = game.add.sprite(270, 435, 'linea');
    lineader.scale.setTo(2.5, 1);
    lineader.angle = 270;
    lineader = game.add.sprite(270, 405, 'linea');
    lineader.scale.setTo(18, 1);

    lineaizq = game.add.sprite(150, 480, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(250, 480, 'linea');
    lineader.scale.setTo(4.5, 1);
    lineader = game.add.sprite(290, 485, 'linea');
    lineader.scale.setTo(5, 1);
    lineader.angle = 270;
    lineader = game.add.sprite(290, 430, 'linea');
    lineader.scale.setTo(31, 1);

    CrearEspinas(600,437);
    CrearEspinas(350,537);
    listaDeEspinas[1].angle = 180;

    vector = CrearVector(400,300,0,0, true);
    posInicXPlayer = 100;
    posInicYPlayer = 270;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad(100,50);
    CrearDato(6,215,380,6,"distancia");
    CrearDato(3,470,510,3,"tiempo");

    //Datos falsos
    CrearDato(3,215,330,3,"distancia");
    CrearDato(9,215,430,9,"distancia");

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
