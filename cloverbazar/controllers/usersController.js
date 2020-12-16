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
            .then(function (usuario) {
                if (!usuario) {
                    db.Usuarios.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        contrasena: bcrypt.hashSync(req.body.password, 10),
                        direccion: req.body.direccion,
                        telefono: req.body.telefono
                    })
                        .then(function (usuario) {
                            usuario.id = usuario.null
                            req.session.usuarioLogueado = usuario
                            console.log(req.session.usuarioLogueado)
                            res.redirect('/');
                        })
                } else {
                    res.render("users/register", { errorAlLoguear: "El email ingresado ya existe." });
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
            .then(function (usuario) {
                if (!usuario) {
                    res.render("users/login", { errorAlLoguear: "Usuario y/o contraseña invalida." });
                } else {
                    if (bcrypt.compareSync(req.body.password, usuario.contrasena)) {
                        req.session.usuarioLogueado = usuario
                        if (req.body.remember != undefined) {
                            res.cookie('remember', usuario.email, { maxAge: 300000 })
                        }
                        res.redirect('/');
                    } else {
                        res.render("users/login", { errorAlLoguear: "Usuario y/o contraseña invalida." });
                    }
                }

            })
    },
    perfil: function (req, res, next) {
        db.Usuarios.findByPk(req.params.id)
            .then(function (usuario) {
                res.render('users/perfil', { usuario })
            })
    },

    edit: function(req,res,next){
        db.Usuarios.findByPk(req.params.id)
        .then(function(usuario){
            res.render('users/editarPerfil', {usuario})
        })
    },
    uploadUser: function (req, res, next) {
        db.Usuarios.findByPk(req.params.id)
            .then(function (usuario) {
                let errors = validationResult(req)
                if (!errors.isEmpty()) {
                    res.render("users/perfil", { errors: errors.errors, usuario })
                } else {
                    db.Usuarios.update({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        direccion: req.body.direccion,
                        telefono: req.body.telefono
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(function () {
                            res.redirect('/users/perfil/' + req.params.id)
                        })
                }
            })
    },

    changePassword: function (req, res, next) {
        db.Usuarios.findByPk(req.params.id)
            .then(function (usuario) {
                res.render('users/passwordChange', { usuario })
            })
    },

    uploadPassword: function (req, res, next) {
        db.Usuarios.findByPk(req.params.id)
            .then(function (usuario) {
                let errors = validationResult(req)
                if (!errors.isEmpty()) {
                    res.render("users/passwordChange", { errors: errors.errors, usuario })
                } else {
                    if (bcrypt.compareSync(req.body.password, usuario.contrasena)) {
                        db.Usuarios.update({
                            contrasena: bcrypt.hashSync(req.body.passwordNew)
                        }, {
                            where: {
                                id: req.params.id
                            }
                        })
                            .then(function () {
                                res.redirect('/users/perfil/' + req.params.id)
                            })
                    } else {
                        res.render("users/passwordChange", { errorAlLoguear: "contraseña invalida.", usuario });
                    }
                }
            })

    },
    historialCompras: function(req,res,next){
        db.Carritos.findAll({
            where: {
                usuario_id: req.params.id,
                estado: 0
            },
            include: [{association: 'producto_carrito'}, {association: 'productos'}]
        })
        .then(function(carritos){
            res.render("users/historialCompras", {carritos})
        })
    },

    destroySession: function (req, res, next) {
        req.session.destroy(
            function () {
                res.clearCookie('remember')
                res.redirect("/users/login")
            }
        )

    },

    destroyUser: function(req,res,next){
        db.Usuarios.update({
            estado: 0
        },{
            where: {
                id: req.params.id
            }
        })
        .then(function(){
            req.session.destroy(
                function () {
                    res.clearCookie('remember')
                    res.redirect("/users/login")
                }
            )
        })
    }
}

module.exports = usersController;