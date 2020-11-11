const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

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
        //busco si ya existe el email en la BD, si no existe entonces guardo el nuevo usuario
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(!usuario){
                db.Usuarios.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    contrasena: bcrypt.hashSync(req.body.password, 10),
                    direccion: req.body.direccion,
                    telefono: req.body.telefono 
                })
                .then(function(){
                    res.redirect('/');
                })
            } else {
                res.render("users/register",{errorAlLoguear:"El email ingresado ya existe."});
            }
        })
    },

    login: function (req, res, next) {
        res.render('users/login');
    },

    processLogin: function (req, res, next) {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("users/login", { errors: errors.errors })
        }

        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(!usuario){
                res.render("users/login",{errorAlLoguear:"Usuario y/o contraseña invalida."});  
            } else {
                if(bcrypt.compareSync(req.body.password, usuario.contrasena)){
                    req.session.usuarioLogueado = usuario
                    res.redirect('/');
                } else {
                    res.render("users/login",{errorAlLoguear:"Usuario y/o contraseña invalida."});
                }
            }
            
        })
    }
}

module.exports = usersController;