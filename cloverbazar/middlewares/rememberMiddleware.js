const db = require('../database/models');

function rememberMiddleware(req, res, next){
    if(req.cookies.remember != undefined && req.session.usuarioLogueado == undefined){
        db.Usuarios.findOne({
            where: {
                email: req.cookies.remember
            }
        })
        .then(function(usuario){
            if(req.cookies.remember == usuario.email){
                req.session.usuarioLogueado = usuario;
            } 
        })
    }
    next();
}

module.exports = rememberMiddleware;