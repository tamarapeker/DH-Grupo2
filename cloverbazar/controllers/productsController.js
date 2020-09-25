const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    index: function(req,res,next){
        res.render('products/productList', {products});
    },

    rubro: function(req,res,next){
        res.render('products/productRubro', {products});
    },

    productCategory: function(req,res,next){
        let category = req.params.category;
        res.render('productos/product', {products, category});
    },

    detail: function(req,res,next){
        let id = req.params.id;
        res.render('products/productDetail', {products, id});
    },

    cart: function(req,res,next){
        res.render('products/productCart', {products});
    },

    create: function(req,res,next){
        res.render('products/productAdd', {products});
    },

    store: function(req,res,next){

        res.redirect('/');
    },

    edit: function(req,res,next){
        let id = req.params.id
        res.render('products/productEdit', {products, id})
    },

    upload: function(req,res,next){
        let id = req.params.id
        res.redirect('/');
    },

    destroy: function(req,res,next){
        let id = req.params.id;

        res.redirect('/');
    }
}

module.exports = productsController;