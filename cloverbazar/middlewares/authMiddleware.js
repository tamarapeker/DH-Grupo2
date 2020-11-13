let authMiddleware = function (req, res, next) {
    if (req.session.usuarioLogueado) {
        res.locals.isAuthenticated = true
        res.locals.usuarioLogueado = req.session.usuarioLogueado
        next();
    } else {
        res.locals.isAuthenticated = false;
        res.send("Debes iniciar sesion")
    }

}

module.exports = authMiddleware