const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })


router.get('/' , authMiddleware ,productsController.index);
router.get('/cambios', authMiddleware, productsController.cambios)
router.post('/cambios', authMiddleware, productsController.guardarCambios)

router.get('/combos', productsController.combos);
router.get('/ofertas', productsController.ofertas);
router.get('/destacados', productsController.destacados);

router.get('/rubro', productsController.rubro);

router.get('/rubro/:category_id', productsController.productCategory);
  
router.get('/detail/:id', productsController.detail);

router.get('/cart', productsController.cart);
  
router.get('/create', authMiddleware, productsController.create);
router.post('/create', authMiddleware, upload.any(), productsController.store);
  
router.get('/edit/:id', authMiddleware, productsController.edit);
router.post('/edit/:id', authMiddleware, upload.any(), productsController.upload);

router.get('/destroy/:id', authMiddleware, productsController.destroy);

module.exports = router;