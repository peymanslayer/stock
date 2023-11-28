// const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

// // Configure your database connection here
// const sequelize = new Sequelize({
//   dialect: config.dialect, // Use the dialect of your database (e.g., 'mysql', 'postgres', 'sqlite', etc.)
//   host: config.host, // Replace with your database host
//   username: config.username, // Replace with your database username
//   password: config.password, // Replace with your database password
//   database: config.database, // Replace with your database name
//   port: 3306, // Replace with your database port (default is 3306 for MySQL)
// });

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./models/extra-setup.js');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
  dialect: config.development.dialect, // Use the dialect of your database (e.g., 'mysql', 'postgres', 'sqlite', etc.)
  host: config.development.host, // Replace with your database host
  username: config.development.username, // Replace with your database username
  password: config.development.password, // Replace with your database password
  database: config.development.database, // Replace with your database name
  port: config.development.port, // Replace with your database port (default is 3306 for MySQL)
	// logQueryParameters: true,
	// benchmark: true
  dialectOptions: {
    options: {
      requestTimeout: 90000000000
    }
  },
});

const modelDefiners = [
	require('./models/Product.js'),
	require('./models/Stock.js'),
	require('./models/StockItem.js'),
  require('./models/User.js'),
  require('./models/Driver.js'),
  require('./models/Vehicle.js'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;