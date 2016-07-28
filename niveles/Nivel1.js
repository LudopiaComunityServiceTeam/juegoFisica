var Nivel1 = {
preload: function() {


},
create: function() {
/********************************************************************************/
/*

Esta funcion dibuja objetos en pantalla en el orden en que se añadan

Si un objeto se dibuja primero, quedara como background

La funcion "create" se corre sola despues de preload, asi que no se
preocupen en llamarla

Cuando se crea un objeto se pide la ubicacion en x y y, y el nombre de la
imagen que tendra

En Phaser X y Y el 0,0 está en la esquina superior izquierda y "y" se cuenta
positivo hasta abajo.
*/
/********************************************************************************/


    ActivarFisica();
    CrearFondo();
    InicializarPlataformas();
    CrearPiso();
    CrearSalida(600,484);
    salidaAbierta = false;
    CrearTimer(Infinity);
    CrearPlay();
    limiteDeTiempo = Infinity;
    vector = CrearVector(400,300,300,0);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    jugador = CrearJugador(posInicXPlayer, posInicYPlayer);
    text = AñadirTexto(200,200,"Esto es un \nvector",colorTexto,48);
    text.angle = -20;
    tutorial1();
    CrearMano(290, 275);
    inicio = [vector];
    indice = 0;

},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    if (ChequearOverlap(player, vector)) {
        pararTitilar(jugador, {evento: evento, objeto2: objeto2});
        // objeto2 = resaltarSprite(400, 550, 1.2, 1.2, 'PlayButton');
        // PlayButton.events.onInputDown.addOnce(pararTitilar, {evento: evento, objeto2: objeto2});
    }
    //Animacion de la mano
    console.log("naraninuri: " + indice)
    if (!(inicio[0] === undefined)) {
        AnimarMano(inicio,player,[-100,-25,-50,0]);
    }
    }
};

function tutorial1(){
    resaltarSprite(397,300, 1.2, 1.7, 'vector');
    vector.events.onInputDown.add(pararTitilar, {evento: evento, objeto2: objetoTitila});
    vector.events.onDragStart.addOnce(resaltarPlayerTutorial, this);
}

function resaltarPlayerTutorial(objeto) {
    objeto2 = resaltarSprite(posInicXPlayer+16, posInicYPlayer+23, 1.2, 1.2, 'dude');
}
