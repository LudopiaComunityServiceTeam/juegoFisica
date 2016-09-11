var Nivel7 = {
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
    CrearNube(660,545);
    limiteDeTiempo = 3;
    pierdePuntos = 2;
    CrearDato(3,675,515,3,"tiempo");
    vector = CrearVector(400,350,0,0, true);
    numeroAngulo = CrearAnguloParaVectorControlable(30,550,120,30);
    numeroAngulo = CrearAnguloParaVectorControlable(40,650,120,40);
    numeroMagnitud = CrearNumeroParaVectorControlable(400,220,120,4);
    numeroMagnitud = CrearNumeroParaVectorControlable(500,120,120,5);
    CrearEspinas(300,436);
    pared = CrearPared(350,436);
    CrearEspinas(700,436);
    CrearEspinas(700,336);
    CrearEspinas(700,236);
    pared = CrearPared(750,436);
    pared = CrearPared(750,336);
    pared = CrearPared(750,236);
    pared = CrearPared(800,186);
    pared.angle = 90;
    pared = CrearPared(700,186);
    pared.angle = 90;
    pared = CrearPared(600,186);
    pared.angle = 90;
    pared = CrearPared(500,186);
    pared.angle = 90;
    pared = CrearPared(400,186);
    pared.angle = 90;
    pared = CrearPared(300,186);
    pared.angle = 90;
    pared = CrearPared(200,186);
    pared.angle = 90;
    pared = CrearPared(100,186);
    pared.angle = 90;
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    // informacion sobre el angulo
    //info = "Un vector también tiene un \nángulo que define su sentido, \nhacia donde apunta";
    //AñadirTexto(100, 40, info, colorTexto, 24);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
