window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("seccionDescripcion").addEventListener('click', function() {
        mostrar("descripcion");
    });
    document.getElementById("seccionGestion").addEventListener('click', function() {
        mostrar("gestion");
    });
    document.getElementById("seccionJugar").addEventListener('click', function() {
        mostrar("jugar");
    });

    document.getElementById("addTema").addEventListener('click', function() {agregarTema()});

    inicializarTemas();  // Call the function to count temas
}

function mostrar(seccion) {
    switch(seccion){
        case "descripcion": 
            document.getElementById("descripcion").style.display="block";
            document.getElementById("gestion").style.display="none";
            document.getElementById("jugar").style.display="none";
            break;
        case "gestion": 
            document.getElementById("descripcion").style.display="none";
            document.getElementById("gestion").style.display="block";
            document.getElementById("jugar").style.display="none";
            break;
        case "jugar": 
            document.getElementById("descripcion").style.display="none";
            document.getElementById("gestion").style.display="none";
            document.getElementById("jugar").style.display="block";
            break;
    } 
}

    inicializado=false;
    function inicializarTemas() {
        let test=Temas.showNombres();
    for(let i = 0; i < preguntas.length; i++) {
        let {nombre, descripcion} = preguntas[i].tema;
 
        // if (!test[nombre]) {
            let nuevoTema= new Temas(nombre, descripcion);
            Temas.addLista(nuevoTema);
            Temas.addListaNombres(nuevoTema.nombre)
            // nombreTema[nombre] = nuevoTema.nombre
        // }  
    }
    inicializado=true;

    Temas.addListaNombres("Pinguino")

    listarTemas();
}

function listarTemas(){

    // Listar Temas
    let lista = document.getElementById("todosLosTemas")
    lista.innerHTML=""
    for (let i of Temas.listaTemas){

        nodo=document.createElement("LI");
        texto=document.createTextNode(i.nombre+": "+i.descripcion);
        nodo.appendChild(texto);
        lista.appendChild(nodo);

    }
    
    // Total de Temas

    document.getElementById("TotaldeTemas").innerHTML=Temas.listaTemas.length



// Promedio de preguntas Totales

    let preguntasTotales = 0;
    for(let i in Temas.listaNombres){
        preguntasTotales+=Temas.listaNombres[i].cantidad;
    }
    let promedio = preguntasTotales/Temas.listaTemas.length
    document.getElementById("promedio").innerHTML=promedio.toFixed(2)
    let listaVacia = document.getElementById("temasVacios")

// Listar Temas sin preguntas

    existe=true;
    for (let i in Temas.listaNombres){
        if (Temas.listaNombres[i].cantidad==0){
            
            if(existe){
                listaVacia.innerHTML=""
                existe=false;
            }
            nodo=document.createElement("LI");
            texto=document.createTextNode(Temas.listaNombres[i].tema+ ": "+ Temas.listaNombres[i].descripcion);
            nodo.appendChild(texto);
            listaVacia.appendChild(nodo);
        }
    }
}



function agregarTema(){
    let nombreTema = document.getElementById("nombre").value;
    let descTema = document.getElementById("desc").value;
    let newTema= new Temas(nombreTema, descTema);
    Temas.addLista(newTema);
    Temas.addListaNombres(newTema.nombre)


    listarTemas()
}

