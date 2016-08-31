function loadPantallaDeInicio(){
    game.load.image('titulo','assets/Titulo.png');
    game.load.image('fondoTitulo','assets/FondoTitleScreen.png');
    game.load.image('capaIzq','assets/CapaIzq.png');
    game.load.image('capaDer','assets/CapaDer.png');
    game.load.image('huellas','assets/huellas.png');
    game.load.image('linea','assets/LaLinea.png');
    game.load.spritesheet('PlayButton','assets/play.png',50,50);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}
function loadArchivoGuardado(){
    ArchivoDeGuardado = JSON.parse(localStorage.getItem('Guardado'));
    console.log("Cargando archivo");
    console.log(ArchivoDeGuardado)
    //localStorage.removeItem('Guardado'); //se usa para borrar un guardado en particular
    //localStorage.clear(); //se usa para borrar todos los guardados
    if (ArchivoDeGuardado != null){
        console.log("Cargando exitoso");
        NivelMaximo = ArchivoDeGuardado.Nivel;
        console.log("Nivel maximo " + NivelMaximo);
    }
    else {
        console.log("No habia un salvado previo");
    }
}
function saveArchivoGuardado(){
    console.log("trantado de salvar")
    console.log(ArchivoDeGuardado)
    if (ArchivoDeGuardado == null){
        NivelMaximo = nivelActual + 1;
        console.log("no habia un salvado previo, salve")
        ArchivoDeGuardado = {
	Nivel: NivelMaximo,
	Nota: null};
        localStorage.setItem("Guardado", JSON.stringify(ArchivoDeGuardado));
        console.log("Nivel maximo: " + NivelMaximo);
        console.log("Nota: " + NivelMaximo);
    }
    else if (nivelActual + 1 > ArchivoDeGuardado.Nivel){
        NivelMaximo = nivelActual + 1;
        console.log("habia un salvado previo, actualice")
        ArchivoDeGuardado = {
	Nivel: NivelMaximo,
	Nota: null};
        localStorage.setItem("Guardado", JSON.stringify(ArchivoDeGuardado));
        console.log("Nivel maximo: " + NivelMaximo);
        console.log("Nota: " + NivelMaximo);
    }
    else{
        console.log("El nivel maximo es mayor al nivel superado, no se reemplaza el guardado")

    }
}

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

    //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
    game.load.image('lienzoPista','assets/libreta.png');
    game.load.image('sello','assets/NivelPasado.png');

    game.load.image('pedazoHoja','assets/pedazohojaancha.png');
    game.load.image('victoria','assets/victoria.png');
    game.load.image('nube','assets/nube.png');
    game.load.image('nubeOrigen','assets/nubeorigen.png');

    game.load.image('division','assets/SimboloDivision.png');
    game.load.image('circulo','assets/circuloExplosion.png');
    game.load.image('rectanguloPista','assets/rectanguloPista.png');
    game.load.image('rectangulo','assets/rectangulo.png');
    game.load.image('pared','assets/Pared.png');
    game.load.image('fondoBlanco','assets/fondoblanco.png');

    game.load.spritesheet('simbolos','assets/Simbolos.png',28,28);
    game.load.spritesheet('PlayButton','assets/play.png',50,50);
    game.load.spritesheet('vector', 'assets/Vector.png',12,17);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('salida', 'assets/ptanimacion.png',30,59);
    game.load.spritesheet('botonMenu','assets/BotonMenu.png',50,50);
    game.load.spritesheet('botonPista','assets/BotonPista.png',50,50);
    game.load.spritesheet('botonClose','assets/BotonClose.png',50,50);
    game.load.spritesheet('BotonCerrar','assets/BotonCerrar.png',50,50);
    game.load.spritesheet('botonResetNivel','assets/Reset.png',50,50);
    game.load.spritesheet('botonSigNivel','assets/flechaverdetitila.png',209,55);

    game.load.spritesheet('botonRepetirNivel','assets/retry.png',154,115);

    game.load.spritesheet('botonMute','assets/Mute.png',50,50);


    PreCargarRepertorioSonido();
    PreCargarRepertorioMusica();
}
