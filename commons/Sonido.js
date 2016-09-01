/* PreCarga el repertorio de musica completo (Preload)*/
function PreCargarRepertorioMusica() 
{
    /* Repertorio De Musica */
    game.load.audio('jazzFunkThoughts', ['assets/Music/jazzFunkThoughts.ogg','assets/jazzFunkThoughts.mp3']);
    game.load.audio('AnAmazingStart', ['assets/Music/AnAmazingStart.ogg']);
    game.load.audio('Stop_And_Think', ['assets/Music/Stop_And_Think.ogg']);
    game.load.audio('PaceItUp', ['assets/Music/PaceItUp.ogg']);
}
/* PreCarga el repertorio de sonidos completo (Preload)*/
function PreCargarRepertorioSonido() 
{
    /* Repertorio De Sonidos */
    game.load.audio('legoDisarm', ['assets/Sounds/legoDisarm.ogg']);
    game.load.audio('OpenDoor', ['assets/Sounds/OpenDoor.ogg']);
    game.load.audio('CloseDoor', ['assets/Sounds/CloseDoor.ogg']);
    game.load.audio('Reset', ['assets/Sounds/Reset.ogg']);
    game.load.audio('VectorFit', ['assets/Sounds/VectorFit.ogg']);
    game.load.audio('Tick', ['assets/Sounds/Tick.ogg']);
    game.load.audio('Tock', ['assets/Sounds/Tock.ogg']);
}
/* PreCarga el repertorio de musica completo (Create)*/
function CargarRepertorioMusica() 
{
    /* Repertorio De musica */
    jazzFunkThoughts = game.add.audio('jazzFunkThoughts');
    AnAmazingStart = game.add.audio('AnAmazingStart');
    Stop_And_Think = game.add.audio('Stop_And_Think');
    PaceItUp = game.add.audio('PaceItUp');
}
/* PreCarga el repertorio de sonidos completo (Create)*/
function CargarRepertorioSonido() 
{
    /* Repertorio De Sonidos */
    legoDisarm = game.add.audio('legoDisarm');
    OpenDoor = game.add.audio('OpenDoor');
    CloseDoor = game.add.audio('CloseDoor');
    Reset = game.add.audio('Reset');
    VectorFit = game.add.audio('VectorFit');
    Tick = game.add.audio('Tick');
    Tock = game.add.audio('Tock');
}
/* Carga una cancion en particular */
function CargarCancion(cancion) 
{
    directorioOgg = 'assets/' + cancion + '.ogg';
    directorioMp3 = 'assets/' + cancion + '.mp3';
    game.load.audio(cancion, [directorioOgg,directorioMp3]);
}
/* Reproduce el archivo de audio con el nombre 'cancion' y lo configura como loop en
volumen 'volumen' */
function ReproducirLoopAudio(cancion,volumen) 
{
    /* Definimos que sera un loop */
    cancion.loop = true;
    /* Definimos el volumen */
    cancion.volume = volumen;
    /* Reproducimos el audio */
    cancion.play();
}

/* Pausa la cancion de la intro y coloca una nueva cancion para el nivel */
function ReproducirMusicaNivel(cancion) 
{
    AnAmazingStart.pause();
    ReproducirLoopAudio(cancion,0.3);
}

/* Pausa todas las canciones */
function CallarCancion() 
{
    jazzFunkThoughts.pause();
    AnAmazingStart.pause();
    Stop_And_Think.pause();
    PaceItUp.pause();
}