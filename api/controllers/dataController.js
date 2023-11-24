const sequelize = require('../models/index.js');
const xlsx = require('node-xlsx');
const fs = require("fs");
const moment = require('moment-jalaali');
const { Op } = require('sequelize');



const importData = async (req, res) => {
  
  try {
    const buffer = req.file.buffer;
    const workSheetsFromBuffer = xlsx.parse(buffer);

    // const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/../storage/data.XLSX`));

    if(workSheetsFromBuffer?.[0]?.data){

        let data = workSheetsFromBuffer?.[0]?.data;

        data.shift();

        // console.log({data})
        
data.map(async item => {
  const [code, name2, name, x, y, z, box_count,bottom_box_count] = item;
  
  try {
      await sequelize.transaction(async (transaction) => {
          let product = await sequelize.models.Product.findOne({
              where: { code },
              transaction, // Pass the transaction to the query
          });

          if (!product) {
              product = await sequelize.models.Product.create({
                  name, name2, code, box_count, Image: null , bottom_box_count
              }, { transaction });
          }

          // await sequelize.models.StockItem.create({
          //     product_id: product.id,
          //     stock_id: 12,
          //     line: null,
          //     floor: null,
          //     box_count,
          //     expiration_date: null,
          // }, { transaction });
      });
      } catch (error) {
          console.error(error);
      }
});

    }

    res.status(200).json(workSheetsFromBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportData = async (req, res) => {
  try {
    const currentDate = new Date();
    let stockItems = await sequelize.models.StockItem.findAll({
        limit: 20,
        where:{
          expiration_date: {
            [Op.lt]: currentDate,
          },
        },
        include: [
          { model: sequelize.models.Stock, as: 'stock' },
          { model: sequelize.models.Product, as: 'product' }
        ]
    });

    const excelData = stockItems.map(item => [
      item?.product?.code,
      item?.product?.name,
      item?.product?.name2,
      item?.production_date ? moment(item?.production_date).format("jYYYY/jM/jD") : "-",
      item?.login_date ? moment(item?.login_date).format("jYYYY/jM/jD") : "-",
      item?.expiration_date ? moment(item?.expiration_date).format("jYYYY/jM/jD") : "-",
      item?.box_count,
      item?.bottom_box_count
    ]);

    const buffer = xlsx.build([{ name: 'products', data: excelData }]);

    res.setHeader('Content-Disposition', 'attachment; filename="exported-data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    res.status(200).send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  importData,
  exportData
};
