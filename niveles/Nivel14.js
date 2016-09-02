var Nivel14 = {
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
    botonPistas = CrearBotonPista("Observa bien lo que indican los cuadros\nverdes, esa es la secuencia de juego.\nArrastra el vector, déjalo caer sobre el\nmonigote y le das a \"play \"");
    game.time.events.add(Phaser.Timer.SECOND * 10, ResaltarDudas, this);
    CrearSalida(720,262);
    salidaAbierta = false;
    CrearPlataforma(50,320,1,1);
    CrearPlataforma(150,320,1,1);
    CrearPlataforma(250,320,1,1);
    CrearPlataforma(350,320,1,1);
    CrearPlataforma(450,320,1,1);
    CrearPlataforma(550,320,1,1);
    CrearPlataforma(650,320,1,1);
    limiteDeTiempo = Infinity;
    pierdePuntos = 3;
    CrearEspinas(200,180);
    listaDeEspinas[0][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[0][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[0],[0,0],[2,-2],[500,500],[290,150],1));

    CrearEspinas(200,450);
    listaDeEspinas[1][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[1][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[1],[0,0],[-2,2],[500,500],[340,480],1));

    CrearEspinas(300,200);
    listaDeEspinas[2][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[2][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[2],[0,0],[2,-2],[500,500],[290,150],1));

    CrearEspinas(300,430);
    listaDeEspinas[3][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[3][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[3],[0,0],[-2,2],[500,500],[340,480],1));

    CrearEspinas(400,220);
    listaDeEspinas[4][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[4][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[4],[0,0],[2,-2],[500,500],[290,150],1));

    CrearEspinas(400,410);
    listaDeEspinas[5][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[5][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[5],[0,0],[-2,2],[500,500],[340,480],1));
    CrearEspinas(500,240);
    listaDeEspinas[6][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[6][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[6],[0,0],[2,-2],[500,500],[290,150],1));

    CrearEspinas(500,390);
    listaDeEspinas[7][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[7][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[7],[0,0],[-2,2],[500,500],[340,480],1));
    CrearEspinas(600,260);
    listaDeEspinas[8][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[8][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[8],[0,0],[2,-2],[500,500],[290,150],1));

    CrearEspinas(600,370);
    listaDeEspinas[9][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[9][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[9],[0,0],[-2,2],[500,500],[340,480],1));

    vector = CrearVector(300, 100, 300, 0, false);
    vector2 = CrearVector(500, 100, 400, 0, false);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 350;
    jugador = CrearJugador(posInicXPlayer, posInicYPlayer);
    indice = 0;
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    game.debug.bodyInfo(player);
}
};
