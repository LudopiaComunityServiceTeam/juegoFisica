var Nivel4 = {
preload: function() {


},
create: function() {

/********************************************************************************/
/*
Aqui se pueden declarar variables no necesariamente globales

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


    ActivarFisica();
    CrearFondo();
    InicializarPlataformas();
    CrearPiso();
    CrearSalida(600,484);
    CrearTimer();
    CrearPlay();
    limiteDeTiempo = 2;
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    CrearEspinas(700,440)
    numeroMagnitud = CrearNumeroParaVector(600,550,300,6);
    numeroMagnitud = CrearNumeroParaVector(300,650,300,3);
    numeroMagnitud = CrearNumeroParaVector(200,750,300,2);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    AñadirTexto(600,550,2,colorTiempo,35);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
