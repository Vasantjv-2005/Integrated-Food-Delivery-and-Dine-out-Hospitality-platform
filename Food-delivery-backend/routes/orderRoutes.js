const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  updateStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

// PLACE ORDER
router.post("/", protect, placeOrder);

// GET ORDERS
router.get("/", protect, getOrders);

// UPDATE STATUS
router.put("/:id", updateStatus);

module.exports = router;