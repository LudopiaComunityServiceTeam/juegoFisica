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

    CrearBasico();
    CrearBotonPista("¡Wow! Espinas, distancias y tiempos...\nEl resolvedor nos ayudará en este\ndilema, piensa bien que distancia y\ntiempo usar agregarás en él, hay\nuna puerta a la que no puedes\nllegar.");

    CrearEspinas(630,440);
    CrearSalida(550,484);
    limiteDeTiempo = 2;
    lineaizq = game.add.sprite(215, 380, 'linea');
    lineaizq.scale.setTo(22, 1);
    lineader = game.add.sprite(490, 380, 'linea');
    lineader.scale.setTo(22, 1);
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    posInicXPlayer = 200;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad(100,100);
    CrearDato(6,380,400,6,"distancia");
    CrearDato(2,550,510,2,"tiempo");

    // Puerta falsa
    salidaFalsa = game.add.sprite(710,484, 'salida');
    // salidaFalsa.tint = 0xff9999;
    lineaizq = game.add.sprite(215, 450, 'linea');
    lineaizq.scale.setTo(13, 1);
    lineader = game.add.sprite(430, 450, 'linea');
    lineader.scale.setTo(13, 1);

    //Datos falsos
    CrearDato(8,455,330,8,"distancia");
    CrearDato(4,700,510,4,"tiempo");

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
