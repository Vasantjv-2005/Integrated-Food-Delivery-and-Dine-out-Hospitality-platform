const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addToCart } = require("../controllers/userController");

router.post("/cart", auth, addToCart);

module.exports = router;