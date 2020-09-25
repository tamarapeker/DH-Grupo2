const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: function(req,res,next){
        res.render('index', {products});
    },

    search: function(req,res,next){
        let loQueBuscoElUsuario = req.query.keywords;
		let productsResult = [];
		for( let i=0 ; i < products.length ; i++){
			if(products[i].nombre.includes(loQueBuscoElUsuario)){
				productsResult.push(products[i]);
			}
		}
        res.render('results', {productsResult, loQueBuscoElUsuario});
    },

    contacto: function(req,res,next){
        res.render('contacto');
    },

    faqs: function(req,res,next){
        res.render('faqs');
    },

    mayorista: function(req,res,next){
        res.render('mayorista');
    }
}

module.exports = mainController;