const { models } = require('../models/index.js');
const moment = require('moment-jalaali');
const { Op } = require('sequelize');

const createStockItem = async (req, res) => {
  try {
    const stockItem = await models.StockItems.create( { ...req.body,expirationDate:moment().format("YYYY-M-D 00:00:00"),production_date:moment().format("YYYY-M-D 00:00:00"),loginDate:moment().format("YYYY-M-D 00:00:00") });
    res.status(201).json(stockItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllStockItems = async (req, res) => {
  try {
    const { id, page,code,name } = req.query;

    if(id){
      const stockItem = await models.StockItems.findOne({
        where:{id:Number(id)},
        include: [
          { model: models.Stock, as: 'stock' },
          { model: models.Product, as: 'product' },
          { model: models.Driver, as: 'driver' },
          { model: models.Vehicle, as: 'vehicle' }
        ]
    });
  
      res.status(200).json(stockItem);
     }else if(code || name){
      let whereObject = {};
      if(code && code?.length){
        whereObject.code = code;
      }
      if(name && name?.length){
        whereObject.name = { [Op.like]: `%${name}%` };
      }
      const stockItem = await models.StockItems.findAndCountAll({
        limit: 20,
        offset: page ? (Number(page) - 1) * 20 : 0,
        order: [['id', 'DESC']],
        include: [
          { model: models.Stock, as: 'stock' },
          { model: models.Product, as: 'product',where:whereObject
        },
        { model: models.Driver, as: 'driver' },
        { model: models.Vehicle, as: 'vehicle' }
        ]
      });
  
      res.status(200).json(stockItem);
     }else{
  //   const stockItems = await models.StockItems.findAll({
  //     limit: 20,
  //     offset: page ? (Number(page) - 1) * 20 : 0,
  //     order: [['id', 'DESC']],
  //     include: [
  //       { model: models.Stock, as: 'stock' },
  //       { model: models.Product, as: 'product' },
  //       { model: models.Driver, as: 'driver' },
  //       { model: models.Vehicle, as: 'vehicle' }
  //     ]
  // });
  const stockItems= await models.StockItems.findAndCountAll({
    limit:20,
    offset: page ? (Number(page) - 1) * 20 : 0,
    order: [['updated_at', 'DESC']],
  });

    res.status(200).json(stockItems);
   }
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStockItemById = async (req, res) => {
  const { articleCode } = req.body;
  try {
    const product = await models.StockItems.findOne({where:{articleCode:articleCode}});
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
  const data = { ...req.body }
  try {
    const [updated] = await models.StockItems.update(data, {
      where: { articleCode:req.params.code },
    });
    console.log(updated);
    if (updated) {
      const updatedStockItem = await models.StockItems.findOne({where:{articleCode:req.params.code}});
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
    const deleted = await models.StockItems.destroy({
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
