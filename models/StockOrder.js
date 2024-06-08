const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');


const Stock = sequelize.define("Pendingorder", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    buyerQty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    buyerPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    sellerPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    sellerQty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

sequelize.sync();

module.exports = Stock;