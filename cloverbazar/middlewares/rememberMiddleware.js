const db = require('../database/models');

function rememberMiddleware(req, res, next){
    next();
    if(req.cookies.remember != undefined && req.session.usuarioLogueado == undefined){
        db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(req.cookies.remember == usuario.email){
                req.session.usuarioLogueado = usuario;
            } 
        })
    }
}

module.exports = rememberMiddleware;