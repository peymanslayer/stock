const express = require('express');
const router = express.Router();
const { createStockItem, getAllStockItems, getStockItemById, updateStockItem, deleteStockItem } = require('../controllers/stockItemController');
const authMiddleware = require('./../middleware/authMiddleware');


router.post('/',authMiddleware,createStockItem);
  
router.get('/', authMiddleware,getAllStockItems);
  
router.get('/:id', authMiddleware,getStockItemById);
  
router.put('/:id', authMiddleware,updateStockItem);
  
router.delete('/:id',authMiddleware,deleteStockItem);
  

module.exports = router;
