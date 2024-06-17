// OBLIGATORIO PROGRAMACION 1 
// REALIZADO POR:
// EMILIANO MEDERO N° 310016
// LUIS GAGÑEVIN N°338643


class Temas {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidadPreguntas=0;
    }
}

class Preguntas {

    constructor(texto, respuestaCorrecta, respuestasIncorrectas, lvl, tema){
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.lvl = lvl;
        this.tema = tema;
    }
}


class Sistema {
    constructor(){
        this.listaTemas=[];
        this.contadorTemas={};
        this.listaPreguntas=[];
    }
    // TEMAS

    // Lista con todos los temas y descripciones

    addLista(valor){
        let temaExistente = this.listaTemas.find(tema => tema.nombre === valor.nombre);
        if (!temaExistente) {
            // Si no existe el tema, lo crea y lo agrega.
            if(!inicializado){valor.cantidadPreguntas = 1}
            this.listaTemas.push(valor);
        } else {
            // Si existe y no esta inicializado, suma 1 a el contador de preguntas.
            if(inicializado){
                alert("El tema : " + valor.nombre + " Ya fue creado")
            } else {
                temaExistente.cantidadPreguntas +=1
            }
        }



    }

    sumarPregunta(valor){
        let temaExistente = this.listaTemas.find(tema => tema.nombre === valor);
        temaExistente.cantidadPreguntas += 1;
        
    }

    showLista=function(){
        return this.listaTemas
    }

    // Preguntas

    addPreguntas(valor){
        this.listaPreguntas.push(valor);

        if (inicializado){
            this.sumarPregunta(valor.tema.nombre)

        }
        
    }

    showPreguntas(){
        return this.listaPreguntas;
    }









}


