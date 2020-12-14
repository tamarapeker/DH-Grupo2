const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const adminMiddleware = require('../middlewares/adminMiddleware');
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


router.get('/' ,authMiddleware, adminMiddleware ,productsController.index);
router.get('/cambios',authMiddleware, adminMiddleware, productsController.cambios)
router.post('/cambios',authMiddleware, adminMiddleware, productsController.guardarCambios)
router.get('/inactivos',authMiddleware, adminMiddleware, productsController.inactivos)

router.get('/combos', productsController.combos);
router.get('/ofertas', productsController.ofertas);
router.get('/destacados', productsController.destacados);

router.get('/rubro', productsController.rubro);

router.get('/rubro/:category_id', productsController.productCategory);
  
router.get('/detail/:id', productsController.detail);
  
router.get('/create',authMiddleware, adminMiddleware, productsController.create);
router.post('/create', authMiddleware, adminMiddleware, upload.any(), productsController.store);
  
router.get('/edit/:id',authMiddleware, adminMiddleware, productsController.edit);
router.post('/edit/:id', authMiddleware, adminMiddleware, upload.any(), productsController.upload);

router.get('/destroy/:id', authMiddleware, adminMiddleware, productsController.destroy);
router.get('/activar/:id', authMiddleware, adminMiddleware, productsController.activar);

module.exports = router;