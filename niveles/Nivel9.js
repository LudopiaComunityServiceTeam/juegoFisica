var Nivel9 = {
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
    botonPistas = CrearBotonPista("¡Magnitudes y ángulos! Calcula la\ncombinación correcta de ellos para\nllegar a tiempo a la puerta;\nel monigote lo agradecerá.");
    CrearSalida(660,479);
    salidaAbierta = false;
    limiteDeTiempo = Infinity;
    pierdePuntos = 2;
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
