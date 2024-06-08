const Sequelize = require('sequelize');

const sequelize = new Sequelize("order_management", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    port: 3306
});

console.log("Databse Connected Successfully!!");

module.exports = sequelize;