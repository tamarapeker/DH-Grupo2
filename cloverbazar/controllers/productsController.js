const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const multer = require('multer');
const productsCartFilePath = path.join(__dirname, '../data/productsCart.json');
const productsCart = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    index: function (req, res, next) {
        res.render('products/productList', { products });
    },

    rubro: function (req, res, next) {
        res.render('products/productRubro', { products });
    },

    combos: function (req, res, next) {
        let productsCombos = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].nombre.includes('Combo') || products[i].nombre.includes('Set')) {
                productsCombos.push(products[i])
            }
        }
        res.render('products/combos', { productsCombos });
    },

    ofertas: function (req, res, next) {
        let ofertas = []
        for (let i = 0; i < products.length; i++) {
            if (products[i].descuento > 0) {
                ofertas.push(products[i])

            }
        }
        res.render("products/ofertas", {ofertas: ofertas})

    },

    destacados: function (req,res,next){
        var productosDestacados = [];
        for (let i=0 ; i < products.length ; i++){
            if((products[i].precio <= 500) && (products[i].stock >= 10)){
                productosDestacados.push(products[i]);
            }
        }
        res.render('products/destacados', {productos: productosDestacados})
    },

    productCategory: function (req, res, next) {
        let category = req.params.category;
        res.render('products/product', { products, category });
    },

    detail: function (req, res, next) {
        let id = req.params.id;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                product = products[i];
                res.render('products/productDetail', { product, products });
            }
        }
        res.send("No existe producto con ese ID");
    },

    cart: function (req, res, next) {
        res.redirect('/products/productCart');
    },

    agregarProducto: function (req, res, next) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == req.params.id) {
               return productoAAgregar = products[i];
            }
        };
        var productsCart = [];
        if (productoAAgregar.stock > 0) {
            productoAAgregar.stock = productoAAgregar.stock - 1;
            productsCart.push(productoAAgregar);
            let productsCartJSON = JSON.stringify(productsCart);
            fs.writeFileSync(productsCartFilePath, productsCartJSON);
            res.redirect('/products/productCart', { product : productsCart })
        } else{
            res.send('sin stock')
        }
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