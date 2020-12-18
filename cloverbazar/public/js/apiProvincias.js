window.addEventListener("load", function(){
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(function(response){return response.json()})
    .then(function(data){
        console.log(data.provincias)
        let div = document.querySelector(".apiProvincias")
        div.innerHTML += "<select name='provincias' class='selectProvincias grid-input'></select>"
        let select = document.querySelector("select.selectProvincias")
        select.innerHTML += "<option value='' selected>Elegi tu provincia</option>"
        data.provincias.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          
        for(let i=0 ; i < data.provincias.length ; i++){
            select.innerHTML += "<option value='"+data.provincias[i].nombre+"'>"+data.provincias[i].nombre+"</option>"
        }
    })
})