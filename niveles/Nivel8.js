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
    CrearSalida(570,486);
    lineaizq = game.add.sprite(52, 470, 'linea');
    lineaizq.scale.setTo(20, 1);
    lineader = game.add.sprite(370, 470, 'linea');
    lineader.scale.setTo(20, 1);

    CrearSalida(700,486);
    CrearTimer();
    CrearPlay();
    limiteDeTiempo = 3;
    lineaizq = game.add.sprite(52, 430, 'linea');
    lineaizq.scale.setTo(30, 1);
    lineader = game.add.sprite(400, 430, 'linea');
    lineader.scale.setTo(30, 1);
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad();
    CrearDato(9,370,380,9,"distancia");
    CrearDato(3,700,510,3,"tiempo");
    tiempoFantasma = AñadirTexto(700,535,3,colorTiempo,48);
    tiempoFantasma.alpha = 0.7;

    //Datos falsos
    CrearDato(8,290,420,8,"distancia");
    CrearDato(2,570,510,2,"tiempo");
    tiempoFantasma = AñadirTexto(570,535,2,colorTiempo,48);
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
