/* Carga el repertorio de musica completo */
function CargarRepertorioMusica() 
{
    /* Repertorio De Musica */
    game.load.audio('jazzFunkThoughts', ['assets/jazzFunkThoughts.ogg','assets/jazzFunkThoughts.mp3']);
}
/* Carga el repertorio de sonidos completo */
function CargarRepertorioSonido() 
{
    /* Repertorio De Sonidos */
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
    /* Cargamos el archivo */
    music = game.add.audio(cancion);
    /* Definimos que sera un loop */
    music.loop = true;
    /* Definimos el volumen */
    music.volume = volumen;
    /* Reproducimos el audio */
    music.play();
    /* Retornamos el objeto de audio */
    return music;
}
