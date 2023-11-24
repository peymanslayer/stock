const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 const user= sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:"user",

    }
  },{
    tableName: "Users",
    createdAt: 'created_at', // Rename the createdAt column
    updatedAt: 'updated_at', // Rename the updatedAt column
  });
  return user
}