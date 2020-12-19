const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const nodemailer = require("nodemailer");


const mainController = {
    index: function (req, res, next) {
        db.Productos.findAll({
            where: {
                precio: { [db.Sequelize.Op.lt]: 500 },
                stock: { [db.Sequelize.Op.gte]: 5 }
            },
            order: db.Sequelize.literal('rand()'),
            limit: 10,
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if (req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com') {
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
                    if (req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com') {
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
            if (req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com') {
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
            if (req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com') {
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
            if (req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com') {
                res.locals.isAdmin = true;
                res.locals.adminLogueado = req.session.usuarioLogueado;
            }
            res.locals.isAuthenticated = true
            res.locals.usuarioLogueado = req.session.usuarioLogueado
        } else {
            res.locals.isAuthenticated = false;

        }
        res.render('mayorista');
    },
    mandarMail: function(req,res,next){
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: "ventascloverbazar@gmail.com", // generated ethereal user
                pass: "*********", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: req.body.email, // sender address
                to: "ventascloverbazar@gmail.com", // list of receivers
                subject: req.body.asunto, // Subject line
                text: "Email: "+req.body.email+"\n"+ "\n" +req.body.mensaje, // plain text body
                html: "", // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
        res.redirect('/')
    },
    mandarMailMayorista: function(req,res,next){
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: "ventascloverbazar@gmail.com", // generated ethereal user
                pass: "*********", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: req.body.email, // sender address
                to: "ventascloverbazar@gmail.com", // list of receivers
                subject: "Mayorista: "+req.body.nombre, // Subject line
                text: "Email: "+req.body.email+"\n"+"Celular: "+req.body.celular + "\n" +req.body.mensaje, // plain text body
                html: "", // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
        res.redirect('/')
    }
}

module.exports = mainController;