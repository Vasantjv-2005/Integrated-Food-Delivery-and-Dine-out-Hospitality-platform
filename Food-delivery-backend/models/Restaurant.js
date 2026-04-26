const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  veg: Boolean,
  description: String,
});

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },

    // 📍 GEO LOCATION
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    rating: {
      type: Number,
      default: 4,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    menu: [menuSchema],
  },
  { timestamps: true }
);

// 🔥 REQUIRED FOR GEO SEARCH
restaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);