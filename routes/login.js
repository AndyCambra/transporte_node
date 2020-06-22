var express = require('express');
var router = express.Router();
var usuariosModel = require('./../models/usuariosModels');
//habilito getUserByUsernameAndPassword (function)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login',{
    layout:'admin/layout'
  });
});
router.post('/', async(req, res, next)=>{
  try{
    var usuario= req.body.usuario;
    var password= req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
    if(data!=undefined){
      res.redirect('/admin/novedades');
    }else{
      res.render('admin/login',{
        layout: 'admin/layuot',
        error: true
      });//cierra linea 19
    }

  }catch(error){
     console.log(error);
  }
});


module.exports = router;
