let adminMiddleware = function (req,res,next){
      if(req.session.usuarioLogueado.email == 'ventascloverbazar@gmail.com'){
          let logged = true
          next();
      } else {
          res.render('error');
      }
        
}

module.exports = adminMiddleware;
