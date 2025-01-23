const express = require('express');
const orderController = require('./controller/order.controller');
const router = express.Router();

router.post('/orders', orderController.receiveOrders);

router.get('/orders', orderController.sendOrdersWithChangedStatus);

router.post('/changed-orders', orderController.saveOrderWithChangedStatus);

module.exports = router;