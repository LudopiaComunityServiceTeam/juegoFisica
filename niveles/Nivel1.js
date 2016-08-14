var Nivel1 = {
preload: function() {

    game.load.image('rectangulo','assets/rectangulo.png');
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
    CrearBotonPista("Observa bien lo que indican los cuadros\nverdes, esa es la secuencia de juego.\nArrastra el vector, déjalo caer sobre el\nmonigote y le das a \"play \"");
    CrearSalida(610,484);
    salidaAbierta = false;
    limiteDeTiempo = Infinity;
    vector = CrearVector(400,300,300,0);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    jugador = CrearJugador(posInicXPlayer, posInicYPlayer);
    text = AñadirTexto(110,240,"Este es un vector\n de velocidad",colorTexto,45);
    text.angle = -20;
    CrearMano(290, 275);
    inicio = [vector];
    indice = 0;

    tutorial();
    //Variable para controlar el titilar del boton play
    overlap = false;

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();

    //Parte del tutorial
    resaltarPlayButtonTutorial();

    //Animacion de la mano
    if (!(inicio[0] === undefined)) {
        AnimarMano(inicio,player,[-100,-25,-50,0]);
    }
}
};
