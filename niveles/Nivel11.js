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
    CrearBotonPista("Todo lo que sube tiene que caer...\n¡Escoge la rapidez correcta!");
    CrearSalida(400,300);
    salidaAbierta = false;
    limiteDeTiempo = 3;

    CrearEspinas(450,440);
    CrearEspinas(450,340);
    CrearEspinas(450,240);
    CrearEspinas(450,140);
    CrearEspinas(450,40);
    CrearEspinas(350,490);
    CrearEspinas(350,390);
    CrearEspinas(350,290);
    CrearEspinas(350,190);
    CrearEspinas(350,90);
    listaDeEspinas[5].anchor.setTo(0.5, 0.5);
    listaDeEspinas[5].angle = 180;
    listaDeEspinas[6].anchor.setTo(0.5, 0.5);
    listaDeEspinas[6].angle = 180;
    listaDeEspinas[7].anchor.setTo(0.5, 0.5);
    listaDeEspinas[7].angle = 180;
    listaDeEspinas[8].anchor.setTo(0.5, 0.5);
    listaDeEspinas[8].angle = 180;
    listaDeEspinas[9].anchor.setTo(0.5, 0.5);
    listaDeEspinas[9].angle = 180;
    CrearEspinas(415,25);
    listaDeEspinas[10].anchor.setTo(0.5, 0.5);
    listaDeEspinas[10].angle = 270;

    vector = CrearVector(150,300,0,0, true);
    posInicXPlayer = 400;
    posInicYPlayer = 450;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearDato(3,400,225,3,"tiempo");
    numeroAngulo = CrearAnguloParaVectorControlable(90,550,200,90);

    //Datos falsos
    numeroMagnitud = CrearNumeroParaVectorControlable(600,550,300,6);
    numeroMagnitud = CrearNumeroParaVectorControlable(500,550,400,5);

    numeroMagnitud = CrearNumeroParaVectorControlable(400,250,300,4);
    numeroMagnitud = CrearNumeroParaVectorControlable(200,250,400,2);

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
