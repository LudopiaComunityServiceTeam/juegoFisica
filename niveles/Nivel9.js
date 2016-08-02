var Nivel8 = {
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


    ActivarFisica();
    CrearFondo();
    InicializarPlataformas();
    CrearPiso();

    // Puerta falsa
    salidaFalsa = game.add.sprite(20,486, 'salida');
    salidaFalsa.tint = 0xff9999;
    lineaizq = game.add.sprite(20, 470, 'linea');
    lineaizq.scale.setTo(5, 1);
    lineader = game.add.sprite(150, 470, 'linea');
    lineader.scale.setTo(5, 1);

    CrearSalida(700,486);
    CrearTimer();
    CrearPlay();
    limiteDeTiempo = 3;
    lineaizq = game.add.sprite(230, 430, 'linea');
    lineaizq.scale.setTo(20, 1);
    lineader = game.add.sprite(500, 430, 'linea');
    lineader.scale.setTo(20, 1);
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    posInicXPlayer = 200;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad();
    CrearDato(6,455,380,6,"distancia");
    CrearDato(3,700,510,3,"tiempo");
    tiempoFantasma = AñadirTexto(700,535,3,colorTiempo,48);
    tiempoFantasma.alpha = 0.7;

    //Datos falsos
    CrearDato(3,100,430,3,"distancia");
    CrearDato(1,20,510,1,"tiempo");
    tiempoFantasma = AñadirTexto(20,535,1,colorTiempo,48);
    tiempoFantasma.alpha = 0.7;

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
