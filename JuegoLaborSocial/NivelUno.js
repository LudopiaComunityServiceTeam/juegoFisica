var player;
var posInicXPlayer;
var posInicYPlayer;
var salida;
var platforms;
var cursors;
var clicked = false;
var magnitudJugador;
var direccion = 1;
var angulo = 0;//(3.1415)/4;
var tieneDistancia = false;
var tieneTiempo = false;
var impulsado = false;
var listaDeCuadros = [];
var listaDeNumeros = [];
var listaDeEspinas = [];
var listaDeAngulos = [];
var ListaDeDatos = [];
var numeroMagnitud;
var niveles = ['NivelUno','Decision','NivelDos','IntroduccionAngulo', 'IntroduccionEcuacionCamuflada' ,'Main_game'];
var nivelActual = 0;
var explosion = false;

var Nivel1 = {
preload: function() {

//Esta funcion carga todas las imagenes que vamos a utilizar para el juego
//Se usa load.spritesheet cuando se quiere usar para una animación
//Se usa load.image cuando se quiere usar como imagen fija.

//Estos dos "loads" te piden el nombre con el que quieres guardar la imagen
//y luego la ubicación del el archivo imagen

//load.spritesheet te pide dos numeros despues de pedir la ubicación del archivo,
//Estos numeros son la medida de como se va a picar la imagen en varias imagenes
//mas pequeñas, por ejemplo, si tienes una spritesheet con un muñequito mirando
//a la izq, luego al frente y luego a la derecha, tienes que ver que tan ancha
//es cada imagen del muñequito y que tan alta es, pones el ancho en el primer
//numero y la altura en el segundo

    game.load.image('fondo', 'assets/fondo.png');
    game.load.image('esUnVector', 'assets/estoEsUnVector.png');
    game.load.spritesheet('simbolos','assets/Simbolos.png',28,28);
    game.load.spritesheet('PlayButton','assets/play.png',50,50);
    game.load.image('salida', 'assets/salida.png');
    game.load.image('piso', 'assets/suelo.png');
    game.load.image('platform', 'assets/plataforma.png');
    game.load.image('vector', 'assets/Vector.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('numeros', 'assets/numeros.png', 40, 65);

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
    game.add.sprite(0, 0, 'fondo');

    //Se crea un grupo, este grupo se utilizara luego para agregar propiedades
    //a las plataformas de un solo golpe
    platforms = game.add.group();

    //Hacemos que las plataformas esten incluidas en la fisica del juego
    platforms.enableBody = true;

    CrearPiso();

    //  Crear la puerta de salida
    salida = game.add.sprite(600,486,'salida');
    CrearTimer();
    //  Crear el boton de play
    CrearPlay();
    vector = CrearVector(400,300,300,0);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    //  Crear texto
    var esUnVector = "Esto es un \nvector";
    var style = { font: "48px Gloria Hallelujah",  fill: colorText, align: "center" };

    var text = game.add.text(70, 200, esUnVector, style);
    text.angle = -20;
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    //Permitimos que el jugador colisione con cualquier objeto
    //en el grupo de las plataformas
    game.physics.arcade.collide(player, platforms);
    ControlJugador();
}
};
