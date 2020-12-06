const fs = require('fs');
const path = require('path');
const db = require('../database/models');



const mainController = {
    index: function (req, res, next) {
        db.Productos.findAll({
            where: {
                precio: { [db.Sequelize.Op.lt]: 500 },
                stock: { [db.Sequelize.Op.gte]: 10 }
            },
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
                        res.locals.isAdmin = true;
                        res.locals.adminLogueado = req.session.usuarioLogueado;
                    }
                    res.locals.isAuthenticated = true
                    res.locals.usuarioLogueado = req.session.usuarioLogueado
                } else {
                    res.locals.isAuthenticated = false;

                }
                res.render('index', { productos });
            })
    },

    search: function (req, res, next) {
        db.Productos.findAll({
            where: {
                nombre: { [db.Sequelize.Op.like]: '%' + req.query.keywords + '%' }
            },
            include: [{ association: "imagenes" }]
        })
            .then(function (productsResult) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
                        res.locals.isAdmin = true;
                        res.locals.adminLogueado = req.session.usuarioLogueado;
                    }
                    res.locals.isAuthenticated = true
                    res.locals.usuarioLogueado = req.session.usuarioLogueado
                } else {
                    res.locals.isAuthenticated = false;

                }
                let loQueBuscoElUsuario = req.query.keywords
                res.render('results', { productsResult, loQueBuscoElUsuario });
            })
    },

    contacto: function (req, res, next) {
        // esto es para que el header sea dinamico por si estas o no logueado
        if (req.session.usuarioLogueado) {
            if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
                res.locals.isAdmin = true;
                res.locals.adminLogueado = req.session.usuarioLogueado;
            }
            res.locals.isAuthenticated = true
            res.locals.usuarioLogueado = req.session.usuarioLogueado
        } else {
            res.locals.isAuthenticated = false;

        }
        res.render('contacto');
    },

    faqs: function (req, res, next) {
        // esto es para que el header sea dinamico por si estas o no logueado
        if (req.session.usuarioLogueado) {
            if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
                res.locals.isAdmin = true;
                res.locals.adminLogueado = req.session.usuarioLogueado;
            }
            res.locals.isAuthenticated = true
            res.locals.usuarioLogueado = req.session.usuarioLogueado
        } else {
            res.locals.isAuthenticated = false;

        }
        res.render('faqs');
    },

    mayorista: function (req, res, next) {
        // esto es para que el header sea dinamico por si estas o no logueado
        if (req.session.usuarioLogueado) {
            if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
                res.locals.isAdmin = true;
                res.locals.adminLogueado = req.session.usuarioLogueado;
            }
            res.locals.isAuthenticated = true
            res.locals.usuarioLogueado = req.session.usuarioLogueado
        } else {
            res.locals.isAuthenticated = false;

        }
        res.render('mayorista');
    }
}

module.exports = mainController;