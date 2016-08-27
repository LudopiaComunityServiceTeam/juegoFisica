var titulo;
var borrando = true;
var huellas = [];
var arriba = false;
var frames = 0;
var Sam;
var avanzando = true;

var PantallaDeInicio = {
preload: function() {
    loadPantallaDeInicio()
},
create: function()
{
    game.add.sprite(0,0,'fondoTitulo');
    titulo = game.add.sprite(100,50,'titulo');
    titulo.scale.setTo(1.5,1.5);
    crearBotonDeInicio(375,500);
    Sam = game.add.sprite(200,400, 'dude');
    Sam.anchor.setTo(0.5,0.5);
    Sam.animations.add('right', [5, 6, 7, 8], 10, true);
    Sam.animations.play('right');
},

update: function() 
{
    frames = frames + 1; 
    animarTitulo();
    animarHuellas();
    animarPersonaje();
}
};
function crearBotonDeInicio(x,y,nivel){

    BotonInicio = game.add.sprite(x, y, 'PlayButton');
    BotonInicio.inputEnabled = true;
    BotonInicio.events.onInputDown.add(empezarJuego, this);
    BotonInicio.events.onInputOver.add(overButton, this);
    BotonInicio.events.onInputOut.add(outButton, this);

}

function empezarJuego(){
    game.state.start('SeleccionDeNivel');
}
function animarTitulo(){
    alfalfa = titulo.alpha 
    if (borrando == true){
        if (alfalfa < 0.5){
            borrando = false;
        }
        else{
            titulo.alpha = titulo.alpha - 0.01
        }
    }
    else{
        if (alfalfa > 0.98){
            borrando = true;
        }
        else{
            titulo.alpha = titulo.alpha + 0.01
        }
    }
}

function animarHuellas(){
    if (frames > 25){
        if (arriba){
            huellas.push(game.add.sprite(550,390,'huellas'));
            arriba = false;
        }
        else{
            huellas.push(game.add.sprite(550,415,'huellas'));
            arriba = true;
        }
        frames = 0;
    }
    for (i = 0; i < huellas.length; i++){
        borrar(huellas[i]);
    }
}

function borrar(objeto){
    alfa = objeto.alpha
    posx = objeto.x
    if (alfa > 0.02) {
       objeto.alpha = alfa - 0.01;
       objeto.x = posx - 1;
    }
    else {
       objeto.destroy();
    }
}

function animarPersonaje(){
    posx = Sam.x
    if (avanzando){
        if (posx < 210){
            Sam.x = posx + 0.1
        }
        else if ((posx >= 210)&&(posx < 220)){
            Sam.x = posx + 0.3
        }
        else if ((posx >= 220)&&(posx < 330)){
            Sam.x = posx + 0.5
        }
        else if ((posx >= 330)&&(posx < 340)){
            Sam.x = posx + 0.3
        }
        else if ((posx >= 340)&&(posx < 350)){
            Sam.x = posx + 0.1
        }
        else if (posx >= 350){
            avanzando = false;
        }
    }
    else {
        if (posx < 200){
            avanzando = true;
        }
        else if (posx < 210){
            Sam.x = posx - 0.1
        }
        else if ((posx >= 210)&&(posx < 220)){
            Sam.x = posx - 0.3
        }
        else if ((posx >= 220)&&(posx < 330)){
            Sam.x = posx - 0.5
        }
        else if ((posx >= 330)&&(posx < 340)){
            Sam.x = posx - 0.3
        }
        else if (posx >= 340){
            Sam.x = posx - 0.1
        }

    }
}
