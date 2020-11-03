const express = require('express');
const router = express.Router();
const fs = require("fs")
const {check, validationResult, body} = require("express-validator")

const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

router.get('/register',  usersController.register);
router.post('/register',[
  check("nombre").isLength( {min:3, max:30} ).withMessage("Nombre inválido "),
  check("email").isEmail().withMessage("Email inválido"),
  check("password").not().isEmpty().withMessage("Contraseña inválida"),
  body("confirmPassword","password").custom(function (value, {req}){
    if (req.body.password == value){
      return true;
    }else{ return false}
  }).withMessage("Las contraseñas no coinciden")



], usersController.create);

module.exports = router;
