const { Op } = require('sequelize');
const Stock = require('../models/StockOrder');
const CompletedOrder = require('../models/CompletedOrder');
const sequelize = require('../utils/database');

// add orders
module.exports.registerOrder = async (req, res) => {
    const { isBuyer, qty, price } = req.body;
    console.log('is buyer', isBuyer)
    console.log('2', qty)
    console.log('3', price)

    try {
        if (isBuyer === true) {
            console.log('in buyeresafda');
            const matchingOrder = await Stock.findOne({
                where: {
                    sellerPrice: { [Op.lte]: price },
                    sellerQty: { [Op.gt]: 0 }
                },
                order: [['sellerPrice', 'ASC']]
            });

            if (matchingOrder) {
                const completedQty = Math.min(qty, matchingOrder.sellerQty);
                await CompletedOrder.create({
                    price: matchingOrder.sellerPrice,
                    qty: completedQty,
                });

                if (matchingOrder.sellerQty > completedQty) {
                    await matchingOrder.update({
                        sellerQty: matchingOrder.sellerQty - completedQty,
                    });
                } else {
                    await matchingOrder.destroy();
                }

                if (qty > completedQty) {
                    await Stock.create({
                        buyerQty: qty - completedQty,
                        buyerPrice: price,
                    });
                }

                return res.json({ message: 'Order matched and completed' });
            } else {
                await Stock.create({
                    buyerQty: qty,
                    buyerPrice: price,
                });

                return res.json({ message: 'Order added to pending orders' });
            }
        } else {
            console.log('in seller con')
            const matchingOrder = await Stock.findOne({
                where: {
                    buyerPrice: { [Op.gte]: price },
                    buyerQty: { [Op.gt]: 0 }
                },
                order: [['buyerPrice', 'DESC']]
            });

            if (matchingOrder) {
                const completedQty = Math.min(qty, matchingOrder.buyerQty);
                await CompletedOrder.create({
                    price: matchingOrder.buyerPrice,
                    qty: completedQty,
                });
                console.log('matching order', matchingOrder);

                if (matchingOrder.buyerQty > completedQty) {
                    await matchingOrder.update({
                        buyerQty: matchingOrder.buyerQty - completedQty,
                    });
                } else {
                    await matchingOrder.destroy();
                }

                if (qty > completedQty) {
                    await Stock.create({
                        sellerQty: qty - completedQty,
                        sellerPrice: price,
                    });
                }

                return res.json({ message: 'Order matched and completed' });
            } else {
                await Stock.create({
                    sellerQty: qty,
                    sellerPrice: price,
                });

                return res.json({ message: 'Order added to pending orders' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// get pending orders
module.exports.pendingOrders = async (req, res, next) => {
    try {
        const orders = await Stock.findAll();
        res.json(orders);
    } catch (err) {
        console.log('Error in Getting Pending Order', err);
        res.status(500).json({
            success: false,
            message: 'Error in Getting Pending Order'
        });
    }
};

// get completed orders
module.exports.completedOrders = async (req, res, next) => {
    try {
        const orders = await CompletedOrder.findAll();
        res.json(orders);
    } catch (err) {
        console.log('Error in getting completed Order data', err);
        res.status(500).json({
            success: false,
            message: "Error in getting completed Order data"
        });
    }
}
