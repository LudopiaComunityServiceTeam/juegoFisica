var Nivel6 = {
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
    CrearBotonPista("Angulos, de nuevo, pero tambien\n hay magnitudes, trata de \n predecir el resultado, el \n monigote lo agraderá");
    CrearSalida(725,486);
    limiteDeTiempo = 2;
    AñadirTexto(725,550,2,colorTiempo,48);
    vector = CrearVector(400,350,0,0);
    cuadro = CrearCuadroVector(550,100,vector);
    numeroAngulo = CrearAnguloParaVectorControlable(30,550,250,30);
    numeroAngulo = CrearAnguloParaVectorControlable(40,650,250,40);
    numeroMagnitud = CrearNumeroParaVectorControlable(420,450,100,4);
    numeroMagnitud = CrearNumeroParaVectorControlable(500,450,200,5);
    CrearEspinas(400,440);
    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    // informacion sobre el angulo
    //info = "Un vector también tiene un \nángulo que define su sentido, \nhacia donde apunta";
    //AñadirTexto(100, 40, info, colorTexto, 24);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
}
};
