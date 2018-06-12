const express = require('express')
let router = express.Router()
let product = require('./../helpers/product_db')


router.get('/all',(req,res)=>{
  if (req.user === undefined) {
    var user_id = null
  } else {
    var user_id = req.user.id
  }
  if (req.user !== undefined) {
    if (req.user.admin === false) {
      var admin = false
    } else {
      var admin = true
    }
  }
  product.count().then(count => {
    product.show_all_products().then(data=>{
      res.send({list:data, id:user_id, admin:admin, count:count.count})
    }).catch(err=>{
      throw err
    })
  })
})

router.post('/create', (req,res)=>{
    product.add_product(req.body.price, req.user.id, req.body.description, req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code).then(data=>{
          res.send({status:200})
          }).catch(err=>{
            res.send({status:500})
            throw err
          })
      })

router.get('/brands',(req,res)=>{
  product.show_brands().then(data=>{
        res.send({brands:data})
        }).catch(err=>{
            throw err
        })
    })

router.get('/departments_by_brand/:brand',(req,res)=>{
  product.count_by_brand(req.params.brand).then(count => {   
    product.show_departments_by_brand(req.params.brand).then(data=>{
      res.send({departments:data, count:count.count})
    }).catch(err=>{
      throw err
    })
  })
})

router.post('/show_products_by_stuff',(req,res)=>{
  if (req.user === undefined) {
    var user_id = null
  } else {
    var user_id = req.user.id
  }
  if (req.user !== undefined) {
    if (req.user.admin === false) {
      var admin = false
    } else {
      var admin = true
    }
  }
  const { brand, department, page } = req.body
  let offset = 0
  if (page != 1) {
    offset = (15*parseInt(page)) - 15
  }
  product.count_by_brand(brand).then(count => {   
    product.show_by_brand_and_department(brand, department).then(data=>{
          res.send({list:data, id:user_id, admin, count:count.count})
          }).catch(err=>{
              throw err
          })
      })
    })

router.post('/prices', (req, res) => {
  console.log(req.body)

  if (req.user === undefined) {
    var user_id = null
  } else {
    var user_id = req.user.id
  }
  if (req.user !== undefined) {
    if (req.user.admin === false) {
      var admin = false
    } else {
      var admin = true
    }
  }
  const { brand, page } = req.body
  let offset = 0
  if (page != 1) {
    offset = (15*parseInt(page)) - 15
  }
  product.count_by_brand(brand).then(count => {   
    product.show_price_list(brand, offset).then(data=> {
      res.send({list:data, id:user_id, admin:admin, count:count.count})
    }).catch(err => {
      throw err
    })
  })
})

router.get('/:id', (req,res)=> {
  if (req.user === undefined) {
    var user_id = null
  } else {
    var user_id = req.user.id
  }
  product.show_product(req.params.id).then(data=>{
      res.send({product:data, id:user_id})
      }).catch(err=>{
          throw err
      })

})

router.get('/delete/:id', (req, res) => {
  product.delete_product(req.params.id).then(data=>{
    res.send({msg:data})
    }).catch(err=> {
        throw err
  })
})

router.post('/update', (req, res)=> {
  const { price, description,  stock, type_supplier, brand, department, code, product_id } = req.body
  product.update_product(price, description,  stock, type_supplier, brand, department, code, product_id).then(data=> {
      res.send({msg:data})
      }).catch(err=> {
        throw err
  })
})

router.post('/update_prices', (req, res) => {
  const { brand, department, porcentage } = req.body
  if (porcentage == "") {
    res.send({ status: 400 })
    return
  }
  const decimal = +porcentage/100
  if (brand == "" && department != "") {
    res.send({ status: 403 })
    return
  }
  if (department == "") {
    product.by_brand(brand).then(async products => {
      for (var i in products) {
        var new_price = (products[i].price * decimal) + (+products[i].price)
        await product.update_price(new_price, products[i].id)
      }
       res.send({ status: 200 })
    }).catch(err => {
      res.send({ status: 402})
    })
  } else {
    product.by_brand_and_department(brand, department).then(async products => {
      if (products.length == 0) {
        res.send({ status: 404 })
        return
      }
      for (var i in products) {
        var new_price = (products[i].price * decimal) + (+products[i].price)
        await product.update_price(new_price, products[i].id)
      }
      res.send({ status: 200 })
    }).catch(err => {
      res.send({ status: 401})
    })
  }
})

module.exports = router
