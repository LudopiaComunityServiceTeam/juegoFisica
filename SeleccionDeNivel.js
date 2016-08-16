var player;
var salida;
var platforms;
var cursors;
var postIt;
var gameOverText;
var music1;
var ImagenDivision;
var ImagenCirculo;

var magnitudJugador;
var direccion = 1;
var numeroMagnitud;
var angulo = 0;//(3.1415)/4;
var posInicXPlayer;
var posInicYPlayer;
var limiteDeTiempo;
var nivelActual = 0;

var clicked = false;
var tieneDistancia = false;
var tieneTiempo = false;
var impulsado = false;
var animacionDivisionIniciada = false;
var animacionDivisionCreada = false;
var animacionCirculoIniciada = false;
var animacionCirculoCreada = false;
var juegoInicializado = false;
var salidaCerrandose;
var salidaAbierta;
var epilogoCorriendo;
var explosion = false;
var pistaEnPantalla;

var listaDeVectores = [];
var listaDeNumeros = [];
var listaDeEspinas = [];
var listaDeAngulos = [];
var ListaDeDatos = [];
var cuadroPista = [];
var cuadroVictoria = [];
var niveles = ['SeleccionDeNivel','Nivel1','Nivel2','Nivel3','Nivel4','Nivel5', 'Nivel6', 'Nivel7', 'Nivel8', 'Nivel9', 'Nivel10', 'Nivel11'];


var inicio;
var indice;




var SeleccionDeNivel = {
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
    if (!juegoInicializado){
    loadAll();
    }
},
create: function()
{
//Esta funcion dibuja objetos en pantalla en el orden en que se añadan
//Si un objeto se dibuja primero, quedara como background
//La funcion "create" se corre sola despues de preload, asi que no se
//preocupen en llamarla
//Cuando se crea un objeto se pide la ubicacion en x y y, y el nombre de la
//imagen que tendra
//En Phaser X y Y estan en 0,0 en la esquina superior izquierda y cuentan
//positivo hasta abajo.
    CrearFondo();
    CargarRepertorioMusica();
    CargarRepertorioSonido();
    if (!juegoInicializado){
        ReproducirLoopAudio(jazzFunkThoughts,0.3);
        game.time.events.add(Phaser.Timer.SECOND/2, escribir, this);
    }
    else{
        escribir();
    }
    juegoInicializado = true;
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    //Permitimos que el jugador colisione con cualquier objeto
    //en el grupo de las plataformas
}
};
function escribir(){

    var text = AñadirTexto(60,10,"Escoge un nivel:",colorTexto,50);
    text = AñadirTexto(312,150,"1",colorTexto,35);
    CrearBotonDeNivel(300, 200, 1);
    text = AñadirTexto(415,150,"2",colorTexto,35);
    CrearBotonDeNivel(400, 200, 2);
    text = AñadirTexto(515,150,"3",colorTexto,35);
    CrearBotonDeNivel(500, 200, 3);
    text = AñadirTexto(315,250,"4",colorTexto,35);
    CrearBotonDeNivel(300, 300, 4);
    text = AñadirTexto(415,250,"5",colorTexto,35);
    CrearBotonDeNivel(400, 300, 5);
    text = AñadirTexto(515,250,"6",colorTexto,35);
    CrearBotonDeNivel(500, 300, 6);
    text = AñadirTexto(315,350,"7",colorTexto,35);
    CrearBotonDeNivel(300, 400, 7);
    text = AñadirTexto(415,350,"8",colorTexto,35);
    CrearBotonDeNivel(400, 400, 8);
    text = AñadirTexto(515,350,"9",colorTexto,35);
    CrearBotonDeNivel(500, 400, 9);
    text = AñadirTexto(312,450,"10",colorTexto,35);
    CrearBotonDeNivel(300, 500, 10);
    text = AñadirTexto(414,450,"11",colorTexto,35);
    CrearBotonDeNivel(400, 500, 11);

}
