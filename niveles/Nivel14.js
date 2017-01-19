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
    botonPistas = CrearBotonPista("Un segundo, esas espinas \nse ven sospechosas,\nlo mejor sera no esperar mucho.");
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
    CrearEspinas(200,180);
    listaDeEspinas[0][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[0][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[0],[0,0],[2,-2],[500,500],[290,150],1));
    CrearPropulsores(250,105,1);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[0],[0,0],[2,-2],[500,500],[215,75],1));


    CrearEspinas(200,450);
    listaDeEspinas[1][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[1][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[1],[0,0],[-2,2],[500,500],[340,480],1));
    CrearPropulsores(150,525);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[1],[0,0],[-2,2],[500,500],[415,555],1));

    CrearEspinas(300,200);
    listaDeEspinas[2][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[2][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[2],[0,0],[2,-2],[500,500],[290,150],1));
    CrearPropulsores(350,125,1);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[2],[0,0],[2,-2],[500,500],[215,75],1));

    CrearEspinas(300,430);
    listaDeEspinas[3][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[3][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[3],[0,0],[-2,2],[500,500],[340,480],1));
    CrearPropulsores(250,505);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[3],[0,0],[-2,2],[500,500],[415,555],1));


    CrearEspinas(400,220);
    listaDeEspinas[4][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[4][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[4],[0,0],[2,-2],[500,500],[290,150],1));
    CrearPropulsores(450,145,1);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[4],[0,0],[2,-2],[500,500],[215,75],1));

    CrearEspinas(400,410);
    listaDeEspinas[5][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[5][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[5],[0,0],[-2,2],[800,800],[340,480],1));
    CrearPropulsores(350,485);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[5],[0,0],[-2,2],[800,800],[415,555],1));

    CrearEspinas(500,240);
    listaDeEspinas[6][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[6][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[6],[0,0],[2,-2],[800,800],[290,150],1));
    CrearPropulsores(550,165,1);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[6],[0,0],[2,-2],[800,800],[215,75],1));

    CrearEspinas(500,390);
    listaDeEspinas[7][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[7][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[7],[0,0],[-2,2],[800,800],[340,480],1));
    CrearPropulsores(450,465);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[7],[0,0],[-2,2],[800,800],[415,555],1));

    CrearEspinas(600,260);
    listaDeEspinas[8][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[8][0].angle = 270;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[8],[0,0],[2,-2],[800,800],[290,150],1));
    CrearPropulsores(650,185,1);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[8],[0,0],[2,-2],[800,800],[215,75],1));

    CrearEspinas(600,370);
    listaDeEspinas[9][0].anchor.setTo(0.5,0.5);
    listaDeEspinas[9][0].angle = 90;
    ListaDeCiclos.push(new Ciclo(listaDeEspinas[9],[0,0],[-2,2],[800,800],[340,480],1));
    CrearPropulsores(550,445);
    ListaDeCiclos.push(new Ciclo(listaDePropulsores[9],[0,0],[-2,2],[800,800],[415,555],1));

    vector = CrearVector(300, 100, 300, 0, false);
    vector2 = CrearVector(500, 100, 400, 0, false);
    posInicXPlayer = 50;
    posInicYPlayer = game.world.height - 350;
    //monologo de Sam
    monologo = AñadirTexto(500,300,"Lo vi desaparecer",colorTexto,20);
    monologo.alpha = 0.01; 
    faseBorrado = 0;
    //
    jugador = CrearJugador(posInicXPlayer, posInicYPlayer);
    indice = 0;
    DetenerCancion();
    ReproducirLoopAudio(Stop_And_Think,0.3);
},

update: function() {
//La función update es la responsable de los "frames"
//Aqui colocamos lo que es movimiento y cambios de variables
//Se llama sola en forma de loop infinito

    ControlJugador();
    ControlarNivel();
    BorrarTexto();
    game.debug.bodyInfo(player);
}
};
