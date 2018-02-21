const express = require('express');
let router = express.Router();
let order = require('./../helpers/order_db');
var nodemailer = require('nodemailer');

router.post('/send_email',(req, res)=> {
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'projectmailer3@gmail.com',
          pass: 'Contrasena1'
      }
  });

  var link = "http://"+req.get('host')+"/new.html";
  var text = "<h1>" + req.body.user_name + " " + req.body.user_lastname + "</h1><ul>";
  for (i=0; i<req.body.products_name.length; i++) {
    text += "<li>" + req.body.products_name[i] + " " + req.body.price[i] + " " + req.body.quantity[i] + "</li>";
  }
  text += "<p> Total: "+ req.body.total +"</p>Se ha realizado una nueva compra,<br> A continuacion haga click en el siguiente enlace para crear una orden.<br><a href="+link+">Nueva orden</a></ul>";
  // setup e-mail data with unicode symbols
      var mailOptions = {
  // sender address
          from: '<email@gmail.com>',
  // list of receivers
          to: 'cesarbrazon10@gmail.com',
  // Subject line
          subject: 'Nueva compra',
          html: text,
      };
      var status;
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            status = false;
            console.log(error);
            res.send({product_name:req.body.products_name, user_name:req.body.user_name, user_lastname:req.body.user_lastname, total:req.body.total, quantity:req.body.quantity, price:req.body.price, sent:true});
        }else{
            status = true;
            console.log('Message sent: ' + info.response);
            res.send({product_name:req.body.products_name, user_name:req.body.user_name, user_lastname:req.body.user_lastname, total:req.body.total, quantity:req.body.quantity, price:req.body.price, sent:true});
        }
    });
  });

router.post('/create',(req,res) => {
    var d = new Date();
    var month = d.getMonth();
    var test = month+1;
    var date = d.getFullYear()+"-"+test+"-"+d.getDate();
    order.add_order(req.body.bill, req.body.name, req.body.lastname, req.body.total, date);
      res.send({status:200});
});

router.post('/update_comment', (req, res) => {
  order.comment_order(req.body.comment, req.body.bill).then((data)=>{
      res.send({msg:data});
      }).catch((err)=>{
          throw err;
      });
});

router.get('/all', (req, res) => {
  order.show_all_orders().then((data) =>{
    res.send({orders:data});
    }).catch((err)=>{
        throw err;
    });
});

router.get('/show/:id', (req, res) => {
  order.show_order(req.params.id).then((data) =>{
    res.send({order:data});
    }).catch((err)=>{
        throw err;
    });
});

router.get('/delete/:id', (req, res) => {
  order.delete_order(req.params.id).then((data) =>{
    res.send({order:data});
    }).catch((err)=>{
        throw err;
    });
});

router.post('/update_status', (req, res) => {
  order.change_status(true, req.body.bill_number);
  res.send({status:200});
});

router.get('/check_payment/:id', (req,res) => {
  order.check_payment_date(req.params.id).then((data) => {
    res.send({date:data});
  });
});

router.post('/by_lastname', (req, res) => {
  order.order_by_lastname(req.body.lastname).then((data) => {
    res.send({orders:data});
  });
});

router.post('/deliver_done', (req, res) => {
  var d = new Date();
  var default_month = d.getMonth();
  var month = default_month + 1;
  var deliver_date = d.getDate()+"-"+month+"-"+d.getFullYear();
  var day = d.getDate();
  var payment_day = day + parseInt(req.body.pay_days);
  var payment_date = payment_day+"-"+month+"-"+d.getFullYear();
  order.order_delivered(deliver_date, payment_date, req.body.bill_number);
  res.send({status:200});

});


module.exports = router;
