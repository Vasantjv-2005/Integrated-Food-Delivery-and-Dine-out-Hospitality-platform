const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

// ADD
router.post("/", protect, addToCart);

// GET
router.get("/", protect, getCart);

// DELETE
router.delete("/:index", protect, removeItem);

module.exports = router;