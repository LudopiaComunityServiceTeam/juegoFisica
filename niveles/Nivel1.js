var Nivel1 = {
preload: function() {


},
create: function() {

//Aqui declaramos variables que sabemos que vamos a utilizar para identificar
//objetos en nuestro juego.
//Cursors son las teclas arriba, abajo, izq y der, esto vino con el ejemplo
//de la página de phaser


//var PlayButton;
//var simboloVector;


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
    CrearSalida(600,484);
    salidaAbierta = false;
    CrearTimer(Infinity);

    //  Crear el boton de play
    CrearPlay();
    limiteDeTiempo = Infinity;
    vector = CrearVector(400,300,300,0);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    jugador = CrearJugador(posInicXPlayer, posInicYPlayer);
    //  Crear texto
    text = AñadirTexto(200,200,"Esto es un \nvector",colorTexto,48);
    text.angle = -20;
    tutorial1();
    //Crear mano
    CrearMano(290, 275);

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    //Permitimos que el jugador colisione con cualquier objeto
    //en el grupo de las plataformas
    game.physics.arcade.collide(player, platforms);


    ControlJugador();
    ControlarNivel();
    

    if (ChequearOverlap(player, vector)) {
        pararTitilar(jugador, {evento: evento, objeto2: objeto2});
        // objeto2 = resaltarSprite(400, 550, 1.2, 1.2, 'PlayButton');
        // PlayButton.events.onInputDown.addOnce(pararTitilar, {evento: evento, objeto2: objeto2});
    }
    //Animacion de la mano

    AnimarMano(vector,player,[-100,-25,-50,0]);
 }
};

function tutorial1(){
    resaltarSprite(397,300, 1.2, 1.7, 'vector');
    vector.events.onInputDown.add(pararTitilar, {evento: evento, objeto2: objetoTitila});
    vector.events.onDragStart.addOnce(resaltarPlayerTutorial, this);
}

function resaltarPlayerTutorial(objeto) {
    objeto2 = resaltarSprite(posInicXPlayer+16, posInicYPlayer+23, 1.2, 1.2, 'dude');
}
