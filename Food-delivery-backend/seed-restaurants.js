const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
require('dotenv').config();

const sampleRestaurants = [
  {
    name: "Spice Garden",
    cuisine: "North Indian",
    location: {
      type: "Point",
      coordinates: [77.2090, 28.6139] // Delhi coordinates
    },
    rating: 4.7,
    isOpen: true,
    menu: [
      { name: "Butter Chicken", price: 320, veg: false, description: "Creamy tomato curry with tender chicken" },
      { name: "Paneer Tikka", price: 280, veg: true, description: "Grilled cottage cheese with spices" },
      { name: "Naan", price: 40, veg: true, description: "Traditional Indian flatbread" }
    ]
  },
  {
    name: "Dragon Palace",
    cuisine: "Chinese",
    location: {
      type: "Point",
      coordinates: [72.8777, 19.0760] // Mumbai coordinates
    },
    rating: 4.5,
    isOpen: true,
    menu: [
      { name: "Spring Rolls", price: 180, veg: true, description: "Crispy vegetable spring rolls" },
      { name: "Noodles", price: 220, veg: true, description: "Stir-fried noodles with vegetables" },
      { name: "Manchurian", price: 250, veg: true, description: "Indo-Chinese vegetable balls" }
    ]
  },
  {
    name: "The Green Bowl",
    cuisine: "Healthy",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716] // Bangalore coordinates
    },
    rating: 4.8,
    isOpen: true,
    menu: [
      { name: "Quinoa Bowl", price: 350, veg: true, description: "Nutritious quinoa with fresh vegetables" },
      { name: "Greek Salad", price: 280, veg: true, description: "Fresh salad with feta cheese" },
      { name: "Smoothie Bowl", price: 200, veg: true, description: "Acai bowl with fruits and granola" }
    ]
  },
  {
    name: "Pizza Republic",
    cuisine: "Italian",
    location: {
      type: "Point",
      coordinates: [77.1025, 28.7041] // Gurgaon coordinates
    },
    rating: 4.6,
    isOpen: true,
    menu: [
      { name: "Margherita Pizza", price: 400, veg: true, description: "Classic pizza with tomato and mozzarella" },
      { name: "Pasta Carbonara", price: 380, veg: false, description: "Creamy pasta with bacon" },
      { name: "Caesar Salad", price: 250, veg: true, description: "Romaine lettuce with caesar dressing" }
    ]
  },
  {
    name: "Burger Lab",
    cuisine: "American",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716] // Bangalore coordinates
    },
    rating: 4.4,
    isOpen: true,
    menu: [
      { name: "Classic Burger", price: 180, veg: false, description: "Juicy beef patty with lettuce" },
      { name: "Veg Burger", price: 150, veg: true, description: "Plant-based patty with vegetables" },
      { name: "French Fries", price: 120, veg: true, description: "Crispy golden fries" }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing restaurants
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    // Add sample restaurants
    await Restaurant.insertMany(sampleRestaurants);
    console.log('Added sample restaurants');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
