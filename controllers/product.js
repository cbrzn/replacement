const express = require('express');
let router = express.Router();
let product = require('./../helpers/product_db');
let stuff = require('./../helpers/stuff_db');


router.get('/all',(req,res)=>{
  product.show_all_products().then((data)=>{
        res.send({images:data});
        }).catch((err)=>{
            throw err;
        });
    });

router.get('/brands',(req,res)=>{
  product.show_brands().then((data)=>{
        res.send({brands:data});
        }).catch((err)=>{
            throw err;
        });
    });


router.get('/departments_by_brand/:brand',(req,res)=>{
  product.show_departments_by_brand(req.params.brand).then((data)=>{
        res.send({departments:data});
        }).catch((err)=>{
            throw err;
        });
    });

router.post('/show_products_by_stuff',(req,res)=>{
  product.show_departments_by_brand_and_department(req.body.brand, req.body.department).then((data)=>{
        res.send({images:data});
        }).catch((err)=>{
            throw err;
        });
    });


router.get('/stuff', (req, res) => {
  stuff.get_stuff().then((data)=>{
      res.send({product:data});
      }).catch((err)=> {
          throw err;
      });
    });

router.post('/prices', (req, res) => {
  product.show_price_list(req.body.brand).then((data)=> {
    res.send({list:data});
  }).catch((err) => {
    throw err;
  })
})

router.get('/:id', (req,res)=> {
  if (req.user === undefined) {
    var user_id = null;
  } else {
    var user_id = req.user.id;
  }
  product.show_product(req.params.id).then((data)=>{
      res.send({product:data, id:user_id});
      }).catch((err)=>{
          throw err;
      });

});

router.get('/delete/:id', (req, res) => {
  product.delete_product(req.params.id).then((data)=>{
    res.send({msg:data});
    }).catch((err)=> {
        throw err;
  });
});

router.post('/update/:id', (req, res)=> {
  product.update_product(req.body.name, req.body.price, req.body.description,  req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code, req.params.id).then((data)=> {
      res.send({msg:data});
      }).catch((err)=> {
        throw err;
  });
});

module.exports = router;
