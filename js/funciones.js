window.addEventListener("load", inicio);

// Variables Globales van aca
    let liTemas = new Sistema();
    let inicializado=false;
    let creandoTema= true;
    let puntajeTotal = 0;
    let puntajeMaximo = 0;
    let preguntasFiltradas =[];
    let i =0;

function inicio() {
    document.getElementById("seccionDescripcion").addEventListener('click', function() {
        mostrar("descripcion"); reiniciarJuego();
    });
    document.getElementById("seccionGestion").addEventListener('click', function() {
        mostrar("gestion"); reiniciarJuego()
    });
    document.getElementById("seccionJugar").addEventListener('click', function() {
        mostrar("jugar"); 
    });

    document.getElementById("addTema").addEventListener('click', function() {agregarTema()});
    document.getElementById("addPregunta").addEventListener('click', function() {agregarPregunta()});
    document.getElementById("opcion1").addEventListener('click',  function() {listarPreguntas()});
    document.getElementById("opcion2").addEventListener('click', function() {listarPreguntas()});
    document.getElementById("comenzar").addEventListener('click', function(){juego()});
    document.getElementById("terminar").addEventListener('click', function(){terminarJuego()})

    // Selecciona si cargar o no los datos
    if(confirm("¿Desea cargar los datos guardados?")){
    inicializar();  
    }else{
        inicializado=true;
    }
}


// Oculta o muetra las demas secciones
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
    


// |----------------------------------------------------------------------------------------------------------------------------|
// |                                  INICIALIZACION-INICIALIZACION-INICIALIZACION-INICIALIZACION                               |
// |----------------------------------------------------------------------------------------------------------------------------|


    // CARGAR DATOS GUARDADOS
function inicializar() {
        
    // Carga los temas guardados
    for(let i = 0; i < preguntas.length; i++) {
    let {nombre, descripcion} = preguntas[i].tema;
            crearTema(nombre, descripcion);
    }
    // Carga las preguntas guardadas
    for(let i = 0; i < preguntas.length; i++) {
        let {texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema} = preguntas[i];
        //crearPregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema.nombre);
        crearPregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema);
    }

    // Lista los temas y preguntas y cambia el verificador que ya se inicializo el programa
    inicializado=true;
    listarTemas();
    listarPreguntas();
}


// |----------------------------------------------------------------------------------------------------------------------------|
// |                                  TEMAS-TEMAS-TEMAS-TEMAS-TEMAS-TEMAS-TEMAS-TEMAS-TEMAS-TEMAS                               |
// |----------------------------------------------------------------------------------------------------------------------------|


    // Crea cada Tema y los guarda en una lista con los temas y un contador numerico de cantidad de preguntas.
    // Se accede usando liTemas.showLista()
function crearTema(nTema, dTema){
    creandoTema= true;
    let nuevoTema = new Temas(nTema, dTema);
    liTemas.addLista(nuevoTema);
}


// Lista los temas y toda la informacion relacionada a estos (Promedios, totales, etc)
function listarTemas(){
// Indica los ids que utilizaremos (lista de Temas, menus desplegables con nombres de temas)
    let lista = document.getElementById("todosLosTemas");
    let dpmenu= document.getElementById("temaPreguntas");
    let dpjugar= document.getElementById("temaElegir");
    
// Borra sus contenidos
    lista.innerHTML="";
    dpmenu.innerHTML="";
    dpjugar.innerHTML="";
    
    for (let i of liTemas.showLista()){
        // Lista los temas en Gestion de Temas
        nodo=document.createElement("LI");
        texto=document.createTextNode(i.nombre+": "+i.descripcion);
        nodo.appendChild(texto);
        lista.appendChild(nodo);
        
        // Lista los temas en Gestion de Preguntas
        nodoP=document.createElement("option")
        textoP=document.createTextNode(i.nombre);
        nodoP.appendChild(textoP);
        dpmenu.appendChild(nodoP)
        dpmenu.value=""

        // Lista los temas en Jugar
        if (i.cantidadPreguntas > 0){
        nodoJ=document.createElement("option")
        textoJ=document.createTextNode(i.nombre);
        nodoJ.appendChild(textoJ);
        dpjugar.appendChild(nodoJ)
        }
        dpjugar.value=""
        
    }
    
// Agrega el total de temas.
    document.getElementById("TotaldeTemas").innerHTML=liTemas.showLista().length

// Agrega el promedio de preguntas
    let preguntasTotales = 0;
    for(let i of liTemas.showLista()){
        preguntasTotales+=i.cantidadPreguntas;
    }
    let promedio = preguntasTotales/liTemas.showLista().length
    document.getElementById("promedio").innerHTML=promedio.toFixed(2)

// Lista Temas sin preguntas
    let listaVacia = document.getElementById("temasVacios")
    
    noExiste=true;
    for (let i of liTemas.showLista()){
        if (i.cantidadPreguntas==0){
            // No borrar "Sin Datos" si no hay vacias
            if(noExiste){
                listaVacia.innerHTML=""
                noExiste=false;
            }

            nodo=document.createElement("LI");
            texto=document.createTextNode(i.nombre+ ": "+ i.descripcion);
            nodo.appendChild(texto);
            listaVacia.appendChild(nodo);
        }
    }
    if(noExiste){listaVacia.innerHTML="Sin Datos"}
}


// Agregar un tema a la lista y la actualiza
function agregarTema(){
    let nombreTema = document.getElementById("nombre").value;
    let descTema = document.getElementById("desc").value;
    if (nombreTema != "" && descTema !=""){
    crearTema(nombreTema, descTema);

    document.getElementById("nombre").value ="";
    document.getElementById("desc").value ="";
    listarTemas()
    }
}


// |----------------------------------------------------------------------------------------------------------------------------|
// |                                  PREGUNTAS-PREGUNTAS-PREGUNTAS-PREGUNTAS-PREGUNTAS-PREGUNTAS                               |
// |----------------------------------------------------------------------------------------------------------------------------|


// Crea las preguntas y las agrega a una lista.
// Se accede utilizando liTemas.showPreguntas()
function crearPregunta(a,b,c,d,e){
        let nuevaPregunta = new Preguntas(a, b, c, d, e);
        liTemas.addPreguntas(nuevaPregunta);
}


// Lista las preguntas en la tabla.
function listarPreguntas(){
    ordenarPreguntas(liTemas.showPreguntas())
    tabla = document.getElementById("tablaPreguntas");
    tabla.innerHTML=""

// Inserta las preguntas en la tabla
    for (i of liTemas.showPreguntas()){
        let pregunta = tabla.insertRow();

        let celdaTema = pregunta.insertCell(0);
        let celdaNivel = pregunta.insertCell(1);
        let celdaTexto = pregunta.insertCell(2);
        let celdaCorrecta = pregunta.insertCell(3);
        let celdaIncorecta = pregunta.insertCell(4);

        celdaTema.textContent = i.tema.nombre;
        celdaNivel.textContent = i.lvl;
        celdaTexto.textContent = i.texto;
        celdaCorrecta.textContent = i.respuestaCorrecta;
        celdaIncorecta.textContent = i.respuestasIncorrectas;
        colorTemas2(i.tema.nombre, pregunta)
    }
// Muestra total de las preguntas
    document.getElementById("cantidadPreguntas").innerHTML= liTemas.showPreguntas().length
}


function colorTemas2(tema, cellData){

    indexTema = liTemas.showLista().findIndex(item=> item.nombre == tema)

    switch(indexTema){
        case 0:
            cellData.style = "background-color: #FFFF00;";
            break;
        case 1:
            cellData.style = "background-color: #FFD700;"; 
            break;
        case 2:
            cellData.style = "background-color: #FFC000;"; 
            break;
        case 3:
            cellData.style = "background-color: #FFB000;"; 
            break;
        case 4:
            cellData.style = "background-color: #FFA000;"; 
            break;
        case 5:
            cellData.style = "background-color: #FF9000;"; 
            break;
        case 6:
            cellData.style = "background-color: #FF8000;"; 
            break;
        case 7:
            cellData.style = "background-color: #FF7000;"; 
            break;
        case 8:
            cellData.style = "background-color: #FF6000;"; 
            break;
        case 9:
            cellData.style = "background-color: #FF5000;"; 
            break;
        case 10:
            cellData.style = "background-color: #FF4000;"; 
            break;
        case 11:
            cellData.style = "background-color: #FF3000;"; 
            break;
        case 12:
            cellData.style = "background-color: #FF2000;"; 
            break;
        case 13:
            cellData.style = "background-color: #FF1000;"; 
            break;
        case 14:
            cellData.style = "background-color: #8B4513;"; 
            break;
        default:
            cellData.style = "background-color: #FFFFFF;"; 
    }
}



// Cambia el color de cada fila de la tabla segun el tema y genera uno nuevo para proximos temas.
function colorTemas(rowData, cellData){
    switch(rowData){
        case "Geografía":
        cellData.style = "background-color: #F4D03F;"
        break;
        case "Matemáticas":
        cellData.style = "background-color: #FAD7A0;"
        break;
        case "Historia":
        cellData.style = "background-color: #E59866;"
        break;
        case "Deporte":
        cellData.style = "background-color: #D4AC0D;"
        break;
        case "Lenguaje":
        cellData.style = "background-color: #935116;"
        break;       
        case "Arte":
        cellData.style = "background-color: #873600;"
        break; 
        case "Ciencia":
        cellData.style = "background-color: #7D6608;"
        break;
        default:
        let colorHex = stringToHexColor(rowData)
        cellData.style.backgroundColor = colorHex
        break;
    }
}

// Como los colores de los temas genericos deben ser entre amarillo y marron y los demas ser aleatorios utilizamos esta funcion
// VER SI HAY FORMA MAS FACIL
function stringToHexColor(str) {
    // Use a hash function to convert the string to a numeric value
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Convert the numeric value to a hexadecimal color code
    let color = "#";
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
}


// Agrega pregunta
function agregarPregunta(){
    let textoPregunta   = document.getElementById("textoPregunta").value;
    let respuestaPregunta = document.getElementById("respuestaCorrecta").value;
    let incorrectasPregunta = document.getElementById("respuestaIncorrecta").value.split(",")
    let nivelPregunta   = parseInt(document.getElementById("nivel").value);
    let temaSeleccionado = document.getElementById("temaPreguntas").value;


    

// Verifica que todos los campos esten completos
    if(textoPregunta != "" && respuestaPregunta != "" && 
    incorrectasPregunta != "" && nivelPregunta != "" && 
    temaSeleccionado != ""){

    if (!validarPregunta(temaSeleccionado,textoPregunta)){
// Verifica que la respuesta no este en las opciones incorrectas
        if (incorrectasPregunta.indexOf(respuestaPregunta)==-1){

            nombre=liTemas.showLista().filter(tema =>  tema.nombre== temaSeleccionado)[0]['nombre']
            descripcion=liTemas.showLista().filter(tema =>  tema.nombre== temaSeleccionado)[0]['descripcion']
            temaSeleccionado={nombre,descripcion}

            crearPregunta(textoPregunta, respuestaPregunta, incorrectasPregunta, nivelPregunta, temaSeleccionado)

// Deja los campos en blanco
            document.getElementById("textoPregunta").value = ""
            document.getElementById("nivel").value= ""
            document.getElementById("respuestaCorrecta").value= ""
            document.getElementById("respuestaIncorrecta").value= ""
            document.getElementById("temaPreguntas").value = ""

            listarPreguntas()
            listarTemas()
        }else {
            alert("La respuesta correcta se encuentra en las incorrectas")
        }
    }   else{
        alert("Pregunta repetida")
    }
}
}

/// VER ESTO NO ESTA BIEN
function ordenarPreguntas(listaDePreguntas){
    let creciente = document.getElementById("opcion1");
    if(creciente.checked){
        listaDePreguntas.sort((a, b) => {
            // First, compare by tema.nombre
            if (a.tema.nombre < b.tema.nombre) {
                return -1;
            }
            if (a.tema.nombre > b.tema.nombre) {
                return 1;
            }
            // If tema.nombre is the same, compare by lvl
            return a.lvl - b.lvl;
        });
    }else{
        listaDePreguntas.sort((a, b) => {
            // First, compare by tema.nombre
            if (a.tema.nombre > b.tema.nombre) {
                return -1;
            }
            if (a.tema.nombre < b.tema.nombre) {
                return 1;
            }
            // If tema.nombre is the same, compare by lvl
            return a.lvl - b.lvl;
        });
    }

}

// Valida que la pregunta no exista para el mismo tema.
function validarPregunta (tema, enunciado) {
let temasFiltrados = liTemas.showPreguntas().filter(pregunta => pregunta.tema.nombre === tema);
let mismaPregunta = temasFiltrados.find(pregunta => pregunta.texto === enunciado);
if(mismaPregunta){
    return true
}else{
    return false
}
}


// |----------------------------------------------------------------------------------------------------------------------------|
// |                                  JUEGO-JUEGO-JUEGO-JUEGO-JUEGO-JUEGO-JUEGO-JUEGO-JUEGO-JUEGO                               |
// |----------------------------------------------------------------------------------------------------------------------------|


// Filtra preguntas por tema y luego por nivel y las ordena al azar
function filtrado(tema,nivel){
    let temasFiltrados = liTemas.showPreguntas().filter(pregunta => pregunta.tema.nombre === tema);
    let nivelFiltrado = temasFiltrados.filter(pregunta => pregunta.lvl === nivel);
    let preguntasMezcladas = shuffleArray(nivelFiltrado);
    return preguntasMezcladas
}


// Ordena las respuestas de cada pregunta al azar
function opciones(pregunta){
    let respuestas = [];
    respuestas.push(pregunta.respuestaCorrecta);
    respuestas=respuestas.concat(pregunta.respuestasIncorrectas);
    let respuestasMezcladas = shuffleArray(respuestas);
    return respuestasMezcladas
}

// Reordena al azar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


// Muestra las preguntas y respuestas en la pagina.
function mostrarPregunta(pregunta){

    document.getElementById("mostrarPregunta").innerHTML=pregunta.texto;
    colorTemas2(pregunta.tema.nombre, document.getElementById("cajaPregunta"))

    let botones = document.getElementById("respuestas");
    let respuestas = opciones(pregunta);
    botones.innerHTML=""

    for (let i of respuestas){
        let nodo = document.createElement("button");
        let nodoTexto = document.createTextNode(i);
        nodo.appendChild(nodoTexto);
        botones.appendChild(nodo);

        colorTemas2(pregunta.tema.nombre, nodo)
        
        if(pregunta.respuestaCorrecta == i){
            nodo.onclick = function (){correcta(nodo)}
        } else {
            nodo.onclick = function (){incorrecta(nodo)}
        };
    };
};


// Color + Sonido + Puntaje + Inhabilitacion de botones segun respuestas.
// Correcta
function correcta(respuesta){
    respuesta.style.backgroundColor = "green";
    puntajeTotal += 10;

    if(puntajeTotal>=0){
        document.getElementById("puntajeAcumulado").innerHTML=puntajeTotal;
    };
    document.querySelectorAll('div#respuestas button').forEach(button => button.disabled = true);
    sonido(true)
}

// Incorrecta
function incorrecta(respuesta){
    respuesta.style.backgroundColor = "red";
    respuesta.disabled = true;
    puntajeTotal -=1;

    if(puntajeTotal>=0){
        document.getElementById("puntajeAcumulado").innerHTML=puntajeTotal;
    }    
    sonido(false)
}

// Reproduce sonido segun si la pregunta fue correcta o incorrecta
function sonido(estado){
    let audioCorrecto = document.getElementById("audioCorrecta");
    let audioIncorrecto = document.getElementById("audioIncorrecta");
    
    if (estado){
        audioCorrecto.play();
    } else {
        audioIncorrecto.play();
    }
}


// Funcion principal del juego
function juego(){
    let tema = document.getElementById("temaElegir").value;
    let nivel = parseInt(document.getElementById("lvl").value);
    let siguientePregunta = document.getElementById("siguiente");

    // Variables globales -> Al terminar el juego la deja en 0 o vacia.
    preguntasFiltradas = filtrado(tema,nivel); 
    i=0;

    // Actualiza la pregunta que esta dentro de el boton de ayuda.
    function actualizarAyuda(){    
        document.getElementById("help").onclick=function(){
            ayuda(preguntasFiltradas[i])
        };
}
    // Verifica que exista almenos una pregunta.
    if(preguntasFiltradas.length > 0) {
        document.getElementById("mostrarJuego").style="display: block";
        document.getElementById("seleccion").querySelectorAll("input,button,select").forEach(item => item.disabled=true);

        mostrarPregunta(preguntasFiltradas[i]);
        actualizarAyuda();

        if (preguntasFiltradas.length==1){
            siguientePregunta.disabled=true;
        }

        siguientePregunta.onclick= function(){

            if(i< preguntasFiltradas.length-1){
                i++;
                mostrarPregunta(preguntasFiltradas[i]);
                actualizarAyuda();
            }

            if (i === preguntasFiltradas.length-1){
                siguientePregunta.disabled=true;
            }
        }
    }else{        
        alert("No hay preguntas para dicha combinacion de Tema/Nivel")
    }
        
}


// Funcion de ayuda que muestra respuesta correcta segun primer letra o numero que no es respuesta.
function ayuda(solucion){
    if(solucion.respuestaCorrecta.length == 1){
        alert("La respuesta no es: " + solucion.respuestasIncorrectas[0]);
    } else {
        let = letraInicial = solucion.respuestaCorrecta.charAt(0);
        alert("La respuesta comienza con: "+ letraInicial+"...")
    }

}


// Reinicia el juego para volver a comenzar.
function reiniciarJuego(){

    // Borra los valores ya existentes
    document.getElementById("temaElegir").value="";
    document.getElementById("lvl").value=1;
    preguntasFiltradas = [];
    i = 0;
    document.getElementById("help").onclick = null;
    document.getElementById("siguiente").onclick = null;

    // Habilita los input y botones.
    document.getElementById("seleccion").querySelectorAll("input,button,select").forEach(item => item.disabled=false);
    document.getElementById("siguiente").disabled=false;

    // Setea el puntaje total en 0 nuevamente
    puntajeTotal=0;
    document.getElementById("puntajeAcumulado").innerHTML = puntajeTotal;

    // Oculta el juego
    document.getElementById("mostrarJuego").style="display: none"

}


// Finaliza el juego
function terminarJuego(){
 
    if(puntajeTotal > puntajeMaximo) {
        document.getElementById("maximoPuntaje").innerHTML=puntajeTotal;
    } 

    alert("Juego terminado, puntaje obtejido: "+ puntajeTotal+"!! Felicitaciones")
    reiniciarJuego()

}