var Nivel15 = {
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

    /* Dato Distancia */
    lineaizq = game.add.sprite(100, 450, 'linea');
    lineaizq.scale.setTo(25, 1);
    lineader = game.add.sprite(400, 450, 'linea');
    lineader.scale.setTo(20, 1);
    CrearDato(10,355,400,10,"distancia");

    /* Dato Distancia */
    lineaizq = game.add.sprite(100, 400, 'linea');
    lineaizq.scale.setTo(10, 1);
    lineader = game.add.sprite(250, 400, 'linea');
    lineader.scale.setTo(10, 1);
    CrearDato(5,205,350,5,"distancia");

    CrearPlataforma(50,300,1,1);
    CrearPlataforma(150,300,1,1);
    CrearPlataforma(250,300,1,1);

    CrearEspinas(150,100);
    CrearPropulsores(250,0,1);
    listaDeEspinas[0][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[0],[0,0],[-2,2],[800,800],[100,300],1));
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[0],[0,0],[-2,2],[800,800],[0,200],1));

//pared der
    CrearPropulsores(0,435,0);
    CrearPropulsores(0,335,0);
    CrearEspinas(100,535);
    CrearEspinas(100,435);
    listaDeEspinas[1][0].angle = 180;
    listaDeEspinas[2][0].angle = 180;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[1],[0,6],[0,0],[50,750],[450,535],1));
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[2],[0,6],[0,-0],[50,750],[450,435],1));
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[1],[0,6],[0,0],[50,650],[450,535],1));
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[2],[0,6],[0,-0],[50,650],[450,435],1));
    paredDer = CrearPared(750,435);
    CrearEspinas(700,435);

    vector = CrearVector(350,250,0,0, true);
    ecuacionVelocidad = CrearEcuacionVelocidad(534,150);

    CrearNube(posicionPuertaRealX-10,posicionPuertaRealY-50,posicionPuertaRealX+10,posicionPuertaRealY-10);
    CrearDato(limiteDeTiempo,posicionPuertaRealX,posicionPuertaRealY-76,limiteDeTiempo,"tiempo");
    posInicXPlayer = 85;
    posInicYPlayer = game.world.height - 360;
    //monologo de Sam
    monologo = AñadirTexto(100,200,"A él, al problema... y a mi",colorTexto,20);
    monologo.alpha = 0.01;
    faseBorrado = 0;
    //
    CrearJugador(posInicXPlayer, posInicYPlayer);
    DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
    propulsoresAnim = false;
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    if (clicked){
        if (!propulsoresAnim){
            console.log("entre!");
            for (i = 0; i < listaDePropulsores.length; i++){
                console.log("wolo");
                listaDePropulsores[i][0].animations.play('prendido');
            }
            propulsoresAnim = true;
        }
    }
    else {
        if (propulsoresAnim){
            console.log("sali!");
            for (i = 0; i < listaDePropulsores.length; i++){
                listaDePropulsores[i][0].animations.stop();
            }
            propulsoresAnim = false;
        }
    }
    ControlJugador();
    ControlarNivel();
    BorrarTexto();

    game.debug.bodyInfo(player);
}
};
