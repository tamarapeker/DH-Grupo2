const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
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
        res.render('products/productCart', { products });
    },

    agregarProducto: function (req, res, next) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == req.params.id) {
                productoAAgregar = products[i];
            }
        }

        if (productoAAgregar.stock > 0) {
            productsCart.push(productoAAgregar);
            let productsCartJSON = JSON.stringify(productsCart);
            fs.writeFileSync(productsCartFilePath, productsCartJSON);
            productoAAgregar.stock--;
            res.render('products/productCart', { productsCart })
        }
    },

    create: function (req, res, next) {
        res.render('products/productAdd', { products });
    },

    store: function (req, res, next) {

        res.redirect('/');
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
        /*
        let id = req.params.id
        res.render('products/productEdit', {products, id})*/
    },

    upload: function (req, res, next) {
        products.forEach(product => {
            if (product.id == req.params.id) {
                //si corresponde el id piso los valores q edito

                product.nombre = req.body.nombreProducto
                product.precio = req.body.precioProducto
                product.precio = Number(req.body.precioProducto)
                product.descuento = req.body.descuentoProducto
                producto.descuento = Number(req.body.descuentoProducto)
                /*producto.stock = req.body.stockProdocto
                producto.stock = Number(req.body.stockProducto)*/
                producto.rubro = req.body.rubroProducto
                producto.color = req.body.colorProducto
                producto.medidas = req.body.medidasProducto
                producto.descripcion = req.body.descripcionProducto
                //producto.imagen = req.body.imgProducto
            }
            fs.writeFileSync(__dirname, '../data/productsDataBase.json', JSON.stringify(products))


        });
        res.redirect("products/productList")

        /*let id = req.params.id
        res.redirect('/');*/
    },

    destroy: function (req, res, next) {
        let id = req.params.id;
        let newProducts = products.filter(function (product) {
            return product.id != id;
        });

        let productsJSON = JSON.stringify(newProducts);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/');
    }
}

module.exports = productsController;