var Nivel7 = {
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

    CrearBasico();
    CrearBotonPista("Con la magnitud cero no te puedes\nmover... Trata de crear una nueva\nmagnitud con el resolvedor. Usa la\ndistancia (número naranja) y el tiempo\n(número rojo), te ayudarán.");
    CrearSalida(660,484);
    limiteDeTiempo = 4;
    lineaizq = game.add.sprite(51, 450, 'linea');
    lineaizq.scale.setTo(25, 1);
    lineader = game.add.sprite(401, 450, 'linea');
    lineader.scale.setTo(26, 1);
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    ecuacionVelocidad = CrearEcuacionVelocidad(100,100);
    CrearDato(12,330,400,12,"distancia");
    CrearDato(4,660,510,4,"tiempo");

    CrearMano(ListaDeDatos[0].x -55 , ListaDeDatos[0].y + 25);
    inicio = ListaDeDatos;
    indice = 0;
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    if (!(inicio[0] === undefined)) {
        AnimarMano(inicio,ecuacionVelocidad,[-65,25,-40,50]);
    }
}
};
