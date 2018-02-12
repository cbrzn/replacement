const express = require('express');
let router = express.Router();
let cart = require('./../helpers/cart_db');

router.post('/new', (req, res) => {
  console.log(req.body)
  cart.add_cart(req.user.id, req.body.product_id, req.body.product_name, req.body.product_path, req.body.product_price, req.body.quantity, req.body.total).then((data)=>{
      res.send({msg:req.body});
      }).catch((err)=>{
          throw err;
      });
});

router.get('/product', (req, res) => {
  cart.show_cart(req.user.id).then((data) =>{
    res.send({product:data, session:req.user});
    }).catch((err)=>{
        throw err;
    });
});

router.get('/delete/:id', (req, res) => {
  cart.delete_product_from_cart(req.user.id, req.params.id).then((data) =>{
    res.send({product:data});
    console.log(req.user.id)
    }).catch((err)=>{
        throw err;
    });
});

module.exports = router;
