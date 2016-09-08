var player;
var puntuacion;
var pierdePuntos;
var salida;
var platforms;
var plataforma;
var cursors;
var postIt;
var reintentarText;
var music1;
var ImagenDivision;
var ImagenCirculo;
var botonPistas;
var ResaltadorPista;
var textoDuda;

var magnitudJugador;
var xnube;
var ynube;
var direccion = 1;
var numeroMagnitud;
var angulo = 0;//(3.1415)/4;
var posInicXPlayer;
var posInicYPlayer;
var limiteDeTiempo;
var nivelActual = 0;
var vertical = 0;

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
var dudas = false;
var pistaEnPantalla;
var clickedPista = false;
var goleft = false;
var goright = true;
var godown = false;
var nubeCreada = false;
var vectorEnContacto = false;

var listaDeVectores = [];
var listaDeNumeros = [];
var listaDeEspinas = [];
var listaDeAngulos = [];
var ListaDeDatos = [];
var cuadroPista = [];
var cuadroVictoria = [];
var niveles = ['SeleccionDeNivel','Nivel1','Nivel2','Nivel3', 'Nivel4','Nivel5','Nivel6', 'Nivel7', 'Nivel8', 'Nivel9', 'Nivel10',  'Nivel11', 'Nivel12', 'Nivel13', 'Nivel14', 'Nivel15'];
var resaltadores = [];
var ListaDeCiclos = []; //objetos tipo Ciclo
var ListaDeTiempos = [];


var inicio;
var indice;

var ArchivoDeGuardado;
var NivelMaximo;
var Nota;


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
        loadArchivoGuardado();
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
    CallarCancion();
    CrearSilenciarSonido();
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
    console.log(NivelMaximo);
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
    text = AñadirTexto(212,60,"1",colorTexto,35);
    CrearBotonDeNivel(200, 100, 1);
    if (NivelMaximo >= 2){
        text = AñadirTexto(315,60,"2",colorTexto,35);
        CrearBotonDeNivel(300, 100, 2);
    }
    if (NivelMaximo >= 3){
        text = AñadirTexto(415,60,"3",colorTexto,35);
        CrearBotonDeNivel(400, 100, 3);
    }
    if (NivelMaximo >= 4){
        text = AñadirTexto(515,60,"4",colorTexto,35);
        CrearBotonDeNivel(500, 100, 4);
    }
    if (NivelMaximo >= 5){
        text = AñadirTexto(615,60,"5",colorTexto,35);
        CrearBotonDeNivel(600, 100, 5);
}
    if (NivelMaximo >= 6){
        text = AñadirTexto(215,165,"6",colorTexto,35);
        CrearBotonDeNivel(200, 200, 6);
}
    if (NivelMaximo >= 7){
        text = AñadirTexto(315,165,"7",colorTexto,35);
        CrearBotonDeNivel(300, 200, 7);
    }
    if (NivelMaximo >= 8){
        text = AñadirTexto(415,165,"8",colorTexto,35);
        CrearBotonDeNivel(400, 200, 8);
    }
    if (NivelMaximo >= 9){
        text = AñadirTexto(515,165,"9",colorTexto,35);
        CrearBotonDeNivel(500, 200, 9);
    }
    if (NivelMaximo >= 10){
        text = AñadirTexto(615,165,"10",colorTexto,35);
        CrearBotonDeNivel(600, 200, 10);
    }
    if (NivelMaximo >= 11){
        text = AñadirTexto(215,265,"11",colorTexto,35);
        CrearBotonDeNivel(200, 300, 11);
    }
    if (NivelMaximo >= 12){
        text = AñadirTexto(315,265,"12",colorTexto,35);
        CrearBotonDeNivel(300, 300, 12);
    }
    if (NivelMaximo >= 13){
        text = AñadirTexto(415,265,"13",colorTexto,35);
        CrearBotonDeNivel(400, 300, 13);
    }
    if (NivelMaximo >= 14){
        text = AñadirTexto(515,265,"14",colorTexto,35);
        CrearBotonDeNivel(500, 300, 14);
    }
    if (NivelMaximo >= 15){
        text = AñadirTexto(615,265,"15",colorTexto,35);
        CrearBotonDeNivel(600, 300, 15);
    }

}
