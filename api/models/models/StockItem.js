const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('StockItem', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    driver_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    line: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.STRING,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    login_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    production_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },{
    tableName: "StockItems",
    createdAt: 'created_at', // Rename the createdAt column
    updatedAt: 'updated_at', // Rename the updatedAt column
  });
}

// StockItem.associate = function(models) {
//   console.log({models})
//   StockItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
//   StockItem.belongsTo(models.Stock, { foreignKey: 'stock_id', as: 'stock' });
// };

// StockItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
// StockItem.belongsTo(Stock, { foreignKey: 'stock_id', as: 'stock' });