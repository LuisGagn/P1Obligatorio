class Temas {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
// Añade tema a la lista 
    static listaTemas=[];
    
    static addLista = function(valor){

        if(!this.listaTemas.some(tema => tema.nombre === valor.nombre)){
            this.listaTemas.push(valor)
      } else if(inicializado){alert("El tema: "+ valor.nombre+ " Ya fue creado")}
      
    }


    static showLista=function(){
        return Temas.listaTemas
    }

    static listaNombres={}

    static addListaNombres = function(valor){
        if(!Temas.listaNombres[valor]){
            if(!inicializado){
                this.listaNombres[valor] = {tema: valor, cantidad: 1 }
            }else
                {this.listaNombres[valor] = {tema: valor, cantidad: 0 }
            }   
        
    }else if(!inicializado){   
        this.listaNombres[valor].cantidad+=1

    }else if(inicializado){alert("El tema: "+ valor+ " Ya fue creado")}
    }
    static showNombres=function(){
        return Temas.listaNombres
    }

}