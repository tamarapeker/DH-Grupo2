const fs = require('fs');
const bcrypt = require('bcrypt');

const usersController = {
    register: function(req,res,next){
        res.render('users/register');
    },

    create: function(req,res,next){
        /* Toma los valores ingresados del formulario  */
        let usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            confirmPassword: bcrypt.hashSync(req.body.confirmPassword, 10)
        };

        /*  */
        let baseUsuarios = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});
        let usuariosRegistrados;
        if(baseUsuarios == ""){
            usuariosRegistrados = [];
        } else {
            usuariosRegistrados = JSON.parse(baseUsuarios);
        }

        usuariosRegistrados.push(usuario);

        usuariosRegistradosJSON = JSON.stringify(usuariosRegistrados);

        fs.writeFileSync('usuarios.json', usuariosRegistradosJSON);

        /* Redirecciona al login luego de registrarte */
        res.redirect('/users/login');
    },

    login: function(req,res,next){
        res.render('users/login');
    },

    processLogin: function(req,res,next){
        let baseUsuarios = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});
        let usuariosRegistrados;
        if(baseUsuarios == ""){
            usuariosRegistrados = [];
        } else {
            usuariosRegistrados = JSON.parse(baseUsuarios);
        }

        for (i=0; usuariosRegistrados.length; i++){
            if(usuariosRegistrados[i] == req.body.email && bcrypt.compareSync(req.body.password, usuariosRegistrados[i].password)){
                res.send('/');
            }
        }
        res.send('users/login');
        
    }
}

module.exports = usersController;