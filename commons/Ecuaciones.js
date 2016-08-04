/**
* Funcion que crea el sprite de la ecuacion
*/
function CrearEcuacionVelocidad(){
    EcuacionVelocidad = game.add.sprite(100, 100, 'EcuacionVelocidadCamuflada');
    return EcuacionVelocidad;
}

/**
* Funcion que crea un dato del tipo adecuado.
*
* @param valor:  valor del tipo de dato
* @param x: posicion en el eje x
* @param y: posicion en el eje y
* @param numeroMostrado: numero que se mostrara en pantalla (igual a valor, quitar)
* @param tipoDeDato: posicion en el eje y
*
*/
function CrearDato(valor,x,y,numeroMostrado,tipoDeDato) {
    //Requiere una lista de Datos llamada "ListaDeDatos"
    //Creamos un numero que se usara para llenar la ecuacion
    var dato;

    //Agregamos el color al dato dependiendo de su tipo.
    switch (tipoDeDato) {
        case "distancia":
            color = colorDesplazamiento;
            break;

        case "velocidad":
            color = colorVelocidad;
            break;

        case "aceleracion":
            color = colorAceleracion;
            break;

        case "tiempo":
            color = colorTiempo;
            break;
        default: color = colorTexto;
    }

    //Creamos un objeto con forma de número
    dato = AñadirTexto(x,y,numeroMostrado, color, 48);
    dato.anchor.y = -0.4;

    //le ponemos el tipo al dato
    dato.tipo = tipoDeDato;
    //Permitimos que se le pueda poner input al objeto
    dato.inputEnabled = true;
    //Permite arrastrar con el mouse, el "true" hace que el centro del
    //objeto quede en donde se tiene el mouse
    dato.input.enableDrag(true);
    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    dato.events.onDragStop.add(CheckEncimaEcuacion);

    dato.valor = valor;
    ListaDeDatos.push(dato);
}
function CheckEncimaEcuacion(item){
    VectorFit.play();
    if (item.tipo == "distancia"){
        CheckDistanciaOnVelocidad(item);
    }
    else if (item.tipo == "tiempo"){
        CheckTiempoOnVelocidad(item);
    }

}
function CheckDistanciaOnVelocidad(item){
//Requiere booleanos "tieneDistancia" y "tieneTiempo"

    if (ChequearOverlap(item,EcuacionVelocidad)){
        tieneDistancia = true;
        EcuacionVelocidad.distancia = item.valor;
        item.x = EcuacionVelocidad.x + 30;
        item.y = EcuacionVelocidad.y + 8;
        if (tieneTiempo){
            CrearVelocidad();
        }
    }
    else {
        tieneDistancia = false;
    }

}
function CheckTiempoOnVelocidad(item){
//Requiere booleanos "tieneVelocidad" y "tieneTiempo"

    if (ChequearOverlap(item,EcuacionVelocidad)){
        tieneTiempo = true;
        EcuacionVelocidad.tiempo = item.valor;
        item.x = EcuacionVelocidad.x + 30;
        item.y = (EcuacionVelocidad.y + 48);
        if (tieneDistancia){
            CrearVelocidad();
        }
    }
    else {
        tieneTiempo = false;
    }
}

/**
* Funcion que crea una magnitud de velocidad a partir de
* la distancia y el tiempo
*/
function CrearVelocidad(){
    resultado = Math.floor(EcuacionVelocidad.distancia/EcuacionVelocidad.tiempo);
    CrearNumeroParaVectorControlable((resultado*100),(EcuacionVelocidad.x+80),EcuacionVelocidad.y+25,resultado);
}
