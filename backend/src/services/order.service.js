const orderRepository = require('../repositories/order.repo');

class OrderService {
  async createOrder(data) {
    return orderRepository.create(data);
  }

  async getOrder(id) {
    return orderRepository.findById(id, ['user', 'items.product']);
  }

  async getOrdersByUser(userId) {
    return orderRepository.findByUser(userId);
  }

  async updateOrderStatus(id, status) {
    return orderRepository.updateStatus(id, status);
  }

  async deleteOrder(id) {
    return orderRepository.deleteById(id);
  }
}

module.exports = new OrderService();
