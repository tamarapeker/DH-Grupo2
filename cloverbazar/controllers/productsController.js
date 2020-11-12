const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/models');

const productsController = {
    index: function (req, res, next) {
        db.Productos.findAll( {
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/productList', { products: productos });
        })
    },
    cambios: function(req,res,next){
        db.Productos.findAll({
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/cambios', {productos})
        })
    },
    guardarCambios: function(req,res,next){
        db.Productos.findAll()
        .then(function(productos){
            for(let i=0 ; i < productos.length ; i++){
                db.Productos.update({
                    precio: req.body.precioProducto[i],
                    descuento: req.body.descuento[i],
                    stock: req.body.stockProducto[i]
                }, {
                    where: {
                        id: productos[i].id
                    }
                })
            }
            res.redirect('/products/cambios')
        })

    },

    rubro: function (req, res, next) {
        db.Categorias.findAll()
        .then(function(categorias){
            res.render('products/productRubro', { categorias });
        })
    },
    combos: function (req, res, next) {
        db.Productos.findAll({
            where: {
                nombre: {[db.Sequelize.Op.or]:[{[db.Sequelize.Op.like]: '%combo%'},{[db.Sequelize.Op.like]: '%set%'} ]}
            },
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/combos', { productsCombos: productos });
        })
    },

    ofertas: function (req, res, next) {
       db.Productos.findAll({
           where: {
               descuento: {[db.Sequelize.Op.gt]: 0}
           },
           include: [{association: "imagenes"}]
        })
       .then(function(productos){
        res.render("products/ofertas", {productos})
       })
    },

    destacados: function (req,res,next){
        db.Productos.findAll({
            where:{
                stock: {[db.Sequelize.Op.gte]: 10}
            },
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/destacados', {productos})
        })
    },

    productCategory: function (req, res, next) {
        db.Productos.findAll({
            where: {
                categoria_id: req.params.category_id
            },
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/product', { productos});
        })
        .catch(function(error){
            console.log(error)
        })
    },

    detail: function (req, res, next) {
        let pedidoProducto = db.Productos.findByPk(req.params.id, {
            include: [{association: "imagenes"}]
        })
        let pedidoProductos = db.Productos.findAll({
            where: {
                id: {[db.Sequelize.Op.ne]: req.params.id}
            },
            include: [{association: "imagenes"}]
        })

        Promise.all([pedidoProducto, pedidoProductos])
            .then(function([product, productos]){
                res.render('products/productDetail', {product, productos});
            })
    },

    cart: function (req, res, next) {
        res.render('products/productCart');
    },

    create: function(req,res,next){
        db.Categorias.findAll()
        .then(function(categorias){
            res.render('products/productAdd', {categorias});
        })
    },

    store: function(req,res,next){
        
        db.Productos.create({
            nombre: req.body.nombreProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            descuento: req.body.descuentoProducto,
            categoria_id: req.body.rubroProducto,
            color: req.body.colorProducto,
            medidas: req.body.medidasProducto,
            descripcion: req.body.descripcionProducto
        })
        .then(function(producto){
            db.Imagenes.create({
                ruta: req.files[0].filename,
                producto_id: producto.null
            }).then(function(){
                res.redirect('/products');
            })
        })
    },

    edit: function (req, res, next) {
            let pedidoProducto = db.Productos.findByPk(req.params.id, {
                include: [{association: "imagenes"}]
            })
            let pedidoCategorias = db.Categorias.findAll()

            Promise.all([pedidoProducto, pedidoCategorias])
            .then(function([product, categorias]){
                res.render("products/productEdit", {product, categorias})
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
            descripcion: req.body.descripcionProducto
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function(){
           
            db.Imagenes.update({
                ruta: req.files[0].filename
            }, {
                where: {
                    producto_id: req.params.id
                }
            })
            .then(function(){
                res.redirect("/products");
            })
        })
    },

    destroy: function (req, res, next) {
            db.Productos.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(){
                db.Imagenes.destroy({
                    where: {
                        producto_id: req.params.id
                    }
                })
                .then(function(){
                    res.redirect('/products');
                })
            })

    }
}

module.exports = productsController;