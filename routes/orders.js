const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/registerOrder', orderController.registerOrder);
router.get('/pendingOrder', orderController.pendingOrders);
router.get('/completedOrder', orderController.completedOrders);

module.exports = router;