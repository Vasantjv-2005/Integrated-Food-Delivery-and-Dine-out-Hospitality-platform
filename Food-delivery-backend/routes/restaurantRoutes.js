const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  addMenuItem,
  getNearbyRestaurants
} = require("../controllers/restaurantController");

// ✅ CREATE
router.post("/", createRestaurant);

// ✅ GET ALL
router.get("/", getRestaurants);

// ✅ NEARBY (must be before :id)
router.get("/nearby", getNearbyRestaurants);

// ✅ ADD MENU
router.post("/:id/menu", addMenuItem);

module.exports = router;