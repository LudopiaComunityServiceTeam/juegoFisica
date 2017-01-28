/**
* Funcion que crea el sprite del boton para inicial
* el nivel.
*
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param nivel: nivel al que pertenece el boton
*
*/
function CrearBotonDeNivel(x,y,nivel){

    button = game.add.sprite(x, y, 'PlayButton');
    button.i = nivel;
    button.inputEnabled = true;
    button.events.onInputDown.add(SeleccionarNivel, this);
    button.events.onInputOver.add(overButton, this);
    button.events.onInputOut.add(outButton, this);

}

/**
* Funcion que inicia el nivel escogido.
*
* @param item: nivel seleccionado
*
*/

function SeleccionarNivel(item){
    //Determina que pasa cuando se hace click en el boton de play
    if (item.i != NivelMaximo && item.i !== 0) {
        alertaDestroy();
        var hoja = game.add.sprite(200,150,'pedazoHoja');
        hoja.scale.setTo(0.4,0.43);
        alerta.push(hoja);
        var texto = "Al volver a jugar el nivel " + item.i + "\nperderas el progreso a\npartir de ese nivel\n¿Quieres continuar? ";
        var alertatexto = AñadirTexto(260,225,texto,colorTexto,25);
        alertatexto.angle = -5;
        alerta.push(alertatexto);

        var si = AñadirTexto(350,370,"Si",colorTexto,25);
        si.angle = -5;
        si.inputEnabled = true;
        si.input.useHandCursor = true;
        si.events.onInputDown.add(function(si){iniciarNivel(item.i);}, this);
        si.events.onInputOver.add(overText, this);
        si.events.onInputOut.add(outText, this);
        alerta.push(si);

        var no = AñadirTexto(400,365,"No",colorTexto,25);
        no.angle = -5;
        no.inputEnabled = true;
        no.input.useHandCursor = true;
        no.events.onInputDown.add(function(no){alertaDestroy();}, this);
        no.events.onInputOver.add(overText, this);
        no.events.onInputOut.add(outText, this);
        alerta.push(no);
    }
    else {
        iniciarNivel(item.i);
    }
}

function iniciarNivel(nivel) {
    game.state.start(niveles[nivel]);
    nivelActual = nivel;
    resetVariables();
}

function alertaDestroy(){
    for (i = 0; i < alerta.length; i++){
        if (alerta[i] !== undefined) {
            alerta[i].destroy();
        }
    }
}

function overText(text){
    text.fill = '#00cc00'; //verde
}

function outText(text){
    text.fill = colorTexto;
}
/**
* Funcion que el boton de seleccionar nivel
*
*/
function CrearBotonMenu(){

    botonMenu = game.add.sprite(750, 545, 'botonMenu');
    botonMenu.frame = 0;
    botonMenu.i = 0;
    botonMenu.inputEnabled = true;
    botonMenu.events.onInputDown.add(SeleccionarNivel, this);
    botonMenu.events.onInputOver.add(overButton, this);
    botonMenu.events.onInputOut.add(outButton, this);

}

/**
* Funcion que el boton de reiniciar nivel
*
*/
function CrearBotonReset(){

    botonReset = game.add.sprite(150, 275, 'botonResetNivel');
    botonReset.frame = 0;
    botonReset.i = 0;
    botonReset.inputEnabled = true;
    botonReset.events.onInputDown.add(ReiniciarNivel, this);
    botonReset.events.onInputOver.add(overButton, this);
    botonReset.events.onInputOut.add(outButton, this);
    return botonReset;
}

/**
* Funcion que el boton de repetir nivel
*
*/
function CrearBotonRepetirNivel(){

    texto = AñadirTexto(180,200,'Repetir Nivel',colorTexto,35);
    texto.inputEnabled = true;
    texto.events.onInputDown.add(ReiniciarNivel, this);
    cuadroVictoria.push(texto);

    botonRepetir = game.add.sprite(230, 260, 'botonRepetirNivel');
    botonRepetir.scale.setTo(0.7, 0.7);
    botonRepetir.frame = 0;
    botonRepetir.i = 0;
    botonRepetir.inputEnabled = true;
    botonRepetir.events.onInputDown.add(ReiniciarNivel, this);
    botonRepetir.events.onInputOver.add(overButton, this);
    botonRepetir.events.onInputOut.add(outButton, this);
    return botonRepetir;
}

/**
* Funcion que el boton de siguiente nivel
*
*/
function CrearBotonContinuar(){

    texto = AñadirTexto(410,200,'Siguiente Nivel',colorTexto,35);
    texto.inputEnabled = true;
    texto.events.onInputDown.add(TerminarNivel, this);
    cuadroVictoria.push(texto);

    botonContinuar = game.add.sprite(425, 245, 'botonSigNivel');
    botonContinuar.frame = 0;
    botonContinuar.i = 0;
    botonContinuar.inputEnabled = true;
    botonContinuar.events.onInputDown.add(TerminarNivel, this);
    botonContinuar.events.onInputOver.add(overButton, this);
    botonContinuar.events.onInputOut.add(outButton, this);
    return botonContinuar;
}

/**
* Funcion que el boton de la pista
*
*/
function CrearBotonPista(pista){

    botonPista = game.add.sprite(0, 545, 'botonPista');
    botonPista.scale.setTo(0.9,0.9);
    pista.width = 1;
    botonPista.informacion = pista;
    botonPista.frame = 0;
    botonPista.i = 0;
    botonPista.inputEnabled = true;
    botonPista.events.onInputDown.add(MostrarPista, this);
    botonPista.events.onInputOver.add(overButton, this);
    botonPista.events.onInputOut.add(outButton, this);
    return botonPista;

}

/**
* Funcion que crea el boton de cerrar pista
*
*/
function CrearBotonClose(){

    botonClose = game.add.sprite(300, 445, 'botonClose');
    botonClose.frame = 0;
    botonClose.i = 0;
    botonClose.inputEnabled = true;
    botonClose.events.onInputDown.add(CerrarPista, this);
    botonClose.events.onInputOver.add(overButton, this);
    botonClose.events.onInputOut.add(outButton, this);
    return botonClose;
}

/**
* Funcion que silencia la musica
*
*/
function CrearSilenciarSonido(){

    botonClose = game.add.sprite(750, 20, 'botonMute');
    botonClose.frame = 0;
    botonClose.i = 0;
    botonClose.inputEnabled = true;
    botonClose.events.onInputDown.add(silenciarSonido, this);
    botonClose.events.onInputOver.add(overMuteButton, this);
    botonClose.events.onInputOut.add(outMuteButton, this);
    return botonClose;
}

/**
* Funcion que controla la pista
*
*/
function MostrarPista(item){
    if (!clickedPista){
        clickedPista = true;
    }
    if (!pistaEnPantalla){
        dudas = false;
        if (ResaltadorPista != null){
            ResaltadorPista.destroy();
        }
        AbrirPista(item);
    }
    else{
        CerrarPista();
    }
}

/**
* Funcion que muestra el block de notas con la pista
*
*/
function AbrirPista(boton){
        cuadroPista.push(game.add.sprite(250, 50, 'lienzoPista'));
        cuadroPista.push(AñadirTexto(300,150,"Pista",colorTexto,25));
        var info = AñadirTexto(300,200,boton.informacion,colorTexto,20);
        info.align = 'justify';
        cuadroPista.push(info);
        cuadroPista.push(CrearBotonClose());
        pistaEnPantalla = true;
}

/**
* Funcion que oculta el block de notas con la pista
*
*/
function CerrarPista(){
        for (i = 0; i < cuadroPista.length; i++){
            cuadroPista[i].destroy();
        }
        pistaEnPantalla = false;
}

function overButton(item){

    item.frame = 1;
}

function outButton(item){
    item.frame = 0;
}

function overMuteButton(item){
    if (game.sound.mute){
        item.frame = 2;
    }
    else{
        item.frame = 1;
    }
}

function outMuteButton(item){
    if (game.sound.mute){
        item.frame = 3;
    }
    else{
        item.frame = 0;
    }
}

/**
* Funcion que silencia el sonido
*
*/
function silenciarSonido(item){
    if (game.sound.mute)
    {
        item.frame = 0;
        game.sound.mute = false;
    }
    else
    {
        item.frame = 3;
        game.sound.mute = true;
    }

}

/**
* Funcion que vuelve a poner el sonido
*
*/
function reanudarSonido(){
    game.sound.mute = false;
}

/**
* Funcion que impide mover objetos en el juego
*
*/
function inhabilitarJugar(){
    for (var i = 0; i < ListaDeDatos.length; i++) {
        ListaDeDatos[i].input.draggable = false;
    }
    for (i = 0; i < listaDeNumeros.length; i++) {
        listaDeNumeros[i].input.draggable = false;
    }
    for (i = 0; i < listaDeAngulos.length; i++) {
        listaDeAngulos[i].input.draggable = false;
    }
    for (i = 0; i < listaDeVectores.length; i++) {
        listaDeVectores[i].input.draggable = false;
    }
}

/**
* Funcion permite volver a mover los objetos en el juego
*
*/
function habilitarJugar(){
    for (var i = 0; i < ListaDeDatos.length; i++) {
        ListaDeDatos[i].input.draggable = true;
    }
    for (i = 0; i < listaDeNumeros.length; i++) {
        listaDeNumeros[i].input.draggable = true;
    }
    for (i = 0; i < listaDeAngulos.length; i++) {
        listaDeAngulos[i].input.draggable = true;
    }
    for (i = 0; i < listaDeVectores.length; i++) {
        listaDeVectores[i].input.draggable = true;
    }
}
