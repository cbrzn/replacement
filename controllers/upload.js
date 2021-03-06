const express = require('express');
const multer = require('multer');
var cloudinary = require('cloudinary');
let Product = require('./../helpers/product_db');

cloudinary.config({
   cloud_name: 'zingaring',
   api_key: '195729922234217',
   api_secret: 'rul2JCiaHBPULlxuKDd04N5zFJ8'
});

let upload = multer({dest: "./uploads/"});

let router = express.Router();

router.post('/new_product',upload.single('file'),(req,res)=>{
    cloudinary.uploader.upload(req.file.path,
    function(result) {
      if (Product.add_product(req.body.price, req.user.id,
                              req.body.description, req.body.stock, req.body.type_supplier,
                              req.body.brand, req.body.department, req.body.code)) {
        res.send({status:200});
      } else {
        res.send({status:500})
      }
    });
});

router.get('/getFile/:filename',(req,res)=>{
    res.download(`${__dirname}/../images/${req.params.filename}`);
});

router.post('/uploadMultFile',upload.array('files[]'),(req,res)=>{
    res.send({status:200});
});
module.exports = router;
