var Nivel3 = {
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
    botonPistas = CrearBotonPista("Rapido o lento?");
    CrearSalida(700,481);
    salidaAbierta = false;
    CrearPlataforma(50,320,1,1);
    limiteDeTiempo = Infinity;
    vectorPequenno = CrearVector(700,150,300,0, false);
    vectorMediano = CrearVector(700,250,400,0);
    vectorGrande = CrearVector(700,350,500,0);
    posInicXPlayer = 100;
    posInicYPlayer = 270;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearEspinas(200,360);
    listaDeEspinas[0][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[0][0].angle = 90;
    CrearEspinas(300,400);
    listaDeEspinas[1][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[1][0].angle = 90;
    CrearEspinas(400,440);
    listaDeEspinas[2][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[2][0].angle = 90;
    CrearEspinas(500,480);
    listaDeEspinas[3][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[3][0].angle = 90;
    CrearEspinas(600,520);
    listaDeEspinas[4][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[4][0].angle = 90;
    tutorial();
    //Variable para controlar el titilar del boton play
    overlap = false;

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito
    //Parte del tutorial
    resaltarPlay();
    ControlJugador();
    ControlarNivel();
}
};
