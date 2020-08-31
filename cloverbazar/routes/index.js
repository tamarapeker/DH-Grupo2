var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/productRubro',function(req,res){
  res.render('productRubro');
});

router.get('/product',function(req,res){
  res.render('product');
});

router.get('/productDetail',function(req,res){
  res.render('productDetail');
});

router.get('/productCart',function(req,res){
  res.render('productCart');
});

router.get('/register',function(req,res){
  res.render('register');
});

router.get('/login',function(req,res){
  res.render('login');
});

router.get('/productAdd',function(req,res){
  res.render('productAdd');
});

module.exports = router;
