const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: function(req,res,next){
        db.Productos.findAll({
            where: {
                precio: {[db.Sequelize.Op.lt]: 500},
                stock: {[db.Sequelize.Op.gte]: 10}
            },
            include: [{association: "imagenes"}]
        })
        .then(function(productos){
            res.render('index', {productos});     
        })
    },

    search: function(req,res,next){
       db.Productos.findAll({
           where: {
               nombre: {[db.Sequelize.Op.like]: '%' + req.query.keywords + '%'}
           },
           include: [{association: "imagenes"}]
       })
        .then(function(productsResult){
            let loQueBuscoElUsuario = req.query.keywords
            res.render('results', {productsResult, loQueBuscoElUsuario});    
        })
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