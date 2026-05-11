const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

// ADD
router.post("/", protect, addToCart);

// GET
router.get("/", protect, getCart);

// DELETE
router.delete("/:index", protect, removeItem);

// CLEAR
router.delete("/", protect, clearCart);

module.exports = router;