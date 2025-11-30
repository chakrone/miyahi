// controllers/product.controller.js
const ProductService = require("../services/product.service");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAll();
      res.status(200).json({ success: true, data: products });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await ProductService.getById(req.params.id);
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updated = await ProductService.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await ProductService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};