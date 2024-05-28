window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("seccionDescripcion").addEventListener("click" , mostrarSeccionDescripcion);
    document.getElementById("seccionGestion").addEventListener("click" , mostrarSeccionGestion);
    document.getElementById("seccionJugar").addEventListener("click" , mostrarSeccionJugar);
}


function mostrarSeccionDescripcion() {

    let verSeccionDescripcion = document.getElementById("seccionDescripcion") ;

    if  (verSeccionDescripcion.click){

        document.getElementById("descripcion").style.display = "block" ;
        document.getElementById("gestion").style.display = "none" ;
        document.getElementById("jugar").style.display = "none" ;
    }

    
}
function mostrarSeccionGestion() {

    let verSeccionGestion = document.getElementById("seccionGestion") ;

    if  (verSeccionGestion.click){

        document.getElementById("descripcion").style.display = "none" ;
        document.getElementById("gestion").style.display = "block" ;
        document.getElementById("jugar").style.display = "none" ;
    }

    
}
function mostrarSeccionJugar() {

    let verSeccionJugar = document.getElementById("seccionJugar") ;

    if  (verSeccionJugar.click){

        document.getElementById("descripcion").style.display = "none" ;
        document.getElementById("gestion").style.display = "none" ;
        document.getElementById("jugar").style.display = "block" ;
    }

    
}
