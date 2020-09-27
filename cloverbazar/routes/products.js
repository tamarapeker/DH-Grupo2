var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.index);

router.get('/combos', productsController.combos);
router.get('/ofertas', productsController.ofertas);

router.get('/rubro', productsController.rubro);

router.get('/rubro/:category', productsController.productCategory);
  
router.get('/detail/:id', productsController.detail);
  
router.get('/cart', productsController.cart);
router.post('/cart/:id', productsController.agregarProducto);
  
router.get('/create', productsController.create);
router.post('/create', productsController.store);
  
router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.upload);

router.post('/destroy/:id', productsController.destroy);

module.exports = router;