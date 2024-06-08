const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

const CompletedOrder = sequelize.define("completedOrder", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = CompletedOrder