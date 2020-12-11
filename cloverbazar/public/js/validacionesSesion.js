window.addEventListener('load',function(e){
    let subscribeForm = document.querySelector('form.forms');
    subscribeForm.addEventListener('submit', function(e){
        e.preventDefault();
        let errors = 0;

        // Validacion emailField
        let emailField = document.querySelector('#email');
        if(emailField.value.indexOf("@") == -1 || emailField.value.indexOf(".") == -1 || emailField.value.indexOf(".") <  emailField.value.indexOf("@") ){
            let errorEmail = document.querySelector('div.emailError');
            errorEmail.innerHTML = 'No es un tipo de email válido';
            errorEmail.style.display = 'block';
            errors++;
        } else {
            let errorEmail = document.querySelector('div.emailError');
            errorEmail.style.display = 'none';
        }
   
        // Validacion passField
        let passField = document.querySelector('#password');
        if(passField.value.length < 8){
            let errorPass = document.querySelector('div.passwordError');
            errorPass.innerHTML = 'La contraseña debe tener más de 8 caracteres';
            errorPass.style.display = 'block';
            errors++;
        } else {
            let errorPass = document.querySelector('div.passwordError');
            errorPass.style.display = 'none';
        }
             
        if(errors > 0){
            e.preventDefault();
        } else {
            subscribeForm.submit();
        }
    })

})