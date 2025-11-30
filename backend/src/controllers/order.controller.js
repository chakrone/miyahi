// controllers/order.controller.js
const OrderService = require("../services/order.service");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const order = await OrderService.createOrder(req.user.id, req.body);
      res.status(201).json({ success: true, data: order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const orders = await OrderService.getByUser(req.user.id);
      res.status(200).json({ success: true, data: orders });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await OrderService.getById(req.params.id);
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const updated = await OrderService.updateStatus(req.params.id, req.body.status);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};