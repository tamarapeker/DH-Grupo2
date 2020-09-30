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
        var productsCart = [];
        if (productoAAgregar.stock > 0) {
            productsCart.push(productoAAgregar);
            let productsCartJSON = JSON.stringify(productsCart);
            fs.writeFileSync(productsCartFilePath, productsCartJSON);
            productoAAgregar.stock = productoAAgregar.stock - 1;
            res.render('products/productCart', { product : productoAAgregar })
        }
    },

    create: function(req,res,next){
        res.render('products/productAdd');
    },

    store: function(req,res,next){
        /* Toma los valores ingresados del formulario  */
        let producto = {
            nombreProducto: req.body.nombreProducto,
            rubroProducto: req.body.rubroProducto,
            colorProducto: req.body.colorProducto,
            medidasProducto: req.body.medidasProducto,
            descripcionProducto: req.body.descripcionProducto,
            imgProducto: req.files[0].filename
        };

        /*  */
        let baseProductos = fs.readFileSync('productsDataBase', {encoding: 'utf-8'});
        let productosRegistrados;
        if(baseProductos == ""){
            productosRegistrados = [];
        } else {
            productosRegistrados = JSON.parse(baseProductos);
        }

        productosRegistrados.push(producto);

        //usuariosRegistradosJSON = JSON.stringify(usuariosRegistrados);

        //fs.writeFileSync('usuarios.json', usuariosRegistradosJSON);

        /* Redirecciona al login luego de registrarte */
        res.redirect('/products/create');
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
               /* product.precio = Number(req.body.precioProducto)
                product.descuento = Number(req.body.descuentoProducto)*/
                /*producto.stock = req.body.stockProdocto
                producto.stock = Number(req.body.stockProducto)*/
                product.rubro = req.body.rubroProducto
                product.color = req.body.colorProducto
                product.medidas = req.body.medidasProducto
                product.descripcion = req.body.descripcionProducto
                //producto.imagen = req.body.imgProducto
            }
            fs.writeFileSync(productsFilePath, JSON.stringify(products))


        });
        
        res.redirect("/products/edit/8");
    },

    destroy: function (req, res, next) {
        let id = req.params.id;
        let newProducts = products.filter(function (product) {
            return product.id != id;
        });

        let productsJSON = JSON.stringify(newProducts);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/products');
    }
}

module.exports = productsController;