/* PreCarga el repertorio de musica completo (Preload)*/
function PreCargarRepertorioMusica() 
{
    /* Repertorio De Musica */
    game.load.audio('jazzFunkThoughts', ['assets/jazzFunkThoughts.ogg','assets/jazzFunkThoughts.mp3']);
}
/* PreCarga el repertorio de sonidos completo (Preload)*/
function PreCargarRepertorioSonido() 
{
    /* Repertorio De Sonidos */
    game.load.audio('BustedSoundEffect', ['assets/BustedSoundEffect.ogg']);
    game.load.audio('legoDisarm', ['assets/legoDisarm.ogg']);
    game.load.audio('OpenDoor', ['assets/OpenDoor.ogg']);
    game.load.audio('CloseDoor', ['assets/CloseDoor.ogg']);
    game.load.audio('Reset', ['assets/Reset.ogg']);
}
/* PreCarga el repertorio de musica completo (Create)*/
function CargarRepertorioMusica() 
{
    /* Repertorio De musica */
    jazzFunkThoughts = game.add.audio('jazzFunkThoughts');
}
/* PreCarga el repertorio de sonidos completo (Create)*/
function CargarRepertorioSonido() 
{
    /* Repertorio De Sonidos */
    BustedSoundEffect = game.add.audio('BustedSoundEffect');
    legoDisarm = game.add.audio('legoDisarm');
    OpenDoor = game.add.audio('OpenDoor');
    CloseDoor = game.add.audio('CloseDoor');
    Reset = game.add.audio('Reset');
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
