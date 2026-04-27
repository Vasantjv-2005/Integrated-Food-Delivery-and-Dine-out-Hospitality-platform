const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  addMenuItem,
  getNearbyRestaurants
} = require("../controllers/restaurantController");

// CREATE (protected)
router.post("/", authMiddleware, createRestaurant);

// GET ALL (public)
router.get("/", getRestaurants);

// NEARBY (public, must be before :id)
router.get("/nearby", getNearbyRestaurants);

// GET BY ID (public)
router.get("/:id", getRestaurantById);

// ADD MENU (protected)
router.post("/:id/menu", authMiddleware, addMenuItem);

module.exports = router;