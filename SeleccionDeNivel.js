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
var xorigen;
var yorigen;
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
var listaDePropulsores = [];
var listaDeAngulos = [];
var ListaDeDatos = [];
var cuadroPista = [];
var cuadroVictoria = [];
var alerta = [];
var niveles = ['SeleccionDeNivel','Nivel1','Nivel2','Nivel3', 'Nivel4','Nivel5','Nivel6',
               'Nivel7', 'Nivel8', 'Nivel9', 'Nivel10',  'Nivel11', 'Nivel12', 'Nivel13',
               'Nivel14', 'Nivel15','Nivel16','Nivel17'/*,'Nivel18', 'Nivel19', 'Nivel20'*/, 'PantallaFinal'];
var resaltadores = [];
var ListaDeCiclos = []; //objetos tipo Ciclo
var ListaDeTiempos = [];


var inicio;
var indice;

var ArchivoDeGuardado;
var NivelMaximo;
var Nota = [];

var cancionActual;

var SeleccionDeNivel = {
		preload: function() {

//			Esta funcion carga todas las imagenes que vamos a utilizar para el juego
//			Se usa load.spritesheet cuando se quiere usar para una animación
//			Se usa load.image cuando se quiere usar como imagen fija.

//			Estos dos "loads" te piden el nombre con el que quieres guardar la imagen
//			y luego la ubicación del el archivo imagen

//			load.spritesheet te pide dos numeros despues de pedir la ubicación del archivo,
//			Estos numeros son la medida de como se va a picar la imagen en varias imagenes
//			mas pequeñas, por ejemplo, si tienes una spritesheet con un muñequito mirando
//			a la izq, luego al frente y luego a la derecha, tienes que ver que tan ancha
//			es cada imagen del muñequito y que tan alta es, pones el ancho en el primer
//			numero y la altura en el segundo
			if (!juegoInicializado){
				loadAll();
				loadArchivoGuardado();
			}
		},
		create: function()
		{
//			Esta funcion dibuja objetos en pantalla en el orden en que se añadan
//			Si un objeto se dibuja primero, quedara como background
//			La funcion "create" se corre sola despues de preload, asi que no se
//			preocupen en llamarla
//			Cuando se crea un objeto se pide la ubicacion en x y y, y el nombre de la
//			imagen que tendra
//			En Phaser X y Y estan en 0,0 en la esquina superior izquierda y cuentan
//			positivo hasta abajo.
			CrearFondo();
			DetenerCancion();
			CrearSilenciarSonido();
			CargarRepertorioMusica();
			CargarRepertorioSonido();
			if (!juegoInicializado){
				ReproducirLoopAudio(jazzFunkThoughts,0.3);
				game.time.events.add(Phaser.Timer.SECOND/2, escribir, this);
			}
			else{
				DetenerCancion();
				ReproducirLoopAudio(jazzFunkThoughts,0.3);
				escribir();
			}
			juegoInicializado = true;
		},

		update: function() {
//			La función update es la responsable de los "frames"
//			Aqui colocamos lo que es movimiento y cambios de variables
//			Se llama sola en forma de loop infinito

			//Permitimos que el jugador colisione con cualquier objeto
			//en el grupo de las plataformas
		}
};

function mapBackground(){
        mapa = game.add.sprite(70,100,'mapa1');
        mapa.scale.setTo(0.9,0.9);

	if (NivelMaximo >= 2){
                mapa.kill();
                mapa = game.add.sprite(70,100,'mapa2');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 3){
                mapa.kill();
                mapa = game.add.sprite(70,100,'mapa3');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 4){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa4');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 5){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa5');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 6){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa6');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 7){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa7');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 8){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa8');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 9){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa9');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 10){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa10');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 11){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa11');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 12){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa12');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 13){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa13');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 14){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa14');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 15){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa15');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 16){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa16');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 17){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa17');
                mapa.scale.setTo(0.9,0.9);
	}
	if (NivelMaximo >= 18){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa18');
                mapa.scale.setTo(0.9,0.9);
	}
    if (NivelMaximo >= 19){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa19');
                mapa.scale.setTo(0.9,0.9);
	}
    if (NivelMaximo >= 20){
                mapa.kill();
		mapa = game.add.sprite(70,100,'mapa20');
                mapa.scale.setTo(0.9,0.9);
	}
}

function escribir(){

	//var text = AñadirTexto(60,10,"Escoge un nivel:",colorTexto,50);

        mapBackground();
	text = AñadirTexto(95,75,"1",colorTexto,35);
	CrearBotonDeNivel(80, 110, 1);

	if (NivelMaximo >= 2){
		text = AñadirTexto(175,85,"2",colorTexto,35);
		CrearBotonDeNivel(160, 120, 2);
	}
	if (NivelMaximo >= 3){
		text = AñadirTexto(265,35,"3",colorTexto,35);
		CrearBotonDeNivel(250, 70, 3);
	}
	if (NivelMaximo >= 4){
		text = AñadirTexto(350,65,"4",colorTexto,35);
		CrearBotonDeNivel(335, 100, 4);
	}
	if (NivelMaximo >= 5){
		text = AñadirTexto(455,60,"5",colorTexto,35);
		CrearBotonDeNivel(440, 100, 5);
	}
	if (NivelMaximo >= 6){
		text = AñadirTexto(555,25,"6",colorTexto,35);
		CrearBotonDeNivel(540, 60, 6);
	}
	if (NivelMaximo >= 7){
		text = AñadirTexto(645,35,"7",colorTexto,35);
		CrearBotonDeNivel(630, 70, 7);
	}
	if (NivelMaximo >= 8){
		text = AñadirTexto(585,125,"8",colorTexto,35);
		CrearBotonDeNivel(570, 160, 8);
	}
	if (NivelMaximo >= 9){
		text = AñadirTexto(640,245,"9",colorTexto,35);
		CrearBotonDeNivel(625, 280, 9);
	}
	if (NivelMaximo >= 10){
		text = AñadirTexto(520,215,"10",colorTexto,35);
		CrearBotonDeNivel(505, 250, 10);
	}
	if (NivelMaximo >= 11){
		text = AñadirTexto(410,165,"11",colorTexto,35);
		CrearBotonDeNivel(395, 200, 11);
	}
	if (NivelMaximo >= 12){
		text = AñadirTexto(415,290,"12",colorTexto,35);
		CrearBotonDeNivel(400, 325, 12);
	}
	if (NivelMaximo >= 13){
		text = AñadirTexto(275,290,"13",colorTexto,35);
		CrearBotonDeNivel(260, 325, 13);
	}
	if (NivelMaximo >= 14){
		text = AñadirTexto(265,165,"14",colorTexto,35);
		CrearBotonDeNivel(250, 200, 14);
	}
	if (NivelMaximo >= 15){
		text = AñadirTexto(110,205,"15",colorTexto,35);
		CrearBotonDeNivel(105, 240, 15);
	}
	if (NivelMaximo >= 16){
		text = AñadirTexto(110,300,"16",colorTexto,35);
		CrearBotonDeNivel(95, 335, 16);
	}
	if (NivelMaximo >= 17){
		text = AñadirTexto(115,415,"17",colorTexto,35);
		CrearBotonDeNivel(100, 450, 17);
	}
	if (NivelMaximo >= 18){
		text = AñadirTexto(290,430,"18",colorTexto,35);
		CrearBotonDeNivel(275, 465, 18);
	}
    if (NivelMaximo >= 19){
		text = AñadirTexto(480,425,"19",colorTexto,35);
		CrearBotonDeNivel(465, 460, 19);
	}
    if (NivelMaximo >= 20){
		text = AñadirTexto(665,380,"20",colorTexto,35);
		CrearBotonDeNivel(650, 415, 20);
	}
}
