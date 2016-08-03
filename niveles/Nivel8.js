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
    CrearBotonPista("Pues que miedo! \n espinas, numeros, lineas.\n Por lo menos tenemos el resolvedor \n no parece ser posible llegar \n a la segunda puerta \n Quizá sea mejor usar \n los datos que estan relacionados \n con la primera");
    // Puerta falsa
    CrearSalida(700,486);
    lineaizq = game.add.sprite(215, 450, 'linea');
    lineaizq.scale.setTo(15, 1);
    lineader = game.add.sprite(435, 450, 'linea');
    lineader.scale.setTo(15, 1);

    CrearEspinas(630,440);

    CrearSalida(570,486);
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
    ecuacionVelocidad = CrearEcuacionVelocidad();
    CrearDato(9,455,330,9,"distancia");
    CrearDato(3,700,510,3,"tiempo");
    tiempoFantasma = AñadirTexto(700,535,3,colorTiempo,48);
    tiempoFantasma.alpha = 0.7;

    //Datos falsos
    CrearDato(5,385,400,5,"distancia");
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
