var Nivel18 = {
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
    limiteDeTiempo = 5;


    botonPistas = CrearBotonPista("Ok...\nAhora si deberia preocuparme,\nAlgo me dice que\nlas espinas de abajo son rapidas.");

    var posicionPuertaRealX = 613;
    var posicionPuertaRealY = 480;

    CrearSalida(posicionPuertaRealX,posicionPuertaRealY);

    CrearPlataforma(50,300,1,1);
    CrearPlataforma(150,300,1,1);

    CrearEspinas(150,100);
    listaDeEspinas[0][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[0],[0,0],[2,-2],[450,300],[300,100],1));
    CrearPlataforma(300,200,1,1);


//pared der
    CrearEspinas(100,535);
    CrearEspinas(100,435);
    listaDeEspinas[1][0].angle = 180;
    listaDeEspinas[2][0].angle = 180;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[1],[0,6],[0,0],[50,750],[450,535],1));
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[2],[0,6],[0,-0],[50,750],[450,435],1));
    paredDer = CrearPared(750,435);
    CrearEspinas(700,435);

    vector = CrearVector(400,200,0,0, true);

    numeroMagnitud = CrearNumeroParaVectorControlable(400,400,300,4);
    numeroMagnitud = CrearNumeroParaVectorControlable(100,300,300,1);
    numeroMagnitud = CrearNumeroParaVectorControlable(200,200,300,2);

    CrearNube(posicionPuertaRealX-10,posicionPuertaRealY-50,posicionPuertaRealX+10,posicionPuertaRealY-10);
    CrearDato(limiteDeTiempo,posicionPuertaRealX,posicionPuertaRealY-76,limiteDeTiempo,"tiempo");
    posInicXPlayer = 85;
    posInicYPlayer = game.world.height - 360;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    game.debug.bodyInfo(player);
}
};
