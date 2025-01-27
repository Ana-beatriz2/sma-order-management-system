const orderService = require('../service/order.service');

module.exports = {
    async receiveOrders(req, res) {
        try {
            const ordersData = req.body;
            await orderService.receiveOrders(ordersData);
            res.status(200).json({ message: "Data sent successfully"});
        } catch (error) {
            res.status(500).json({ message: "Error sending data"});
        }
    },

    async sendOrdersWithChangedStatus(req, res) {
        try {
            const orders = await orderService.sendOrdersWithChangedStatus();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: "Error retriving data"});
        }
    },

    async saveOrderWithChangedStatus(req, res) {
        try {
            const order = req.body;
            await orderService.saveOrderWithChangedStatus(order);
            res.status(200).json({ message: 'Order saved'});
        } catch (error) {
            res.status(500).json({ message: "Error retriving data"});
        }
    },

    async saveNewOrder(req, res) {
        try {
            const newOrder = req.body;
            await orderService.saveNewOrder(newOrder);
            res.status(200).json({ message: 'New orders saved'});
        } catch (error) {
            res.status(500).json({ message: "Error saving data"});
        }
    },

    async sendNewOrders(req, res) {
        try {
            const newOrders = await orderService.sendNewOrders();
            res.status(200).json(newOrders);
        } catch(error) {
            res.status(500).json({ message: "Error sending data"});
        }
    }
}