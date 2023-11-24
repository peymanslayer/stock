const { models } = require('../models/index.js');
const moment = require('moment-jalaali')

const { Op } = require('sequelize');

const createStockItem = async (req, res) => {
  try {
    const { production_date,line,floor,expiration_date,driver_id,vehicle_id,code } = req.body;
    const product = await models.Product.findOne({
      where:{code:code}
    });
    const stock = await models.Stock.findOne();
    const stockItem = await models.StockItem.create( { driver_id,vehicle_id,stock_id:stock.id, product_id:product.id,expiration_date:moment(expiration_date).format("YYYY-M-D 00:00:00"),production_date:moment(production_date).format("YYYY-M-D 00:00:00"),login_date:moment().format("YYYY-M-D 00:00:00"),line,floor });
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
      const stockItem = await models.StockItem.findOne({
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
      const stockItem = await models.StockItem.findAndCountAll({
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
    const stockItems = await models.StockItem.findAndCountAll({
      limit: 20,
      offset: page ? (Number(page) - 1) * 20 : 0,
      order: [['id', 'DESC']],
      include: [
        { model: models.Stock, as: 'stock' },
        { model: models.Product, as: 'product' },
        { model: models.Driver, as: 'driver' },
        { model: models.Vehicle, as: 'vehicle' }
      ]
  });

    res.status(200).json(stockItems);
   }
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
  const { production_date,line,floor,expiration_date,code,driver_id,vehicle_id } = req.body;
  // return location_2;
  // res.status(200).json({location_2})
  const product = await models.Product.findOne({
    where:{code:code}
  });
  const stock = await models.Stock.findOne();
  // location:`${location_3}${location_2}${location_1}`
  const data = { driver_id,vehicle_id,code,stock_id:stock.id, product_id:product.id,expiration_date:moment(expiration_date).format("YYYY-M-D 00:00:00"),production_date:moment(production_date).format("YYYY-M-D 00:00:00"),login_date:moment().format("YYYY-M-D 00:00:00"),line,floor }
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
