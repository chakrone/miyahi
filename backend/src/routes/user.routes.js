const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, UserController.getProfile);
router.put("/me", auth, UserController.updateProfile);

module.exports = router;
