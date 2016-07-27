var Nivel5 = {
preload: function() {


},
create: function() {

//Aqui declaramos variables que sabemos que vamos a utilizar para identificar
//objetos en nuestro juego.
//Cursors son las teclas arriba, abajo, izq y der, esto vino con el ejemplo
//de la página de phaser

//Esta funcion dibuja objetos en pantalla en el orden en que se añadan
//Si un objeto se dibuja primero, quedara como background
//La funcion "create" se corre sola despues de preload, asi que no se
//preocupen en llamarla
//Cuando se crea un objeto se pide la ubicacion en x y y, y el nombre de la
//imagen que tendra
//En Phaser X y Y estan en 0,0 en la esquina superior izquierda y cuentan
//positivo hasta abajo.

    //Se activa la fisica de tipo "Arcade Physics"
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Se agrega el background del juego
    CrearFondo();

    //Se crea un grupo, este grupo se utilizara luego para agregar propiedades
    //a las plataformas de un solo golpe
    platforms = game.add.group();

    //Hacemos que las plataformas esten incluidas en la fisica del juego
    platforms.enableBody = true;

    CrearPiso();

    //  Crear la puerta de salida
    CrearSalida(600,486);
    //  Crear el cuadro del vector
    CrearTimer();

    //  Crear el boton de play
    CrearPlay();
    limiteDeTiempo = 4;
    AñadirTexto(600,550,4,colorTiempo,35);
    vector = CrearVector(400,350,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    listaDeCuadros.push(cuadro); //El cuadro esta encima del vector, arreglar!

//meter los push dentro de las herramientas de crear
    numeroAngulo = CrearAnguloParaVector(90,550,300,90);
    listaDeAngulos.push(numeroAngulo);
    numeroAngulo = CrearAnguloParaVector(60,650,300,60);
    listaDeAngulos.push(numeroAngulo);
    numeroMagnitud = CrearNumeroParaVector(400,550,250,4);
    listaDeNumeros.push(numeroMagnitud);
    espinas = game.add.sprite(300,440,'Espinas');
    listaDeEspinas.push(espinas);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearMano(listaDeAngulos[0].x -55 , listaDeAngulos[0].y + 25);

    // informacion sobre el angulo
    //info = "Un vector también tiene un \nángulo que define su sentido, \nhacia donde apunta";
    //AñadirTexto(100, 40, info, colorTexto, 24);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    //Permitimos que el jugador colisione con cualquier objeto
    //en el grupo de las plataformas
    game.physics.arcade.collide(player, platforms);
    ControlJugador();
    if (!(listaDeNumeros[0] === undefined && listaDeAngulos[0] === undefined)) {
        AnimarMano(listaDeAngulos[0],listaDeCuadros[0],[-55,40,60,65]);
    }
    ControlarNivel();
}
};
