const express = require('express');
let router = express.Router();
let product = require('./../helpers/product_db');


router.get('/all',(req,res)=>{
  if (req.user === undefined) {
    var user_id = null;
  } else {
    var user_id = req.user.id;
  }
  if (req.user !== undefined) {
    if (req.user.admin === false) {
      var admin = false;
    } else {
      var admin = true;
    }
  }
  product.show_all_products().then((data)=>{
        res.send({list:data, id:user_id, admin:admin});
        }).catch((err)=>{
            throw err;
        });
    });

router.post('/create', (req,res)=>{
    product.add_product(req.body.price, req.user.id, req.body.description, req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code).then((data)=>{
          res.send({status:200});
          }).catch((err)=>{
            res.send({status:500});
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
  if (req.user === undefined) {
    var user_id = null;
  } else {
    var user_id = req.user.id;
  }
  if (req.user !== undefined) {
    if (req.user.admin === false) {
      var admin = false;
    } else {
      var admin = true;
    }
  }
  product.show_departments_by_brand_and_department(req.body.brand, req.body.department).then((data)=>{
        res.send({list:data, id:user_id, admin:admin});
        }).catch((err)=>{
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

router.post('/update/', (req, res)=> {
  product.update_product(req.body.price, req.body.description,  req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code, req.body.product_id).then((data)=> {
      res.send({msg:data});
      }).catch((err)=> {
        throw err;
  });
});

module.exports = router;
