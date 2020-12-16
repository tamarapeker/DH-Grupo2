window.addEventListener("load", function(){
    // Get the modal
    var modal = document.getElementById("myModal-cart");
    
    if(window.location.hash == "#agregadoOk"){ 
        //Texto del modal
        document.querySelector("p.text").innerHTML = "Producto agregado exitosamente"
        // Abre el modal
        modal.style.display = "block";
    }

    if(window.location.hash == "#stockInsuficiente"){ 
        //Texto del modal
        document.querySelector("p.text").innerHTML = "Stock insuficiente para agregar al carrito"
        // Abre el modal
        modal.style.display = "block";
    }

    if(window.location.hash == "#compraOk"){ 
        //Texto del modal
        document.querySelector("p.text").innerHTML = "Gracias por tu compra!!"
        // Abre el modal
        modal.style.display = "block";
    }

    if(window.location.hash == "#cambiosOk"){ 
        //Texto del modal
        document.querySelector("p.text").innerHTML = "Se guardaron los cambios"
        // Abre el modal
        modal.style.display = "block";
    }
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
})
