window.addEventListener("load", function () {
    console.log("estoy funcionando")
    // Get the modal
    var modal = document.getElementById("myModal-login");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn-login");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-login")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
        console.log("clickeando")
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        console.log("cuando click en cruz")
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


})