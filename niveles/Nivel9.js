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
    CrearBotonPista("Las puertas rojas no funcionan! :(");
    CrearSalida(50,486);
    salidaAbierta = false;
    limiteDeTiempo = 1;
    lineaizq = game.add.sprite(50, 470, 'linea');
    lineaizq.scale.setTo(7, 1);
    lineader = game.add.sprite(180, 470, 'linea');
    lineader.scale.setTo(7, 1);
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    numeroAngulo = CrearAnguloParaVectorControlable(180,550,250,180);
    numeroAngulo = CrearAnguloParaVectorControlable(30,650,250,30);
    CrearEspinas(600,440);
    posInicXPlayer = 250;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad(100,100);
    CrearDato(2,135,420,2,"distancia");
    CrearDato(1,50,510,1,"tiempo");
    tiempoFantasma = AñadirTexto(50,535,1,colorTiempo,48);
    tiempoFantasma.alpha = 0.7;

    // Puerta falsa
    salidaFalsa = game.add.sprite(700,486, 'salida');
    salidaFalsa.tint = 0xff9999;
    lineaizq = game.add.sprite(280, 430, 'linea');
    lineaizq.scale.setTo(18, 1);
    lineader = game.add.sprite(520, 430, 'linea');
    lineader.scale.setTo(18, 1);

    //Datos falsos
    CrearDato(8,480,380,8,"distancia");
    CrearDato(2,700,510,2,"tiempo");
    tiempoFantasma = AñadirTexto(700,535,2,colorTiempo,48);
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
