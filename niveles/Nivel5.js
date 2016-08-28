var Nivel5 = {
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
    botonPistas = CrearBotonPista("La puerta tiene un número ahora\ny es del mismo color que el tiempo,\n¿Qué podrá significar?.\nPiensa bien que velocidad usar o la\n puerta se cerrará...");

    CrearSalida(610,479);
    CrearNube(610,545);

    limiteDeTiempo = 3;
    CrearEspinas(710,440);
    vector = CrearVector(400,300,0,0, true);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    numeroMagnitud = CrearNumeroParaVectorControlable(600,550,300,6);
    numeroMagnitud = CrearNumeroParaVectorControlable(300,650,300,3);
    numeroMagnitud = CrearNumeroParaVectorControlable(200,750,300,2);
    CrearDato(3,625,515,3,"tiempo");
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    AnimarNube(610,545);
    ControlJugador();
    ControlarNivel();
}
};
