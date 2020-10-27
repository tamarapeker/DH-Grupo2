const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const multer = require('multer');
const productsCartFilePath = path.join(__dirname, '../data/productsCart.json');
const productsCart = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');

const productsController = {
    index: function (req, res, next) {
        db.Productos.findAll()
        .then(function(productos){
            res.render('products/productList', { products: productos });
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
                nombre: {[db.sequelize.Op.like]: '%combo%', [db.sequelize.Op.like]: '%set%'}       
            }
        })
        .then(function(productos){
            res.render('products/combos', { productsCombos: productos });
        })
    },

    ofertas: function (req, res, next) {
       db.Productos.findAll({
           where: {
               descuento: {[db.sequelize.Op.gt]: 0}
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
                stock: {[db.sequelize.Op.gte]: 20}
            },
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('products/destacados', {productos})
        })
    },

    productCategory: function (req, res, next) {
        db.Categorias.findByPk(req.params.category_id, {
            include: [{association: "productos"}]
        })
        .then(function(categoria){
            res.render('products/product', { categoria});
        })
    },

    detail: function (req, res, next) {
        db.Productos.findByPk(req.params.id, {
            include: [{association: "imagenes"}]
        })
        .then(function(producto){
            res.render('products/productDetail', { product: producto});            
        })
        /*COMO AGREGAMOS PRODUCTOS RELACIONADOS???*/ 
    },

    cart: function (req, res, next) {
        res.render('products/productCart');
    },

    create: function(req,res,next){
        res.render('products/productAdd');
    },

    store: function(req,res,next){
        /* Toma los valores ingresados del formulario  */
        let producto = req.body;
        producto = {
            id: products[products.length-1].id + 1,
            nombre: req.body.nombreProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            descuento: req.body.descuentoProducto,
            rubro: req.body.rubroProducto,
            color: req.body.colorProducto,
            medidas: req.body.medidasProducto,
            descripcion: req.body.descripcionProducto,
            imagen: req.files[0].filename
        };

        /* Agrega el producto creado al array de productos y sobreescribe el JSON  */
        products.push(producto);
        fs.writeFileSync(productsFilePath, JSON.stringify(products))


        /* Redirecciona */
        res.redirect('/products');
    },

    edit: function (req, res, next) {
        let productFind;
        products.forEach(product => {
            if (product.id == req.params.id) {
                productFind = product;
                //muestra el fomrulario
                res.render("products/productEdit", { product: productFind })
            }
        });
        res.send("no existe el producto");
    },

    upload: function (req, res, next) {
        products.forEach(product => {
            if (product.id == req.params.id) {
                //si corresponde el id piso los valores q edito

                product.nombre = req.body.nombreProducto
                product.precio = Number(req.body.precioProducto)
                product.descuento = Number(req.body.descuentoProducto)
                product.stock = Number(req.body.stockProducto)
                product.rubro = req.body.rubroProducto
                product.color = req.body.colorProducto
                product.medidas = req.body.medidasProducto
                product.descripcion = req.body.descripcionProducto
                //product.imagen = req.files[0].filename
            }
            fs.writeFileSync(productsFilePath, JSON.stringify(products))
        });
        
        res.redirect("/products");
    },

    destroy: function (req, res, next) {
        let newProducts = products.filter(function (product) {
            return product.id != req.params.id;
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts));
        res.redirect('/products');
    }
}

module.exports = productsController;