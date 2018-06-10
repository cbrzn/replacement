const express = require('express');
let router = express.Router();
let stuff = require('./../helpers/stuff_db');
let product = require('./../helpers/product_db');
var brands, departments;

router.post('/add_brand', (req, res) => {
  stuff.add_brand(req.body.brand).then((data)=>{
      res.send({status:200});
      })
    });

router.post('/add_department', (req, res) => {
  stuff.add_department(req.body.department).then((data)=>{
      res.send({status:200});
      })
    });

router.get('/get_brands_and_departments', async (req, res) => {
  await stuff.get_brands().then((data) => {
     brands = data;
  });

  await stuff.get_departments().then((data) => {
     departments = data;
  })

  res.send({brands:brands, departments:departments})
})

router.get('/delete_brand/:name', (req, res) => {
  stuff.delete_brand(req.params.name).then((data) => {
    product.delete_product_by_brand(req.params.name).then ((data) => {
      res.send({status:200})
    }).catch((err) => {
      res.send({status:404})
    })
  }).catch((err) => {
    res.send({status:500})
  })
})

router.get('/delete_department/:name', (req, res) => {
  stuff.delete_department(req.params.name).then((data) => {
    product.delete_product_by_deparment(req.params.name).then ((data) => {
      res.send({status:200})
    }).catch((err) => {
      res.send({status:404})
    })
  }).catch((err) => {
    res.send({status:500})
  })
})

module.exports = router;
