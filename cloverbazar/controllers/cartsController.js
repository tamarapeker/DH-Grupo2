const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../database/models');
const { isArray } = require('util');

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
                                res.redirect("/carts/"+id_usuarioLogueado+"#agregadoOk")
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
                                    res.redirect("/carts/"+id_usuarioLogueado+"#agregadoOk")
                                })
                            } else {
                                //Si ya tenia el producto se actualiza la cantidad previo chequeo de que esa cantidad mas la que ya tenia no supere el stock
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
                                       
                                        res.redirect("/carts/"+id_usuarioLogueado+"#agregadoOk")
                                    
                                    })  
                                } else {
                                    res.redirect("/carts/"+id_usuarioLogueado+"#stockInsuficiente")
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
        let id_usuarioLogueado = req.session.usuarioLogueado.id
        //Elimina el producto del carrito
        db.carrito_producto.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function(){
                res.redirect("/carts/"+id_usuarioLogueado)
            })
    },
    guardarCambios: function(req,res,next){
        let id_usuarioLogueado = req.session.usuarioLogueado.id
        console.log(typeof req.body.id)
        if(typeof req.body.id == "object"){
            for(let i=0 ; i < req.body.id.length; i++){
                db.carrito_producto.update({
                    cantidad: req.body.cantidad[i]
                },{
                    where: {
                        id: req.body.id[i]
                    }
                })
                .then(function(){})
            }
        
        res.redirect("/carts/"+id_usuarioLogueado+"#cambiosOk")
        } else {
            db.carrito_producto.update({
                cantidad: req.body.cantidad
            },{
                where: {
                    id: req.body.id
                }
            })
            .then(function(){})
            res.redirect("/carts/"+id_usuarioLogueado+"#cambiosOk")
        }
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
            if(typeof req.body.id == "object"){
                for(let i=0 ; i < req.body.id.length ; i++){
                    db.carrito_producto.update({
                        precio_congelado: req.body.precio[i]
                    }, {
                        where: {
                            id: req.body.id[i]
                        }
                    })
                    .then(function(){
                       
                    })
                }
    
                for(let i=0 ; i < req.body.id.length ; i++){
                    db.Productos.update({
                        stock: Number(req.body.stock_producto[i]) - Number(req.body.cantidad[i])
                    },{
                        where: {
                            id: req.body.id_producto[i]
                        }
                    })
                    .then(function(){})
                }
                res.redirect('/#compraOk')
            } else {
                db.carrito_producto.update({
                    precio_congelado: req.body.precio
                }, {
                    where: {
                        id: req.body.id
                    }
                })
                .then(function(){})
                db.Productos.update({
                    stock: Number(req.body.stock_producto) - Number(req.body.cantidad)
                },{
                    where: {
                        id: req.body.id_producto
                    }
                })
                .then(function(){})
                res.redirect('/#compraOk')
            }
        })
    }
}

module.exports = cartsController;