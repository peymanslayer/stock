const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Vehicle', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    tableName: "Vehicles",
    createdAt: 'created_at', // Rename the createdAt column
    updatedAt: 'updated_at', // Rename the updatedAt column
  });

}
