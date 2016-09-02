var Nivel12 = {
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
    botonPistas = CrearBotonPista("Y ahora hay ángulos... \n¿Cuál puerta será la correcta?\n¿Derecha o izquierda?");
    CrearSalida(110,479);
    CrearNube(110,545);
    CrearEspinas(600,440);
    salidaAbierta = false;
    limiteDeTiempo = 1;
    pierdePuntos = 1;
    lineaizq = game.add.sprite(110, 470, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(200, 470, 'linea');
    lineader.scale.setTo(5, 1);

    // Puerta falsa
    salidaFalsa = game.add.sprite(710,484, 'salida');
    CrearNube(710,545);
    // salidaFalsa.tint = 0xff9999;
    lineaizq = game.add.sprite(280, 430, 'linea');
    lineaizq.scale.setTo(18, 1);
    lineader = game.add.sprite(520, 430, 'linea');
    lineader.scale.setTo(18, 1);

    ecuacionVelocidad = CrearEcuacionVelocidad(100,100);
    vector = CrearVector(400,300,0,0, true);
    posInicXPlayer = 250;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    numeroAngulo = CrearAnguloParaVectorControlable(180,550,250,180);
    numeroAngulo = CrearAnguloParaVectorControlable(30,650,250,30);
    CrearDato(2,165,420,2,"distancia");
    CrearDato(1,125,515,1,"tiempo");

    //Datos falsos
    CrearDato(8,480,380,8,"distancia");
    CrearDato(2,725,515,2,"tiempo");

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
