function loadAll(){
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

    game.load.image('cuerpo','assets/Cuerpo.png');
    game.load.image('brazo','assets/Brazo.png');
    game.load.image('pierna','assets/Pierna.png');
    game.load.image('cabeza','assets/Cabeza.png');
    game.load.image('Espinas', 'assets/Espinas.png');
    game.load.image('cuadroVector','assets/cuadroVector.png');
    game.load.image('post-it-verde', 'assets/post-it-verde.png');
    game.load.image('fondo', 'assets/fondo.png');
    game.load.image('piso', 'assets/suelo.png');
    game.load.image('platform', 'assets/plataforma.png');
    game.load.image('mano', 'assets/hand1.png');
    game.load.image('EcuacionVelocidadCamuflada', 'assets/EcuacionVelocidadCamuflada.png');
    game.load.image('linea', 'assets/LineaDistancia.png');
    game.load.image('ecuacionVelocidad','assets/Ecuacion velocidad.png');
    game.load.image('ecuacionAceleracion','assets/Ecuacion aceleracion.png');
    game.load.image('lienzoPista','assets/LienzoPista.png');
    game.load.image('sello','assets/NivelPasado.png');
    //game.load.image('botonSigNivel','assets/flechaverde.png');
    game.load.image('pedazoHoja','assets/pedazohoja.png');


    game.load.spritesheet('simbolos','assets/Simbolos.png',28,28);
    game.load.spritesheet('PlayButton','assets/play.png',50,50);
    game.load.spritesheet('vector', 'assets/Vector.png',12,17);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('salida', 'assets/ptanimacion.png',30,59);
    game.load.spritesheet('botonMenu','assets/BotonMenu.png',50,50);
    game.load.spritesheet('botonPista','assets/BotonPista.png',50,50);
    game.load.spritesheet('botonClose','assets/BotonClose.png',50,50);
    game.load.spritesheet('botonResetNivel','assets/Reset.png',50,50);
    //game.load.spritesheet('botonSigNivel','assets/BotonSigNivel.png',50,50);
    game.load.spritesheet('botonSigNivel','assets/flechaverdetitila.png',208,55);
    

    PreCargarRepertorioSonido();
    PreCargarRepertorioMusica();
}
