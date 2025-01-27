const { getWebSocketInstance } = require('../websocket');
const ordersWithChangedStatus = [];
const newOrders = [];

module.exports = {
    async receiveOrders(orders) {
        try {
            const io = getWebSocketInstance();
            io.emit('receiveOrders', orders);
        } catch (error){
            throw error;
        }
    },

    async sendOrdersWithChangedStatus() {
        try {
            const ordersWithChangedStatusArray = [...ordersWithChangedStatus];
            ordersWithChangedStatus.splice(0, ordersWithChangedStatus.length);
            return ordersWithChangedStatusArray;
        } catch (error) {
            throw error;
        }
    },

    async saveOrderWithChangedStatus(order) {
        try {
            const orderSavedIndex = ordersWithChangedStatus.findIndex(orderSave => orderSave.id === order.id);
   
            if (orderSavedIndex >= 0) {
                const oldOrderStatus = ordersWithChangedStatus[orderSavedIndex].status;
                ordersWithChangedStatus[orderSavedIndex].status = oldOrderStatus === 'In Progress' ? 'Finished' : 'In Progress';
                return;
            }

            ordersWithChangedStatus.push(order);
        } catch (error) {
            throw error;
        }
    },

    async saveNewOrder(newOrder) {
        try {
            newOrders.push(newOrder);
        } catch (error) {
            throw error;
        }
    },

    async sendNewOrders() {
        try {
            const newOrdersAdjusted = newOrders.map(order => ({
                id: Date.now(),
                ...order,
                status: "Received"
            }));
            newOrders.splice(0, newOrders.length);
            return newOrdersAdjusted;
        } catch (error) {
            throw error;
        }
    }
}