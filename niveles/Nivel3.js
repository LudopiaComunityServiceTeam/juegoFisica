var Nivel3 = {
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
    CrearBotonPista("La caja controla al vector. \n Hey, hay magnitudes azules por aqui sueltas. \n Intenta ponerlas en la caja ver que pasa");
    CrearSalida(600,486);
    limiteDeTiempo = Infinity;
    vector = CrearVector(400,300,0,0);
    cuadro = CrearCuadroVector(550,100,vector);

    numeroMagnitud = CrearNumeroParaVectorControlable(100,550,300,1);
    //listaDeNumeros.push(numeroMagnitud);

    numeroMagnitud = CrearNumeroParaVectorControlable(300,650,300,3);
    //listaDeNumeros.push(numeroMagnitud);

    numeroMagnitud = CrearNumeroParaVectorControlable(500,750,300,5);
    //listaDeNumeros.push(numeroMagnitud);

    posInicXPlayer = 35;
    posInicYPlayer = game.world.height - 110;
    CrearJugador(posInicXPlayer, posInicYPlayer);
    CrearMano(listaDeNumeros[0].x -55 , listaDeNumeros[0].y + 25);

    inicio = listaDeNumeros;
    indice = 0;
    // informacion sobre la magnitud
    //info = "Un vector tiene magnitud, que\n es un valor asociado a una\n propiedad física y que cambia\n la intensidad del mismo";
    //AñadirTexto(60, 60, info, colorTexto, 24);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    if (!(listaDeNumeros[0] === undefined && listaDeNumeros[0] === undefined)) {
//    console.log("MAYONESA: " + listaDeNumeros)
//    console.log("MAYONESO: " + listaDeCuadros)
        AnimarMano(inicio,listaDeCuadros[0],[-55,25,-40,+60]);
    }
}
};
