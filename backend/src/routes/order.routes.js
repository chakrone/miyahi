// routes/order.routes.js
const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.post("/", auth, OrderController.createOrder);
router.get("/", auth, OrderController.getMyOrders);
router.get("/:id", auth, OrderController.getOrderById);
router.patch("/:id/status", auth, OrderController.updateOrderStatus);

module.exports = router;