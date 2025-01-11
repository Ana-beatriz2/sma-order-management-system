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
    }
}