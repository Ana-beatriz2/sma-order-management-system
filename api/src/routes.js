const express = require('express');
const orderController = require('./controller/order.controller');
const router = express.Router();

router.post('/orders', orderController.receiveOrders);

module.exports = router;