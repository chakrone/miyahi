// routes/index.js
const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/products", require("./product.routes"));
router.use("/orders", require("./order.routes"));
//router.use("/teams", require("./team.routes"));

module.exports = router;