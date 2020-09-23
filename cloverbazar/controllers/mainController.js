const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: function(req,res,next){
        res.render('/', {products});
    },

    search: function(req,res,next){
        res.render('/search', {products});
    },

    contacto: function(req,res,next){
        res.render('/contacto');
    },

    faqs: function(req,res,next){
        res.render('/faqs');
    },

    mayorista: function(req,res,next){
        res.render('/mayorista');
    }
}

module.exports = mainController;