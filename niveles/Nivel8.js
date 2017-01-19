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
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    botonPistas = CrearBotonPista("Todo lo que sube tiene que caer...\n¡Escoge la rapidez correcta!");
    CrearSalida(400,300);
    CrearNube(390,256,410,296);
    salidaAbierta = false;
    limiteDeTiempo = 3;
    CrearEspinas(450,440);
    pared = CrearPared(500,440);
    CrearEspinas(450,340);
    pared = CrearPared(500,340);
    CrearEspinas(450,240);
    pared = CrearPared(500,240);
    CrearEspinas(450,140);
    pared = CrearPared(500,140);
    CrearEspinas(450,40);
    pared = CrearPared(500,40);
    CrearEspinas(350,490);
    pared = CrearPared(275,440);
    CrearEspinas(350,390);
    pared = CrearPared(275,340);
    CrearEspinas(350,290);
    pared = CrearPared(275,240);
    CrearEspinas(350,190);
    pared = CrearPared(275,140);
    CrearEspinas(350,90);
    pared = CrearPared(275,40);
    listaDeEspinas[5][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[5][0].angle = 180;
    listaDeEspinas[6][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[6][0].angle = 180;
    listaDeEspinas[7][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[7][0].angle = 180;
    listaDeEspinas[8][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[8][0].angle = 180;
    listaDeEspinas[9][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[9][0].angle = 180;
    CrearEspinas(415,25);
    listaDeEspinas[10][0].anchor.setTo(0.5, 0.5);
    listaDeEspinas[10][0].angle = 270;

    vector = CrearVector(150,300,0,0, true);
    posInicXPlayer = 400;
    posInicYPlayer = 450;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    //monologo de Sam
    monologo = AñadirTexto(470,550,"y cruzamos cada obstáculo",colorTexto,20);
    monologo.alpha = 0.01; 
    faseBorrado = 0;
    //
    CrearDato(3,405,226,3,"tiempo");
    numeroAngulo = CrearAnguloParaVectorControlable(90,390,50,90);

    //Datos falsos
    numeroMagnitud = CrearNumeroParaVectorControlable(600,660,300,6);
    numeroMagnitud = CrearNumeroParaVectorControlable(500,660,400,5);

    numeroMagnitud = CrearNumeroParaVectorControlable(400,160,300,4);
    numeroMagnitud = CrearNumeroParaVectorControlable(200,160,400,2);

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
