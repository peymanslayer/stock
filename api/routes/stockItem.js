const express = require('express');
const router = express.Router();
const { createStockItem, getAllStockItems, getStockItemById, updateStockItem, deleteStockItem } = require('../controllers/stockItemController');
const authMiddleware = require('./../middleware/authMiddleware');


router.post('/',createStockItem);
  
router.get('/', getAllStockItems);
  
router.post('/getone',getStockItemById);
  
router.put('/:code',updateStockItem);
  
router.delete('/:id',deleteStockItem);
  

module.exports = router;
