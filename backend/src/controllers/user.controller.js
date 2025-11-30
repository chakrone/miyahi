// controllers/user.controller.js
const UserService = require("../services/user.service");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await UserService.getById(req.user.id);
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const updated = await UserService.update(req.user.id, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};