const Restaurant = require("../models/Restaurant");

// CREATE RESTAURANT
exports.createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, latitude, longitude, menu = [] } = req.body;

    if (!name || !cuisine || !latitude || !longitude) {
      return res.status(400).json({
        message: "All fields required (name, cuisine, latitude, longitude)",
      });
    }

    const restaurant = await Restaurant.create({
      name,
      cuisine,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      menu: menu.map(item => ({
        name: item.name,
        price: item.price,
        veg: item.veg || false,
        description: item.description || ""
      }))
    });

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL RESTAURANTS
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET RESTAURANT BY ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD MENU ITEM
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, veg, description } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: "Menu item name and price required" });
    }

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = {
      name,
      price: parseFloat(price),
      veg: veg || false,
      description: description || ""
    };

    restaurant.menu.push(menuItem);
    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET NEARBY RESTAURANTS
exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5km
        },
      },
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};