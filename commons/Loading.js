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
    console.log(ArchivoDeGuardado);
    localStorage.removeItem('Guardado'); //se usa para borrar un guardado en particular
    localStorage.clear(); //se usa para borrar todos los guardados
    if (ArchivoDeGuardado != null){
        console.log("Cargando exitoso");
        NivelMaximo = ArchivoDeGuardado.Nivel;
        console.log("Nivel maximo " + NivelMaximo);
        Nota = ArchivoDeGuardado.Nota;
        console.log("Nota " + Nota);
    }
    else {
        console.log("No habia un salvado previo");
        NivelMaximo = 1;
        Nota[0] = 20;
        for (i = 0; i < 20; i++){
            Nota[i] = 20;
        }
    }
}

function saveArchivoGuardado(){
    console.log("tratando de salvar");
    console.log(ArchivoDeGuardado);

    if (ArchivoDeGuardado == null){
        NivelMaximo = nivelActual + 1;
        console.log("no habia un salvado previo, salve");
        console.log("Nivel maximo: " + NivelMaximo);
        console.log("Nota: " + Nota);
    }
    else if (!explosion) { //paso el nivel actual
        NivelMaximo = nivelActual + 1;
        console.log("habia un salvado previo, actualice");
        console.log("Nivel maximo: " + NivelMaximo);
        console.log("Nota: " + Nota);
    }
    else { //no ha pasado el nivel actual
        NivelMaximo = nivelActual;
        console.log("Nivel maximo: " + NivelMaximo);
        console.log("Nota: " + Nota);
    }
    ArchivoDeGuardado = { Nivel: NivelMaximo,
                          Nota: Nota};
    localStorage.setItem("Guardado", JSON.stringify(ArchivoDeGuardado));
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

    //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

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
    //game.load.image('EcuacionVelocidadCamuflada', 'assets/EcuacionVelocidadCamuflada.png');
    game.load.image('EcuacionVelocidadCamuflada', 'assets/resolvedor.png');
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
    game.load.image('propulsor','assets/Propulsores.png');
    game.load.image('pared','assets/Pared.png');
    game.load.image('pared50','assets/Pared50.png');
    game.load.image('fondoBlanco','assets/fondoblanco.png');
    //game.load.image('signoInterrogacion','assets/signoInterrogacion.png');

    game.load.image('mapa1','assets/Mapa/mapa1.png');
    game.load.image('mapa2','assets/Mapa/mapa2.png');
    game.load.image('mapa3','assets/Mapa/mapa3.png');
    game.load.image('mapa4','assets/Mapa/mapa4.png');
    game.load.image('mapa5','assets/Mapa/mapa5.png');
    game.load.image('mapa6','assets/Mapa/mapa6.png');
    game.load.image('mapa7','assets/Mapa/mapa7.png');
    game.load.image('mapa8','assets/Mapa/mapa8.png');
    game.load.image('mapa9','assets/Mapa/mapa9.png');
    game.load.image('mapa10','assets/Mapa/mapa10.png');
    game.load.image('mapa11','assets/Mapa/mapa11.png');
    game.load.image('mapa12','assets/Mapa/mapa12.png');
    game.load.image('mapa13','assets/Mapa/mapa13.png');
    game.load.image('mapa14','assets/Mapa/mapa14.png');
    game.load.image('mapa15','assets/Mapa/mapa15.png');
    game.load.image('mapa16','assets/Mapa/mapa16.png');
    game.load.image('mapa17','assets/Mapa/mapa17.png');
    game.load.image('mapa18','assets/Mapa/mapa18.png');
    game.load.image('mapa19','assets/Mapa/mapa19.png');
    game.load.image('mapa20','assets/Mapa/mapa20.png');

    game.load.spritesheet('simbolos','assets/Simbolos.png',28,28);
    game.load.spritesheet('PlayButton','assets/play.png',50,50);
    game.load.spritesheet('vector', 'assets/Vector.png',12,17);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('salida', 'assets/ptanimacion.png',30,59);
    game.load.spritesheet('botonMenu','assets/BotonMenu.png',50,50);
    game.load.spritesheet('botonPista','assets/BotonPista.png',52,52);
    game.load.spritesheet('botonClose','assets/BotonClose.png',50,50);
    game.load.spritesheet('BotonCerrar','assets/BotonCerrar.png', 40,39);
    game.load.spritesheet('botonResetNivel','assets/Reset.png',50,50);
    game.load.spritesheet('botonSigNivel','assets/flechaverdetitila.png',209,55);
    game.load.spritesheet('botonRepetirNivel','assets/retry.png',154,115);
    game.load.spritesheet('botonMute','assets/Mute.png',50,50);

    game.load.spritesheet('signoInterrogacion','assets/framesInterrogacion2.png',50.2,70);
    


    PreCargarRepertorioSonido();
    PreCargarRepertorioMusica();
}
