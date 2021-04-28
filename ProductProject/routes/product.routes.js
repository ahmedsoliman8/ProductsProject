const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');


router.get('/product', productController.getProducts);
router.get('/product/:id', productController.getProduct);
router.post('/product', productController.addProduct);
router.put('/product', productController.updateProduct);
router.delete('/product', productController.deleteProduct);


module.exports = router;