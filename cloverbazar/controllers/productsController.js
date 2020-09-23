const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    index: function(req,res,next){
        res.render('productList', {products});
    },

    rubro: function(req,res,next){
        res.render('productRubro', {products});
    },

    producto: function(req,res,next){
        res.render('product', {products});
    },

    detail: function(req,res,next){
        let id = req.params.id;
        res.render('productDetail', {products, id});
    },

    cart: function(req,res,next){
        res.render('productCart', {products});
    },

    create: function(req,res,next){
        res.render('productAdd', {products});
    },

    store: function(req,res,next){

        res.redirect('/');
    },

    edit: function(req,res,next){
        let id = req.params.id
        res.render('productEdit', {products, id})
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