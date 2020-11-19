const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/models');

const cartsController = {
    cart: function(req,res,next){
        //mostrar el carrito del usuario con los productos
        db.Carrito.findOne({
            where: {
                usuario_id: req.params.usuario_id,
                estado: 1
            }
        })
        .then(function(carrito){
            db.carrito_producto.findAll({
                where: {
                    carrito_id: carrito.id
                },
                include: [{ association: "productos" }, {association: "imagenes" }]
            })
            .then(function(items){
                res.render('/carts/productsCart', {items})
            })
        })
    },
    agregarProducto: function(req,res,next){
        let id_usuarioLogueado = req.locals.usuarioLogueado.id
        db.Carritos.findOne({
            where: {
                usuario_id: id_usuarioLogueado,
                estado: 1
            }
        })
        .then(function(carrito){
            if(!carrito){
                db.Carritos.create({
                    usuario_id: id_usuarioLogueado,
                    fecha_creacion: new Date(),
                    estado: 1
                })
                .then(function(carrito){
                    db.carrito_producto.create({
                        carrito_id: carrito.id,
                        producto_id: req.params.producto_id
                    })
                    .then(function(){
                        res.redirect('/')
                    })
                })
            } else {
                db.carrito_producto.create({
                    carrito_id: carrito.id,
                    producto_id: req.params.producto_id
                })
                .then(function(){
                    res.redirect('/')
                })
            }
        })
    }
}

module.exports = cartsController;