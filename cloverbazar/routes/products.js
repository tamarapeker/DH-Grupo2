const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })


router.get('/', productsController.index);

router.get('/combos', productsController.combos);
router.get('/ofertas', productsController.ofertas);
router.get('/destacados', productsController.destacados);

router.get('/rubro', productsController.rubro);

router.get('/rubro/:category', productsController.productCategory);
  
router.get('/detail/:id', productsController.detail);
  
router.get('/cart', productsController.cart);
router.get('/cart/:id', productsController.agregarProducto);
  
router.get('/create', productsController.create);
router.post('/create', upload.any(), productsController.store);
  
router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', upload.any(), productsController.upload);

router.get('/destroy/:id', productsController.destroy);

module.exports = router;