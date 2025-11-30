// routes/product.routes.js
const router = require("express").Router();
const ProductController = require("../controllers/product.controller");
const auth = require("../middleware/auth");

router.post("/", auth, ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", auth, ProductController.updateProduct);
router.delete("/:id", auth, ProductController.deleteProduct);

module.exports = router;