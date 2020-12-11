window.addEventListener('load',function(e){
    let subscribeForm = document.querySelector('form.forms');
    subscribeForm.addEventListener('submit', function(e){
        e.preventDefault();
        let errors = 0;

        // Validacion nameField
        let nameField = document.querySelector('#nombre');
        if(nameField.value == ""){
            let errorName = document.querySelector('div.nombreError');
            errorName.innerHTML = 'Este campo debe estar completado';
            errorName.style.display = 'block';
            errors++;
            console.log(errorName)
        } else {
            let errorName = document.querySelector('div.nombreError');
            errorName.style.display = 'none';
        }

        let surnameField = document.querySelector('#apellido');
        if(surnameField.value.length == ""){
            let errorName = document.querySelector('div.apellidoError');
            errorName.innerHTML = 'Este campo debe estar completado';
            errorName.style.display = 'block';
            errors++;
        } else {
            let errorName = document.querySelector('div.apellidoError');
            errorName.style.display = 'none';
        }

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

        // Validacion phoneField
        
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
        
        // Validacion confirmField
        let confirmField = document.querySelector('#confirmPassword');
        if(passField.value != confirmField.value){
            let errorConfirmPass = document.querySelector('div.confirmPasswordError');
            errorConfirmPass.innerHTML += 'Las contraseñas no coinciden';
            errorConfirmPass.style.display = 'block';
            errors++;
        } else {
            let errorConfirmPass = document.querySelector('div.confirmPasswordError');
            errorConfirmPass.style.display = 'none';
        }
        
        let phoneField = document.querySelector('#telefono');
        let verifyPhone = Number(phoneField.value);
        if(isNaN(verifyPhone) && phoneField.value != ""){
            let errorPhone = document.querySelector('div.telefonoError');
            errorPhone.innerHTML = 'El teléfono debe ser un número válido';
            errorPhone.style.display = 'block';
            errors++;
        } else {
            let errorPhone = document.querySelector('div.telefonoError');
            errorPhone.style.display = 'none';
        }
        
        if(errors > 0){
            e.preventDefault();
        } else {
            subscribeForm.submit();
        }
    })

})