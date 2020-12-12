const express = require('express');
const router = express.Router();
const fs = require("fs")
const { check, validationResult, body } = require("express-validator")
const usersController = require('../controllers/usersController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', [
  check("email").isEmail().withMessage("Email inválido"),
  check("password").not().isEmpty().withMessage("Contraseña inválida")
], usersController.processLogin);

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', [
  check("nombre").isLength({ min: 1, max: 30 }).withMessage("Nombre inválido "),
  check("apellido").isLength({ min: 1, max: 30 }).withMessage("Apellido inválido "),
  check("email").isEmail().withMessage("Email inválido"),
  check("password").not().isEmpty().withMessage("Contraseña inválida"),
  body("confirmPassword", "password").custom(function (value, { req }) {
    if (req.body.password == value) {
      return true;
    } else { return false }
  }).withMessage("Las contraseñas no coinciden")
], usersController.create);

router.get('/perfil/:id', authMiddleware, usersController.perfil);
router.post('/perfil/:id', [
  check("nombre").isLength({ min: 1, max: 30 }).withMessage("Nombre inválido "),
  check("apellido").isLength({ min: 1, max: 30 }).withMessage("Apellido inválido ")
], authMiddleware, usersController.uploadUser);
router.get('/password/:id', authMiddleware, usersController.changePassword)
router.post('/password/:id', [
  body("confirmPasswordNew", "passwordNew").custom(function (value, { req }) {
    if (req.body.passwordNew == value) {
      return true;
    } else { return false }
  }).withMessage("Las contraseñas no coinciden")
], authMiddleware, usersController.uploadPassword);

router.get('/historialCompras/:id', authMiddleware, usersController.historialCompras)

router.get('/destroySession', usersController.destroySession);

router.get('/destroy/:id', usersController.destroyUser)


module.exports = router;
