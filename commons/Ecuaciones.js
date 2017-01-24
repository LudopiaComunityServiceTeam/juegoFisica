/**
* Funcion que crea el sprite de la ecuacion
*/
function CrearEcuacionVelocidad(x,y){
    EcuacionVelocidad = game.add.sprite(x, y, 'EcuacionVelocidadCamuflada');
    EcuacionVelocidad.resultado = undefined;
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
    dato.input.useHandCursor = true;
    //Aqui se le agrega al numero el "evento" de que cuando se suelte
    //se corre la funcion checkMagnitudInVector
    dato.events.onDragStop.add(CheckEncimaEcuacion);

    dato.valor = valor;

    // posicion inicial del dato
    dato.posXInit = x;
    dato.posYInit = y;

    //Creamos el dato fantasma
    datoFantasma = AñadirTexto(x,y,numeroMostrado, color, 48);
    datoFantasma.anchor.y = -0.4;
    datoFantasma.alpha = 0.7;

    dato.fantasma = datoFantasma;
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
        if (tieneDistancia) {
            EcuacionVelocidad.distancia.x = EcuacionVelocidad.distancia.posXInit;
            EcuacionVelocidad.distancia.y = EcuacionVelocidad.distancia.posYInit;
        }
        else {
            tieneDistancia = true;
        }
        EcuacionVelocidad.distancia = item;
        item.x = EcuacionVelocidad.x + 45;
        item.y = EcuacionVelocidad.y -25;
        if (tieneTiempo){
            CrearVelocidad();
        }
    }
    else if (tieneDistancia && !ChequearOverlap(EcuacionVelocidad.distancia, EcuacionVelocidad)) {
        tieneDistancia = false;
    }

}
function CheckTiempoOnVelocidad(item){
//Requiere booleanos "tieneVelocidad" y "tieneTiempo"

    if (ChequearOverlap(item,EcuacionVelocidad)){
        if (tieneTiempo) {
            EcuacionVelocidad.tiempo.x = EcuacionVelocidad.tiempo.posXInit;
            EcuacionVelocidad.tiempo.y = EcuacionVelocidad.tiempo.posYInit;
        }
        else {
            tieneTiempo = true;
        }
        EcuacionVelocidad.tiempo = item;
        item.x = EcuacionVelocidad.x + 50;
        item.y = (EcuacionVelocidad.y + 35);
        if (tieneDistancia){
            CrearVelocidad();
        }
    }
    else if (tieneTiempo && !ChequearOverlap(EcuacionVelocidad.tiempo, EcuacionVelocidad)) {
        tieneTiempo = false;
    }
}

/**
* Funcion que crea una magnitud de velocidad a partir de
* la distancia y el tiempo
*/
function CrearVelocidad(){
    animacionDivisionIniciada = true;
    var resultado = Math.floor(EcuacionVelocidad.distancia.valor/EcuacionVelocidad.tiempo.valor);

    // eliminar el resultado anterior
    if (EcuacionVelocidad.resultado !== undefined){
        //eliminar el resultado anterior de la lista de numeros
        var index = listaDeNumeros.indexOf(EcuacionVelocidad.resultado);
        listaDeNumeros.splice(index, 1);
        EcuacionVelocidad.resultado.destroy();
    }

    EcuacionVelocidad.resultado =  CrearNumeroParaVectorControlable(resultado*100,
                                                                    EcuacionVelocidad.x + 140,
                                                                    EcuacionVelocidad.y + 25,
                                                                    resultado);
}
