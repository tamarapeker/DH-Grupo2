let authMiddleware = function (req,res,next){
      if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
          next();
      } else {
          res.render('error');
      }
        
}

module.exports = authMiddleware;
