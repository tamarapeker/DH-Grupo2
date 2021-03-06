const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const productsController = {
    index: function (req, res, next) {
        //listado de productos para el admin
        db.Productos.findAll(
            {
            where: {
                estado: 1
            },
            order: [
                ["categoria_id", "ASC"],
                ["nombre", "ASC"]
            ],
            include: [{ association: "imagenes" }]
            })
            .then(function (productos) {
                res.render('products/productList', {productos});
            })
    },
    cambios: function (req, res, next) {
        //listado de productos para admin. Para editar precios, stock y descuento rapidamente
        db.Productos.findAll({
            where: {
                estado: 1
            },
            order: [
                ["categoria_id", "ASC"],
                ["nombre", "ASC"]
            ],
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                res.render('products/productListCambios', { productos })
            })
    },
    guardarCambios: function(req,res,next){
        //guarda los cambios rapidos de precio, stock y descuento
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
        //listado de productos inactivos para admin
        db.Productos.findAll({
            where: {
                estado: 0
            },
            order: [
                ["categoria_id", "ASC"],
                ["nombre", "ASC"]
            ],
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/productListInactivos', {productos})
        })
    },

    rubro: function (req,res,next) {
        //muestra las categorias
        db.Categorias.findAll()
            .then(function (categorias) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.rol == 'admin'){
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
        //muestra los productos que se venden por COMBO o SET
        db.Productos.findAll({
            where: {
                nombre: { [db.Sequelize.Op.or]: [{ [db.Sequelize.Op.like]: '%combo%' }, { [db.Sequelize.Op.like]: '%set%' }] },
                estado: 1
            },
            order: db.Sequelize.literal('rand()'),
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.rol == 'admin'){
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
        //muestra los productos en oferta
        db.Productos.findAll({
            where: {
                descuento: { [db.Sequelize.Op.gt]: 0 },
                estado: 1
            },
            order: db.Sequelize.literal('rand()'),
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.rol == 'admin'){
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
        //muestra productos destacados
        db.Productos.findAll({
            where: {
                stock: { [db.Sequelize.Op.gte]: 10 },
                estado: 1
            },
            order: db.Sequelize.literal('rand()'),
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.rol == 'admin'){
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
        //muestra los productos por categoria
        db.Productos.findAll({
            where: {
                categoria_id: req.params.category_id,
                estado: 1
            },
            order: db.Sequelize.literal('rand()'),
            include: [{ association: "imagenes" }]
        })
            .then(function (productos) {
                // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.rol == 'admin'){
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
        //muestra detalle de producto
            db.Productos.findByPk(req.params.id, {
                where: {
                    estado: 1
                },
                include: [{ association: "imagenes" }]
            })
            .then(function(producto){
                db.Productos.findAll({
                    where: {
                        id: { [db.Sequelize.Op.ne]: req.params.id },
                        categoria_id: { [db.Sequelize.Op.eq]: producto.categoria_id },
                        nombre: { [db.Sequelize.Op.ne]: producto.nombre },
                        estado: 1
                    },
                    order: db.Sequelize.literal('rand()'),
                    limit: 5,
                    include: [{ association: "imagenes" }]
                })
                .then(function(productos){
                    // esto es para que el header sea dinamico por si estas o no logueado
                if (req.session.usuarioLogueado) {
                    if(req.session.usuarioLogueado.rol == 'admin'){
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
            })
    },

    create: function (req, res, next) {
        //formulario creacion de producto
        db.Categorias.findAll()
            .then(function (categorias) {
                res.render('products/productAdd', { categorias });
            })
    },

    store: function (req, res, next) {
        // vista de errores
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            db.Categorias.findAll()
            .then(function(categorias){
                res.render("products/productAdd", {categorias, errors: errors.errors })
            })
        } else {
        //guarda el producto creado
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
        }
    },

    edit: function (req, res, next) {
        //formulario de edicion de producto
        let pedidoProducto = db.Productos.findByPk(req.params.id, {
            include: [{ association: "imagenes" }]
        })
        let pedidoCategorias = db.Categorias.findAll()

        Promise.all([pedidoProducto, pedidoCategorias])
            .then(function ([producto, categorias]) {
                res.render("products/productEdit", { producto, categorias })
            })
    },

    upload: function (req, res, next) {
        // vista de errores
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            let pedidoProducto = db.Productos.findByPk(req.params.id, {
                include: [{ association: "imagenes" }]
            })
            let pedidoCategorias = db.Categorias.findAll()
    
            Promise.all([pedidoProducto, pedidoCategorias])
                .then(function ([producto, categorias]) {
                    res.render("products/productEdit", { producto, categorias, errors: errors.errors })
                })
        } else {
            //guarda el producto editado
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
        }
    },

    destroy: function (req, res, next) {
        //pasa el producto a estado inactivo
        db.Productos.update({
            estado: 0
        },{
            where: {
                id: req.params.id
            }
        }).then(function () {
            db.Carritos.findAll({
                where: {
                    estado: 1
                },
                include: [{association: "productos"}]
            })
            .then(function(carritos){
                for(let i=0 ; i < carritos.length ; i++){
                    db.carrito_producto.destroy({
                        where: {
                            carrito_id: carritos[i].id,
                            producto_id: req.params.id
                        }
                    })
                    .then(function(){})
                }
            })
            res.redirect('/products');
                
        })

    },
    activar: function(req,res,send){
        db.Productos.update({
            estado: 1
        },{
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect('/products/inactivos');
                
        })
    }
}

module.exports = productsController;