const express = require ('express');
let router = express.Router();

router.use('/',require('./session'));
router.use('/file',require('./upload'));
router.use('/product',require('./product'));
router.use('/cart',require('./cart'));
router.use('/order',require('./order'));
router.use('/stuff', require('./stuff'));

module.exports = router;
