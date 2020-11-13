let guestMiddleware = function (req, res, next) {
    if (req.session.usuarioLogueado) {
        res.locals.isAuthenticated = true
        res.locals.usuarioLogueado = req.session.usuarioLogueado
        res.send("ya estas logueado")
    } else {
        res.locals.isAuthenticated = false;

        next();
    }

}

module.exports = guestMiddleware