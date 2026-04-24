const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  rating: Number,
  comment: String,
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);