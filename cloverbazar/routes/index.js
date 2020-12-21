var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.index);

router.get('/contacto', mainController.contacto);

router.get('/mayorista', mainController.mayorista);

router.get('/faqs', mainController.faqs);

router.get('/search', mainController.search);

router.post('/mandarMail', mainController.mandarMail)
router.post('/mandarMailMayorista', mainController.mandarMailMayorista)

module.exports = router;
