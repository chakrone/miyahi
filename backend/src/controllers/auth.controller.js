// controllers/auth.controller.js
const AuthService = require("../services/auth.service");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const result = await AuthService.login(req.body.email, req.body.password);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
};