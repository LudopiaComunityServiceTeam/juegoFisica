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



/******************************************************************/
/*El angulo del cuadro de vectores no se restaura a cero en imagen*/
/******************************************************************/
    ActivarFisica();
    CrearFondo();
    InicializarPlataformas();
    CrearPiso();
    CrearSalida(600,486);
    CrearTimer();
    CrearPlay();
    limiteDeTiempo = 4;
    AñadirTexto(600,550,4,colorTiempo,35);
    vector = CrearVector(400,350,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    numeroAngulo = CrearAnguloParaVectorControlable(90,550,300,90);  
    numeroAngulo = CrearAnguloParaVectorControlable(60,650,300,60);
    numeroMagnitud = CrearNumeroParaVectorControlable(400,550,250,4);
    CrearEspinas(300,440)
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
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
//    if (!(listaDeNumeros[0] === undefined && listaDeAngulos[0] === undefined)) {
        AnimarMano(inicio,listaDeCuadros[0],[-55,40,60,65]);
//    }
    ControlarNivel();
}
};
