const { models } = require('../models/index.js');
const moment = require('moment-jalaali')

const { Op } = require('sequelize');

const createStockItem = async (req, res) => {
  try {
    const product = await models.Product.findOne({
      where:{code:req.body.code}
    });
    const stockItem = await models.StockItem.create( { ...req.body,product_id:product.id,expirationDate:moment().format("YYYY-M-D 00:00:00"),production_date:moment().format("YYYY-M-D 00:00:00"),loginDate:moment().format("YYYY-M-D 00:00:00") });
    res.status(201).json(stockItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllStockItems = async (req, res) => {
  
  try {
    const findAllStockItem=await models.StockItem.findAll();
  res.status(200).json(findAllStockItem)
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStockItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.StockItem.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'StockItem not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateStockItem = async (req, res) => {
  const { id } = req.params;
  // return location_2;
  // res.status(200).json({location_2})
  const product = await models.Product.findOne({
    where:{code:req.body.code}
  });
  // const stock = await models.Stock.findOne();
  // // location:`${location_3}${location_2}${location_1}`
  const data = { ...req.body, product_id:product.id,expirationDate:moment(req.body.expirationDate).format("YYYY-M-D 00:00:00"),production_date:moment(req.body.production_date).format("YYYY-M-D 00:00:00"),loginDate:moment().format("YYYY-M-D 00:00:00") }
  try {
    const [updated] = await models.StockItem.update(data, {
      where: { id },
    });
    if (updated) {
      const updatedStockItem = await models.StockItem.findByPk(id);
      res.status(200).json(updatedStockItem);
    } else {
      res.status(404).json({ error: 'StockItem not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteStockItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await models.StockItem.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'محصول از انبار حذف شد' });
    } else {
      res.status(404).json({ error: 'StockItem not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createStockItem,
  getAllStockItems,
  getStockItemById,
  updateStockItem,
  deleteStockItem,
};
