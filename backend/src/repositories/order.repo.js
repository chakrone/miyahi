const BaseRepository = require('./base.repo');
const Order = require('../models/order');

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async findByUser(userId) {
    return this.model.find({ user: userId })
      .populate(['user', 'items.product']);
  }

  async updateStatus(orderId, status) {
    return this.model.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
  }
}

module.exports = new OrderRepository();
