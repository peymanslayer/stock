function applyExtraSetup(sequelize) {
	const { StockItem ,Stock, Product,Driver,Vehicle } = sequelize.models;

	// Stock.hasMany(Product,{ as : "product", foreignKey:"product_id" });
	// Stock.hasMany(StockItem, { as : "stock_items", foreignKey:"stock_id" });
	StockItem.belongsTo(Stock, { as : "stock", foreignKey:"stock_id" });
	StockItem.belongsTo(Product, { as : "product", foreignKey:"product_id",foreignKeyConstraint:true });
	StockItem.belongsTo(Driver, { as : "driver", foreignKey:"driver_id",foreignKeyConstraint:true });
	StockItem.belongsTo(Vehicle, { as : "vehicle", foreignKey:"vehicle_id",foreignKeyConstraint:true });
}

module.exports = { applyExtraSetup };