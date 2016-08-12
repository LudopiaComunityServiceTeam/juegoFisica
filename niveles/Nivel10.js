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
    CrearSalida(550,486);
    salidaAbierta = false;
    CrearPlataforma(0,300,1,1);
    CrearPlataforma(100,300,1,1);
    CrearPlataforma(200,300,1,1);
    limiteDeTiempo = 3;

    lineaizq = game.add.sprite(115, 380, 'linea');
    lineaizq.scale.setTo(10, 1);
    lineader = game.add.sprite(300, 380, 'linea');
    lineader.scale.setTo(12.5, 1);

    lineaizq = game.add.sprite(115, 430, 'linea');
    lineaizq.scale.setTo(10, 1);
    lineader = game.add.sprite(300, 430, 'linea');
    lineader.scale.setTo(5, 1);
    lineader = game.add.sprite(350, 435, 'linea');
    lineader.scale.setTo(2.5, 1);
    lineader.angle = 270;
    lineader = game.add.sprite(350, 405, 'linea');
    lineader.scale.setTo(21, 1);

    lineaizq = game.add.sprite(115, 480, 'linea');
    lineaizq.scale.setTo(10, 1);
    lineader = game.add.sprite(300, 480, 'linea');
    lineader.scale.setTo(10, 1);
    lineader = game.add.sprite(400, 485, 'linea');
    lineader.scale.setTo(5, 1);
    lineader.angle = 270;
    lineader = game.add.sprite(400, 430, 'linea');
    lineader.scale.setTo(30, 1);

    CrearEspinas(650,440);
    CrearEspinas(450,490);
    listaDeEspinas[1].anchor.setTo(0.5, 0.5);
    listaDeEspinas[1].angle = 180;

    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    posInicXPlayer = 100;
    posInicYPlayer = 250;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad(50,50);
    CrearDato(6,250,380,6,"distancia");
    CrearDato(3,550,510,3,"tiempo");

    //Datos falsos
    CrearDato(3,250,330,3,"distancia");
    CrearDato(9,250,430,9,"distancia");

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
