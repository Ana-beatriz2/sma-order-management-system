const { getWebSocketInstance } = require('../websocket');
const ordersWithChangedStatus = [];

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
            return ordersWithChangedStatus;
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
    }
}