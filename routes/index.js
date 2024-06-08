const express = require('express');
const orderRouter = require('./orders');

const router = express.Router();

router.use('/order', orderRouter);

module.exports = router;