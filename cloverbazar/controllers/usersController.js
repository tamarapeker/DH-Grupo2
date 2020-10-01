const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const baseUsuarios = fs.readFileSync('usuarios.json', { encoding: 'utf-8' });

const usersController = {
    register: function (req, res, next) {
        res.render('users/register');
    },

    create: function (req, res, next) {
        // vista de errores
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("users/register", { errors: errors.errors })
        }
        /* Toma los valores ingresados del formulario  */
        let usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };

        users.push(usuario);
        fs.writeFileSync(usersFilePath, JSON.stringify(users))
        /* Redirecciona al login luego de registrarte */
        res.redirect('/');
    },

    login: function (req, res, next) {
        res.render('users/login');
    },

    processLogin: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("users/login", { errors: errors.errors })
        }


        for (i = 0; i < users.length; i++) {
            if (req.body.email == users[i].email) {
                if (bcrypt.compareSync(req.body.password, users[i].password)) {
                    res.redirect('/' );
                }//agregar un break
            }
        }
        res.render("users/login",{errorAlLoguear:"Usuario y/o contraseña invalida."});
    }
}

module.exports = usersController;