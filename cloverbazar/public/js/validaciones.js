window.addEventListener('load',function(e){
    let subscribeForm = document.querySelector('form.contact-form');
    subscribeForm.addEventListener('submit', function(e){
        e.preventDefault();
        let errors = 0;

        // Validacion nameField
        let nameField = document.querySelector('#nombre');
        if(nameField.value.length == undefined){
            let errorName = document.querySelector('div.fullName');
            errorName.innerHTML = 'Este campo debe estar completado';
            errorName.style.display = 'block';
        } else {
            let errorName = document.querySelector('div.fullName');
            errorName.style.display = 'none';
        }

        let nameField = document.querySelector('#apellido');
        if(nameField.value.length < 2){
            let errorName = document.querySelector('div.fullName');
            errorName.innerHTML = 'El nombre debe tener al menos 2 caracteres';
            errorName.style.display = 'block';
        } else {
            let errorName = document.querySelector('div.fullName');
            errorName.style.display = 'none';
        }

        // Validacion emailField
        let emailField = document.querySelector('#email');
        if(emailField.value.indexOf("@") == -1){
            let errorEmail = document.querySelector('div.email');
            errorEmail.innerHTML = 'No es un tipo de email válido';
            errorEmail.style.display = 'block';
        } else {
            let errorEmail = document.querySelector('div.email');
            errorEmail.style.display = 'none';
        }

        // Validacion phoneField
        let phoneField = document.querySelector('#telefono');
        let verifyPhone = Number(phoneField.value);
        if(isNaN(verifyPhone) || phoneField.value.length < 8){
            let errorPhone = document.querySelector('div.phone');
            errorPhone.innerHTML = 'El teléfono debe ser un número válido';
            errorPhone.style.display = 'block';
        } else {
            let errorPhone = document.querySelector('div.phone');
            errorPhone.style.display = 'none';
        }

        // Validacion passField
        let passField = document.querySelector('#password');
        if(passField.value.length < 8){
            let errorPass = document.querySelector('div.password');
            errorPass.innerHTML = 'La contraseña debe tener más de 8 caracteres';
            errorPass.style.display = 'block';
        } else {
            let errorPass = document.querySelector('div.password');
            errorPass.style.display = 'none';
        }

        // Validacion confirmField
        let confirmField = document.querySelector('#confirmPassword');
        if(passField.value != confirmField.value){
            let errorConfirmPass = document.querySelector('div.rePassword');
            errorConfirmPass.innerHTML += 'Las contraseñas no coinciden';
            errorConfirmPass.style.display = 'block';
        } else {
            let errorConfirmPass = document.querySelector('div.rePassword');
            errorConfirmPass.style.display = 'none';
        }


        if(errors > 0){
            e.preventDefault();
        }
    })

})