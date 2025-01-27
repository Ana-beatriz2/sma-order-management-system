const express = require('express');
const orderController = require('./controller/order.controller');
const router = express.Router();

router.post('/orders', orderController.receiveOrders);

router.get('/orders', orderController.sendOrdersWithChangedStatus);

router.post('/changed-orders', orderController.saveOrderWithChangedStatus);

router.post('/new-order', orderController.saveNewOrder);

router.get('/new-order', orderController.sendNewOrders);

module.exports = router;