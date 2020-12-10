const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/models');

const cartsController = {
    mostrarCarrito: function(req,res,next){
        //Busca si el usuario tiene un carrito abierto
        db.Carritos.findOne({
            where: {
                usuario_id: req.params.usuario_id,
                estado: 1
            }
        })
        .then(function(carrito){
            //Si no lo tiene se crea un carrito, que en principio esta vacio
            if(!carrito){
                db.Carritos.create({
                    usuario_id: req.params.usuario_id,
                    fecha_creacion: new Date(),
                    estado: 1
                })
                .then(function(){
                    let carrito_producto = []
                    res.render('carts/productCart', {carrito_producto})
                })
            } else {
                //Si ya tenia un carrito abierto, busco los productos que tiene para mostrarlos
                db.carrito_producto.findAll({
                    where: {
                        carrito_id: carrito.id
                    },
                    include: [{association: 'productos'}, {association: 'imagenes'}]
                })
                .then(function(carrito_producto){
                    res.render("carts/productCart", {carrito_producto})
                })
            }
        })
    },
    agregarProducto: function(req,res,next){
        let id_usuarioLogueado = req.session.usuarioLogueado.id
        //Busco el producto a agregar
        db.Productos.findByPk(req.params.producto_id)
        .then(function(producto){
            if(producto.stock >= req.body.cantidad){
                //Si el stock de producto a agregar es mayor a la cantidad, busco si el usuario logueado tiene ya un carrito abierto
                db.Carritos.findOne({
                    where: {
                        usuario_id: id_usuarioLogueado,
                        estado: 1
                    }
                })
                .then(function(carrito){
                    //Si no tiene carrito, se crea uno
                    if(!carrito){
                        db.Carritos.create({
                            usuario_id: id_usuarioLogueado,
                            fecha_creacion: new Date(),
                            estado: 1
                        })
                        .then(function(carrito){
                            //Agrega el producto al carrito que estaba vacio
                            db.carrito_producto.create({
                                carrito_id: carrito.null,
                                producto_id: req.params.producto_id,
                                cantidad: req.body.cantidad
                            })
                            .then(function(){
                                let producto_id = req.params.producto_id 
                                res.redirect("/products/detail/"+producto_id)
                            })
                        })
                    } else {
                        //Si ya existe un carrito abierto, busco si tiene ya el producto a agregar
                        db.carrito_producto.findOne({
                            where: {
                                carrito_id: carrito.id,
                                producto_id: req.params.producto_id
                            }
                        })
                        .then(function(carrito_producto){
                            //Si no tiene el producto lo crea
                            if(!carrito_producto){
                                db.carrito_producto.create({
                                    carrito_id: carrito.id,
                                    producto_id: req.params.producto_id,
                                    cantidad: req.body.cantidad
                                })
                                .then(function(){
                                    let producto_id = req.params.producto_id
                                    res.redirect("/products/detail/"+producto_id)
                                })
                            } else {
                                //Si ya tenia el producto se actualiza la cantidad
                                let cantidadNew = Number(carrito_producto.cantidad) + Number(req.body.cantidad)
                                if(cantidadNew <= producto.stock){
                                    db.carrito_producto.update({
                                        cantidad: cantidadNew
                                    }, {
                                        where: {
                                            id: carrito_producto.id
                                        }
                                    })
                                    .then(function(){
                                        let producto_id = req.params.producto_id
                                        res.redirect("/products/detail/"+producto_id)
                                    
                                    })  
                                } else {
                                    let producto_id = req.params.producto_id
                                    res.redirect("/products/detail/"+producto_id)
                                }
                            }
                        })
                    }
                })
            } else {
                res.render("error")
            }
        })

    },
    eliminarProducto: function(req,res,next){
                    //Elimina el producto del carrito
                    db.carrito_producto.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(function(){
                        db.Carritos.findByPk(req.params.carrito_id)
                        .then(function(carrito){
                            res.redirect("/carts/"+carrito.usuario_id)
                        })
                    })
    },
    confirmarCompra: function(req,res,next){
        db.Carritos.update({
            estado: 0,
            fecha_compra: new Date()
        }, {
            where: {
                id: req.params.carrito_id
            }
        })
        .then(function(){
            for(let i=0 ; i < req.body.id.length ; i++){
                db.carrito_producto.update({
                    precio_congelado: req.body.precio[i]
                }, {
                    where: {
                        id: req.body.id[i]
                    }
                })
                .then(function(){})
            }
            for(let i=0 ; i < req.body.id.length ; i++){
                db.Productos.findByPk(req.body.id)
                .then(function(producto){
                    db.Productos.update({
                        stock: producto.stock - req.body.cantidad[i]
                    },{
                        where: {
                            id: req.body.id[i]
                        }
                    })
                    .then(function(){})
                })
            }
            res.redirect('/')
        })
    }
}

module.exports = cartsController;