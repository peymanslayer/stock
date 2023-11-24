const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const adminMiddleware = require('./../middleware/adminMiddleware');

router.post('/',createProduct);
  
router.get('/', adminMiddleware,getAllProducts);
  
// router.get('/:id', getProductById);
  
router.put('/:id', adminMiddleware,updateProduct);
  
router.delete('/:id',adminMiddleware , deleteProduct);
  

module.exports = router;
