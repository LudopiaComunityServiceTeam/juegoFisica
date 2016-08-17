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
    game.state.start(niveles[item.i]);
    nivelActual = item.i;
    resetVariables();
}
function CrearBotonMenu(){

    botonMenu = game.add.sprite(750, 545, 'botonMenu');
    botonMenu.frame = 0;
    botonMenu.i = 0;
    botonMenu.inputEnabled = true;
    botonMenu.events.onInputDown.add(SeleccionarNivel, this);
    botonMenu.events.onInputOver.add(overButton, this);
    botonMenu.events.onInputOut.add(outButton, this);

}
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
function CrearBotonContinuar(){

    texto = AñadirTexto(300,400,'Siguiente Nivel',colorTexto,35);
    texto.inputEnabled = true;
    texto.events.onInputDown.add(TerminarNivel, this);
    cuadroVictoria.push(texto);
    botonContinuar = game.add.sprite(300, 350, 'botonSigNivel');
    botonContinuar.frame = 0;
    botonContinuar.i = 0;
    botonContinuar.inputEnabled = true;
    botonContinuar.events.onInputDown.add(TerminarNivel, this);
    botonContinuar.events.onInputOver.add(overButton, this);
    botonContinuar.events.onInputOut.add(outButton, this);
    return botonContinuar;
}
function CrearBotonPista(pista){

    botonPista = game.add.sprite(0, 545, 'botonPista');
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

function MostrarPista(item){
    if (!pistaEnPantalla){
        dudas = false;
        ResaltadorPista.destroy();
        textoDuda.destroy();
        AbrirPista(item);
    }
    else{
        CerrarPista();
    }
}
function AbrirPista(boton){
        cuadroPista.push(game.add.sprite(250, 50, 'lienzoPista'));
        cuadroPista.push(AñadirTexto(300,150,"Pista",colorTexto,25));
        var info = AñadirTexto(300,200,boton.informacion,colorTexto,20);
        info.align = 'justify';
        cuadroPista.push(info);
        cuadroPista.push(CrearBotonClose());
        pistaEnPantalla = true;
}

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

function reanudarSonido(){
    game.sound.mute = false;
}
