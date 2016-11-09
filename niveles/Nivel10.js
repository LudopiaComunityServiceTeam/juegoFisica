var Nivel10 = {
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
    botonPistas = CrearBotonPista("Con la magnitud cero no te puedes\nmover... Trata de crear una nueva\nmagnitud con el resolvedor. Usa la\ndistancia (número naranja) y el tiempo\n(número rojo), te ayudarán.");
    CrearSalida(720,479);
    CrearNube(705,430,725,475);
    limiteDeTiempo = 4;
    paredIzq = CrearPared(50,37);
    paredIzq = CrearPared(50,137);
    paredIzq = CrearPared(50,237);
    paredIzq = CrearPared(50,337);
    paredIzq = CrearPared(50,437);
    paredDer = CrearPared(750,37);
    paredDer = CrearPared(750,137);
    paredDer = CrearPared(750,237);
    paredDer = CrearPared(750,337);
    paredDer = CrearPared(750,437);

    techo = CrearPared(650,186);
    techo.anchor.setTo(0.5, 0.5);
    techo.angle = 90;
    techo = CrearPared(550,186);
    techo.anchor.setTo(0.5, 0.5);
    techo.angle = 90;
    techo = CrearPared(450,186);
    techo.anchor.setTo(0.5, 0.5);
    techo.angle = 90;
    techo = CrearPared(350,186);
    techo.anchor.setTo(0.5, 0.5);
    techo.angle = 90;
    techo = CrearPared(250,186);
    techo.anchor.setTo(0.5, 0.5);
    techo.angle = 90;
    techo = CrearPared(150,186);
    techo.anchor.setTo(0.5, 0.5);
    techo.angle = 90;
    CrearPared50(725,186);

    adorno = CrearPared50(425,136,0);
    adorno = CrearPared50(425,86,1);
    adorno = CrearPared50(475,136,2);
    adorno = CrearPared50(375,136,3);

    lineaizq = game.add.sprite(125, 400, 'linea');
    lineaizq.scale.setTo(25, 1);
    lineader = game.add.sprite(475, 400, 'linea');
    lineader.scale.setTo(25, 1);
    ecuacionVelocidad = CrearEcuacionVelocidad(183,225);
    vector = CrearVector(625,250,0,0, true);
    posInicXPlayer = 100;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearDato(12,405,350,12,"distancia");
    CrearDato(4,720,400,4,"tiempo");

    CrearMano(ListaDeDatos[0].x -55 , ListaDeDatos[0].y + 25);
    inicio = ListaDeDatos;
    indice = 0;
    DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    if (!(inicio[0] === undefined)) {
        AnimarMano(inicio,ecuacionVelocidad,[-65,25,-40,50]);
    }
}
};
