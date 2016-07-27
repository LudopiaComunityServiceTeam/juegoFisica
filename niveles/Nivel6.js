var Nivel6 = {
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
    CrearSalida(700,486);
    CrearTimer();
    CrearPlay();
    limiteDeTiempo = 3;
    lineaizq = game.add.sprite(52, 450, 'linea');
    lineaizq.scale.setTo(20, 1);
    lineader = game.add.sprite(405, 450, 'linea');
    lineader.scale.setTo(20, 1);
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearEcuacionVelocidad();
    CrearDato(9,320,400,9,"distancia");
    CrearDato(3,600,510,3,"tiempo");
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
