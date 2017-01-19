var Nivel11 = {
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
    botonPistas = CrearBotonPista("¡Wow! Espinas, distancias y tiempos...\nEl resolvedor nos ayudará en este\ndilema, piensa bien que distancia y\ntiempo usar agregarás en él, hay\nuna puerta a la que no puedes\nllegar.");

    CrearEspinas(600,440);
    paredEspina = CrearPared(650,437);
    paredDer = CrearPared(750,237);
    paredDer = CrearPared(750,337);
    paredDer = CrearPared(750,437);
    paredIzq = CrearPared(100,237);
    paredIzq = CrearPared(100,337);
    paredIzq = CrearPared(100,437);
    techoRoto = CrearPared(700,286);
    techoRoto.anchor.setTo(0.5, 0.5);
    techoRoto.angle = 90;
    techoRoto = CrearPared(600,286);
    techoRoto.anchor.setTo(0.5, 0.5);
    techoRoto.angle = 90;
    techoRoto = CrearPared50(525,286,1);
    techoRoto = CrearPared50(425,286,2);
    techoRoto = CrearPared(300,286);
    techoRoto.anchor.setTo(0.5, 0.5);
    techoRoto.angle = 90;
    techoRoto = CrearPared(200,286);
    techoRoto.anchor.setTo(0.5, 0.5);
    techoRoto.angle = 90;

    CrearSalida(555,479);
    CrearNube(555,430,565,475);
    limiteDeTiempo = 2;
    lineaizq = game.add.sprite(220, 360, 'linea');
    lineaizq.scale.setTo(20, 1);
    lineader = game.add.sprite(500, 360, 'linea');
    lineader.scale.setTo(20, 1);

    // Puerta falsa
    salidaFalsa = game.add.sprite(710,484, 'salida');
    CrearNube(705,430,725,475);
    // salidaFalsa.tint = 0xff9999;
    lineaizq = game.add.sprite(220, 450, 'linea');
    lineaizq.scale.setTo(13, 1);
    lineader = game.add.sprite(430, 450, 'linea');
    lineader.scale.setTo(12, 1);

    ecuacionVelocidad = CrearEcuacionVelocidad(100,100);
    vector = CrearVector(635,250,0,0, true);
    posInicXPlayer = 200;
    posInicYPlayer = game.world.height - 110;
    //monologo de Sam
    monologo = AñadirTexto(300,225,"Pero la respuesta no llegaba",colorTexto,20);
    monologo.alpha = 0.01; 
    faseBorrado = 0;
    //
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearDato(6,380,400,6,"distancia");
    CrearDato(2,570,400,2,"tiempo");

    //Datos falsos
    CrearDato(8,450,310,8,"distancia");
    CrearDato(4,720,400,4,"tiempo");
    DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    BorrarTexto();
}
};
