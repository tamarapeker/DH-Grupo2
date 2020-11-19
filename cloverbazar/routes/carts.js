const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const multer = require('multer');
const path = require('path');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { cart } = require('../controllers/cartsController');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

router.get('/:usuario_id', authMiddleware, cartsController.cart)
router.post('/agregar/:producto_id', authMiddleware, cartsController.agregarProducto)


module.exports = router;