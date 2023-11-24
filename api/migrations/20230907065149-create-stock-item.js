'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StockItems', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      stock_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Stock',
          key: 'id',
        },
      },
      location: {
        type: Sequelize.STRING,
      },
      expiration_date: {
        type: Sequelize.DATE,
      },
      login_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      production_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StockItems');
  },
};
