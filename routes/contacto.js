var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto',{
    IsContacto:true
  });
});
router.post('/', async(req, res, next)=> {
  console.log(req.body);
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;
  //datos donde se envia el mail
  var obj ={
    to: 'andycambra@gmail.com',
    subjet: 'Contacto Web',
    html: nombre +' se contacto a traves de la web y quiere mas info a este correo: '+ email + '.<br> Ademas, hizo este comentario: '+ mensaje + '. <br> Su telefono es: '+ tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });//FIN DEL TRANSPORT
  var info =await transport.sendMail(obj);
  
  res.render('contacto',{
    message:'Mensaje enviado correctamente'
  })
});

module.exports = router;
