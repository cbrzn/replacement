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

router.get('/getFile/:filename',(req,res)=>{
    res.download(`${__dirname}/../images/${req.params.filename}`);
});
router.post('/uploadSingFile',upload.single('file'),(req,res)=>{
    cloudinary.uploader.upload(req.file.path,
    function(result) {
      Product.add_product(req.body.name, result.secure_url, req.body.price, req.user.id);
    });
    res.send({status:200});
});
router.post('/uploadMultFile',upload.array('files[]'),(req,res)=>{
    res.send({status:200});
});
module.exports = router;
