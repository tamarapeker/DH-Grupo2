const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/models');

const productsController = {
    index: function (req, res, next) {
        db.Productos.findAll(
            {
            where: {
                estado: 1
            },
            include: [{ association: "imagenes" }]
            })
            .then(function (productos) {
                res.render('products/productList', {productos});
            })
    },
    cambios: function (req, res, next) {
        db.Productos.findAll({
            include: [{ association: "imagenes" }],
            where: {
                estado: 1
            }
        })
            .then(function (productos) {
                res.render('products/productListCambios', { productos })
            })
    },
    guardarCambios: function(req,res,next){
        for(let i=0 ; i < req.body.idProducto.length ; i++){
            db.Productos.update({
                precio: req.body.precioProducto[i],
                descuento: req.body.descuentoProducto[i],
                stock: req.body.stockProducto[i]
            },{
                where: {
                    id: req.body.idProducto[i]
                }
            })
            .then(function(){})
        }
        res.redirect('/products/cambios')
    },
    inactivos: function(req,res,next){
        db.Productos.findAll({
            where: {
                estado: 0
            },
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/productListInactivos', {productos})
        })
    },

    rubro: function (req,res,next) {
        db.Categorias.findAll()
            .then(function (categorias) {
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
                res.render('products/productRubro', { categorias });
            })
    },
    combos: function (req, res, next) {
        db.Productos.findAll({
            where: {
                nombre: { [db.Sequelize.Op.or]: [{ [db.Sequelize.Op.like]: '%combo%' }, { [db.Sequelize.Op.like]: '%set%' }] },
                estado: 1
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
                res.render('products/combos', { productos: productos });
            })
    },

    ofertas: function (req, res, next) {
        db.Productos.findAll({
            where: {
                descuento: { [db.Sequelize.Op.gt]: 0 },
                estado: 1
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
                res.render("products/ofertas", { productos })
            })
    },

    destacados: function (req, res, next) {
        db.Productos.findAll({
            where: {
                stock: { [db.Sequelize.Op.gte]: 10 },
                estado: 1
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
                res.render('products/destacados', { productos })
            })
    },

    productCategory: function (req, res, next) {
        db.Productos.findAll({
            where: {
                categoria_id: req.params.category_id,
                estado: 1
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
                res.render('products/product', { productos });
            })
            .catch(function (error) {
                console.log(error)
            })
    },

    detail: function (req, res, next) {
        let pedidoProducto = db.Productos.findByPk(req.params.id,
            {
            where: {
                estado: 1
            },
            include: [{ association: "imagenes" }]
            }
        )
        let pedidoProductos = db.Productos.findAll({
            where: {
                id: { [db.Sequelize.Op.ne]: req.params.id },
                estado: 1
            },
            include: [{ association: "imagenes" }]
        })

        Promise.all([pedidoProducto, pedidoProductos])
            .then(function ([producto, productos]) {
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
                res.render('products/productDetail', { producto, productos });
            })
    },

    create: function (req, res, next) {
        db.Categorias.findAll()
            .then(function (categorias) {
                res.render('products/productAdd', { categorias });
            })
    },

    store: function (req, res, next) {

        db.Productos.create({
            nombre: req.body.nombreProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            descuento: req.body.descuentoProducto,
            categoria_id: req.body.rubroProducto,
            color: req.body.colorProducto,
            medidas: req.body.medidasProducto,
            descripcion: req.body.descripcionProducto,
            estado: 1
        })
            .then(function (producto) {
                if(req.files[0] == undefined){
                    res.redirect('/products');
                } else {
                    db.Imagenes.create({
                        ruta: req.files[0].filename,
                        producto_id: producto.null
                    }).then(function () {
                        res.redirect('/products');
                    })
                }
            })
    },

    edit: function (req, res, next) {
        let pedidoProducto = db.Productos.findByPk(req.params.id, {
            include: [{ association: "imagenes" }]
        })
        let pedidoCategorias = db.Categorias.findAll()

        Promise.all([pedidoProducto, pedidoCategorias])
            .then(function ([product, categorias]) {
                res.render("products/productEdit", { product, categorias })
            })
    },

    upload: function (req, res, next) {
        db.Productos.update({
            nombre: req.body.nombreProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            descuento: req.body.descuentoProducto,
            categoria_id: req.body.rubroProducto,
            color: req.body.colorProducto,
            medidas: req.body.medidasProducto,
            descripcion: req.body.descripcionProducto,
            estado: req.body.estadoProducto
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(function () {
                if(req.files[0] == undefined){
                    res.redirect("/products");
                } else {
                    db.Imagenes.update({
                        ruta: req.files[0].filename
                    }, {
                        where: {
                            producto_id: req.params.id
                        }
                    })
                    .then(function () {
                        res.redirect("/products");
                    })
                }
            })
    },

    destroy: function (req, res, next) {
        db.Productos.update({
            estado: 0
        },{
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect('/products');
                
        })

    }
}

module.exports = productsController;