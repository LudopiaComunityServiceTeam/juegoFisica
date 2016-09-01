var Nivel14 = {
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
    botonPistas = CrearBotonPista("Observa bien lo que indican los cuadros\nverdes, esa es la secuencia de juego.\nArrastra el vector, déjalo caer sobre el\nmonigote y le das a \"play \"");
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    CrearSalida(610,479);
    salidaAbierta = false;
    limiteDeTiempo = Infinity;
    CrearEspinas(400,400);
    listaDeEspinas[0][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[0][0].angle = 270;    
    ListaDeCiclos.push([listaDeEspinas[0],false,0,2,2]);
    vector = CrearVector(400, 300, 300, 0, false);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    jugador = CrearJugador(posInicXPlayer, posInicYPlayer);
    indice = 0;
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

