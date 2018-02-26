const express = require('express');
let router = express.Router();
let cart = require('./../helpers/cart_db');
let product = require('./../helpers/product_db');

router.post('/new', (req, res) => {
  var stock = parseInt(req.body.stock) - parseInt(req.body.quantity);
  cart.update_product_stock(stock, req.body.product_id);
  cart.check_cart(req.user.id, req.body.product_id, false).then((data)=>{
    if (data[0] == undefined) {
      cart.add_cart(req.user.id, req.body.product_id, req.body.product_name, req.body.product_path, req.body.product_price, req.body.quantity, req.body.total);
      res.send({msg:200});
    } else {
      res.send({msg:401});
    }
    }).catch((err)=>{
        throw err;
    });
  });

router.get('/product', (req, res) => {
  cart.show_cart(req.user.id, false).then((data) =>{
    res.send({product:data, session:req.user});
    }).catch((err)=>{
        throw err;
    });
});

router.get('/delete/:id', (req, res) => {
  product.show_product(req.params.id).then((data) =>{
    var actual_stock = data.stock;
    cart.check_cart(req.user.id, req.params.id, false).then((data)=>{
      var new_stock = parseInt(actual_stock) + parseInt(data[0].quantity);
      cart.update_product_stock(new_stock, req.params.id);
      cart.delete_product_from_cart(req.user.id, req.params.id, false);
      res.send({status:200});
      }).catch((err)=>{
            throw err;
        });
    }).catch((err)=>{
        throw err;
    });
});


module.exports = router;
