var Nivel5 = {
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
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    botonPistas = CrearBotonPista("Los vectores tienen ángulo (morado) que\ncambian su inclinación. ¡Ahora puedes\nsaltar! Ten cuidado de no saltar muy\n bajo...");
    CrearSalida(610,484);
    limiteDeTiempo = 5;
    CrearDato(5,610,510,5,"tiempo");
    vector = CrearVector(400,350,400,0, true);
    CrearEspinas(300,440);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    numeroAngulo = CrearAnguloParaVectorControlable(90,500,300,90);
    numeroAngulo = CrearAnguloParaVectorControlable(30,600,300,30);
    numeroAngulo = CrearAnguloParaVectorControlable(60,700,300,60);
    CrearMano(listaDeAngulos[0].x -55 , listaDeAngulos[0].y + 25);

    inicio = listaDeAngulos;
    indice = 0;
    // informacion sobre el angulo
    //info = "Un vector también tiene un \nángulo que define su sentido, \nhacia donde apunta";
    //AñadirTexto(100, 40, info, colorTexto, 24);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    if (!(inicio[0] === undefined)) {
        AnimarMano(inicio,listaDeVectores[0].cuadro,[-55,40,60,65]);
    }
    ControlarNivel();
}
};
