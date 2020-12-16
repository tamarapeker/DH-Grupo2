window.addEventListener("load", function(){
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data.provincias.sort())
        let div = document.querySelector(".apiProvincias")
        div.innerHTML += "<select name='provincias' class='selectProvincias'></select>"
        let select = document.querySelector("select.selectProvincias")
        select.innerHTML += "<option value='' selected>Elegi tu provincia</option>"
        for(let i=0 ; i < data.provincias.length ; i++){
            select.innerHTML += "<option value='"+data.provincias[i].id+"'>"+data.provincias[i].nombre+"</option>"
        }
    })
})