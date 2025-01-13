const { getWebSocketInstance } = require('../websocket');


module.exports = {
    async receiveOrders(orders) {
        try {
            const io = getWebSocketInstance();
            io.emit('receiveOrders', orders);
        } catch (error){
            throw error;
        }
    }
}