function CrearBotonMenu(){

    resetVariables();
    botonMenu = game.add.sprite(750, 550, 'botonMenu');
    botonMenu.frame = 0;
    botonMenu.i = 0;
    botonMenu.inputEnabled = true;
    botonMenu.events.onInputDown.add(SeleccionarNivel, this);
    botonMenu.events.onInputOver.add(overButton, this);
    botonMenu.events.onInputOut.add(outButton, this);

}
function overButton(item){
    item.frame = 1;
}
function outButton(item){
    item.frame = 0;
}
